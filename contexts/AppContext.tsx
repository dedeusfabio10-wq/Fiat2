import { createContext } from 'react';
import { UserProfile } from '../types';

interface AppContextType {
  profile: UserProfile;
  isLoadingProfile: boolean;
  updateProfile: (p: UserProfile) => void;
  refreshProfile: () => Promise<void>;
  themeColors: { primary: string };
}

export const AppContext = createContext<AppContextType>({
  profile: {} as UserProfile,
  isLoadingProfile: true,
  updateProfile: () => {},
  refreshProfile: async () => {},
  themeColors: { primary: '#d4af37' }
});