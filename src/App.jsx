import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import FeaturesPage from './pages/FeaturesPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import SecurityLogsPage from './pages/SecurityLogsPage';
import { AuthProvider } from './context/AuthContext';
import { useEffect } from 'react';
import PageTransition from './components/layout/PageTransition';

function App() {
  useEffect(() => {
    // If the experience hasn't been unlocked by the Welcome button in the current JS lifecycle,
    // force every page refresh back to the root WelcomePage.
    if (!window.__RADAR_UNLOCKED__ && window.location.pathname !== '/') {
      window.location.href = '/';
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <PageTransition>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/security-logs" element={<SecurityLogsPage />} />
            <Route path="*" element={<WelcomePage />} />
          </Routes>
        </PageTransition>
      </AuthProvider>
    </Router>
  );
}

export default App;
