import React from 'react';

interface SaintIconProps {
  id: string;
  className?: string;
}

export const SaintIcon: React.FC<SaintIconProps> = ({ id, className = "w-8 h-8" }) => {
  const getPath = () => {
    switch (id) {
      case 'pedro': return <path d="M12 2a5 5 0 00-5 5v2H5v12h14V9h-2V7a5 5 0 00-5-5zm0 2a3 3 0 013 3v2H9V7a3 3 0 013-3z M7 11h10v8H7v-8z" />;
      case 'paulo': return <path d="M3 3l18 18 M12 22V10M5 10H3v4h2 M12 10V4h6v2h-4v4h4" />;
      case 'andre': return <path d="M4 4l16 16 M20 4L4 20" />;
      case 'tiago-maior': return <path d-="M2 14c0 3 3 5 5 5s5-2 5-5 M12 14c0 3 3 5 5 5s5-2 5-5" />;
      case 'joao': return <path d="M16 3.13a10 10 0 014 1.87M12 12a4 4 0 100-8 4 4 0 000 8z M12 21a10 10 0 01-10-10c0-3.13 2-6 5-7" />;
      case 'filipe': return <path d="M12 2v20 M7 8h10 M7 14h10" />;
      case 'bartolomeu': return <path d="M8 3v18h2V3z M14 3v18h2V3z" />;
      case 'tome': return <path d="M12 2v20 M4 12h16" />;
      case 'mateus': return <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />;
      case 'tiago-menor': return <path d="M12 2v18 M4 10h16" />;
      case 'judas-tadeu': return <path d="M12 2l4 4h-8z M12 22V6" />;
      case 'simao': return <path d="M4 14l6-6 6 6 M4 18l6-6 6 6" />;
      case 'matias': return <path d="M12 2v20 M4 18h16" />;
      case 'sao-miguel': return <path d="M12 3v18 M8 16l4 4 4-4 M6 8h12 M6 8l-2 4 M18 8l2 4" />;
      case 'sao-jose': return <path d="M6 20h12 M6 20V4h6 M16 8s-2 2-2 5 2 5 2 5 M16 8s2 2 2 5-2 5-2 5 M16 20V8" />;
      case 'santa-teresinha': return <path d="M12 12c-2 0-3 2-3 4s1 3 3 3 3-1 3-3-1-4-3-4z M12 12V2 M8 7h8" />;
      default: return <path d="M12 2v20 M8 8h8" />;
    }
  };

  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`text-[#d4af37] ${className}`}
    >
      {getPath()}
    </svg>
  );
};
