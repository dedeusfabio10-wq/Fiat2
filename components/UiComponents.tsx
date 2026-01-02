
import React, { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// --- Button ---
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'sacred';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sacred-sapphire disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-sacred-gold text-sacred-sapphire hover:bg-yellow-400",
    secondary: "bg-sacred-wine text-white hover:bg-red-900",
    ghost: "hover:bg-white/10 text-white",
    outline: "border border-sacred-gold text-sacred-gold hover:bg-sacred-gold/10",
    sacred: "bg-gradient-to-r from-sacred-gold to-yellow-200 text-sacred-sapphire font-serif uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] border border-yellow-100/20"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-6 text-base",
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

// --- Card ---
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  onClick?: (e?: any) => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', glass = false, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
      relative overflow-hidden rounded-xl border border-white/10 p-4 shadow-lg
      ${glass ? 'bg-white/5 backdrop-blur-md' : 'bg-fiat-card'}
      ${onClick ? 'cursor-pointer' : ''}
      ${className}
    `}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sacred-gold/30 to-transparent" />
      {children}
    </div>
  );
};

// --- Input ---
export interface FiatInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className = '', ...props }: FiatInputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1 ml-1 font-bold">
          {label}
        </label>
      )}
      <input 
        className={`flex h-10 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-sacred-gold focus:border-sacred-gold ${className}`}
        {...props}
      />
    </div>
  );
};
