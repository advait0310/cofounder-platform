import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function MatchesPage({ user, logout }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMatches = useCallback(async () => {
    try {
      const res = await axios.get('/matching/my-matches', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMatches(res.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  if (loading) return <div><Navbar user={user} logout={logout} /><div style={{textAlign: 'center', padding: '50px'}}>Loading...</div></div>;

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div style={styles.container}>
        <h1>💖 Your Matches</h1>
        {matches.length === 0 ? (
          <div style={styles.empty}>
            <p>No matches yet. Start swiping to find your cofounder!</p>
            <button onClick={() => navigate('/swipe')} style={styles.primaryBtn}>Start Swiping</button>
          </div>
        ) : (
          <div style={styles.grid}>
            {matches.map((match) => {
              const cofounder = match.userId1._id === user._id ? match.userId2 : match.userId1;
              return (
                <div key={match._id} style={styles.matchCard}>
                  <div style={styles.header}>
                    <h3>{cofounder.name}</h3>
                    <span style={styles.status}>✅ Matched</span>
                  </div>
                  <p style={styles.bio}>{cofounder.bio}</p>
                  <div style={styles.details}>
                    <p><strong>Score:</strong> {cofounder.doerScore}/100</p>
                    <p><strong>Available:</strong> {cofounder.hoursPerWeek} hrs/week</p>
                  </div>
                  <div style={styles.cardButtons}>
                    <button onClick={() => navigate(`/messages/${match._id}`)} style={styles.chatBtn}>💬 Chat</button>
                    <button onClick={() => navigate(`/team/create?matchId=${match._id}`)} style={styles.teamBtn}>🤝 Create Team</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
  empty: { textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '12px', marginTop: '40px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginTop: '30px' },
  matchCard: { background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', border: '2px solid #667eea' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0' },
  status: { background: '#28a745', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' },
  bio: { color: '#666', marginBottom: '15px' },
  details: { background: '#f9f9f9', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px' },
  cardButtons: { display: 'flex', gap: '10px' },
  chatBtn: { flex: 1, padding: '10px', background: '#667eea', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  teamBtn: { flex: 1, padding: '10px', background: '#764ba2', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  primaryBtn: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginTop: '20px' }
};

export default MatchesPage;
