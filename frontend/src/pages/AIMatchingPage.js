import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function AIMatchingPage({ user, logout }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = useCallback(async () => {
    try {
      const res = await axios.get('/ai-matching/recommendations', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRecommendations(res.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      alert('Please complete your profile first');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  if (loading) return <div><Navbar user={user} logout={logout} /><div style={{textAlign: 'center', padding: '50px'}}>Loading AI matches...</div></div>;

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div style={styles.container}>
        <h1>🤖 AI-Powered Matches</h1>
        <p style={styles.subtitle}>Based on skill compatibility and personality fit</p>
        <div style={styles.grid}>
          {recommendations.map((rec) => (
            <div key={rec.profile._id} style={styles.card}>
              <div style={styles.scoreTag}>{rec.compatibilityScore}% match</div>
              <h3>{rec.profile.userId.name}</h3>
              <p><strong>Score:</strong> {rec.profile.userId.doerScore}/100</p>
              <p><strong>Compatibility:</strong> {Math.round(rec.compatibilityScore)}%</p>
              <div style={styles.skills}>
                {rec.profile.userId.skills?.slice(0, 3).map((skill) => (
                  <span key={skill} style={styles.badge}>{skill}</span>
                ))}
              </div>
              <button style={styles.actionBtn}>View & Swipe →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
  subtitle: { color: '#666', marginBottom: '30px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  card: { background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', position: 'relative' },
  scoreTag: { position: 'absolute', top: '15px', right: '15px', background: '#667eea', color: 'white', padding: '8px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
  skills: { display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '15px 0' },
  badge: { background: '#f0f0f0', padding: '5px 10px', borderRadius: '12px', fontSize: '12px' },
  actionBtn: { width: '100%', padding: '10px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '15px', fontWeight: 'bold' }
};

export default AIMatchingPage;
