import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setIsAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user._id);
      setIsAuth(true);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>
      <div style={styles.orb3}></div>
      <div style={styles.grid}></div>

      <div style={styles.box} className="login-box">
        <div style={styles.logoRow}>
          <span style={styles.rocket}>🚀</span>
          <h1 style={styles.title}>CoBuilder</h1>
        </div>
        <p style={styles.subtitle}>Welcome back. Let's build something.</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
              onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading} className="login-btn">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p style={styles.footer}>
          New here?{' '}
          <span onClick={() => navigate('/register')} style={styles.link}>Create an account</span>
        </p>
      </div>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 40px) scale(0.95); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 50px) scale(1.05); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .login-box {
          animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(59,130,246,0.5), 0 0 0 1px rgba(251,191,36,0.3);
        }
        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0A0E17',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden'
  },
  grid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)',
    backgroundSize: '48px 48px',
    maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
    WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)'
  },
  orb1: {
    position: 'absolute',
    width: '420px',
    height: '420px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)',
    top: '-100px',
    left: '-80px',
    filter: 'blur(40px)',
    animation: 'float1 9s ease-in-out infinite'
  },
  orb2: {
    position: 'absolute',
    width: '380px',
    height: '380px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%)',
    bottom: '-120px',
    right: '-60px',
    filter: 'blur(40px)',
    animation: 'float2 11s ease-in-out infinite'
  },
  orb3: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
    top: '40%',
    right: '15%',
    filter: 'blur(50px)',
    animation: 'float3 13s ease-in-out infinite'
  },
  box: {
    position: 'relative',
    zIndex: 2,
    background: 'rgba(17, 22, 34, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '44px 40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 25px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.05)'
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '6px'
  },
  rocket: {
    fontSize: '28px',
    filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.6))'
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #3B82F6 0%, #FBBF24 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    textAlign: 'center',
    color: '#8B92A8',
    fontSize: '14px',
    marginBottom: '32px',
    marginTop: 0
  },
  fieldWrap: {
    marginBottom: '18px'
  },
  label: {
    display: 'block',
    color: '#A0A8C0',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '13px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#fff',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  button: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 700,
    marginTop: '8px',
    transition: 'all 0.25s ease',
    boxShadow: '0 4px 20px rgba(59,130,246,0.35)'
  },
  error: {
    color: '#FCA5A5',
    padding: '12px 14px',
    marginBottom: '20px',
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: '10px',
    fontSize: '13px'
  },
  footer: {
    textAlign: 'center',
    marginTop: '24px',
    color: '#8B92A8',
    fontSize: '13px'
  },
  link: {
    color: '#FBBF24',
    cursor: 'pointer',
    fontWeight: 700
  }
};

export default LoginPage;
