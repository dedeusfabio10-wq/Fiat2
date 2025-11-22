import React from 'react';
import { Home, BookOpen, CalendarDays, User, Cross } from 'lucide-react';
import { AppRoute } from '../types';

interface BottomNavProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, onNavigate }) => {
  const navItems = [
    { id: AppRoute.HOME, label: 'Início', icon: Home },
    { id: AppRoute.PRAYERS, label: 'Orações', icon: BookOpen },
    { id: AppRoute.ROSARY, label: 'Terço', icon: Cross }, // Custom Icon usually, leveraging Cross for now
    { id: AppRoute.CATECHISM, label: 'Catequese', icon: BookOpen }, // Duplicate icon, reusing Book
    { id: AppRoute.PROFILE, label: 'Perfil', icon: User },
  ];

  // Hide nav on Welcome/Auth screens
  if (currentRoute === AppRoute.WELCOME || currentRoute === AppRoute.AUTH) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-fiat-dark/95 backdrop-blur-lg border-t border-white/5 px-4 py-2 pb-safe z-50">
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
