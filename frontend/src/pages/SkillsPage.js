import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function SkillsPage({ user, logout }) {
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [takingTest, setTakingTest] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`/skills/user/${user._id}`);
      setCertifications(res.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill) return;
    setSkills([...skills, newSkill]);
    setNewSkill('');
  };

  const handleTakeTest = async (skill) => {
    try {
      setTakingTest(skill);
      const res = await axios.post(`/skills/test/${skill}`, {
        answers: [1, 2, 3]
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.data.passed) {
        alert(`🎉 You passed the ${skill} test!`);
        setCertifications([...certifications, res.data.certification]);
      } else {
        alert(`Try again! Score: ${res.data.score}/100`);
      }
    } catch (error) {
      console.error('Error taking test:', error);
    } finally {
      setTakingTest(null);
    }
  };

  const availableSkills = [
    'React',
    'Node.js',
    'Python',
    'Vue.js',
    'TypeScript',
    'Marketing',
    'Sales',
    'UI/UX Design'
  ];

  if (loading) return <div><Navbar user={user} logout={logout} /><div style={{textAlign: 'center', padding: '50px'}}>Loading...</div></div>;

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div style={styles.container}>
        <h1>📚 Skill Verification</h1>
        <p style={styles.subtitle}>Verify your skills with tests and badges</p>

        <h2>Verified Certifications ({certifications.length})</h2>
        <div style={styles.grid}>
          {certifications.map((cert) => (
            <div key={cert._id} style={styles.badgeCard}>
              <div style={styles.badgeIcon}>⭐</div>
              <h3>{cert.skill}</h3>
              <p>Level: {cert.badge?.level}</p>
              <p style={styles.score}>Score: {cert.testScore}/100</p>
            </div>
          ))}
        </div>

        <h2 style={{marginTop: '40px'}}>Available Skills to Verify</h2>
        <div style={styles.skillsGrid}>
          {availableSkills.map((skill) => (
            <div key={skill} style={styles.skillCard}>
              <h4>{skill}</h4>
              <button
                onClick={() => handleTakeTest(skill)}
                disabled={takingTest === skill}
                style={{
                  ...styles.testBtn,
                  opacity: takingTest === skill ? 0.6 : 1
                }}
              >
                {takingTest === skill ? 'Testing...' : 'Take Test'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  subtitle: {
    color: '#666',
    marginBottom: '30px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  badgeCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },
  badgeIcon: {
    fontSize: '48px',
    marginBottom: '10px'
  },
  score: {
    margin: '10px 0 0 0',
    fontSize: '12px'
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px'
  },
  skillCard: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    textAlign: 'center'
  },
  testBtn: {
    width: '100%',
    padding: '10px',
    marginTop: '15px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default SkillsPage; 
