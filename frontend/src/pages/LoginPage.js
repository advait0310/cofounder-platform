import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    num: '1', title: 'Founder Matched', sub: 'AI finds your perfect co-founder',
    card: (
      <div style={cardStyles.base}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px'}}>
          <div style={{width:'38px',height:'38px',borderRadius:'50%',background:'linear-gradient(135deg,#22C55E,#16A34A)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',fontWeight:700,color:'#000'}}>A</div>
          <div><div style={{color:'#fff',fontSize:'13px',fontWeight:700}}>Alex Rivera</div><div style={{color:'#6B7280',fontSize:'11px'}}>Full Stack Developer</div></div>
        </div>
        <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'10px'}}>
          {['React','Node.js','TypeScript'].map(s=><span key={s} style={cardStyles.tag}>{s}</span>)}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
          <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'rgba(34,197,94,0.15)',border:'1px solid #22C55E',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:800,color:'#22C55E'}}>78</div>
          <div style={{fontSize:'11px',color:'#6B7280'}}>Doer Score · Top 20%</div>
        </div>
      </div>
    )
  },
  {
    num: '2', title: 'Trial Task Assigned', sub: 'Prove your skills with real tasks',
    card: (
      <div style={cardStyles.base}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
          <span style={{color:'#fff',fontSize:'12px',fontWeight:600}}>Trial Task</span>
          <span style={{background:'rgba(34,197,94,0.15)',color:'#22C55E',fontSize:'10px',padding:'2px 8px',borderRadius:'10px',fontWeight:600}}>In Progress</span>
        </div>
        <p style={{color:'#9CA3AF',fontSize:'11px',marginBottom:'10px'}}>Build a landing page with payments</p>
        <div style={{background:'rgba(255,255,255,0.05)',borderRadius:'6px',overflow:'hidden',marginBottom:'6px'}}>
          <div style={{height:'4px',background:'linear-gradient(90deg,#22C55E,#4ADE80)',width:'75%'}}></div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <span style={{color:'#6B7280',fontSize:'10px'}}>75%</span>
          <span style={{color:'#6B7280',fontSize:'10px'}}>23h 45m left</span>
        </div>
      </div>
    )
  },
  {
    num: '3', title: 'Doer Score Increases', sub: 'Consistency builds your reputation',
    card: (
      <div style={cardStyles.base}>
        <div style={{textAlign:'center',marginBottom:'6px'}}>
          <div style={{fontSize:'11px',color:'#6B7280',marginBottom:'4px'}}>Doer Score</div>
          <div style={{width:'56px',height:'56px',margin:'0 auto',borderRadius:'50%',border:'3px solid #22C55E',display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(34,197,94,0.08)'}}>
            <span style={{fontSize:'20px',fontWeight:800,color:'#22C55E'}}>95</span>
          </div>
          <div style={{color:'#22C55E',fontSize:'11px',marginTop:'6px',fontWeight:600}}>⚡ Elite Builder</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'3px'}}>
          {['Completed 68 tasks','On-time delivery 98%','3 startups launched'].map(t=><div key={t} style={{fontSize:'10px',color:'#9CA3AF',display:'flex',gap:'5px'}}><span style={{color:'#22C55E'}}>✓</span>{t}</div>)}
        </div>
      </div>
    )
  },
  {
    num: '4', title: 'Joined the Team', sub: "You're in. Let's build together",
    card: (
      <div style={cardStyles.base}>
        <div style={{fontSize:'11px',color:'#6B7280',marginBottom:'8px'}}>Team Workspace</div>
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'10px'}}>
          {['M','J','S','A'].map((l,i)=><div key={i} style={{width:'26px',height:'26px',borderRadius:'50%',background:`linear-gradient(135deg,hsl(${i*60+120},70%,45%),hsl(${i*60+150},70%,35%))`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:700,color:'#fff',marginLeft:i>0?'-8px':'0',border:'2px solid #111'}}>{l}</div>)}
          <span style={{color:'#6B7280',fontSize:'10px',marginLeft:'4px'}}>4 Members</span>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:'10px',color:'#9CA3AF',borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'8px'}}>
          <div><div style={{color:'#fff',fontWeight:700,fontSize:'14px'}}>24</div><div>Tasks</div></div>
          <div><div style={{color:'#22C55E',fontWeight:700,fontSize:'14px'}}>82%</div><div>Sprint</div></div>
          <div><div style={{color:'#FBBF24',fontWeight:700,fontSize:'14px'}}>High</div><div>Velocity</div></div>
        </div>
      </div>
    )
  },
  {
    num: '5', title: 'Launch Live', sub: 'Your product is now live',
    card: (
      <div style={cardStyles.base}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
          <span style={{color:'#fff',fontSize:'11px',fontWeight:600}}>Launch Dashboard</span>
          <span style={{background:'rgba(34,197,94,0.15)',color:'#22C55E',fontSize:'9px',padding:'2px 6px',borderRadius:'10px'}}>● Live</span>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
          {[{l:'Visitors',v:'24,589',c:'+12.5%'},{l:'Customers',v:'1,429',c:'+8.9%'},{l:'Revenue',v:'$48,920',c:'+15.3%'}].map(r=>(
            <div key={r.l} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{color:'#6B7280',fontSize:'10px'}}>{r.l}</span>
              <div style={{textAlign:'right'}}><span style={{color:'#fff',fontSize:'12px',fontWeight:700}}>{r.v}</span><span style={{color:'#22C55E',fontSize:'9px',marginLeft:'4px'}}>{r.c}</span></div>
            </div>
          ))}
        </div>
      </div>
    )
  }
];

