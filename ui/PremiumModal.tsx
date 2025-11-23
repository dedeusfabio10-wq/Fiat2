
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { Button } from './UIComponents';
import { createSubscription } from '../services/mercadopago';
import { supabase } from '../services/supabase';
import { X, Check, Crown, Loader2, CreditCard, Shield, Sparkles, ExternalLink, QrCode, AlertTriangle } from 'lucide-react';
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
      
      const subData = await createSubscription(profile.email || '', plan);
      
      if (subData.error || !subData.init_point) {
          toast.error("Erro na Configuração", { 
              description: "Verifique se as variáveis de ambiente (Links MP) estão configuradas.",
          });
          setLoading(false);
          return;
      }

      const opened = window.open(subData.init_point, '_blank');
      
      if (!opened) {
          toast.error("Pop-up bloqueado", { description: "Permita pop-ups para realizar o pagamento." });
          window.location.href = subData.init_point; 
      } else {
          setStep('checkout');
          toast.success('Abriu!', { 
              description: 'Pague com Pix ou Cartão e confirme aqui.',
              duration: 5000 
          });
      }
      setLoading(false);
  };

  // LÓGICA DE LIBERAÇÃO MANUAL + SALVAMENTO NO SUPABASE
  const handleCheckStatus = async () => {
      if (checkingStatus) return;
      setCheckingStatus(true);
      
      toast.info('Validando pagamento...', {
          description: 'Salvando sua assinatura no servidor...',
      });

      try {
          const now = new Date();
          const expiresAt = new Date();
          
          // Define validade baseado no plano escolhido
          if (plan === 'yearly') {
              expiresAt.setFullYear(now.getFullYear() + 1);
          } else {
              expiresAt.setDate(now.getDate() + 30);
          }

          // 1. Salvar no Supabase (UPSERT para garantir que crie se não existir)
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
              const payload = {
                  id: user.id,
                  email: user.email,
                  is_premium: true,
                  premium_expires_at: expiresAt.toISOString(),
                  subscription_type: plan,
                  subscription_method: 'pix_manual_check',
                  updated_at: now.toISOString()
              };

              const { error } = await supabase
                  .from('profiles')
                  .upsert(payload); // UPSERT É CRÍTICO AQUI

              if (error) {
                  console.error('Erro ao salvar premium no DB:', error);
                  throw new Error('Falha na conexão.');
              }
          }

          // 2. Atualiza estado local (Otimista)
          updateProfile({
              ...profile,
              is_premium: true,
              premium_expires_at: expiresAt.toISOString(),
              subscriptionType: plan,
              subscriptionMethod: 'pix_manual_check'
          });

          finishSuccess();

      } catch (error) {
          toast.error("Não foi possível salvar.", { description: "Tente novamente ou contate o suporte." });
      } finally {
          setCheckingStatus(false);
      }
  };

  const finishSuccess = () => {
      onClose();
      toast.success("Pagamento Confirmado! ♡", {
          description: "Bem-vindo ao Premium. Deus abençoe sua generosidade.",
          icon: <Crown className="text-sacred-gold" />,
          duration: 5000
      });
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
            <p className="text-sm text-gray-300 font-serif italic leading-relaxed px-4">
                "Pague uma única vez e tenha acesso liberado."
            </p>
        </div>

        <div className="p-6 pt-2 overflow-y-auto custom-scrollbar">
          
          {step === 'checkout' ? (
            <div className="space-y-6 text-center animate-slide-up py-4">
                <div className="bg-sacred-gold/10 p-6 rounded-xl border border-sacred-gold/20">
                    <ExternalLink size={40} className="text-sacred-gold mx-auto mb-4 opacity-80" />
                    <h3 className="text-white font-bold text-lg">Aguardando Confirmação</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                        Conclua o pagamento na aba do Mercado Pago.
                    </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg flex items-start gap-2 text-left">
                    <AlertTriangle size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-gray-300">
                        <strong>Importante:</strong> Após pagar no banco, clique no botão abaixo para liberar seu acesso imediatamente.
                    </p>
                </div>

                <div className="space-y-3">
                    <Button 
                        variant="sacred" 
                        className="w-full h-12 gap-2 shadow-lg" 
                        onClick={handleCheckStatus}
                        disabled={checkingStatus}
                    >
                        {checkingStatus ? (
                            <>
                                <Loader2 className="animate-spin" /> Salvando acesso...
                            </>
                        ) : (
                            <>
                                <Check size={18} /> Já realizei o pagamento
                            </>
                        )}
                    </Button>
                    
                    <p className="text-[10px] text-gray-500 px-4">
                        Ao clicar, criaremos seu perfil Premium na nuvem.
                    </p>

                    <Button 
                        variant="ghost" 
                        className="w-full text-xs text-gray-500 mt-2 underline"
                        onClick={() => handleSubscribe()} 
                    >
                        Reabrir link de pagamento
                    </Button>
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
