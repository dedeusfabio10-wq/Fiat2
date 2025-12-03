
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/UIComponents';
import { IconRosary, IconMonstrance, IconBible, IconSacredHeart, IconBookCross } from '../ui/Icons';
import { Star, ArrowRight, Sparkles, Check, Crown, ShieldCheck, Smartphone, ChevronRight, HelpCircle, Quote, Instagram  } from 'lucide-react';
import { initAudio, playSacredIntro } from '../services/audio';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Ícone do TikTok personalizado
const TikTokIcon = ({ className = "w-5 h-5" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnter = () => { 
      // 1. Inicializa o contexto de áudio (essencial para celulares)
      initAudio();
      
      // 2. Toca o som
      playSacredIntro();
      
      // 3. Navega após pequeno delay
      setTimeout(() => {
          navigate('/auth'); 
      }, 800);
  };

  return (
    <div className="min-h-screen bg-[#050a14] text-slate-200 overflow-x-hidden font-sans relative selection:bg-sacred-gold selection:text-sacred-sapphire">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1548625361-9ebc25732918?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-20 pointer-events-none mix-blend-overlay fixed-bg"></div>
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#050a14]/80 to-[#050a14] pointer-events-none"></div>

      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 pt-12 lg:pt-20 overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-sacred-gold/10 to-transparent blur-[80px] rounded-full pointer-events-none animate-pulse-slow"></div>
         <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto space-y-8">
             <div className="mb-6 relative group cursor-pointer" onClick={handleEnter}>
                <div className="absolute inset-0 bg-sacred-gold/20 blur-2xl rounded-full group-hover:bg-sacred-gold/30 transition-all duration-1000"></div>
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] text-sacred-gold"><path d="M50 5L53 20L63 10L58 23L75 20L63 30L80 38L65 42L80 55L65 60L75 75L58 68L60 85L50 70L40 85L42 68L25 75L35 60L20 55L35 42L20 38L37 30L25 20L42 23L37 10L47 20L50 5Z" fill="currentColor" opacity="0.4" className="animate-spin-slow origin-center"/><path d="M50 15V85M30 35H70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="M50 45C65 45 75 55 75 70C75 85 50 85 50 85C50 85 25 85 25 70C25 55 35 45 50 45Z" stroke="currentColor" strokeWidth="2"/><path d="M35 55L50 70L65 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="50" cy="50" r="4" fill="currentColor" className="animate-pulse"/></svg>
             </div>
             <div className="space-y-2"><h1 className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-sacred-gold via-[#fcd34d] to-[#b45309] drop-shadow-sm tracking-tight">Fiat</h1><p className="text-2xl md:text-3xl font-serif italic text-slate-300 font-light">"Luz do Alto para sua alma."</p></div>
             <p className="text-gray-400 max-w-lg mx-auto text-lg leading-relaxed font-sans font-light">Organize sua vida de oração, reze o Santo Terço e aprofunde sua fé com a beleza que a Igreja merece.</p>
             <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full max-w-md justify-center"><Button variant="sacred" size="lg" onClick={handleEnter} className="h-14 text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform border border-yellow-200/20">Entrar no Santuário</Button></div>
             <div className="relative mt-16 w-[280px] md:w-[320px] h-[580px] mx-auto perspective-1000">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[110%] bg-sacred-gold/10 blur-[80px] rounded-full"></div>
                 <div className="relative w-full h-full bg-[#1a1a1a] rounded-[3rem] border-[8px] border-[#2a2a2a] shadow-2xl overflow-hidden ring-1 ring-white/10 transform rotate-y-12 hover:rotate-0 transition-transform duration-700 ease-out">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-xl z-30"></div>
                     <div className="w-full h-full bg-[#0f172a] flex flex-col overflow-hidden relative">
                         <div className="h-8 w-full flex justify-between px-6 items-center text-[10px] text-white pt-2"><span>9:41</span><div className="flex gap-1"><div className="w-3 h-3 bg-white rounded-full"></div><div className="w-3 h-3 bg-white rounded-full opacity-50"></div></div></div>
                         <div className="p-6 pt-8 pb-2"><h2 className="text-white font-serif text-xl">Olá, Alma Devota</h2><p className="text-sacred-gold text-xs uppercase tracking-widest">Terça-feira da 2ª Semana</p></div>
                         <div className="mx-4 mt-2 p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 shadow-lg relative overflow-hidden group"><div className="absolute top-0 right-0 p-4 opacity-20"><IconRosary size={60} className="text-sacred-gold" /></div><span className="text-[10px] bg-sacred-gold/20 text-sacred-gold px-2 py-0.5 rounded uppercase font-bold">Liturgia</span><h3 className="text-2xl text-white font-serif mt-2 mb-1">Mistérios Dolorosos</h3><p className="text-xs text-gray-400 mb-4">Acompanhe a Paixão de Cristo.</p><div className="flex items-center gap-2 text-xs text-sacred-gold font-bold uppercase">Rezar Agora <ChevronRight size={12} /></div></div>
                         <div className="grid grid-cols-2 gap-3 p-4"><div className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col gap-2"><IconMonstrance className="text-yellow-400" size={20} /><span className="text-xs text-white">Liturgia Diária</span></div><div className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col gap-2"><IconBible className="text-purple-400" size={20} /><span className="text-xs text-white">Orações</span></div></div>
                         <div className="mt-auto h-16 bg-black/40 backdrop-blur-md border-t border-white/5 flex justify-around items-center px-2 pb-2"><div className="flex flex-col items-center text-sacred-gold"><IconMonstrance size={20}/><span className="text-[8px] mt-1">Início</span></div><div className="flex flex-col items-center text-gray-600"><IconBible size={20}/><span className="text-[8px] mt-1">Orações</span></div><div className="flex flex-col items-center text-gray-600"><IconRosary size={24}/><span className="text-[8px] mt-1">Terço</span></div></div>
                     </div>
                 </div>
             </div>
         </div>
      </section>

      <div className="w-full h-24 bg-gradient-to-b from-[#050a14] to-[#0b1221] relative overflow-hidden"><div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sacred-gold/40 to-transparent"></div></div>

      <section className="py-20 bg-[#0b1221] relative">
          <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16"><div className="inline-block p-2 px-4 rounded-full bg-sacred-gold/5 border border-sacred-gold/20 mb-4"><span className="text-sacred-gold text-xs font-bold uppercase tracking-[0.2em]">Tudo em um só lugar</span></div><h2 className="text-4xl font-serif text-white mb-4">A Tecnologia a Serviço da Fé</h2><p className="text-gray-400 max-w-2xl mx-auto font-light">Cada detalhe do Fiat foi pensado para elevar sua alma, sem distrações mundanas.</p></div>
              <div className="grid md:grid-cols-3 gap-6">
                  <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-[#1a1f2e] to-[#0f1219] rounded-3xl border border-white/5 p-8 relative overflow-hidden group hover:border-sacred-gold/30 transition-all">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-sacred-gold/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-sacred-gold/10 transition-colors"></div>
                      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                          <div className="flex-1 space-y-4"><div className="w-12 h-12 bg-sacred-gold/10 rounded-xl flex items-center justify-center text-sacred-gold"><IconRosary size={28} /></div><h3 className="text-2xl font-serif text-white">Santo Terço Guiado</h3><p className="text-gray-400 leading-relaxed">Reze com áudio imersivo e contagem automática. Meditações bíblicas para cada mistério, perfeito para quando você está no trânsito ou caminhando.</p><ul className="space-y-2 pt-2"><FeatureBullet text="Voz suave e orante" /><FeatureBullet text="Acompanhamento visual das contas" /><FeatureBullet text="Mistérios automáticos pelo dia" /></ul></div>
                          <div className="w-48 h-48 relative animate-spin-slow opacity-80"><svg viewBox="0 0 100 100" className="w-full h-full text-sacred-gold/20"><circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" /><circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" /></svg><div className="absolute inset-0 flex items-center justify-center text-sacred-gold"><IconSacredHeart size={48} /></div></div>
                      </div>
                  </div>
                  <div className="bg-[#161b26] rounded-3xl border border-white/5 p-8 relative overflow-hidden group hover:border-green-500/30 transition-all">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-5"></div>
                      <div className="relative z-10"><div className="w-12 h-12 bg-green-900/20 rounded-xl flex items-center justify-center text-green-400 mb-6"><IconMonstrance size={28} /></div><h3 className="text-xl font-serif text-white mb-2">Liturgia Diária</h3><p className="text-gray-400 text-sm mb-6">As leituras da Missa, o Santo do Dia e as cores litúrgicas atualizadas automaticamente.</p><div className="bg-black/30 p-3 rounded-lg border border-white/5"><div className="h-2 w-1/3 bg-green-600/50 rounded mb-2"></div><div className="h-2 w-full bg-gray-700 rounded mb-1"></div><div className="h-2 w-2/3 bg-gray-700 rounded"></div></div></div>
                  </div>
                  <div className="bg-[#161b26] rounded-3xl border border-white/5 p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all"><div className="relative z-10"><div className="w-12 h-12 bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-400 mb-6"><Smartphone size={28} /></div><h3 className="text-xl font-serif text-white mb-2">Planner Espiritual</h3><p className="text-gray-400 text-sm">Crie rotinas de oração, novenas e propósitos. Acompanhe sua constância na graça.</p></div></div>
                  <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-[#1a1f2e] to-[#0f1219] rounded-3xl border border-white/5 p-8 flex flex-col md:flex-row items-center gap-8 hover:border-sacred-gold/30 transition-all">
                      <div className="flex-1 space-y-4"><div className="w-12 h-12 bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-400"><IconBookCross size={28} /></div><h3 className="text-2xl font-serif text-white">Tesouro da Fé</h3><p className="text-gray-400">Uma biblioteca completa com a vida dos santos, orações em latim, explicação dos dogmas e sacramentos. Estude a fé católica onde estiver.</p></div>
                      <div className="flex gap-2"><div className="w-20 h-24 bg-white/5 rounded-lg border border-white/10 transform -rotate-6"></div><div className="w-20 h-24 bg-white/10 rounded-lg border border-white/10 transform rotate-0 z-10 flex items-center justify-center"><IconSacredHeart className="text-purple-400/50" /></div><div className="w-20 h-24 bg-white/5 rounded-lg border border-white/10 transform rotate-6"></div></div>
                  </div>
              </div>
          </div>
      </section>

      <section className="py-24 text-center relative"><div className="absolute inset-0 bg-sacred-gold/5 blur-[100px]"></div><div className="relative z-10 max-w-2xl mx-auto px-6"><IconMonstrance size={48} className="mx-auto text-sacred-gold mb-6 opacity-80" /><h2 className="text-3xl md:text-4xl font-serif text-white italic leading-tight">"Tarde Te amei, ó Beleza tão antiga e tão nova, tarde Te amei!"</h2><p className="text-sacred-gold mt-6 text-sm uppercase tracking-[0.3em] font-bold">— Santo Agostinho</p></div></section>

      <section className="py-20 bg-[#0b1221] relative border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-serif text-white mb-4">A Voz da Comunidade</h2><p className="text-gray-400 font-light">Junte-se a milhares de almas que rezam conosco.</p></div>
              <div className="grid md:grid-cols-3 gap-6"><TestimonialCard name="Mariana Souza" role="Mãe e Catequista" image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" text="O terço guiado é uma bênção! Consigo rezar no trânsito todos os dias. A voz é muito suave e me ajuda a concentrar." /><TestimonialCard name="Pe. Lucas Mendes" role="Sacerdote" image="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" text="Recomendo aos meus paroquianos. O design é sóbrio, eleva a alma e o conteúdo é fidelíssimo ao Magistério." /><TestimonialCard name="Ricardo Oliveira" role="Consagrado" image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" text="O Planner Espiritual me ajudou a organizar minha vida de oração. É incrível ter tudo em um só lugar." /></div>
          </div>
      </section>

      <section className="py-20 bg-[#0b1221] border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-serif text-white mb-12">Faça parte da Família Fiat</h2>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                  <div className="w-full max-w-sm bg-transparent border border-white/10 rounded-2xl p-8 opacity-80 hover:opacity-100 transition-opacity"><h3 className="text-xl font-serif text-white mb-2">Peregrino</h3><div className="text-3xl font-bold text-gray-400 mb-6">Grátis</div><ul className="space-y-3 text-left text-sm text-gray-400 mb-8"><FeatureBullet text="Liturgia Diária Completa" /><FeatureBullet text="Santo Terço (Texto)" /><FeatureBullet text="Acesso a todas orações" /><FeatureBullet text="Sem anúncios" /></ul><Button variant="outline" onClick={handleEnter} className="w-full border-white/20">Entrar</Button></div>
                  <div className="w-full max-w-sm bg-gradient-to-b from-[#1e2532] to-[#0f1219] border border-sacred-gold rounded-2xl p-8 shadow-[0_0_40px_rgba(212,175,55,0.15)] relative transform md:scale-105"><div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sacred-gold text-[#0f172a] text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">Recomendado</div><h3 className="text-xl font-serif text-sacred-gold mb-2 flex items-center justify-center gap-2"><Crown size={18} /> Premium</h3><div className="text-3xl font-bold text-white mb-1">R$ 4,90 <span className="text-sm font-normal text-gray-500">/mês</span></div><p className="text-xs text-gray-500 mb-6">Menos que um cafezinho.</p><ul className="space-y-3 text-left text-sm text-gray-300 mb-8"><FeatureBullet text="Tudo do plano Grátis" active /><FeatureBullet text="Voz Guiada no Terço (TTS Premium)" active /><FeatureBullet text="Planner Espiritual Ilimitado" active /><FeatureBullet text="Modo Noturno Espiritual" active /><FeatureBullet text="Personalização Litúrgica" active /></ul><Button variant="sacred" onClick={handleEnter} className="w-full shadow-[0_0_20px_rgba(212,175,55,0.3)]">Começar</Button></div>
              </div>
          </div>
      </section>

           </section>

      {/* FAQ – agora com fundo um pouco mais claro pra não cobrir o footer */}
      <section className="py-24 bg-[#0b1120] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block p-3 rounded-full bg-white/5 mb-4 text-gray-400">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-3xl font-serif text-white mb-4">Dúvidas Frequentes</h2>
            <p className="text-gray-400 font-light">Tudo o que você precisa saber sobre o Fiat.</p>
          </div>

          <div className="grid gap-4 max-w-2xl mx-auto">
            <FAQItem question="Preciso de internet para usar?" answer="Sim. Como o Fiat é um Web App moderno (acessado pelo navegador), é necessária uma conexão com a internet para carregar a Liturgia Diária, salvar seu progresso no Planner e acessar os áudios. O app foi otimizado para ser extremamente leve e gastar poucos dados." />
            <FAQItem question="Como funciona a assinatura Premium?" answer="É uma contribuição mensal de R$ 4,90 ou anual de R$ 39,90. O pagamento é processado de forma segura pelo Mercado Pago (Pix ou Cartão) e você tem total liberdade para cancelar quando quiser nas configurações do seu perfil." />
            <FAQItem question="O conteúdo é fiel à Igreja Católica?" answer="Absolutamente. Todo o conteúdo (orações, leituras, santos, catequese) segue rigorosamente o Magistério da Igreja Católica, a Bíblia Sagrada (tradução da CNBB ou Ave Maria) e a Tradição Apostólica." />
            <FAQItem question="Para onde vai o dinheiro da assinatura?" answer="90% do valor é reinvestido na manutenção do app e evangelização digital, e 10% é doado para apoiar obras de caridade." />
          </div>
        </div>
      </section>

      {/* Footer – agora totalmente visível e com mais contraste */}
      <footer className="py-16 bg-[#050a14] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center space-y-8 text-center">
          <div 
            className="w-14 h-14 rounded-full border border-sacred-gold/20 flex items-center justify-center text-sacred-gold/50 hover:text-sacred-gold hover:border-sacred-gold/50 transition cursor-pointer"
            onClick={handleEnter}
          >
            <IconMonstrance size={28} />
          </div>

          <div className="flex gap-10">
            <a href="https://instagram.com/fiatcatolicos" target="_blank" rel="noopener noreferrer" className="group">
              <div className="p-4 bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 rounded-2xl shadow-xl group-hover:scale-110 transition">
                <Instagram size={36} className="text-white" />
              </div>
            </a>
            <a href="https://tiktok.com/@fiatcatolicos" target="_blank" rel="noopener noreferrer" className="group">
              <div className="p-4 bg-black rounded-2xl shadow-xl border border-white/20 group-hover:scale-110 transition">
                <TikTokIcon />
              </div>
            </a>
          </div>

          <div className="space-y-3">
            <p className="text-gray-300 text-sm">
              © 2025 Fiat – Santuário Digital. <span className="text-sacred-gold">Ad Maiorem Dei Gloriam.</span>
            </p>
            <div className="flex gap-6 text-sm">
              <button className="text-gray-500 hover:text-sacred-gold transition">Termos de Uso</button>
              <button className="text-gray-500 hover:text-sacred-gold transition">Política de Privacidade</button>
              <button className="text-gray-500 hover:text-sacred-gold transition">Suporte</button>
            </div>
          </div>
        </div>
      </footer>
    </div> {/* fecha o div principal da página (o que começa lá em cima com min-h-screen) */}
  );
};

// componentes que estavam lá embaixo (não mexi neles)
const FeatureBullet: React.FC<{ text: string; active?: boolean }> = ({ text, active }) => (
  <li className="flex items-start gap-3">
    <Check size={16} className={active ? "text-sacred-gold shrink-0 mt-0.5" : "text-gray-500 shrink-0 mt-0.5"} />
    <span>{text}</span>
  </li>
);

const TestimonialCard: React.FC<{ name: string; role: string; image: string; text: string }> = ({ name, role, image, text }) => (
  // ... (mantido igual)
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className={`bg-[#0f1219]/50 backdrop-blur border rounded-xl overflow-hidden transition-all cursor-pointer ${isOpen ? 'border-sacred-gold/40' : 'border-white/10 hover:border-sacred-gold/20'}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-5 flex justify-between items-center">
        <h3 className={`font-serif text-lg ${isOpen ? 'text-sacred-gold' : 'text-white'}`}>{question}</h3>
        <ChevronRight className={`transition-transform ${isOpen ? 'rotate-90 text-sacred-gold' : 'text-gray-500'}`} size={20} />
      </div>
      {isOpen && (
        <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{answer}</p>
      )}
    </div>
  );
};

export default LandingPage;
