import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'sacred';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "rounded-lg font-serif font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 active:scale-95";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary: "bg-gradient-to-r from-fiat-gold to-[#b8902b] text-fiat-navy shadow-lg shadow-fiat-gold/20 hover:shadow-fiat-gold/40",
    outline: "border border-fiat-gold text-fiat-gold hover:bg-fiat-gold/10",
    ghost: "text-fiat-gold/80 hover:text-fiat-gold hover:bg-white/5",
    sacred: "bg-gradient-to-r from-fiat-gold to-yellow-400 text-black uppercase tracking-widest shadow-lg shadow-fiat-gold/50 hover:shadow-fiat-gold/70",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, title, subtitle, icon }) => {
  return (
    <div
      onClick={onClick}
      className={`relative bg-fiat-card border border-white/5 rounded-2xl p-5 shadow-xl backdrop-blur-sm overflow-hidden ${onClick ? 'cursor-pointer hover:border-fiat-gold/30 transition-colors' : ''} ${className}`}
    >
      {/* Gradiente dourado sutil no topo (melhoria visual) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-fiat-gold/40 to-transparent" />
      </div>

      {(title || icon) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && <div className="text-fiat-gold">{icon}</div>}
            <div>
              {title && <h3 className="font-serif text-lg text-fiat-gold">{title}</h3>}
              {subtitle && <p className="text-xs text-fiat-muted uppercase tracking-widest">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[10px] uppercase tracking-wider text-fiat-muted mb-1 ml-1 font-bold">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-fiat-text focus:border-fiat-gold focus:ring-1 focus:ring-fiat-gold outline-none transition-all placeholder-white/20 ${className}`}
        {...props}
      />
    </div>
  );
};

export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  action?: () => void;
  actionLabel?: string;
}> = ({ title, subtitle, action, actionLabel }) => (
  <div className="flex items-center justify-between mb-6 mt-8">
    <div>
      <h2 className="font-serif text-xl text-white">{title}</h2>
      {subtitle && <p className="text-sm text-fiat-muted mt-1">{subtitle}</p>}
    </div>
    {action && (
      <button
        onClick={action}
        className="text-xs text-fiat-gold uppercase tracking-wider flex items-center gap-1 hover:text-fiat-goldLight"
      >
        {actionLabel || 'Ver todos'} <ChevronRight size={14} />
      </button>
    )}
  </div>
);
