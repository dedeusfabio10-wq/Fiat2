
import React, { useState, useEffect, createContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './ui/Layout';
import { UserProfile } from './types';
import { initAudio } from './services/audio';
import { supabase, getCurrentUser } from './services/supabase';

// Pages
import LandingPage from './pages/Landing';
import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import PrayersPage from './pages/Prayers';
import RosaryPage from './pages/Rosary';
import PlannerPage from './pages/Planner';
import ProfilePage from './pages/Profile';
import CatechismPage from './pages/Catechism';
import CalendarPage from './pages/Calendar';
import ViaSacraPage from './pages/ViaSacra';
import PlanCreatorPage from './pages/PlanCreator';
import NovenaDetailPage from './pages/NovenaDetail';
import AdminPage from './pages/Admin';

interface AppContextType {
  profile: UserProfile;
  updateProfile: (p: UserProfile) => void;
  refreshProfile: () => Promise<void>;
  themeColors: { primary: string };
}

export const AppContext = createContext<AppContextType>({
  profile: {} as UserProfile,
  updateProfile: () => {},
  refreshProfile: async () => {},
  themeColors: { primary: '#d4af37' }
});

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fiat-profile');
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      is_premium: false,
      streak: 0,
      rosaries_prayed: 0,
      favorites: [],
      active_novenas: [],
      onboarding_completed: false
    };
  });

  // Tenta sincronizar com o Supabase na inicialização e quando solicitada
  const fetchUserProfile = async () => {
      try {
          const user = await getCurrentUser();
          if (user) {
            // Se tivermos tabela de perfis, buscaríamos aqui:
            const { data } = await supabase
               .from('profiles')
               .select('*')
               .eq('id', user.id)
               .single();
            
            if (data) {
                // Mescla dados locais com remotos, priorizando remoto para status premium
                setProfile(prev => ({ 
                    ...prev, 
                    ...data,
                    email: user.email || prev.email 
                }));
                console.log('Perfil sincronizado com sucesso');
            } else if (!profile.email) {
                setProfile(prev => ({ ...prev, email: user.email }));
            }
          }
      } catch (error) {
          console.error('Erro ao sincronizar perfil:', error);
      }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    localStorage.setItem('fiat-profile', JSON.stringify(profile));
  }, [profile]);

  // Desbloqueio Global de Áudio
  useEffect(() => {
    const unlockAudio = () => {
        initAudio();
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  const updateProfile = (p: UserProfile) => setProfile(p);

  // Função exposta para forçar recarregamento (ex: após pagamento)
  const refreshProfile = async () => {
      await fetchUserProfile();
  };

  return (
    <AppContext.Provider value={{ profile, updateProfile, refreshProfile, themeColors: { primary: '#d4af37' } }}>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={!profile.onboarding_completed ? <LandingPage /> : <Navigate to="/home" replace />} />
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/prayers" element={<PrayersPage />} />
            <Route path="/rosary" element={<RosaryPage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/planner/create" element={<PlanCreatorPage />} />
            <Route path="/catechism" element={<CatechismPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/viasacra" element={<ViaSacraPage />} />
            <Route path="/novena/:id" element={<NovenaDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <Toaster position="top-center" theme="dark" style={{ fontFamily: 'serif' }} />
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;