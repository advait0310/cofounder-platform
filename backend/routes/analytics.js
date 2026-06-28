import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function AnalyticsPage({ user, logout }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get('/analytics/dashboard', {
        params: { timeRange },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAnalytics(res.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar user={user} logout={logout} />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          Loading analytics...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>📊 Analytics Dashboard</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={styles.timeSelect}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <h3>📈 Profile Views</h3>
            <p style={styles.metricNumber}>1,234</p>
            <p style={styles.metricChange}>↑ 12% from last week</p>
          </div>

          <div style={styles.metricCard}>
            <h3>👥 Match Requests</h3>
            <p style={styles.metricNumber}>45</p>
            <p style={styles.metricChange}>↑ 8% from last week</p>
          </div>

          <div style={styles.metricCard}>
            <h3>💬 Messages Sent</h3>
            <p style={styles.metricNumber}>123</p>
            <p style={styles.metricChange}>↑ 5% from last week</p>
          </div>

          <div style={styles.metricCard}>
            <h3>⭐ Doer Score</h3>
            <p style={styles.metricNumber}>{user?.doerScore || 85}</p>
            <p style={styles.metricChange}>Excellent performer</p>
          </div>
        </div>

        {/* Activity Chart */}
        <div style={styles.chartSection}>
          <h2>Activity Over Time</h2>
          <div style={styles.chart}>
            <div style={styles.chartBar}>
              <div style={{ ...styles.bar, height: '60px', background: '#667eea' }}></div>
              <p>Mon</p>
            </div>
            <div style={styles.chartBar}>
              <div style={{ ...styles.bar, height: '80px', background: '#667eea' }}></div>
              <p>Tue</p>
            </div>
            <div style={styles.chartBar}>
              <div style={{ ...styles.bar, height: '70px', background: '#667eea' }}></div>
              <p>Wed</p>
            </div>
            <div style={styles.chartBar}>
              <div style={{ ...styles.bar, height: '90px', background: '#667eea' }}></div>
              <p>Thu</p>
            </div>
            <div style={styles.chartBar}>
              <div style={{ ...styles.bar, height: '85px', background: '#667eea' }}></div>
              <p>Fri</p>
            </div>
            <div style={styles.chartBar}>
              <div style={{ ...styles.bar, height: '75px', background: '#667eea' }}></div>
              <p>Sat</p>
            </div>
            <div style={styles.chartBar}>
              <div style={{ ...styles.bar, height: '65px', background: '#667eea' }}></div>
              <p>Sun</p>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div style={styles.insightsSection}>
          <h2>💡 Insights</h2>
          <div style={styles.insightsList}>
            <div style={styles.insight}>
              <div style={styles.insightIcon}>⚡</div>
              <div>
                <h4>Peak Activity Time</h4>
                <p>Most active on Thursday between 2-4 PM</p>
              </div>
            </div>

            <div style={styles.insight}>
              <div style={styles.insightIcon}>🎯</div>
              <div>
                <h4>Top Matches</h4>
                <p>Tech + Marketing matches have 85% engagement rate</p>
              </div>
            </div>

            <div style={styles.insight}>
              <div style={styles.insightIcon}>📊</div>
              <div>
                <h4>Growth Trend</h4>
                <p>Your engagement is 23% higher than average users</p>
              </div>
            </div>

            <div style={styles.insight}>
              <div style={styles.insightIcon}>💪</div>
              <div>
                <h4>Strength</h4>
                <p>Your profile completeness is 95% - excellent!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Goals */}
        <div style={styles.goalsSection}>
          <h2>🎯 Your Goals</h2>
          <div style={styles.goalsList}>
            <div style={styles.goal}>
              <div style={styles.goalHeader}>
                <h4>Find 3 Cofounders</h4>
                <span style={styles.progress}>1/3</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: '33%' }}></div>
              </div>
            </div>

            <div style={styles.goal}>
              <div style={styles.goalHeader}>
                <h4>Complete Team Formation</h4>
                <span style={styles.progress}>0/1</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: '0%' }}></div>
              </div>
            </div>

            <div style={styles.goal}>
              <div style={styles.goalHeader}>
                <h4>Reach Doer Score 100</h4>
                <span style={styles.progress}>{user?.doerScore || 85}/100</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: '85%' }}></div>
              </div>
            </div>
          </div>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '2px solid #f0f0f0'
  },
  timeSelect: {
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  metricCard: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    textAlign: 'center',
    borderTop: '4px solid #667eea'
  },
  metricNumber: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#667eea',
    margin: '15px 0'
  },
  metricChange: {
    color: '#28a745',
    fontSize: '14px'
  },
  chartSection: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    marginBottom: '40px'
  },
  chart: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: '300px',
    marginTop: '20px',
    paddingBottom: '20px'
  },
  chartBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
  },
  bar: {
    width: '40px',
    borderRadius: '6px 6px 0 0'
  },
  insightsSection: {
    marginBottom: '40px'
  },
  insightsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  insight: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    display: 'flex',
    gap: '15px'
  },
  insightIcon: {
    fontSize: '32px'
  },
  goalsSection: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
  },
  goalsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    marginTop: '20px'
  },
  goal: {
    paddingBottom: '15px',
    borderBottom: '1px solid #f0f0f0'
  },
  goalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  progress: {
    background: '#667eea',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    background: '#f0f0f0',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  }
};

export default AnalyticsPage;