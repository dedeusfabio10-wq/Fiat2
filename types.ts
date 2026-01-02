// src/types/index.ts  (ou onde você guarda os tipos)

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
  fixedDay?: number;
  fixedMonth?: number;
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

export interface CatechismSection {
  id: string;
  title: string;
  items: {
    id: string;
    title: string;
    content: string;
  }[];
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

// CORREÇÃO PRINCIPAL AQUI → ADICIONADO O CAMPO id
export interface UserProfile {
  id: string;                    // ESSA LINHA RESOLVE TODOS OS ERROS TS2339
  name: string;
  email?: string;
  photo?: string | null;
  is_premium: boolean;
  premium_expires_at?: string;
  streak: number;
  rosaries_prayed: number;
  favorites: string[];
  active_novenas: {
    novenaId: string;
    currentDay: number;
    lastDate: string | null;
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
  PROFILE = 'PROFILE',
  COMMUNITIES = 'COMMUNITIES',
  COMMUNITY_DETAIL = 'COMMUNITY_DETAIL',
}

// TIPOS DAS COMUNIDADES
export interface Community {
  id: string;
  name: string;
  description: string;
  is_public: boolean;
  creator_id: string;
  created_at: string;
  members_count?: number;
}

export interface CommunityMember {
  user_id: string;
  community_id: string;
  role: 'admin' | 'member';
  profiles?: { name: string; photo?: string | null };
}

export interface CommunityMessage {
  id: string;                    // Mudei de number para string (Supabase usa uuid)
  community_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  profiles?: { name: string; photo?: string | null };
}
export interface CommunityPlan {
  id: string;
  community_id: string;
  title: string;
  description: string;
  items: PlanItem[];
  created_at: string;
}

