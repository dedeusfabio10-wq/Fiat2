import React, { useState, useEffect, createContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './ui/Layout';
import { UserProfile } from './types';

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
  themeColors: { primary: string };
}

export const AppContext = createContext<AppContextType>({
  profile: {} as UserProfile,
  updateProfile: () => {},
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

  useEffect(() => {
    localStorage.setItem('fiat-profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (p: UserProfile) => setProfile(p);

  return (
    <AppContext.Provider value={{ profile, updateProfile, themeColors: { primary: '#d4af37' } }}>
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