const cardStyles = {
  base: {
    background:'rgba(17,24,15,0.8)',border:'1px solid rgba(34,197,94,0.15)',
    borderRadius:'12px',padding:'14px',minWidth:'160px',maxWidth:'185px',
    backdropFilter:'blur(10px)'
  },
  tag: {
    background:'rgba(34,197,94,0.1)',color:'#4ADE80',fontSize:'9px',
    padding:'2px 7px',borderRadius:'8px',border:'1px solid rgba(34,197,94,0.2)'
  }
};

function LoginPage({ setIsAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
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
      setError(err.response?.data?.message || err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.grid}></div>

      <div style={styles.left}>
        <div style={styles.glowTop}></div>
        <div style={styles.glowBottom}></div>

        <div style={styles.brand}>
          <div style={styles.brandIcon}>CB</div>
          <span style={styles.brandName}>CoBuilder</span>
        </div>

        <h1 style={styles.headline}>
          Build with people who <span style={styles.green}>ship.</span>
        </h1>
        <p style={styles.tagline}>Match. Collaborate. Execute. Launch. Grow.<br/>Everything your startup needs, in one workspace.</p>

        <div style={styles.journey}>
          {steps.map((s, i) => (
            <div key={s.num} style={styles.step} className={`step-item step-item-${i}`}>
              <div style={styles.stepHeader}>
                <div style={styles.stepNum}>{s.num}</div>
                <div>
                  <div style={styles.stepTitle}>{s.title}</div>
                  <div style={styles.stepSub}>{s.sub}</div>
                </div>
              </div>
              {s.card}
              {i < steps.length - 1 && <div style={styles.stepArrow}>→</div>}
            </div>
          ))}
        </div>

        <div style={styles.cycleText}>
          The cycle continues. <span style={styles.green}>Build. Ship. Grow. Repeat.</span> ←
        </div>

        <div style={styles.trustRow}>
          <span style={styles.trustLabel}>Trusted by 5,000+ startup teams</span>
          {['Stripe','Vercel','Linear','Supabase','OpenAI'].map(b => (
            <span key={b} style={styles.trustBrand}>{b}</span>
          ))}
        </div>

        <div style={styles.featureRow}>
          {[{icon:'🛡️',t:'Verified Builders',s:'Real people. Real skills.'},{icon:'✅',t:'Real Execution',s:'Tasks. Deadlines. Results.'},{icon:'🏆',t:'Doer Score',s:'Reputation that grows.'},{icon:'🚀',t:'Ship & Scale',s:'Launch. Grow. Succeed.'}].map(f=>(
            <div key={f.t} style={styles.featureItem}>
              <span style={{fontSize:'20px'}}>{f.icon}</span>
              <div><div style={styles.featureTitle}>{f.t}</div><div style={styles.featureSub}>{f.s}</div></div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.formBox} className="form-box">
          <h2 style={styles.formTitle}>Welcome back</h2>
          <p style={styles.formSub}>Let's build something great.</p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Email</label>
              <input
                type="email" placeholder="name@company.com" value={email}
                onChange={e => setEmail(e.target.value)} style={styles.input} required
                onFocus={e => e.target.style.borderColor='#22C55E'}
                onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}
              />
            </div>
            <div style={styles.fieldWrap}>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <label style={styles.label}>Password</label>
                <span style={styles.forgot}>Forgot password?</span>
              </div>
              <div style={{position:'relative'}}>
                <input
                  type={showPw ? 'text' : 'password'} placeholder="••••••••" value={password}
                  onChange={e => setPassword(e.target.value)} style={{...styles.input,paddingRight:'40px'}} required
                  onFocus={e => e.target.style.borderColor='#22C55E'}
                  onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}
                />
                <span onClick={() => setShowPw(!showPw)} style={styles.eyeBtn}>{showPw ? '🙈' : '👁️'}</span>
              </div>
            </div>
            <div style={styles.rememberRow}>
              <label style={{display:'flex',alignItems:'center',gap:'8px',cursor:'pointer'}}>
                <input type="checkbox" style={{accentColor:'#22C55E'}} />
                <span style={{color:'#9CA3AF',fontSize:'13px'}}>Remember me</span>
              </label>
            </div>
            <button type="submit" style={styles.button} disabled={loading} className="submit-btn">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p style={styles.footer}>
            New here?{' '}
            <span onClick={() => navigate('/register')} style={styles.link}>Create an account</span>
          </p>

          <div style={styles.securityNote}>
            <span style={{color:'#22C55E'}}>🔒</span>
            <span style={{color:'#6B7280',fontSize:'11px'}}>Your data is secure with enterprise-grade security and encryption.</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
        @keyframes glowPulse { 0%,100% { opacity:0.4; } 50% { opacity:0.7; } }
        .form-box { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1); }
        .step-item { animation: slideIn 0.5s ease forwards; opacity:0; }
        .step-item-0 { animation-delay: 0.1s; }
        .step-item-1 { animation-delay: 0.2s; }
        .step-item-2 { animation-delay: 0.3s; }
        .step-item-3 { animation-delay: 0.4s; }
        .step-item-4 { animation-delay: 0.5s; }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(34,197,94,0.4); }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        input::placeholder { color: #4B5563; }
        select option { background: #111; color: #fff; }
      `}</style>
    </div>
  );
}

const styles = {
  page: { minHeight:'100vh', display:'flex', background:'#080C08', position:'relative', overflow:'hidden' },
  grid: {
    position:'absolute', inset:0,
    backgroundImage:'linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)',
    backgroundSize:'40px 40px', pointerEvents:'none'
  },
  left: {
    flex:1, position:'relative', padding:'36px 40px 36px',
    overflowY:'auto', display:'flex', flexDirection:'column'
  },
  glowTop: {
    position:'absolute', top:'-100px', left:'-50px',
    width:'400px', height:'400px', borderRadius:'50%',
    background:'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)',
    filter:'blur(40px)', animation:'glowPulse 4s ease-in-out infinite', pointerEvents:'none'
  },
  glowBottom: {
    position:'absolute', bottom:'-80px', right:'10%',
    width:'300px', height:'300px', borderRadius:'50%',
    background:'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)',
    filter:'blur(40px)', animation:'glowPulse 5s ease-in-out infinite 1s', pointerEvents:'none'
  },
  brand: { display:'flex', alignItems:'center', gap:'10px', marginBottom:'28px', position:'relative', zIndex:2 },
  brandIcon: {
    width:'36px', height:'36px', borderRadius:'8px',
    background:'linear-gradient(135deg,#22C55E,#16A34A)',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontSize:'13px', fontWeight:800, color:'#000'
  },
  brandName: { color:'#fff', fontWeight:800, fontSize:'18px' },
  headline: { color:'#fff', fontSize:'clamp(24px,2.5vw,38px)', fontWeight:900, lineHeight:1.15, margin:'0 0 10px', position:'relative', zIndex:2, letterSpacing:'-0.5px' },
  green: { color:'#22C55E' },
  tagline: { color:'#6B7280', fontSize:'13px', lineHeight:1.6, marginBottom:'32px', position:'relative', zIndex:2 },
  journey: { display:'flex', gap:'0', alignItems:'flex-start', overflowX:'auto', paddingBottom:'12px', position:'relative', zIndex:2 },
  step: { display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', position:'relative', flexShrink:0 },
  stepArrow: { position:'absolute', right:'-18px', top:'30px', color:'#22C55E', fontSize:'16px', zIndex:3 },
  stepHeader: { display:'flex', alignItems:'flex-start', gap:'8px', paddingRight:'20px', paddingLeft:'4px', minWidth:'160px', maxWidth:'185px' },
  stepNum: {
    width:'22px', height:'22px', borderRadius:'50%', flexShrink:0,
    border:'1px solid #22C55E', color:'#22C55E',
    display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:700
  },
  stepTitle: { color:'#fff', fontSize:'12px', fontWeight:700, lineHeight:1.3 },
  stepSub: { color:'#6B7280', fontSize:'10px', marginTop:'2px', lineHeight:1.4 },
  cycleText: { color:'#6B7280', fontSize:'12px', marginTop:'20px', position:'relative', zIndex:2 },
  trustRow: { display:'flex', alignItems:'center', gap:'16px', marginTop:'24px', flexWrap:'wrap', position:'relative', zIndex:2 },
  trustLabel: { color:'#6B7280', fontSize:'11px', whiteSpace:'nowrap' },
  trustBrand: { color:'#4B5563', fontSize:'12px', fontWeight:600 },
  featureRow: { display:'flex', gap:'20px', marginTop:'20px', flexWrap:'wrap', position:'relative', zIndex:2 },
  featureItem: { display:'flex', alignItems:'flex-start', gap:'8px', minWidth:'140px' },
  featureTitle: { color:'#fff', fontSize:'12px', fontWeight:600 },
  featureSub: { color:'#6B7280', fontSize:'10px', marginTop:'2px' },
  right: {
    width:'400px', flexShrink:0, display:'flex', justifyContent:'center',
    alignItems:'center', padding:'24px', background:'rgba(10,15,10,0.6)',
    borderLeft:'1px solid rgba(34,197,94,0.08)', position:'relative', zIndex:2
  },
  formBox: {
    width:'100%', maxWidth:'340px',
    background:'rgba(13,18,13,0.8)', backdropFilter:'blur(20px)',
    border:'1px solid rgba(34,197,94,0.12)', borderRadius:'16px', padding:'36px 32px',
    boxShadow:'0 20px 60px rgba(0,0,0,0.5)'
  },
  formTitle: { color:'#fff', fontSize:'22px', fontWeight:800, margin:'0 0 4px', textAlign:'center' },
  formSub: { color:'#6B7280', fontSize:'13px', textAlign:'center', margin:'0 0 24px' },
  fieldWrap: { marginBottom:'16px' },
  label: { display:'block', color:'#9CA3AF', fontSize:'13px', fontWeight:500, marginBottom:'6px' },
  input: {
    width:'100%', padding:'11px 14px', background:'rgba(255,255,255,0.04)',
    border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', fontSize:'14px',
    color:'#fff', boxSizing:'border-box', outline:'none', transition:'border-color 0.2s'
  },
  forgot: { color:'#22C55E', fontSize:'12px', cursor:'pointer', fontWeight:500 },
  eyeBtn: { position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', cursor:'pointer', fontSize:'14px' },
  rememberRow: { marginBottom:'16px' },
  button: {
    width:'100%', padding:'13px', background:'linear-gradient(135deg,#22C55E,#16A34A)',
    color:'#000', border:'none', borderRadius:'8px', cursor:'pointer',
    fontSize:'15px', fontWeight:800, transition:'all 0.2s ease',
    boxShadow:'0 4px 15px rgba(34,197,94,0.3)'
  },
  error: {
    color:'#FCA5A5', padding:'10px 14px', marginBottom:'16px',
    background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)',
    borderRadius:'8px', fontSize:'13px'
  },
  footer: { textAlign:'center', marginTop:'20px', color:'#6B7280', fontSize:'13px' },
  link: { color:'#22C55E', cursor:'pointer', fontWeight:700 },
  securityNote: { display:'flex', alignItems:'center', gap:'8px', marginTop:'16px', padding:'10px 12px', background:'rgba(34,197,94,0.05)', borderRadius:'8px', border:'1px solid rgba(34,197,94,0.1)' }
};

export default LoginPage;
