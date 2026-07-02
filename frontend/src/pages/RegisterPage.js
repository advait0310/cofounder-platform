import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const demoCards = [
  { name: 'Priya Patel', role: 'Backend Engineer', skill: 'Node + AWS', score: 90, img: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Jordan Kim', role: 'Mobile Developer', skill: 'iOS + Swift', score: 91, img: 'https://randomuser.me/api/portraits/men/52.jpg' },
  { name: 'Aisha Bello', role: 'Operations Lead', skill: 'Logistics + Ops', score: 89, img: 'https://randomuser.me/api/portraits/women/28.jpg' },
  { name: 'Marco Silva', role: 'Data Scientist', skill: 'Python + ML', score: 93, img: 'https://randomuser.me/api/portraits/men/41.jpg' },
  { name: 'Emma Clarke', role: 'Content Strategist', skill: 'Copy + SEO', score: 86, img: 'https://randomuser.me/api/portraits/women/12.jpg' }
];

function RegisterPage({ setIsAuth }) {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', skills: '', hoursPerWeek: '20'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSwiping(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % demoCards.length);
        setSwiping(false);
      }, 500);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user._id);
      setIsAuth(true);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const focusStyle = (e) => e.target.style.borderColor = '#3B82F6';
  const blurStyle = (e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)';

  const getCard = (offset) => demoCards[(activeIndex + offset) % demoCards.length];

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.leftBgGrid}></div>
        <div style={styles.leftOrb1}></div>
        <div style={styles.leftOrb2}></div>

        <div style={styles.leftContent}>
          <h2 style={styles.leftHeadline}>Stop talking.<br/>Start <span style={styles.gold}>shipping</span>.</h2>
          <p style={styles.leftSub}>Join a platform built for doers — match, build, launch with people who follow through.</p>
        </div>

        <div style={styles.cardStack}>
          <div key={`back2-${activeIndex}`} style={{...styles.demoCard, ...styles.cardBack2}}>
            <CardContent c={getCard(2)} />
          </div>
          <div key={`back1-${activeIndex}`} style={{...styles.demoCard, ...styles.cardBack1}}>
            <CardContent c={getCard(1)} />
          </div>
          <div
            key={`front-${activeIndex}`}
            style={{
              ...styles.demoCard,
              ...styles.cardFront,
              transform: swiping ? 'translate(-50%, -50%) translateX(140px) rotate(18deg)' : 'translate(-50%, -50%) translateX(0) rotate(-2deg)',
              opacity: swiping ? 0 : 1,
              transition: swiping ? 'all 0.5s cubic-bezier(0.4,0,0.6,1)' : 'all 0.45s cubic-bezier(0.16,1,0.3,1)'
            }}
          >
            <CardContent c={getCard(0)} big />
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.orb1}></div>
        <div style={styles.orb2}></div>
        <div style={styles.grid}></div>

        <div style={styles.box} className="register-box">
          <div style={styles.logoRow}>
            <span style={styles.rocket}>🚀</span>
            <h1 style={styles.title}>CoBuilder</h1>
          </div>
          <p style={styles.subtitle}>Create your account. Start building.</p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Full name</label>
              <input type="text" name="name" placeholder="Jordan Lee" value={form.name} onChange={handleChange} style={styles.input} required onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Email</label>
              <input type="email" name="email" placeholder="name@company.com" value={form.email} onChange={handleChange} style={styles.input} required onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div style={styles.row2}>
              <div style={styles.fieldWrap}>
                <label style={styles.label}>Password</label>
                <input type="password" name="password" placeholder="Min 6 chars" value={form.password} onChange={handleChange} style={styles.input} required onFocus={focusStyle} onBlur={blurStyle} />
              </div>
              <div style={styles.fieldWrap}>
                <label style={styles.label}>Confirm</label>
                <input type="password" name="confirmPassword" placeholder="Repeat it" value={form.confirmPassword} onChange={handleChange} style={styles.input} required onFocus={focusStyle} onBlur={blurStyle} />
              </div>
            </div>
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Skills</label>
              <input type="text" name="skills" placeholder="React, Marketing, Design" value={form.skills} onChange={handleChange} style={styles.input} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Hours per week</label>
              <select name="hoursPerWeek" value={form.hoursPerWeek} onChange={handleChange} style={styles.input}>
                <option value="5">5 hours/week</option>
                <option value="10">10 hours/week</option>
                <option value="20">20 hours/week</option>
                <option value="30">30 hours/week</option>
                <option value="40">40+ hours/week</option>
              </select>
            </div>
            <button type="submit" style={styles.button} disabled={loading} className="register-btn">
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p style={styles.footer}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={styles.link}>Sign in</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.1); } }
        @keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-50px,40px) scale(0.95); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .register-box { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1); }
        .register-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(59,130,246,0.5), 0 0 0 1px rgba(251,191,36,0.3); }
        .register-btn:active:not(:disabled) { transform: translateY(0); }
      `}</style>
    </div>
  );
}

function CardContent({ c, big }) {
  return (
    <>
      <div style={styles.cardImgWrap}>
        <img src={c.img} alt={c.name} style={styles.cardImg} />
        <span style={styles.cardScore}>⚡ {c.score}</span>
      </div>
      <div style={styles.cardInfo}>
        <h3 style={styles.cardName}>{c.name}</h3>
        <p style={styles.cardRole}>{c.role}</p>
        <div style={styles.cardSkillTag}>{c.skill}</div>
      </div>
      {big && (
        <div style={styles.cardActions}>
          <div style={styles.cardX}>✕</div>
          <div style={styles.cardStar}>★</div>
          <div style={styles.cardHeart}>♥</div>
        </div>
      )}
    </>
  );
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', background: '#0A0E17' },
  left: {
    flex: 1, position: 'relative', overflow: 'hidden',
    background: 'linear-gradient(160deg, #0D1320 0%, #131B2E 60%, #0A0E17 100%)',
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    padding: '60px 50px', minWidth: '420px'
  },
  leftBgGrid: {
    position: 'absolute', inset: 0,
    backgroundImage: 'linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
    maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 80%)',
    WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 80%)'
  },
  leftOrb1: {
    position: 'absolute', width: '320px', height: '320px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%)',
    top: '-60px', left: '-60px', filter: 'blur(40px)', animation: 'float1 10s ease-in-out infinite'
  },
  leftOrb2: {
    position: 'absolute', width: '280px', height: '280px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.28) 0%, transparent 70%)',
    bottom: '-40px', right: '0px', filter: 'blur(40px)', animation: 'float2 12s ease-in-out infinite'
  },
  leftContent: { position: 'relative', zIndex: 2, marginBottom: '50px' },
  leftHeadline: { color: '#fff', fontSize: '34px', fontWeight: 800, lineHeight: 1.25, margin: 0, letterSpacing: '-0.5px' },
  gold: {
    background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
  },
  leftSub: { color: '#8B92A8', fontSize: '15px', marginTop: '16px', maxWidth: '380px', lineHeight: 1.6 },
  cardStack: { position: 'relative', height: '340px', zIndex: 2 },
  demoCard: {
    position: 'absolute', top: '50%', left: '50%', width: '230px',
    background: 'rgba(22, 28, 44, 0.92)',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
  },
  cardBack2: {
    transform: 'translate(-50%, -50%) translateY(20px) scale(0.88) rotate(5deg)',
    opacity: 0.45, filter: 'blur(1px)'
  },
  cardBack1: {
    transform: 'translate(-50%, -50%) translateY(10px) scale(0.94) rotate(3deg)',
    opacity: 0.75
  },
  cardFront: {},
  cardImgWrap: { position: 'relative', width: '100%', height: '170px' },
  cardImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  cardScore: {
    position: 'absolute', top: '10px', right: '10px',
    fontSize: '11px', fontWeight: 700, color: '#0A0E17',
    background: '#FBBF24', padding: '4px 10px', borderRadius: '20px',
    boxShadow: '0 2px 10px rgba(251,191,36,0.5)'
  },
  cardInfo: { padding: '14px 16px 6px' },
  cardName: { color: '#fff', fontSize: '16px', fontWeight: 700, margin: '0 0 2px 0' },
  cardRole: { color: '#8B92A8', fontSize: '12px', margin: '0 0 10px 0' },
  cardSkillTag: {
    display: 'inline-block', fontSize: '11px', color: '#93C5FD',
    background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)',
    padding: '4px 10px', borderRadius: '20px'
  },
  cardActions: { display: 'flex', gap: '8px', padding: '14px 16px 16px', justifyContent: 'center' },
  cardX: {
    width: '30px', height: '30px', borderRadius: '50%',
    background: 'rgba(239,68,68,0.15)', color: '#FCA5A5',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px'
  },
  cardStar: {
    width: '30px', height: '30px', borderRadius: '50%',
    background: 'rgba(251,191,36,0.15)', color: '#FBBF24',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px'
  },
  cardHeart: {
    width: '30px', height: '30px', borderRadius: '50%',
    background: 'rgba(59,130,246,0.18)', color: '#60A5FA',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px'
  },
  right: {
    width: '480px', flexShrink: 0, position: 'relative',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    padding: '20px', overflow: 'hidden', overflowY: 'auto'
  },
  grid: {
    position: 'absolute', inset: 0,
    backgroundImage: 'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)',
    backgroundSize: '48px 48px',
    maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
    WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)'
  },
  orb1: {
    position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
    top: '-80px', right: '-80px', filter: 'blur(40px)', animation: 'float1 9s ease-in-out infinite'
  },
  orb2: {
    position: 'absolute', width: '260px', height: '260px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)',
    bottom: '-60px', left: '-60px', filter: 'blur(40px)', animation: 'float2 11s ease-in-out infinite'
  },
  box: {
    position: 'relative', zIndex: 2,
    background: 'rgba(17, 22, 34, 0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '40px 36px',
    width: '100%', maxWidth: '400px', margin: '20px 0',
    boxShadow: '0 25px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.05)'
  },
  logoRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '6px' },
  rocket: { fontSize: '26px', filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.6))' },
  title: {
    margin: 0, fontSize: '24px', fontWeight: 800,
    background: 'linear-gradient(135deg, #3B82F6 0%, #FBBF24 100%)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px'
  },
  subtitle: { textAlign: 'center', color: '#8B92A8', fontSize: '13px', marginBottom: '24px', marginTop: 0 },
  fieldWrap: { marginBottom: '14px' },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  label: { display: 'block', color: '#A0A8C0', fontSize: '11px', fontWeight: 600, letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '6px' },
  input: {
    width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '13px',
    color: '#fff', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.2s'
  },
  button: {
    width: '100%', padding: '12px', background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer',
    fontSize: '14px', fontWeight: 700, marginTop: '6px', transition: 'all 0.25s ease',
    boxShadow: '0 4px 20px rgba(59,130,246,0.35)'
  },
  error: {
    color: '#FCA5A5', padding: '10px 14px', marginBottom: '16px',
    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: '10px', fontSize: '13px'
  },
  footer: { textAlign: 'center', marginTop: '18px', color: '#8B92A8', fontSize: '13px' },
  link: { color: '#FBBF24', cursor: 'pointer', fontWeight: 700 }
};

export default RegisterPage;
