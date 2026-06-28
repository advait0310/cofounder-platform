import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function StartupBuilderPage({ user, logout }) {
  const [step, setStep] = useState(1);
  const [startup, setStartup] = useState({
    startupName: '',
    idea: '',
    problem: '',
    solution: '',
    targetAudience: '',
    template: 'minimal'
  });
  const [published, setPublished] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');

  const handleChange = (e) => {
    setStartup({
      ...startup,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateStartup = async () => {
    try {
      const res = await axios.post('/startups/create', startup, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStartup(res.data);
      setStep(2);
    } catch (error) {
      console.error('Error creating startup:', error);
      alert('Failed to create startup');
    }
  };

  const handlePublish = async () => {
    try {
      const res = await axios.put(`/startups/${startup._id}/landing-page`, {
        template: startup.template,
        sections: {
          hero: startup.idea,
          features: startup.solution,
          pricing: 'Coming Soon'
        }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setPublished(true);
      setPublishedUrl(`https://cobuilder.app/startup/${res.data.publicURL}`);
    } catch (error) {
      console.error('Error publishing:', error);
      alert('Failed to publish');
    }
  };

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div style={styles.container}>
        <h1>🚀 Startup Builder</h1>

        {published ? (
          <div style={styles.successBox}>
            <h2>✅ Your startup is LIVE!</h2>
            <p>Share your landing page:</p>
            <input
              type="text"
              value={publishedUrl}
              readOnly
              style={styles.urlInput}
            />
            <button onClick={() => navigator.clipboard.writeText(publishedUrl)} style={styles.copyBtn}>
              Copy Link
            </button>
          </div>
        ) : (
          <>
            <div style={styles.steps}>
              <div style={{...styles.step, background: step >= 1 ? '#667eea' : '#ddd'}}>1</div>
              <div style={{...styles.step, background: step >= 2 ? '#667eea' : '#ddd'}}>2</div>
              <div style={{...styles.step, background: step >= 3 ? '#667eea' : '#ddd'}}>3</div>
            </div>

            {step === 1 && (
              <div style={styles.form}>
                <h2>Step 1: Basic Info</h2>
                <input
                  type="text"
                  name="startupName"
                  placeholder="Startup Name"
                  value={startup.startupName}
                  onChange={handleChange}
                  style={styles.input}
                />
                <textarea
                  name="idea"
                  placeholder="Your Idea (one sentence)"
                  value={startup.idea}
                  onChange={handleChange}
                  style={styles.textarea}
                />
                <textarea
                  name="problem"
                  placeholder="The Problem You're Solving"
                  value={startup.problem}
                  onChange={handleChange}
                  style={styles.textarea}
                />
                <button onClick={() => setStep(2)} style={styles.nextBtn}>
                  Next →
                </button>
              </div>
            )}

            {step === 2 && (
              <div style={styles.form}>
                <h2>Step 2: Solution & Design</h2>
                <textarea
                  name="solution"
                  placeholder="Your Solution"
                  value={startup.solution}
                  onChange={handleChange}
                  style={styles.textarea}
                />
                <input
                  type="text"
                  name="targetAudience"
                  placeholder="Target Audience"
                  value={startup.targetAudience}
                  onChange={handleChange}
                  style={styles.input}
                />
                <select
                  name="template"
                  value={startup.template}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="minimal">Minimal</option>
                  <option value="modern">Modern</option>
                  <option value="bold">Bold</option>
                </select>
                <div style={styles.buttonGroup}>
                  <button onClick={() => setStep(1)} style={styles.backBtn}>
                    ← Back
                  </button>
                  <button onClick={handleCreateStartup} style={styles.nextBtn}>
                    Create →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && startup._id && (
              <div style={styles.form}>
                <h2>Step 3: Publish</h2>
                <p>Your startup page is ready!</p>
                <div style={styles.preview}>
                  <h3>{startup.startupName}</h3>
                  <p>{startup.idea}</p>
                </div>
                <button onClick={handlePublish} style={styles.publishBtn}>
                  🎉 Publish Now
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  steps: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    margin: '30px 0'
  },
  step: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  form: {
    background: 'white',
    padding: '30px',
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
    minHeight: '100px',
    fontFamily: 'inherit'
  },
  preview: {
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    margin: '20px 0'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px'
  },
  backBtn: {
    flex: 1,
    padding: '12px',
    background: '#e0e0e0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  nextBtn: {
    flex: 1,
    padding: '12px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  publishBtn: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '20px'
  },
  successBox: {
    background: '#d4edda',
    border: '1px solid #28a745',
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'center'
  },
  urlInput: {
    width: '100%',
    padding: '12px',
    margin: '15px 0',
    border: '1px solid #ddd',
    borderRadius: '6px',
    boxSizing: 'border-box'
  },
  copyBtn: {
    padding: '10px 20px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default StartupBuilderPage; 
