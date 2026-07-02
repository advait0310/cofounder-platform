import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    num: '1', title: 'Create Profile', sub: 'Set up your builder identity',
    card: (
      <div style={cardStyles.base}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px'}}>
          <div style={{width:'38px',height:'38px',borderRadius:'50%',background:'linear-gradient(135deg,#22C55E,#16A34A)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',fontWeight:700,color:'#000'}}>Y</div>
          <div><div style={{color:'#fff',fontSize:'13px',fontWeight:700}}>Your Name</div><div style={{color:'#6B7280',fontSize:'11px'}}>Founder</div></div>
        </div>
        <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
          {['React','Marketing','Design'].map(s=><span key={s} style={cardStyles.tag}>{s}</span>)}
        </div>
      </div>
    )
  },
  {
    num: '2', title: 'Get Matched', sub: 'AI finds your perfect co-founder',
    card: (
      <div style={cardStyles.base}>
        <div style={{fontSize:'11px',color:'#6B7280',marginBottom:'8px'}}>AI Matching</div>
        <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
          {[{name:'Alex R.',match:'94%',role:'Dev'},{name:'Priya P.',match:'91%',role:'Design'},{name:'Sam O.',match:'88%',role:'Marketing'}].map(m=>(
            <div key={m.name} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'linear-gradient(135deg,#22C55E,#16A34A)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'9px',fontWeight:700,color:'#000'}}>{m.name[0]}</div>
                <span style={{color:'#fff',fontSize:'11px'}}>{m.name}</span>
                <span style={{color:'#6B7280',fontSize:'9px'}}>{m.role}</span>
              </div>
              <span style={{color:'#22C55E',fontSize:'10px',fontWeight:700}}>{m.match}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    num: '3', title: 'Build Together', sub: 'Execute tasks and ship products',
    card: (
      <div style={cardStyles.base}>
        <div style={{fontSize:'11px',color:'#6B7280',marginBottom:'8px'}}>Sprint Board</div>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
          {[{l:'To Do',v:5,c:'#6B7280'},{l:'In Progress',v:3,c:'#FBBF24'},{l:'Done',v:12,c:'#22C55E'}].map(s=>(
            <div key={s.l} style={{textAlign:'center'}}>
              <div style={{color:s.c,fontSize:'16px',fontWeight:800}}>{s.v}</div>
              <div style={{color:'#6B7280',fontSize:'9px'}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{background:'rgba(255,255,255,0.05)',borderRadius:'6px',overflow:'hidden'}}>
          <div style={{height:'4px',background:'linear-gradient(90deg,#22C55E,#4ADE80)',width:'82%'}}></div>
        </div>
        <div style={{color:'#6B7280',fontSize:'9px',marginTop:'4px'}}>82% Sprint Complete</div>
      </div>
    )
  },
  {
    num: '4', title: 'Launch & Grow', sub: 'Real users. Real revenue.',
    card: (
      <div style={cardStyles.base}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
          <span style={{color:'#fff',fontSize:'11px',fontWeight:600}}>Growth</span>
          <span style={{background:'rgba(34,197,94,0.15)',color:'#22C55E',fontSize:'9px',padding:'2px 6px',borderRadius:'10px'}}>● Live</span>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
          {[{l:'Revenue',v:'$12,840',c:'+23%'},{l:'Users',v:'1,249',c:'+18%'},{l:'MRR',v:'$4,200',c:'+31%'}].map(r=>(
            <div key={r.l} style={{display:'flex',justifyContent:'space-between'}}>
              <span style={{color:'#6B7280',fontSize:'10px'}}>{r.l}</span>
              <div><span style={{color:'#fff',fontSize:'11px',fontWeight:700}}>{r.v}</span><span style={{color:'#22C55E',fontSize:'9px',marginLeft:'4px'}}>{r.c}</span></div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    num: '5', title: 'Scale Up', sub: 'Grow your team and revenue',
    card: (
      <div style={cardStyles.base}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:'11px',color:'#6B7280',marginBottom:'6px'}}>Doer Score</div>
          <div style={{width:'52px',height:'52px',margin:'0 auto',borderRadius:'50%',border:'2px solid #22C55E',display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(34,197,94,0.08)'}}>
            <span style={{fontSize:'18px',fontWeight:800,color:'#22C55E'}}>97</span>
          </div>
          <div style={{color:'#22C55E',fontSize:'10px',marginTop:'6px',fontWeight:600}}>🏆 Top Builder</div>
          <div style={{color:'#6B7280',fontSize:'9px',marginTop:'3px'}}>Top 1% of builders</div>
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

const SKILLS_OPTIONS = ['Frontend','Backend','Full Stack','Mobile','AI/ML','Marketing','Design','Product','Sales','Operations','Finance','Data'];

function RegisterPage({ setIsAuth }) {
  const [form, setForm] = useState({ name:'', email:'', password:'', skills:[], hoursPerWeek:'20', bio:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleSkill = (s) => setForm(f => ({
    ...f, skills: f.skills.includes(s) ? f.skills.filter(x => x !== s) : [...f.skills, s]
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        ...form, skills: form.skills.join(',')
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user._id);
      setIsAuth(true);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const focusStyle = (e) => e.target.style.borderColor = '#22C55E';
  const blurStyle = (e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)';

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
          Stop talking.<br/>Start <span style={styles.green}>shipping.</span>
        </h1>
        <p style={styles.tagline}>Join builders who execute. Find your co-founder.<br/>Build your startup. Launch to the world.</p>

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
          <h2 style={styles.formTitle}>Create your account</h2>
          <p style={styles.formSub}>Join 5,000+ builders already shipping.</p>

          <div style={styles.stepIndicator}>
            {[1,2].map(n => (
              <div key={n} style={{...styles.stepDot, background: step >= n ? '#22C55E' : 'rgba(255,255,255,0.1)'}}></div>
            ))}
            <span style={{color:'#6B7280',fontSize:'11px',marginLeft:'8px'}}>Step {step} of 2</span>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div style={styles.fieldWrap}>
                  <label style={styles.label}>Full name</label>
                  <input type="text" name="name" placeholder="Jordan Lee" value={form.name} onChange={handleChange} style={styles.input} required onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div style={styles.fieldWrap}>
                  <label style={styles.label}>Email</label>
                  <input type="email" name="email" placeholder="name@company.com" value={form.email} onChange={handleChange} style={styles.input} required onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div style={styles.fieldWrap}>
                  <label style={styles.label}>Password</label>
                  <div style={{position:'relative'}}>
                    <input type={showPw ? 'text' : 'password'} name="password" placeholder="Min 6 characters" value={form.password} onChange={handleChange} style={{...styles.input,paddingRight:'40px'}} required onFocus={focusStyle} onBlur={blurStyle} />
                    <span onClick={() => setShowPw(!showPw)} style={styles.eyeBtn}>{showPw ? '🙈' : '👁️'}</span>
                  </div>
                </div>
                <button type="button" style={styles.button} onClick={() => { if(form.name && form.email && form.password) setStep(2); else setError('Please fill all fields'); }} className="submit-btn">
                  Continue →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div style={styles.fieldWrap}>
                  <label style={styles.label}>Your Skills</label>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginTop:'4px'}}>
                    {SKILLS_OPTIONS.map(s => (
                      <button key={s} type="button" onClick={() => toggleSkill(s)} style={{
                        padding:'5px 11px', borderRadius:'20px', fontSize:'11px', fontWeight:600, cursor:'pointer', border:'1px solid', transition:'all 0.15s',
                        background: form.skills.includes(s) ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)',
                        borderColor: form.skills.includes(s) ? '#22C55E' : 'rgba(255,255,255,0.1)',
                        color: form.skills.includes(s) ? '#22C55E' : '#9CA3AF'
                      }}>{s}</button>
                    ))}
                  </div>
                </div>
                <div style={styles.fieldWrap}>
                  <label style={styles.label}>Hours per week</label>
                  <select name="hoursPerWeek" value={form.hoursPerWeek} onChange={handleChange} style={styles.input} onFocus={focusStyle} onBlur={blurStyle}>
                    <option value="5">5 hrs/week — Side project</option>
                    <option value="10">10 hrs/week — Part time</option>
                    <option value="20">20 hrs/week — Half time</option>
                    <option value="40">40+ hrs/week — Full time</option>
                  </select>
                </div>
                <div style={{display:'flex',gap:'10px'}}>
                  <button type="button" style={{...styles.button, background:'rgba(255,255,255,0.06)', color:'#fff', boxShadow:'none', flex:1}} onClick={() => setStep(1)} className="submit-btn">
                    ← Back
                  </button>
                  <button type="submit" style={{...styles.button, flex:2}} disabled={loading} className="submit-btn">
                    {loading ? 'Creating...' : 'Create account'}
                  </button>
                </div>
              </>
            )}
          </form>

          <p style={styles.footer}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={styles.link}>Sign in</span>
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
        @keyframes glowPulse { 0%,100% { opacity:0.4; } 50% { opacity:0.7; } }
        .form-box { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1); }
        .step-item { animation: slideIn 0.5s ease forwards; opacity:0; }
        .step-item-0 { animation-delay:0.1s; }
        .step-item-1 { animation-delay:0.2s; }
        .step-item-2 { animation-delay:0.3s; }
        .step-item-3 { animation-delay:0.4s; }
        .step-item-4 { animation-delay:0.5s; }
        .submit-btn:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 8px 25px rgba(34,197,94,0.35); }
        .submit-btn:active:not(:disabled) { transform:translateY(0); }
        input::placeholder { color:#4B5563; }
        select option { background:#111; color:#fff; }
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
  left: { flex:1, position:'relative', padding:'36px 40px 36px', overflowY:'auto', display:'flex', flexDirection:'column' },
  glowTop: {
    position:'absolute', top:'-100px', left:'-50px', width:'400px', height:'400px', borderRadius:'50%',
    background:'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)',
    filter:'blur(40px)', animation:'glowPulse 4s ease-in-out infinite', pointerEvents:'none'
  },
  glowBottom: {
    position:'absolute', bottom:'-80px', right:'10%', width:'300px', height:'300px', borderRadius:'50%',
    background:'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)',
    filter:'blur(40px)', animation:'glowPulse 5s ease-in-out infinite 1s', pointerEvents:'none'
  },
  brand: { display:'flex', alignItems:'center', gap:'10px', marginBottom:'28px', position:'relative', zIndex:2 },
  brandIcon: { width:'36px', height:'36px', borderRadius:'8px', background:'linear-gradient(135deg,#22C55E,#16A34A)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', fontWeight:800, color:'#000' },
  brandName: { color:'#fff', fontWeight:800, fontSize:'18px' },
  headline: { color:'#fff', fontSize:'clamp(24px,2.5vw,38px)', fontWeight:900, lineHeight:1.15, margin:'0 0 10px', position:'relative', zIndex:2, letterSpacing:'-0.5px' },
  green: { color:'#22C55E' },
  tagline: { color:'#6B7280', fontSize:'13px', lineHeight:1.6, marginBottom:'32px', position:'relative', zIndex:2 },
  journey: { display:'flex', gap:'0', alignItems:'flex-start', overflowX:'auto', paddingBottom:'12px', position:'relative', zIndex:2 },
  step: { display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', position:'relative', flexShrink:0 },
  stepArrow: { position:'absolute', right:'-18px', top:'30px', color:'#22C55E', fontSize:'16px', zIndex:3 },
  stepHeader: { display:'flex', alignItems:'flex-start', gap:'8px', paddingRight:'20px', paddingLeft:'4px', minWidth:'160px', maxWidth:'185px' },
  stepNum: { width:'22px', height:'22px', borderRadius:'50%', flexShrink:0, border:'1px solid #22C55E', color:'#22C55E', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:700 },
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
  right: { width:'400px', flexShrink:0, display:'flex', justifyContent:'center', alignItems:'center', padding:'24px', background:'rgba(10,15,10,0.6)', borderLeft:'1px solid rgba(34,197,94,0.08)', position:'relative', zIndex:2, overflowY:'auto' },
  formBox: { width:'100%', maxWidth:'340px', background:'rgba(13,18,13,0.8)', backdropFilter:'blur(20px)', border:'1px solid rgba(34,197,94,0.12)', borderRadius:'16px', padding:'32px 28px', boxShadow:'0 20px 60px rgba(0,0,0,0.5)' },
  formTitle: { color:'#fff', fontSize:'20px', fontWeight:800, margin:'0 0 4px', textAlign:'center' },
  formSub: { color:'#6B7280', fontSize:'12px', textAlign:'center', margin:'0 0 16px' },
  stepIndicator: { display:'flex', alignItems:'center', gap:'6px', marginBottom:'20px' },
  stepDot: { width:'28px', height:'4px', borderRadius:'2px', transition:'background 0.3s' },
  fieldWrap: { marginBottom:'14px' },
  label: { display:'block', color:'#9CA3AF', fontSize:'13px', fontWeight:500, marginBottom:'6px' },
  input: { width:'100%', padding:'10px 14px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', fontSize:'13px', color:'#fff', boxSizing:'border-box', outline:'none', transition:'border-color 0.2s' },
  eyeBtn: { position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', cursor:'pointer', fontSize:'14px' },
  button: { width:'100%', padding:'12px', background:'linear-gradient(135deg,#22C55E,#16A34A)', color:'#000', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'14px', fontWeight:800, transition:'all 0.2s ease', boxShadow:'0 4px 15px rgba(34,197,94,0.3)', marginTop:'6px' },
  error: { color:'#FCA5A5', padding:'10px 14px', marginBottom:'14px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:'8px', fontSize:'12px' },
  footer: { textAlign:'center', marginTop:'18px', color:'#6B7280', fontSize:'12px' },
  link: { color:'#22C55E', cursor:'pointer', fontWeight:700 },
  securityNote: { display:'flex', alignItems:'center', gap:'8px', marginTop:'14px', padding:'10px 12px', background:'rgba(34,197,94,0.05)', borderRadius:'8px', border:'1px solid rgba(34,197,94,0.1)' }
};

export default RegisterPage;
