import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { Button } from './UIComponents';
import { createPixPayment, checkPaymentStatus, activatePremium, createSubscription } from '../services/mercadopago';
import { X, Check, Copy, Crown, Loader2, QrCode, CreditCard, Shield, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateProfile } = useContext(AppContext);
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [method, setMethod] = useState<'none' | 'pix' | 'card'>('none');
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [status, setStatus] = useState<'idle' | 'pending' | 'approved'>('idle');

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setMethod('none');
      setPaymentData(null);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (method === 'pix' && status === 'pending' && paymentData?.id) {
      interval = setInterval(async () => {
        const currentStatus = await checkPaymentStatus(paymentData.id);
        if (currentStatus === 'approved') {
          setStatus('approved');
          clearInterval(interval);
          handleSuccess('pix');
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [status, paymentData, method]);

  const handleGeneratePix = async () => {
    setLoading(true);
    setMethod('pix');
    const amount = plan === 'monthly' ? 4.90 : 39.90;
    const description = `Fiat Premium - ${plan === 'monthly' ? 'Mensal' : 'Anual'}`;
    
    const data = await createPixPayment(profile.email || '', amount, description);
    
    setLoading(false);
    if (data) {
      setPaymentData(data);
      setStatus('pending');
    } else {
      toast.error("Erro ao gerar Pix. Tente novamente.");
      setMethod('none');
    }
  };

  const handleCheckoutCard = async () => {
      setLoading(true);
      setMethod('card');
      
      const subData = await createSubscription(profile.email || '', plan);
      
      if (subData && subData.init_point) {
          const width = 600;
          const height = 700;
          const left = (window.innerWidth - width) / 2;
          const top = (window.innerHeight - height) / 2;
          
          window.open(
              subData.init_point, 
              'MercadoPagoCheckout', 
              `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no`
          );
          
          toast.success('Checkout aberto!', { description: 'Conclua o pagamento na janela segura.' });
          
          setTimeout(() => {
              if (confirm("Você concluiu a assinatura no Mercado Pago?")) {
                  handleSuccess('card', subData.id);
              } else {
                  setLoading(false);
                  setMethod('none');
              }
          }, 2000);
      } else {
          toast.error("Erro ao iniciar assinatura. Tente novamente.");
          setLoading(false);
          setMethod('none');
      }
  };

  const handleSuccess = async (payMethod: 'pix' | 'card', subId?: string) => {
    const newProfile = await activatePremium(payMethod, plan, subId);
    updateProfile({ ...profile, ...newProfile });
    
    if(navigator.vibrate) navigator.vibrate([50, 100, 50, 100]);
    
    setTimeout(() => {
      onClose();
      toast.success('Bem-vindo à família Premium, alma devota ♡', {
        duration: 5000,
        icon: <Sparkles className="text-sacred-gold animate-pulse" />,
        style: {
            background: '#0f172a',
            color: '#f8fafc',
            border: '1px solid #d4af37'
        }
      });
    }, 500);
  };

  const copyPixCode = () => {
    if (paymentData?.point_of_interaction?.transaction_data?.qr_code) {
      navigator.clipboard.writeText(paymentData.point_of_interaction.transaction_data.qr_code);
      toast.success("Código Pix copiado!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#0f172a] w-full max-w-md rounded-2xl border border-sacred-gold/30 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        <div className="p-6 pb-4 text-center bg-gradient-to-b from-sacred-gold/5 to-transparent relative">
            <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-white"><X size={24} /></button>
            
            <div className="relative inline-block">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.3)] mb-3 animate-pulse-slow">
                    <Crown size={32} className="text-white" fill="currentColor" />
                </div>
                <Sparkles className="absolute -top-1 -right-2 text-sacred-gold animate-pulse" size={20} />
            </div>
            
            <h2 className="text-2xl font-serif text-sacred-gold mb-2">Fiat Premium</h2>
            
            {method === 'none' && (
                <p className="text-sm text-gray-300 font-serif italic leading-relaxed px-4">
                    "Apoie o Fiat com apenas <strong className="text-white">R$ 4,90</strong> por mês <br/>
                    (menos que um café — e ajuda a levar Jesus a milhares de lares ♡)"
                </p>
            )}
        </div>

        <div className="p-6 pt-2 overflow-y-auto custom-scrollbar">
          
          {status === 'approved' ? (
            <div className="text-center py-10 space-y-6 animate-scale-in">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <Check size={48} strokeWidth={3} />
                </div>
                <div>
                    <h3 className="text-2xl font-serif text-white">Deus lhe pague!</h3>
                    <p className="text-gray-400 font-serif mt-2">Sua assinatura está ativa.</p>
                </div>
                <div className="text-sacred-gold text-sm animate-pulse">Atualizando seu app...</div>
            </div>
          ) : method === 'pix' && paymentData ? (
            <div className="space-y-6 text-center animate-slide-up">
                <div className="bg-white p-3 rounded-xl inline-block mx-auto shadow-lg">
                   <img 
                     src={`data:image/png;base64,${paymentData.point_of_interaction.transaction_data.qr_code_base64}`} 
                     alt="QR Code Pix" 
                     className="w-48 h-48"
                   />
                </div>
                
                <div>
                    <p className="text-white font-bold text-2xl mb-1">R$ {plan === 'monthly' ? '4,90' : '39,90'}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Escaneie ou Copie o código</p>
                    
                    <div className="flex gap-2 items-center justify-center max-w-xs mx-auto">
                        <Button variant="sacred" size="sm" className="w-full gap-2" onClick={copyPixCode}>
                            <Copy size={16} /> Copiar Código Pix
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-sacred-gold animate-pulse bg-sacred-gold/10 py-2 rounded-lg">
                    <Loader2 size={12} className="animate-spin" />
                    Aguardando pagamento...
                </div>
                
                <button onClick={() => setMethod('none')} className="text-xs text-gray-500 hover:text-white underline">
                    Voltar e escolher outro método
                </button>
            </div>
          ) : (
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div 
                        onClick={() => setPlan('monthly')}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center relative flex flex-col justify-center ${plan === 'monthly' ? 'bg-sacred-gold/10 border-sacred-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                    >
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Mensal</p>
                        <p className="text-2xl text-white font-serif font-bold">R$ 4,90</p>
                        <p className="text-[10px] text-gray-500">Cobrança recorrente</p>
                    </div>
                    <div 
                        onClick={() => setPlan('yearly')}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center relative flex flex-col justify-center ${plan === 'yearly' ? 'bg-sacred-gold/10 border-sacred-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                    >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap border border-green-400">
                            Economize R$ 19,90
                        </div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Anual</p>
                        <p className="text-2xl text-white font-serif font-bold">R$ 39,90</p>
                        <p className="text-[10px] text-gray-500">Cobrança recorrente</p>
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <Button 
                        variant="sacred" 
                        className="w-full h-14 text-lg font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-3 animate-pulse-slow"
                        onClick={handleGeneratePix}
                        disabled={loading}
                    >
                        {loading && method === 'pix' ? <Loader2 className="animate-spin" /> : <><QrCode size={20} /> Pagar com Pix</>}
                    </Button>
                    
                    <Button 
                        variant="outline" 
                        className="w-full h-14 text-lg border-white/10 hover:bg-white/10 text-white flex items-center justify-center gap-3 transition-all hover:border-sacred-gold/50"
                        onClick={handleCheckoutCard}
                        disabled={loading}
                    >
                        {loading && method === 'card' ? <Loader2 className="animate-spin" /> : <><CreditCard size={20} /> Pagar com Cartão</>}
                    </Button>
                    
                    <p className="text-center text-[10px] text-gray-500 flex items-center justify-center gap-1">
                        <Shield size={10} /> Ambiente seguro Mercado Pago • Cancele quando quiser
                    </p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-2 opacity-80">
                     <FeatureItem text="Terço com Voz Guiada" />
                     <FeatureItem text="Planner Espiritual Ilimitado" />
                     <FeatureItem text="Catequese & Santos" />
                </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex items-center gap-3 text-xs text-gray-300">
        <div className="w-4 h-4 rounded-full bg-sacred-gold/20 flex items-center justify-center shrink-0">
            <Check size={10} className="text-sacred-gold" />
        </div>
        {text}
    </div>
);

export default PremiumModal;