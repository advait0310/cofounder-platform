import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function FundingPage({ user, logout }) {
  const [fundingRound, setFundingRound] = useState({
    round: 'Seed',
    targetAmount: '',
    equityOffered: '',
    valuation: '',
    description: ''
  });
  const [investors, setInvestors] = useState([]);
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFundingRound({
      ...fundingRound,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateRound = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/funding/create-round', {
        startupId: 'startup_123', // Replace with actual startup ID
        ...fundingRound,
        targetAmount: parseInt(fundingRound.targetAmount),
        equityOffered: parseInt(fundingRound.equityOffered),
        valuation: parseInt(fundingRound.valuation)
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      alert('🎉 Funding round created!');
      setCreated(true);
      fetchInvestors(res.data._id);
    } catch (error) {
      console.error('Error creating funding round:', error);
      alert('Failed to create funding round');
    } finally {
      setLoading(false);
    }
  };

  const fetchInvestors = async (roundId) => {
    try {
      const res = await axios.get(`/funding/find-investors?fundingRoundId=${roundId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setInvestors(res.data);
    } catch (error) {
      console.error('Error fetching investors:', error);
    }
  };

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div style={styles.container}>
        <h1>💰 Funding</h1>

        {!created ? (
          <div style={styles.form}>
            <h2>Create a Funding Round</h2>

            <select
              name="round"
              value={fundingRound.round}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="Seed">Seed</option>
              <option value="Series A">Series A</option>
              <option value="Series B">Series B</option>
              <option value="Series C">Series C</option>
            </select>

            <input
              type="number"
              name="targetAmount"
              placeholder="Target Amount ($)"
              value={fundingRound.targetAmount}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="number"
              name="valuation"
              placeholder="Company Valuation ($)"
              value={fundingRound.valuation}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="number"
              name="equityOffered"
              placeholder="Equity Offered (%)"
              value={fundingRound.equityOffered}
              onChange={handleChange}
              style={styles.input}
            />

            <textarea
              name="description"
              placeholder="Tell investors about your vision"
              value={fundingRound.description}
              onChange={handleChange}
              style={styles.textarea}
            />

            <button
              onClick={handleCreateRound}
              disabled={loading}
              style={styles.createBtn}
            >
              {loading ? 'Creating...' : '🚀 Create Round'}
            </button>
          </div>
        ) : (
          <div>
            <h2>💡 Matched Investors ({investors.length})</h2>
            <div style={styles.grid}>
              {investors.map((item, idx) => (
                <div key={idx} style={styles.investorCard}>
                  <h3>{item.investor.company}</h3>
                  <p><strong>Fund Size:</strong> ${item.investor.fundSize}</p>
                  <p><strong>Focus:</strong> {item.investor.focusAreas.join(', ')}</p>
                  <p><strong>Match Score:</strong> {item.matchScore}%</p>
                  <button style={styles.contactBtn}>Contact</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  form: {
    background: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '15px 0',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    margin: '15px 0',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
    minHeight: '120px',
    fontFamily: 'inherit'
  },
  createBtn: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  investorCard: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    borderLeft: '4px solid #667eea'
  },
  contactBtn: {
    width: '100%',
    padding: '10px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '15px'
  }
};

export default FundingPage; 
