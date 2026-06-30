import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SwipingPage from './pages/SwipingPage';
import MatchesPage from './pages/MatchesPage';
import AIMatchingPage from './pages/AIMatchingPage';
import TeamPage from './pages/TeamPage';
import StartupBuilderPage from './pages/StartupBuilderPage';
import LeaderboardPage from './pages/LeaderboardPage';
import SkillsPage from './pages/SkillsPage';
import MentorshipPage from './pages/MentorshipPage';
import FundingPage from './pages/FundingPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get('/auth/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [isAuth, fetchUser]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuth(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}>🚀 Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isAuth ? <Navigate to="/" /> : <LoginPage setIsAuth={setIsAuth} />} />
        <Route path="/register" element={isAuth ? <Navigate to="/" /> : <RegisterPage setIsAuth={setIsAuth} />} />
        {isAuth && user ? (
          <>
            <Route path="/" element={<DashboardPage user={user} logout={logout} />} />
            <Route path="/swipe" element={<SwipingPage user={user} logout={logout} />} />
            <Route path="/ai-matching" element={<AIMatchingPage user={user} logout={logout} />} />
            <Route path="/matches" element={<MatchesPage user={user} logout={logout} />} />
            <Route path="/team/:teamId" element={<TeamPage user={user} logout={logout} />} />
            <Route path="/startup-builder" element={<StartupBuilderPage user={user} logout={logout} />} />
            <Route path="/leaderboard" element={<LeaderboardPage user={user} logout={logout} />} />
            <Route path="/skills" element={<SkillsPage user={user} logout={logout} />} />
            <Route path="/mentorship" element={<MentorshipPage user={user} logout={logout} />} />
            <Route path="/funding" element={<FundingPage user={user} logout={logout} />} />
            <Route path="/analytics" element={<AnalyticsPage user={user} logout={logout} />} />
            <Route path="/profile" element={<ProfilePage user={user} logout={logout} setUser={setUser} />} />
            {user?.isAdmin && <Route path="/admin" element={<AdminPage user={user} logout={logout} />} />}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  loadingContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  spinner: { fontSize: '24px', color: 'white', fontWeight: 'bold', animation: 'pulse 1s infinite' }
};

export default App;
