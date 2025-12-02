import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/UIComponents';
import { 
  IconRosary, IconMonstrance, IconBible, IconSacredHeart, IconBookCross 
} from '../ui/Icons';
import { 
  Star, ArrowRight, Sparkles, Check, Crown, ShieldCheck, 
  Smartphone, ChevronRight, HelpCircle, Quote, Instagram 
} from 'lucide-react';
import { initAudio, playSacredIntro } from '../services/audio';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnter = () => {
    initAudio();
    playSacredIntro();
    setTimeout(() => {
      navigate('/auth');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#050a14] text-slate-200 overflow-x-hidden font-sans relative selection:bg-sacred-gold selection:text-sacred-sapphire">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1548625361-9ebc25732918?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#050a14]/80 to-[#050a14] pointer-events-none"></div>

      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 pt-12 lg:pt-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-sacred-gold/10 to-transparent blur-[80px] rounded-full pointer-events-none animate-pulse-slow"></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto space-y-10">

          {/* Logo animado */}
          <div className="mb-6 relative group cursor-pointer" onClick={handleEnter}>
            <div className="absolute inset-0 bg-sacred-gold/20 blur-2xl rounded-full group-hover:bg-sacred-gold/30 transition-all duration-1000"></div>
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] text-sacred-gold">
              <path d="M50 5L53 20L63 10L58 23L75 20L63 30L80 38L65 42L80 55L65 60L75 75L58 68L60 85L50 70L40 85L42 68L25 75L35 60L20 55L35 42L20 38L37 30L25 20L42 23L37 10L47 20L50 5Z" fill="currentColor" opacity="0.4" className="animate-spin-slow origin-center"/>
              <path d="M50 15V85M30 35H70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M50 45C65 45 75 55 75 70C75 85 50 85 50 85C50 85 25 85 25 70C25 55 35 45 50 45Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M35 55L50 70L65 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="50" cy="50" r="4" fill="currentColor" className="animate-pulse"/>
            </svg>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-sacred-gold via-[#fcd34d] to-[#b45309] drop-shadow-sm tracking-tight">
              Fiat
            </h1>
            <p className="text-2xl md:text-3xl font-serif italic text-slate-300 font-light">
              "Luz do Alto para sua alma."
            </p>
          </div>

          <p className="text-gray-400 max-w-lg mx-auto text-lg leading-relaxed font-sans font-light">
            Organize sua vida de oração, reze o Santo Terço e aprofunde sua fé com a beleza que a Igreja merece.
          </p>

          {/* Botão principal */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full max-w-md justify-center">
            <Button 
              variant="sacred" 
              size="lg" 
              onClick={handleEnter} 
              className="h-14 text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform border border-yellow-200/20"
            >
              Entrar no Santuário
            </Button>
          </div>

          {/* ===== NOVO: Links do Instagram + TikTok (LINDO!) ===== */}
          <div className="flex flex-col items-center mt-12 space-y-5 animate-fade-in">
            <p className="text-gray-400 text-sm font-light tracking-wide">
              Dúvidas? Veja como funciona o app nas nossas redes:
            </p>

            <div className="flex gap-5">

              {/* Instagram */}
              <a
                href="https://instagram.com/fiatcatolico"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-7 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border border-white/20"
              >
                <Instagram size={28} className="drop-shadow-md" />
                <span className="tracking-wide">@fiatcatolico</span>
                <Sparkles size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@fiatcatolico"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-black text-white px-7 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border border-white/30 ring-2 ring-white/10"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.58 6.79c-.88-1.1-1.32-2.43-1.32-3.78 0-.52-.42-.94-.94-.94h-3.29c-.52 0-.94.42-.94.94v9.42c0 2.2-1.79 3.99-3.99 3.99s-3.99-1.79-3.99-3.99 1.79-3.99 3.99-3.99c.52 0 .94-.42.94-.94v-3.29c0-.52-.42-.94-.94-.94-4.43 0-8.02 3.59-8.02 8.02s3.59 8.02 8.02 8.02c4.43 0 8.02-3.59 8.02-8.02v-4.14c1.36-.88 2.88-1.98 3.76-3.08.33-.41.14-.99-.38-.99h-2.92z"/>
                </svg>
                <span className="tracking-wide">@fiatcatolico</span>
                <Sparkles size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            <p className="text-xs text-sacred-gold/60 font-light italic mt-4">
              Milhares de católicos já rezam conosco todos os dias ✝️
            </p>
          </div>
          {/* ===== FIM dos links ===== */}

          {/* Mockup do celular (mantido) */}
          <div className="relative mt-16 w-[280px] md:w-[320px] h-[580px] mx-auto perspective-1000">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[110%] bg-sacred-gold/10 blur-[80px] rounded-full"></div>
            <div className="relative w-full h-full bg-[#1a1a1a] rounded-[3rem] border-[8px] border-[#2a2a2a] shadow-2xl overflow-hidden ring-1 ring-white/10 transform rotate-y-12 hover:rotate-0 transition-transform duration-700 ease-out">
              {/* ... resto do mockup do celular (igual ao original) ... */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-xl z-30"></div>
              <div className="w-full h-full bg-[#0f172a] flex flex-col overflow-hidden relative">
                <div className="h-8 w-full flex justify-between px-6 items-center text-[10px] text-white pt-2">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
                  </div>
                </div>
                <div className="p-6 pt-8 pb-2">
                  <h2 className="text-white font-serif text-xl">Olá, Alma Devota</h2>
                  <p className="text-sacred-gold text-xs uppercase tracking-widest">Terça-feira da 2ª Semana</p>
                </div>
                <div className="mx-4 mt-2 p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <IconRosary size={60} className="text-sacred-gold" />
                  </div>
                  <span className="text-[10px] bg-sacred-gold/20 text-sacred-gold px-2 py-0.5 rounded uppercase font-bold">Liturgia</span>
                  <h3 className="text-2xl text-white font-serif mt-2 mb-1">Mistérios Dolorosos</h3>
                  <p className="text-xs text-gray-400 mb-4">Acompanhe a Paixão de Cristo.</p>
                  <div className="flex items-center gap-2 text-xs text-sacred-gold font-bold uppercase">
                    Rezar Agora <ChevronRight size={12} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 p-4">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col gap-2">
                    <IconMonstrance className="text-yellow-400" size={20} />
                    <span className="text-xs text-white">Liturgia Diária</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col gap-2">
                    <IconBible className="text-purple-400" size={20} />
                    <span className="text-xs text-white">Orações</span>
                  </div>
                </div>
                <div className="mt-auto h-16 bg-black/40 backdrop-blur-md border-t border-white/5 flex justify-around items-center px-2 pb-2">
                  <div className="flex flex-col items-center text-sacred-gold"><IconMonstrance size={20}/><span className="text-[8px] mt-1">Início</span></div>
                  <div className="flex flex-col items-center text-gray-600"><IconBible size={20}/><span className="text-[8px] mt-1">Orações</span></div>
                  <div className="flex flex-col items-center text-gray-600"><IconRosary size={24}/><span className="text-[8px] mt-1">Terço</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== O RESTO DO CÓDIGO CONTINUA EXATAMENTE IGUAL AO SEU ORIGINAL ===== */}
      {/* (seções de funcionalidades, depoimentos, preços, FAQ, footer...) */}
      {/* Não precisei mexer em nada abaixo, está perfeito! */}

      <div className="w-full h-24 bg-gradient-to-b from-[#050a14] to-[#0b1221] relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sacred-gold/40 to-transparent"></div>
      </div>

      {/* ... todo o resto do seu código original continua aqui ... */}
      {/* (vou colar só o final pra não ficar gigante, mas você mantém tudo igual) */}

      <footer className="py-12 text-center text-gray-600 text-xs bg-[#050a14] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center space-y-4">
          <div className="w-12 h-12 flex items-center justify-center text-sacred-gold/30 border border-sacred-gold/10 rounded-full hover:bg-sacred-gold/5 transition-colors cursor-pointer" onClick={handleEnter}>
            <IconMonstrance size={24} />
          </div>
          <p>© 2024 Fiat App. Ad Maiorem Dei Gloriam.</p>
          <div className="flex gap-4">
            <button className="hover:text-gray-400">Termos de Uso</button>
            <button className="hover:text-gray-400">Política de Privacidade</button>
            <button className="hover:text-gray-400">Suporte</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* Componentes auxiliares (mantidos iguais) */
const FeatureBullet: React.FC<{ text: string; active?: boolean }> = ({ text, active }) => (
  <li className="flex items-start gap-3">
    <Check size={16} className={active ? "text-sacred-gold shrink-0 mt-0.5" : "text-gray-500 shrink-0 mt-0.5"} />
    <span>{text}</span>
  </li>
);

const TestimonialCard: React.FC<{ name: string; role: string; image: string; text: string }> = ({ name, role, image, text }) => (
  <div className="bg-[#161b26] p-6 rounded-2xl border border-white/5 relative group hover:-translate-y-1 transition-transform duration-300">
    <div className="flex items-center gap-4 mb-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-sacred-gold/20" />
      <div>
        <h4 className="text-white font-serif font-medium">{name}</h4>
        <p className="text-xs text-sacred-gold uppercase tracking-wider">{role}</p>
      </div>
    </div>
    <div className="flex gap-1 mb-3 text-yellow-500">
      {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
    </div>
    <p className="text-gray-400 text-sm leading-relaxed font-light italic">"{text}"</p>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`bg-[#0f1219] border rounded-xl overflow-hidden transition-all cursor-pointer duration-300 ${isOpen ? 'border-sacred-gold/40 bg-[#13161f]' : 'border-white/5 hover:border-sacred-gold/20'}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="p-5 flex justify-between items-center">
        <h3 className={`font-serif font-medium text-lg transition-colors ${isOpen ? 'text-sacred-gold' : 'text-white'}`}>{question}</h3>
        <ChevronRight className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-90 text-sacred-gold' : ''}`} size={20} />
      </div>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="p-5 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 font-light">{answer}</p>
      </div>
    </div>
  );
};

export default LandingPage;
