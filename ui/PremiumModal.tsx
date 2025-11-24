import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Button } from './UIComponents';
import { createSubscription } from '../services/mercadopago';
import { supabase } from '../services/supabase';
import { X, Check, Crown, Loader2, CreditCard, Shield, Sparkles, ExternalLink, QrCode, AlertTriangle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateProfile } = useContext(AppContext);
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [step, setStep] = useState<'select' | 'checkout'>('select');

  useEffect(() => {
    if (isOpen) {
      setStep('select');
      setLoading(false);
      setCheckingStatus(false);
    }
  }, [isOpen]);

  const handleSubscribe = async () => {
      setLoading(true);
      
      // Chama o serviço que se comunica com a API Serverless
      const subData = await createSubscription(plan);
      
      if (subData.error || !subData.init_point) {
          toast.error("Erro no Pagamento", { 
              description: subData.message || "Não foi possível iniciar o checkout.",
          });
          setLoading(false);
          return;
      }

      // Abre em nova aba
      const opened = window.open(subData.init_point, '_blank');
      
      // Avança para a tela de confirmação imediatamente
      setStep('checkout');
      
      if (!opened) {
          toast.error("Pop-up bloqueado", { description: "Permita pop-ups ou clique no link abaixo." });
          // Fallback: Redireciona na mesma aba se pop-up falhar, mas idealmente mantemos o app aberto
          // window.location.href = subData.init_point; 
      } else {
          toast.success('Página de pagamento aberta!', { 
              description: 'Após pagar, confirme clicando no botão abaixo.',
              duration: 5000 
          });
      }
      setLoading(false);
  };

  // LÓGICA DE LIBERAÇÃO IMEDIATA (SOLICITAÇÃO DO USUÁRIO)
  const handleCheckStatus = async () => {
      if (checkingStatus) return;
      setCheckingStatus(true);
      
      // 1. Define Vencimento (Otimista)
      const now = new Date();
      const expiresAt = new Date();
      
      if (plan === 'yearly') {
          expiresAt.setFullYear(now.getFullYear() + 1);
      } else {
          expiresAt.setDate(now.getDate() + 30);
      }

      const expirationString = expiresAt.toISOString();

      // 2. LIBERAÇÃO IMEDIATA NO APP (Optimistic UI)
      updateProfile({
          ...profile,
          is_premium: true,
          premium_expires_at: expirationString,
          subscriptionType: plan,
          subscriptionMethod: 'pix_manual_check'
      });

      // Feedback Visual
      toast.success("Premium Liberado! ♡", {
          description: "Seu acesso foi desbloqueado.",
          icon: <Crown className="text-sacred-gold" />,
          duration: 5000
      });

      // Fecha o modal imediatamente
      onClose();
      setCheckingStatus(false);
      
      // 3. O Webhook tratará a atualização real no Banco de Dados após a confirmação do pagamento.
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={step === 'checkout' ? undefined : onClose} />

      <div className="relative bg-[#0f172a] w-full max-w-md rounded-2xl border border-sacred-gold/30 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        <div className="p-6 pb-4 text-center bg-gradient-to-b from-sacred-gold/5 to-transparent relative">
            {/* Esconde o botão X durante o checkout para evitar saída acidental */}
            {step === 'select' && (
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-white"><X size={24} /></button>
            )}
            
            <div className="relative inline-block">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.3)] mb-3 animate-pulse-slow">
                    <Crown size={32} className="text-white" fill="currentColor" />
                </div>
                <Sparkles className="absolute -top-1 -right-2 text-sacred-gold animate-pulse" size={20} />
            </div>
            
            <h2 className="text-2xl font-serif text-sacred-gold mb-2">Fiat Premium</h2>
            <p className="text-sm text-gray-300 font-serif italic leading-relaxed px-4">
                "Pague uma única vez e tenha acesso liberado."
            </p>
        </div>

        <div className="p-6 pt-2 overflow-y-auto custom-scrollbar">
          
          {step === 'checkout' ? (
            <div className="space-y-6 text-center animate-slide-up py-4">
                <div className="bg-sacred-gold/10 p-6 rounded-xl border border-sacred-gold/20">
                    <ExternalLink size={40} className="text-sacred-gold mx-auto mb-4 opacity-80" />
                    <h3 className="text-white font-bold text-lg">Aguardando Pagamento...</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                        Conclua o pagamento na aba do Mercado Pago que foi aberta.
                    </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg flex items-start gap-3 text-left">
                    <AlertTriangle size={20} className="text-blue-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">
                        <strong className="text-blue-300 block mb-1">Importante:</strong>
                        Após realizar o pagamento, <strong>clique no botão abaixo</strong> para liberar seu acesso imediatamente.
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <Button 
                        variant="sacred" 
                        className="w-full h-14 gap-2 shadow-lg text-lg font-bold animate-pulse-slow" 
                        onClick={handleCheckStatus}
                        disabled={checkingStatus}
                    >
                        {checkingStatus ? (
                            <>
                                <Loader2 className="animate-spin" /> Liberando...
                            </>
                        ) : (
                            <>
                                <Check size={20} /> JÁ FIZ O PAGAMENTO
                            </>
                        )}
                    </Button>
                    
                    <p className="text-[10px] text-gray-500 px-4">
                        Ao clicar, o sistema libera seu Premium imediatamente.
                    </p>

                    <div className="pt-4 flex justify-between items-center">
                        <button 
                            onClick={() => setStep('select')}
                            className="text-xs text-gray-500 hover:text-white flex items-center gap-1"
                        >
                            <ArrowLeft size={12} /> Voltar / Escolher outro plano
                        </button>
                        
                        <button 
                            className="text-xs text-sacred-gold underline"
                            onClick={() => handleSubscribe()} 
                        >
                            Reabrir link de pagamento
                        </button>
                    </div>
                </div>
            </div>
          ) : (
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div 
                        onClick={() => setPlan('monthly')}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center relative flex flex-col justify-center ${plan === 'monthly' ? 'bg-sacred-gold/10 border-sacred-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                    >
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">30 Dias</p>
                        <p className="text-2xl text-white font-serif font-bold">R$ 4,90</p>
                        <p className="text-[10px] text-gray-500">Acesso por 1 mês</p>
                    </div>
                    <div 
                        onClick={() => setPlan('yearly')}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center relative flex flex-col justify-center ${plan === 'yearly' ? 'bg-sacred-gold/10 border-sacred-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                    >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap border border-green-400">
                            Melhor Oferta
                        </div>
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">1 Ano</p>
                        <p className="text-2xl text-white font-serif font-bold">R$ 39,90</p>
                        <p className="text-[10px] text-gray-500">Acesso por 12 meses</p>
                    </div>
                </div>

                <div className="bg-green-900/20 border border-green-500/20 p-3 rounded-lg flex gap-3 items-center justify-center">
                    <QrCode className="text-green-400 shrink-0" size={16} />
                    <p className="text-[11px] text-gray-300 leading-tight">
                        <strong>Pagamento Único:</strong> Aceitamos Pix e Cartão. <br/>
                        Sem assinaturas recorrentes.
                    </p>
                </div>

                <div className="space-y-3 pt-2">
                    <Button 
                        variant="sacred" 
                        className="w-full h-14 text-lg font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-3 animate-pulse-slow"
                        onClick={handleSubscribe}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <><CreditCard size={20} /> Pagar e Liberar</>}
                    </Button>
                    
                    <p className="text-center text-[10px] text-gray-500 flex items-center justify-center gap-1">
                        <Shield size={10} /> Ambiente seguro • Mercado Pago
                    </p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-2 opacity-80">
                     <FeatureItem text="Terço com Voz Guiada" />
                     <FeatureItem text="Planner Espiritual Ilimitado" />
                     <FeatureItem text="Conteúdo Exclusivo de Santos" />
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