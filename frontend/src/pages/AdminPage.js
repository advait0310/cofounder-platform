import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function AdminPage({ user, logout }) {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const statsRes = await axios.get('/admin/analytics', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const usersRes = await axios.get('/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div><Navbar user={user} logout={logout} /><div style={{textAlign: 'center', padding: '50px'}}>Loading...</div></div>;

  if (!user?.isAdmin) {
    return <div><Navbar user={user} logout={logout} /><div style={{textAlign: 'center', padding: '50px'}}>Access Denied</div></div>;
  }

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div style={styles.container}>
        <h1>🔧 Admin Dashboard</h1>

        {stats && (
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <h3>Total Users</h3>
              <p style={styles.statNumber}>{stats.totalUsers}</p>
            </div>
            <div style={styles.statCard}>
              <h3>Total Teams</h3>
              <p style={styles.statNumber}>{stats.totalTeams}</p>
            </div>
            <div style={styles.statCard}>
              <h3>Total Startups</h3>
              <p style={styles.statNumber}>{stats.totalStartups}</p>
            </div>
            <div style={styles.statCard}>
              <h3>Platform Health</h3>
              <p style={styles.statNumber}>98%</p>
            </div>
          </div>
        )}

        <h2 style={{marginTop: '40px'}}>Recent Users</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Doer Score</th>
                <th>Status</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 10).map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.doerScore}</td>
                  <td>{u.isVerified ? '✅ Verified' : '⏳ Pending'}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '30px'
  },
  statCard: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#667eea',
    margin: '15px 0'
  },
  tableContainer: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  }
};

export default AdminPage; 
