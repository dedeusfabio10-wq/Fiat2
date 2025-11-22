import React from 'react';
import { Button } from '../components/UiComponents';
import { Cross } from 'lucide-react';
import { AppRoute } from '../types';

interface WelcomeProps {
  onNavigate: (route: AppRoute) => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-starry">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fiat-gold/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-md w-full">
        
        {/* Logo Animation */}
        <div className="relative mb-6 animate-pulse">
          <Cross size={64} className="text-fiat-gold" strokeWidth={1} />
          <div className="absolute inset-0 bg-fiat-gold/20 blur-xl rounded-full"></div>
        </div>

        <div>
          <h1 className="font-serif text-5xl text-fiat-gold mb-4 tracking-tighter">FIAT</h1>
          <p className="font-serif italic text-xl text-white/90 tracking-wider">"Luz do Alto para sua Alma."</p>
        </div>

        <p className="text-fiat-muted leading-relaxed max-w-xs mx-auto">
          Organize sua vida de oração, reze o Santo Terço e aprofunde sua fé com a beleza que a Igreja merece.
        </p>

        <div className="w-full space-y-4 pt-8">
          <Button fullWidth onClick={() => onNavigate(AppRoute.AUTH)}>
            Entrar no Santuário
          </Button>
          <button className="text-sm text-fiat-muted hover:text-fiat-gold transition-colors">
            Conhecer a Missão Fiat
          </button>
        </div>
      </div>
      
      {/* Footer Text */}
      <div className="absolute bottom-8 text-xs text-white/20 font-serif">
        AD MAIOREM DEI GLORIAM
      </div>
    </div>
  );
};
