import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ user, logout }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <h1 style={styles.logo} onClick={() => navigate('/')}>🚀 CoBuilder</h1>
        <ul style={styles.links}>
          <li><span onClick={() => navigate('/')} style={styles.link}>Dashboard</span></li>
          <li><span onClick={() => navigate('/swipe')} style={styles.link}>Swipe</span></li>
          <li><span onClick={() => navigate('/ai-matching')} style={styles.link}>AI Match</span></li>
          <li><span onClick={() => navigate('/matches')} style={styles.link}>Matches</span></li>
          <li><span onClick={() => navigate('/leaderboard')} style={styles.link}>Top 100</span></li>
          <li><span onClick={() => navigate('/startup-builder')} style={styles.link}>Startup</span></li>
          <li><span onClick={() => navigate('/skills')} style={styles.link}>Skills</span></li>
          <li><span onClick={() => navigate('/mentorship')} style={styles.link}>Mentor</span></li>
        </ul>
        <div style={styles.userSection}>
          <button style={styles.userBtn} onClick={() => setShowMenu(!showMenu)}>
            👤 {user?.name?.split(' ')[0]}
          </button>
          {showMenu && (
            <div style={styles.dropdown}>
              <span onClick={() => { navigate('/profile'); setShowMenu(false); }} style={styles.dropdownItem}>Profile</span>
              <span onClick={() => { navigate('/funding'); setShowMenu(false); }} style={styles.dropdownItem}>Funding</span>
              {user?.isAdmin && (
                <span onClick={() => { navigate('/admin'); setShowMenu(false); }} style={styles.dropdownItem}>Admin</span>
              )}
              <button onClick={logout} style={styles.logoutBtn}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: { background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 100 },
  container: { maxWidth: '1400px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' },
  logo: { fontSize: '24px', margin: 0, cursor: 'pointer', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold' },
  links: { display: 'flex', listStyle: 'none', gap: '20px', margin: 0, padding: 0, flex: 1, marginLeft: '40px' },
  link: { cursor: 'pointer', color: '#555', textDecoration: 'none', fontWeight: '500', fontSize: '14px', transition: 'color 0.3s' },
  userSection: { position: 'relative' },
  userBtn: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', transition: 'transform 0.2s' },
  dropdown: { position: 'absolute', top: '100%', right: 0, background: 'white', border: '1px solid #eee', borderRadius: '8px', marginTop: '10px', minWidth: '150px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', overflow: 'hidden' },
  dropdownItem: { display: 'block', padding: '12px 15px', color: '#555', textDecoration: 'none', cursor: 'pointer', transition: 'background 0.2s', fontSize: '14px' },
  logoutBtn: { width: '100%', padding: '12px 15px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: '#dc3545', fontWeight: '500', borderTop: '1px solid #eee' }
};

export default Navbar;
