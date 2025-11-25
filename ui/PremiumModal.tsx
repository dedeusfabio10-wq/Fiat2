import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Button } from './UIComponents';
import { createSubscription } from '../services/mercadopago';
import { X, Check, Crown, Loader2, CreditCard, Shield, Sparkles, ExternalLink, QrCode, ArrowLeft, RotateCw, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const { profile, refreshProfile } = useContext(AppContext);
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly'); // Default para melhor oferta
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [step, setStep] = useState<'select' | 'checkout'>('select');

  // Fecha o modal automaticamente se o status premium for detectado
  useEffect(() => {
    if (profile.is_premium && isOpen) {
        onClose();
    }
  }, [profile.is_premium, isOpen, onClose]);

  const handleSubscribe = async () => {
      setLoading(true);
      const subData = await createSubscription(plan);
      if (subData.error || !subData.init_point) {
          toast.error("Erro no Pagamento", { description: subData.message || "Não foi possível iniciar o checkout." });
          setLoading(false);
          return;
      }
      window.open(subData.init_point, '_blank');
      setStep('checkout');
      toast.success('Página de pagamento aberta!', { description: 'Após pagar, o app será liberado automaticamente.', duration: 5000 });
      setLoading(false);
  };

  const handleCheckStatus = async () => {
      setCheckingStatus(true);
      await refreshProfile();
      // O listener realtime no App.tsx vai pegar a mudança.
      // Apenas damos um feedback ao usuário.
      setTimeout(() => {
          if (!profile.is_premium) {
              toast.info("Ainda não confirmado", { description: "Verificando... Se já pagou, aguarde alguns instantes." });
          }
          setCheckingStatus(false);
      }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={step === 'checkout' ? undefined : onClose} />
      <div className="relative bg-[#0f172a] w-full max-w-md rounded-2xl border border-sacred-gold/30 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        <div className="p-6 pb-4 text-center bg-gradient-to-b from-sacred-gold/5 to-transparent relative">
            {step === 'select' && <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-white"><X size={24} /></button>}
            <div className="relative inline-block"><div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.3)] mb-3 animate-pulse-slow"><Crown size={32} className="text-white" fill="currentColor" /></div><Sparkles className="absolute -top-1 -right-2 text-sacred-gold animate-pulse" size={20} /></div>
            <h2 className="text-2xl font-serif text-sacred-gold mb-2">Fiat Premium</h2>
            <p className="text-sm text-gray-300 font-serif italic leading-relaxed px-4">"Sua contribuição mantém este Santuário Digital vivo."</p>
        </div>

        <div className="p-6 pt-2 overflow-y-auto custom-scrollbar">
          {step === 'checkout' ? (
            <div className="space-y-6 text-center animate-slide-up py-4">
                <div className="bg-sacred-gold/10 p-6 rounded-xl border border-sacred-gold/20">
                    <ExternalLink size={40} className="text-sacred-gold mx-auto mb-4 opacity-80" />
                    <h3 className="text-white font-bold text-lg">Aguardando Confirmação</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">Conclua o pagamento na nova aba e confirme abaixo.</p>
                </div>
                <div className="space-y-3 pt-2">
                    <Button variant="sacred" className="w-full h-14 gap-2 shadow-lg text-lg font-bold animate-pulse-slow" onClick={handleCheckStatus} disabled={checkingStatus}>
                        {checkingStatus ? <><Loader2 className="animate-spin" /> Verificando...</> : <><Check size={20} /> JÁ REALIZEI O PAGAMENTO</>}
                    </Button>
                     <p className="text-xs text-blue-300 bg-blue-900/20 p-2 rounded-md border border-blue-500/20">
                        Após pagar, clique no botão acima para liberar seu acesso imediatamente.
                     </p>
                    <div className="pt-4 flex justify-between items-center">
                        <Button variant="ghost" size="sm" onClick={() => setStep('select')} className="text-xs text-gray-500 hover:text-white flex items-center gap-1"><ArrowLeft size={12} /> Voltar</Button>
                        <Button variant="ghost" size="sm" className="text-xs text-sacred-gold underline hover:bg-sacred-gold/10" onClick={() => handleSubscribe()}><RotateCw size={12} className="mr-1"/> Reabrir link de pagamento</Button>
                    </div>
                </div>
            </div>
          ) : (
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div onClick={() => setPlan('monthly')} className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center relative flex flex-col justify-center ${plan === 'monthly' ? 'bg-sacred-gold/10 border-sacred-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'bg-white/5 border-transparent hover:bg-white/10'}`}><p className="text-xs text-gray-400 uppercase font-bold mb-1">30 DIAS</p><p className="text-2xl text-white font-serif font-bold">R$ 4,90</p><p className="text-[10px] text-gray-500">Cobrança recorrente</p></div>
                    <div onClick={() => setPlan('yearly')} className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center relative flex flex-col justify-center ${plan === 'yearly' ? 'bg-sacred-gold/10 border-sacred-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'bg-white/5 border-transparent hover:bg-white/10'}`}><div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap border border-green-400">Economize 30%</div><p className="text-xs text-gray-400 uppercase font-bold mb-1">1 ANO</p><p className="text-2xl text-white font-serif font-bold">R$ 39,90</p><p className="text-[10px] text-gray-500">Acesso por 12 meses</p></div>
                </div>
                <div className="bg-green-900/20 border border-green-500/20 p-3 rounded-lg flex gap-3 items-center justify-center"><QrCode className="text-green-400 shrink-0" size={16} /><p className="text-[11px] text-gray-300 leading-tight"><strong>Pagamento Único:</strong> Aceitamos Pix e Cartão.<br/> Sem assinaturas recorrentes.</p></div>
                <div className="space-y-3 pt-2">
                    <Button variant="sacred" className="w-full h-14 text-lg font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-3" onClick={handleSubscribe} disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : <><CreditCard size={20} /> Pagar e Liberar</>}</Button>
                    <p className="text-center text-[10px] text-gray-500 flex items-center justify-center gap-1"><Shield size={10} /> Ambiente seguro • Mercado Pago</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-2 opacity-80"><FeatureItem text="Terço com Voz Guiada" /><FeatureItem text="Planner Espiritual Ilimitado" /><FeatureItem text="Conteúdo Exclusivo de Santos" /></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ text: string }> = ({ text }) => (<div className="flex items-center gap-3 text-xs text-gray-300"><div className="w-4 h-4 rounded-full bg-sacred-gold/20 flex items-center justify-center shrink-0"><Check size={10} className="text-sacred-gold" /></div>{text}</div>);

export default PremiumModal;
