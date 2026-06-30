import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function DashboardPage({ user, logout }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ matches: 0, teams: 0, tasks: 0, doerScore: user?.doerScore || 0 });

  const loadStats = useCallback(async () => {
    try {
      const matchesRes = await axios.get('/matching/my-matches', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const teamsRes = await axios.get(`/teams/user/${user._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStats({ matches: matchesRes.data.length, teams: teamsRes.data.length, tasks: 0, doerScore: user.doerScore });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }, [user]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div style={styles.container}>
        <h1>Welcome back, {user?.name}! 👋</h1>
        <p style={styles.subtitle}>Here's your CoBuilder dashboard</p>
        <div style={styles.grid}>
          <div style={styles.card} onClick={() => navigate('/swipe')}>
            <h3>❤️ Swipe</h3>
            <p style={styles.number}>Fresh</p>
            <p>Find your cofounder</p>
            <button style={styles.cardBtn}>Start Swiping →</button>
          </div>
          <div style={styles.card}>
            <h3>👥 Matches</h3>
            <p style={styles.number}>{stats.matches}</p>
            <p>Active connections</p>
            <button style={styles.cardBtn} onClick={() => navigate('/matches')}>View Matches →</button>
          </div>
          <div style={styles.card}>
            <h3>🎯 Teams</h3>
            <p style={styles.number}>{stats.teams}</p>
            <p>Your teams</p>
          </div>
          <div style={styles.card}>
            <h3>📊 Doer Score</h3>
            <p style={styles.number}>{stats.doerScore}</p>
            <p>Reliability rating</p>
            <button style={styles.cardBtn} onClick={() => navigate('/leaderboard')}>See Ranking →</button>
          </div>
          <div style={styles.card} onClick={() => navigate('/startup-builder')}>
            <h3>🚀 Startup Builder</h3>
            <p>Launch your landing page</p>
            <button style={styles.cardBtn}>Build Now →</button>
          </div>
          <div style={styles.card} onClick={() => navigate('/mentorship')}>
            <h3>👨‍🏫 Mentorship</h3>
            <p>Get expert guidance</p>
            <button style={styles.cardBtn}>Find Mentor →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
  subtitle: { color: '#666', fontSize: '16px', marginBottom: '40px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '30px' },
  card: { background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s', border: '1px solid #f0f0f0' },
  number: { fontSize: '36px', fontWeight: 'bold', color: '#667eea', margin: '10px 0' },
  cardBtn: { marginTop: '15px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', width: '100%' }
};

export default DashboardPage;
