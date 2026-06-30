import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function MentorshipPage({ user, logout }) {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMentor, setIsMentor] = useState(user?.isMentor || false);
  const [mentorForm, setMentorForm] = useState({ expertise: '', hourlyRate: '', bio: '' });

  const fetchMentors = useCallback(async () => {
    try {
      const res = await axios.get('/mentorship/all');
      setMentors(res.data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  const handleBecomeMentor = async () => {
    try {
      await axios.post('/mentorship/register-mentor', {
        expertise: mentorForm.expertise.split(',').map(e => e.trim()),
        hourlyRate: parseInt(mentorForm.hourlyRate),
        bio: mentorForm.bio
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setIsMentor(true);
      alert('🎉 You are now a mentor!');
    } catch (error) {
      console.error('Error registering as mentor:', error);
      alert('Failed to register as mentor');
    }
  };

  const handleRequestMentorship = async (mentorId) => {
    try {
      await axios.post(`/mentorship/${mentorId}/request-mentorship`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('✅ Mentorship request sent!');
    } catch (error) {
      console.error('Error requesting mentorship:', error);
    }
  };

  if (loading) return <div><Navbar user={user} logout={logout} /><div style={{textAlign: 'center', padding: '50px'}}>Loading...</div></div>;

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div style={styles.container}>
        <h1>👨‍🏫 Mentorship Program</h1>
        {!isMentor && (
          <div style={styles.becomeSection}>
            <h2>Become a Mentor</h2>
            <p>Share your experience and guide the next generation of founders</p>
            <input type="text" placeholder="Areas of Expertise (comma-separated)" value={mentorForm.expertise} onChange={(e) => setMentorForm({...mentorForm, expertise: e.target.value})} style={styles.input} />
            <input type="number" placeholder="Hourly Rate ($)" value={mentorForm.hourlyRate} onChange={(e) => setMentorForm({...mentorForm, hourlyRate: e.target.value})} style={styles.input} />
            <textarea placeholder="Bio - Tell mentees about yourself" value={mentorForm.bio} onChange={(e) => setMentorForm({...mentorForm, bio: e.target.value})} style={styles.textarea} />
            <button onClick={handleBecomeMentor} style={styles.becomeMentorBtn}>Register as Mentor</button>
          </div>
        )}
        <h2>🌟 Available Mentors ({mentors.length})</h2>
        <div style={styles.grid}>
          {mentors.map((mentor) => (
            <div key={mentor._id} style={styles.mentorCard}>
              <h3>{mentor.mentorId.name}</h3>
              <div style={styles.rating}>⭐ {mentor.rating} ({mentor.reviews} reviews)</div>
              <p style={styles.expertise}><strong>Expertise:</strong> {mentor.expertise.join(', ')}</p>
              <p style={styles.bio}>{mentor.bio}</p>
              <div style={styles.meta}>
                <span>${mentor.hourlyRate}/hour</span>
                <span>{mentor.currentMentees.length} mentees</span>
              </div>
              <button onClick={() => handleRequestMentorship(mentor._id)} style={styles.requestBtn}>Request Mentorship</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
  becomeSection: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '40px', borderRadius: '12px', marginBottom: '40px' },
  input: { width: '100%', padding: '12px', margin: '12px 0', border: 'none', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '12px', margin: '12px 0', border: 'none', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', minHeight: '100px', fontFamily: 'inherit' },
  becomeMentorBtn: { width: '100%', padding: '12px', background: 'white', color: '#667eea', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginTop: '15px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' },
  mentorCard: { background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderTop: '4px solid #667eea' },
  rating: { color: '#ffc107', fontWeight: 'bold', margin: '10px 0' },
  expertise: { color: '#666', fontSize: '14px' },
  bio: { color: '#666', marginBottom: '15px' },
  meta: { display: 'flex', gap: '20px', marginBottom: '15px', fontSize: '14px', color: '#999' },
  requestBtn: { width: '100%', padding: '10px', background: '#667eea', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }
};

export default MentorshipPage;
