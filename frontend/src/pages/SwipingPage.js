import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function SwipingPage({ user, logout }) {
  const [candidates, setCandidates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCandidates = useCallback(async () => {
    try {
      const res = await axios.get('/users/swipe-candidates', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCandidates(res.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handleSwipe = async (action) => {
    try {
      const candidate = candidates[currentIndex];
      await axios.post('/matching/swipe', { targetUserId: candidate._id, action, reason: '' }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (action === 'like' || action === 'super') {
        alert(`You ${action}d ${candidate.name}! 💖`);
      }
      setCurrentIndex(currentIndex + 1);
    } catch (error) {
      console.error('Error swiping:', error);
    }
  };

  if (loading) return <div><Navbar user={user} logout={logout} /><div style={{textAlign: 'center', padding: '50px'}}>Loading...</div></div>;

  if (currentIndex >= candidates.length) {
    return (
      <div>
        <Navbar user={user} logout={logout} />
        <div style={styles.emptyContainer}>
          <h2>😴 No more candidates today</h2>
          <p>Check back tomorrow for more matches!</p>
          <p>You've completed today's swipes</p>
        </div>
      </div>
    );
  }

  const candidate = candidates[currentIndex];

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2>{candidate.name}</h2>
            <span style={styles.scoreTag}>{candidate.experienceLevel}</span>
          </div>
          <p style={styles.bio}>{candidate.bio}</p>
          <div style={styles.info}>
            <p><strong>⏰ Available:</strong> {candidate.hoursPerWeek} hours/week</p>
            <p><strong>📍 Location:</strong> {candidate.location || 'Not specified'}</p>
            <p><strong>📊 Doer Score:</strong> {candidate.doerScore}/100</p>
          </div>
          <div style={styles.skillsSection}>
            <h4>Skills</h4>
            <div style={styles.skills}>
              {candidate.skills && candidate.skills.map((skill) => (
                <span key={skill} style={styles.badge}>{skill}</span>
              ))}
            </div>
          </div>
          <div style={styles.buttons}>
            <button style={styles.skipBtn} onClick={() => handleSwipe('skip')}>❌ Skip</button>
            <button style={styles.likeBtn} onClick={() => handleSwipe('like')}>❤️ Like</button>
            <button style={styles.superBtn} onClick={() => handleSwipe('super')}>🌟 Super</button>
          </div>
          <div style={styles.progress}>Candidate {currentIndex + 1} of {candidates.length}</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '600px', margin: '50px auto', padding: '20px' },
  card: { background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px solid #f0f0f0' },
  scoreTag: { background: '#667eea', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '12px' },
  bio: { color: '#666', fontSize: '16px', lineHeight: '1.6', margin: '20px 0' },
  info: { background: '#f9f9f9', padding: '15px', borderRadius: '8px', margin: '20px 0' },
  skillsSection: { margin: '20px 0' },
  skills: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' },
  badge: { background: '#667eea', color: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' },
  buttons: { display: 'flex', gap: '10px', marginTop: '30px' },
  skipBtn: { flex: 1, padding: '12px', background: '#e0e0e0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' },
  likeBtn: { flex: 1, padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  superBtn: { flex: 1, padding: '12px', background: '#ffc107', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  progress: { textAlign: 'center', marginTop: '20px', color: '#999', fontSize: '14px' },
  emptyContainer: { textAlign: 'center', padding: '100px 20px' }
};

export default SwipingPage;
