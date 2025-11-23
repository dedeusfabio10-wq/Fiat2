import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, Navigate } from 'react-router-dom';
import { AppContext } from '../App';
import { IconMonstrance, IconBible, IconRosary, IconCross, IconPlanner, IconBookCross, IconSacredHeart } from './Icons';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { themeColors, profile } = useContext(AppContext);
  const location = useLocation();
  const isRosary = location.pathname === '/rosary';
  const isViaSacra = location.pathname === '/viasacra';
  
  // LÓGICA SAZONAL AUTOMÁTICA
  const [season, setSeason] = useState<'christmas' | 'newyear' | 'ordinary'>('ordinary');
  
  useEffect(() => {
    const now = new Date();
    const m = now.getMonth(); // 0 = Janeiro, 10 = Novembro, 11 = Dezembro
    const d = now.getDate();
    
    // Natal: De 20 de Novembro (10) até 25 de Dezembro (11)
    if ((m === 10 && d >= 20) || (m === 11 && d <= 25)) {
      setSeason('christmas');
    } 
    // Ano Novo: De 26 de Dezembro (11) até 06 de Janeiro (0)
    else if ((m === 11 && d > 25) || (m === 0 && d <= 6)) {
      setSeason('newyear');
    }
    else {
      setSeason('ordinary');
    }
  }, []);

  // Redirect to Landing (Welcome) if not onboarded
  if (!profile?.onboarding_completed && location.pathname !== '/' && location.pathname !== '/auth' && location.pathname !== '/welcome') {
    return <Navigate to="/" replace />;
  }

  // Define background based on customTheme AND Season
  const getThemeBackground = () => {
    // Priority 1: User Explicit Selection (if not default green)
    if (profile.customTheme && profile.customTheme !== 'green') {
        switch (profile.customTheme) {
          case 'purple': return 'bg-gradient-to-b from-[#0f172a] to-[#3b0764]'; 
          case 'rose': return 'bg-gradient-to-b from-[#0f172a] to-[#881337]';
          case 'white': return 'bg-gradient-to-b from-[#0f172a] to-[#475569]'; 
        }
    }

    // Priority 2: Seasonal Defaults (Automatic)
    if (season === 'christmas') {
        // Gradiente Natalino Elegante (Vermelho Vinho escuro -> Verde Profundo)
        return 'bg-gradient-to-b from-[#2a0a0a] via-[#0f172a] to-[#0a2e1f]'; 
    }
    if (season === 'newyear') {
        // Gradiente Ano Novo (Azul Meia-Noite -> Dourado sutil)
        return 'bg-gradient-to-b from-[#020617] via-[#1e1b4b] to-[#172554]'; 
    }

    // Priority 3: Default Green
    return 'bg-gradient-to-b from-[#0f172a] to-[#0a2e1f]';
  };

  return (
    <div className={`min-h-screen flex flex-col ${getThemeBackground()} text-gray-200 relative overflow-hidden transition-colors duration-1000`}>
      
      {/* Seasonal Effects */}
      {season === 'christmas' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
           {/* Snowflakes - Neve Caindo */}
           {Array.from({length: 30}).map((_, i) => (
             <div 
                key={`snow-${i}`}
                className={`absolute bg-white rounded-full opacity-0 ${i % 3 === 0 ? 'animate-snow-slow' : i % 2 === 0 ? 'animate-snow-medium' : 'animate-snow-fast'}`}
                style={{
                    width: Math.random() * 3 + 1 + 'px',
                    height: Math.random() * 3 + 1 + 'px',
                    left: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 5 + 's',
                    opacity: 0.6
                }}
             />
           ))}
        </div>
      )}

      {season === 'newyear' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
           {/* Rising Sparkles - Fogos/Brilhos Subindo */}
           {Array.from({length: 20}).map((_, i) => (
             <div 
                key={`sparkle-${i}`}
                className="absolute bg-fiat-gold rounded-full opacity-0 animate-rise-slow"
                style={{
                    width: Math.random() * 2 + 1 + 'px',
                    height: Math.random() * 2 + 1 + 'px',
                    left: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 8 + 's',
                    boxShadow: '0 0 10px #d4af37'
                }}
             />
           ))}
        </div>
      )}

      {/* Premium Glow Effect */}
      {profile?.is_premium && (
        <div className="absolute inset-0 pointer-events-none z-0">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sacred-gold to-transparent opacity-50"></div>
           <div className="absolute bottom-20 left-0 w-full h-32 bg-sacred-gold/5 blur-3xl"></div>
        </div>
      )}

      {/* Ambient Particles (Standard) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-2 h-2 bg-white/20 rounded-full animate-float" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/3 right-10 w-3 h-3 bg-white/10 rounded-full animate-float" style={{ animationDuration: '12s' }}></div>
      </div>

      {/* Content */}
      <main className={`flex-1 relative z-10 ${isRosary || isViaSacra ? 'h-screen overflow-hidden' : 'overflow-y-auto'}`}>
        {children}
      </main>

      {/* Bottom Navigation */}
      {!isRosary && !isViaSacra && location.pathname !== '/' && location.pathname !== '/auth' && location.pathname !== '/admin' && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-t border-white/5 h-20 pb-safe">
          {/* Premium Gold Border on Nav */}
          {profile?.is_premium && <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sacred-gold/40 to-transparent"></div>}
          
          <div className="flex justify-around items-center h-full max-w-md mx-auto px-1 overflow-x-auto no-scrollbar">
            <NavItem to="/home" icon={<IconMonstrance size={20} />} label="Início" activeColor={themeColors.primary} />
            <NavItem to="/prayers" icon={<IconBible size={20} />} label="Orações" activeColor={themeColors.primary} />
            <NavItem to="/planner" icon={<IconPlanner size={20} />} label="Planner" activeColor={themeColors.primary} activeClass="scale-110" />
            <NavItem to="/rosary" icon={<IconRosary size={24} />} label="Terço" activeClass="scale-125 -translate-y-2" activeColor={themeColors.primary} />
            <NavItem to="/catechism" icon={<IconBookCross size={20} />} label="Catequese" activeColor={themeColors.primary} />
            <NavItem to="/calendar" icon={<IconCross size={20} />} label="Liturgia" activeColor={themeColors.primary} />
            <NavItem to="/profile" icon={<IconSacredHeart size={20} />} label="Perfil" activeColor={themeColors.primary} />
          </div>
        </nav>
      )}
    </div>
  );
};

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string; activeClass?: string; activeColor: string }> = ({ to, icon, label, activeClass = '', activeColor }) => {
  return (
    <NavLink to={to} className={({ isActive }) => `
      flex flex-col items-center justify-center transition-all duration-500 relative min-w-[50px] p-2
      ${isActive 
        ? `${activeClass} text-white drop-shadow-[0_0_8px_${activeColor}]` 
        : 'text-white/40 hover:text-white/70'}
    `}>
      {({ isActive }) => (
        <>
          <div style={{ color: isActive ? activeColor : 'currentColor' }}>
            {icon}
          </div>
          <span className="text-[8px] mt-1 font-medium uppercase tracking-wider opacity-80">{label}</span>
          {isActive && (
            <div 
              className="absolute bottom-1 w-1 h-1 rounded-full" 
              style={{ backgroundColor: activeColor, boxShadow: `0 0 10px ${activeColor}` }}
            />
          )}
        </>
      )}
    </NavLink>
  );
};

export default Layout;