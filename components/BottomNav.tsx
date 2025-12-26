import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Cross, User } from 'lucide-react';
import { AppRoute } from '../types';

interface BottomNavProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, onNavigate }) => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { id: AppRoute.HOME, label: 'Início', icon: Home },
    { id: AppRoute.PRAYERS, label: 'Orações', icon: BookOpen },
    { id: AppRoute.ROSARY, label: 'Terço', icon: Cross },
    { id: AppRoute.CATECHISM, label: 'Catequese', icon: BookOpen },
    { id: AppRoute.PROFILE, label: 'Perfil', icon: User },
  ];

  // Esconde em Welcome/Auth
  if (currentRoute === AppRoute.WELCOME || currentRoute === AppRoute.AUTH) return null;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Rolando pra baixo → esconde
        setHidden(true);
      } else if (currentScrollY < lastScrollY) {
        // Rolando pra cima → mostra
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed left-0 right-0 bg-fiat-dark/95 backdrop-blur-lg border-t border-white/5 px-4 py-2 z-50 transition-transform duration-300 ${
        hidden ? 'translate-y-full' : 'translate-y-0 bottom-0 pb-safe'
      }`}
    >
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentRoute === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 p-2 min-w-[60px] transition-colors duration-300 ${
                isActive ? 'text-fiat-gold' : 'text-fiat-muted hover:text-white'
              }`}
            >
              <Icon
                size={isActive ? 24 : 22}
                strokeWidth={isActive ? 2.5 : 2}
                className={isActive ? 'drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' : ''}
              />
              <span className={`text-[10px] uppercase tracking-wide ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
