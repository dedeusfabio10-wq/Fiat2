import React from 'react';
import { 
  Home, BookOpen, CalendarDays, User, Cross, ChevronRight, ChevronLeft, Play, Pause, RefreshCw, Volume2, Sun, Moon, Star, CheckCircle2, Circle, Crown, Settings, LogOut, AlertCircle, Menu, Search, Heart, Image as ImageIcon, Book
} from 'lucide-react';

export const Icons = {
  Home, Book: BookOpen, Calendar: CalendarDays, User, Cross, ChevronRight, ChevronLeft, Play, Pause, Refresh: RefreshCw, Volume: Volume2, Sun, Moon, Star, Check: CheckCircle2, Circle, Crown, Settings, LogOut, Alert: AlertCircle, Menu, Search, Heart, Image: ImageIcon
};

// Custom SVGs
interface IconProps {
  size?: number;
  className?: string;
  fill?: string;
}

export const IconMonstrance: React.FC<IconProps> = ({ size = 24, className = "", fill = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="8" r="3" />
    <path d="M12 11v10" />
    <path d="M8 21h8" />
    <path d="M12 5V2" />
    <path d="M12 11a6 6 0 0 1 6-6" />
    <path d="M12 11a6 6 0 0 0-6-6" />
    <path d="M5 8l-2-2" />
    <path d="M19 8l2-2" />
    <path d="M9 21l-2-3" />
    <path d="M15 21l2-3" />
  </svg>
);

export const IconBible: React.FC<IconProps> = ({ size = 24, className = "", fill = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M12 6v10" />
    <path d="M9 9h6" />
  </svg>
);

export const IconRosary: React.FC<IconProps> = ({ size = 24, className = "", fill = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="6" r="2" />
    <circle cx="17" cy="7" r="1.5" />
    <circle cx="20" cy="11" r="1.5" />
    <circle cx="20" cy="16" r="1.5" />
    <circle cx="17" cy="20" r="1.5" />
    <circle cx="12" cy="21" r="1.5" />
    <circle cx="7" cy="20" r="1.5" />
    <circle cx="4" cy="16" r="1.5" />
    <circle cx="4" cy="11" r="1.5" />
    <circle cx="7" cy="7" r="1.5" />
    <path d="M12 21v3" />
    <path d="M10 24h4" />
  </svg>
);

export const IconCross: React.FC<IconProps> = ({ size = 24, className = "", fill = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v20" />
    <path d="M7 8h10" />
    <path d="M12 2l-2 2" />
    <path d="M12 2l2 2" />
    <path d="M7 8l-1 1" />
    <path d="M17 8l1 1" />
  </svg>
);

export const IconSacredHeart: React.FC<IconProps> = ({ size = 24, className = "", fill = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    <path d="M12 5v6" />
    <path d="M9.5 8h5" />
  </svg>
);

export const IconPlanner: React.FC<IconProps> = ({ size = 24, className = "", fill = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M12 8v6" />
    <path d="M9 11h6" />
    <path d="M15 18h.01" />
  </svg>
);

export const IconBookCross: React.FC<IconProps> = ({ size = 24, className = "", fill = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    <path d="M10 8.5l2 2 2-2" />
    <path d="M12 14v-3.5" />
  </svg>
);
