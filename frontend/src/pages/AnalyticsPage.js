import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function AnalyticsPage({ user, logout }) {
  const [, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await axios.get('/analytics/team/team_123', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAnalytics(res.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) return <div><Navbar user={user} logout={logout} /><div style={{textAlign: 'center', padding: '50px'}}>Loading...</div></div>;

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div style={styles.container}>
        <h1>📊 Team Analytics</h1>
        <div style={styles.grid}>
          <div style={styles.card}><h3>Tasks Completed</h3><p style={styles.number}>24</p><p style={styles.change}>↑ 3 this week</p></div>
          <div style={styles.card}><h3>Team Health</h3><p style={styles.number}>85%</p><p style={styles.change}>Great momentum</p></div>
          <div style={styles.card}><h3>Avg Doer Score</h3><p style={styles.number}>72</p><p style={styles.change}>Top 25%</p></div>
          <div style={styles.card}><h3>Consistency</h3><p style={styles.number}>92%</p><p style={styles.change}>Very consistent</p></div>
        </div>
        <h2 style={{marginTop: '40px'}}>Insights</h2>
        <div style={styles.insights}>
          <div style={styles.insight}><h4>⚡ Quick Wins</h4><p>Your team completed 5 high-priority tasks this week</p></div>
          <div style={styles.insight}><h4>🎯 Focus Areas</h4><p>Consider focusing on technical debt next sprint</p></div>
          <div style={styles.insight}><h4>📈 Growth</h4><p>Team productivity increased 15% from last month</p></div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' },
  card: { background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', textAlign: 'center' },
  number: { fontSize: '36px', fontWeight: 'bold', color: '#667eea', margin: '15px 0' },
  change: { color: '#28a745', fontSize: '14px' },
  insights: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' },
  insight: { background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderLeft: '4px solid #667eea' }
};

export default AnalyticsPage;
