export interface Prayer {
  id: string;
  title: string;
  category: 'Basic' | 'Marian' | 'Novena' | 'Saint' | 'Other';
  content: string;
  latin?: string;
}

export interface Novena {
  id: string;
  title: string;
  month: number;
  startDateDisplay: string;
  description: string;
  duration: number;
  days: { title: string; reflection: string; prayer: string }[];
  standardPrayer?: string;
}

export interface Saint {
  id: string;
  name: string;
  title: string;
  date: string;
  bio: string;
  prayer: string;
}

export interface Mystery {
  id: string;
  name: string;
  days: number[];
  mysteries: { title: string; scripture: string; meditation: string }[];
}

export interface DevotionalRosary {
  id: string;
  title: string;
  description: string;
  content: string;
}

export interface PlanItem {
  id: string;
  referenceId?: string;
  title: string;
  type: 'prayer' | 'rosary' | 'novena' | 'custom';
  count: number;
}

export interface SpiritualPlan {
  id: string;
  title: string;
  spiritualDirector?: string;
  durationDays: number;
  startDate: string;
  createdAt: string;
  streak: number;
  progress: Record<string, boolean>;
  notes: Record<string, string>;
  schedule: {
    morning: PlanItem[];
    afternoon: PlanItem[];
    night: PlanItem[];
  };
}

export interface LiturgyReading {
  title: string;
  reference: string;
  text: string;
}

export interface DailyLiturgy {
  date: string;
  color: string;
  saint?: string;
  title: string;
  readings: {
    firstReading: LiturgyReading;
    psalm: LiturgyReading;
    gospel: LiturgyReading;
  };
}

export interface UserProfile {
  name: string;
  email?: string;
  photo?: string;
  is_premium: boolean;
  premium_expires_at?: string; // Novo campo para controle de vencimento
  streak: number;
  rosaries_prayed: number;
  favorites: string[];
  active_novenas: {
    novenaId: string;
    currentDay: number;
    lastDate: string;
    startDate: string;
  }[];
  devotionalSaintId?: string;
  customTheme?: 'purple' | 'green' | 'white' | 'rose';
  subscriptionType?: 'monthly' | 'yearly';
  subscriptionMethod?: 'card' | 'pix' | 'pix_manual_check';
  subscriptionId?: string;
  favoriteQuote?: string;
  nightModeSpiritual?: boolean;
  onboarding_completed: boolean;
}

export enum AppRoute {
  WELCOME = 'WELCOME',
  AUTH = 'AUTH',
  HOME = 'HOME',
  PRAYERS = 'PRAYERS',
  ROSARY = 'ROSARY',
  CATECHISM = 'CATECHISM',
  PROFILE = 'PROFILE'
}