import React from 'react';

interface SaintIconProps {
  id: string;
  className?: string;
}

export const SaintIcon: React.FC<SaintIconProps> = ({ id, className = "w-8 h-8" }) => {
  const getPath = () => {
    // Simplified path selection based on ID keywords
    if (id.includes('jose')) return <path d="M6 20h12 M6 20V4h6 M16 8s-2 2-2 5 2 5 2 5 M16 8s2 2 2 5-2 5-2 5 M16 20V8" />;
    if (id.includes('miguel')) return <path d="M12 3v18 M8 16l4 4 4-4 M6 8h12 M6 8l-2 4 M18 8l2 4" />;
    if (id.includes('teresinha') || id.includes('terezinha')) return <path d="M12 2v20 M8 7h8 M12 12c-2 0-3 2-3 4s1 3 3 3 3-1 3-3-1-4-3-4z M12 12v4 M9 14l3 2 3-2" />;
    
    // Fallback: Simple Cross
    return <path d="M12 2v20 M8 8h8" />;
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
