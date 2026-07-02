import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

/* ══════════════════════════════════════════════════════════════
   DESIGN TOKENS (identical to LoginPage)
══════════════════════════════════════════════════════════════ */
const G    = '#4ADE80';
const GD   = '#22C55E';
const GG   = 'rgba(74,222,128,0.13)';
const GG2  = 'rgba(74,222,128,0.05)';
const GB   = 'rgba(74,222,128,0.24)';
const BG   = '#08100a';
const BG2  = '#0c150d';
const BD   = 'rgba(255,255,255,0.06)';
const WH   = '#EFFFEF';
const MT   = 'rgba(239,255,239,0.42)';
const MT2  = 'rgba(239,255,239,0.70)';

/* ══════════════════════════════════════════════════════════════
   MINI CARD: CREATE PROFILE
══════════════════════════════════════════════════════════════ */
function ProfileSetupCard() {
  return (
    <div style={{background:'rgba(255,255,255,0.03)',borderRadius:'10px',padding:'10px',border:`1px solid ${BD}`}}>
      <div style={{fontSize:'10px',fontWeight:700,color:WH,marginBottom:'8px',display:'flex',alignItems:'center',gap:'5px'}}>
        <span style={{color:G}}>✦</span> Your Profile
      </div>
      {[{label:'Name',val:'Alex Rivera',fill:100},{label:'Role',val:'Full Stack Dev',fill:100},{label:'Skills',val:'React, Node…',fill:80}].map(({label,val,fill})=>(
        <div key={label} style={{marginBottom:'5px'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'2px'}}>
            <span style={{fontSize:'8px',color:MT}}>{label}</span>
            <span style={{fontSize:'8px',color:G}}>{fill}%</span>
          </div>
          <div style={{height:'2px',borderRadius:'999px',background:'rgba(255,255,255,0.07)'}}>
            <div style={{height:'100%',width:`${fill}%`,borderRadius:'999px',background:`linear-gradient(90deg,${GD},${G})`}}/>
          </div>
          <div style={{fontSize:'9px',color:MT2,marginTop:'2px'}}>{val}</div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MINI CARD: GET VERIFIED
══════════════════════════════════════════════════════════════ */
function VerifyCard() {
  return (
    <div style={{background:'rgba(255,255,255,0.03)',borderRadius:'10px',padding:'10px',border:`1px solid ${BD}`}}>
      <div style={{fontSize:'10px',fontWeight:700,color:WH,marginBottom:'7px'}}>Verification</div>
      {[
        {skill:'Frontend',level:'Expert',pct:92},
        {skill:'Backend',level:'Advanced',pct:78},
        {skill:'Design',level:'Proficient',pct:65},
      ].map(({skill,level,pct})=>(
        <div key={skill} style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'5px'}}>
          <span style={{fontSize:'8px',color:MT2,width:'52px',flexShrink:0}}>{skill}</span>
          <div style={{flex:1,height:'4px',borderRadius:'999px',background:'rgba(255,255,255,0.07)'}}>
            <div style={{height:'100%',width:`${pct}%`,borderRadius:'999px',background:`linear-gradient(90deg,${GD},${G})`,boxShadow:`0 0 4px ${GG}`}}/>
          </div>
          <span style={{fontSize:'8px',color:G,fontWeight:600,width:'28px',textAlign:'right',flexShrink:0}}>{pct}</span>
        </div>
      ))}
      <div style={{marginTop:'6px',display:'flex',gap:'4px',flexWrap:'wrap'}}>
        {['Verified ✓','Doer Score'].map(b=>(
          <span key={b} style={{fontSize:'8px',padding:'2px 5px',borderRadius:'4px',background:GG2,border:`1px solid ${GB}`,color:G}}>{b}</span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MINI CARD: AI MATCHING
══════════════════════════════════════════════════════════════ */
function AIMatchCard() {
  const r = 20, circ = 2 * Math.PI * r;
  return (
    <div style={{background:'rgba(255,255,255,0.03)',borderRadius:'10px',padding:'10px',border:`1px solid ${BD}`}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
        <span style={{fontSize:'10px',fontWeight:700,color:WH}}>AI Match</span>
        <span style={{display:'flex',alignItems:'center',gap:'3px',fontSize:'8px',color:G}}>
          <span style={{width:'4px',height:'4px',borderRadius:'50%',background:G,display:'inline-block'}}/>Scanning
        </span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'7px'}}>
        <svg width="44" height="44" viewBox="0 0 44 44" style={{transform:'rotate(-90deg)',flexShrink:0}}>
          <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
          <circle cx="22" cy="22" r={r} fill="none" stroke={G} strokeWidth="3"
            strokeDasharray={`${circ*.87} ${circ}`} strokeLinecap="round"
            style={{filter:`drop-shadow(0 0 5px ${G})`}}/>
          <text x="22" y="22" textAnchor="middle" dominantBaseline="central" fill={G} fontSize="11" fontWeight="800" style={{transform:'rotate(90deg)',transformOrigin:'center'}}>87</text>
        </svg>
        <div>
          <div style={{fontSize:'10px',fontWeight:700,color:G}}>87% Match</div>
          <div style={{fontSize:'8px',color:MT,marginTop:'2px'}}>2,400+ founders analysed</div>
          <div style={{fontSize:'8px',color:MT2,marginTop:'1px'}}>5 perfect matches found</div>
        </div>
      </div>
      <div style={{display:'flex',gap:'-4px'}}>
        {['#7C3AED','#0891B2','#BE185D','#D97706','#16A34A'].map((c,i)=>(
          <div key={i} style={{width:'20px',height:'20px',borderRadius:'50%',background:c,border:`2px solid ${BG2}`,marginLeft:i>0?'-5px':0,zIndex:5-i,fontSize:'7px',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700}}>
            {['A','J','P','M','E'][i]}
          </div>
        ))}
        <span style={{fontSize:'8px',color:MT,marginLeft:'8px',alignSelf:'center'}}>Top picks</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MINI CARD: JOIN A TEAM
══════════════════════════════════════════════════════════════ */
function JoinTeamCard() {
  return (
    <div style={{background:'rgba(255,255,255,0.03)',borderRadius:'10px',padding:'10px',border:`1px solid ${BD}`}}>
      <div style={{fontSize:'10px',fontWeight:700,color:WH,marginBottom:'6px'}}>Team Formed 🎉</div>
      <div style={{display:'flex',gap:'4px',marginBottom:'7px'}}>
        {[{i:'AR',c:'#7C3AED',r:'CTO'},{i:'JK',c:'#0891B2',r:'CPO'},{i:'AB',c:'#BE185D',r:'CMO'}].map(({i,c,r})=>(
          <div key={r} style={{flex:1,background:'rgba(255,255,255,0.03)',border:`1px solid ${BD}`,borderRadius:'7px',padding:'5px 4px',textAlign:'center'}}>
            <div style={{width:'22px',height:'22px',borderRadius:'50%',background:c,margin:'0 auto 4px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'8px',fontWeight:700,color:'#fff'}}>{i}</div>
            <div style={{fontSize:'8px',color:G,fontWeight:600}}>{r}</div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'4px',padding:'5px 6px',background:GG2,border:`1px solid ${GB}`,borderRadius:'6px'}}>
        <span style={{fontSize:'10px'}}>⚡</span>
        <span style={{fontSize:'9px',color:MT2}}>Ready to ship</span>
        <span style={{fontSize:'9px',color:G,fontWeight:600,marginLeft:'auto'}}>Today</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MINI CARD: SHIP & SCALE
══════════════════════════════════════════════════════════════ */
function ShipScaleCard() {
  return (
    <div style={{background:'rgba(255,255,255,0.03)',borderRadius:'10px',padding:'10px',border:`1px solid ${BD}`}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'6px'}}>
        <span style={{fontSize:'10px',fontWeight:700,color:WH}}>Launched! 🚀</span>
        <span style={{fontSize:'8px',padding:'2px 5px',borderRadius:'999px',background:GG,border:`1px solid ${GB}`,color:G}}>● Live</span>
      </div>
      {[
        {label:'MRR',val:'$12,480',up:'+34%'},
        {label:'Users',val:'8,240',up:'+28%'},
      ].map(({label,val,up})=>(
        <div key={label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'4px 0',borderBottom:`1px solid ${BD}`}}>
          <div>
            <div style={{fontSize:'8px',color:MT}}>{label}</div>
            <div style={{fontSize:'12px',fontWeight:800,color:WH}}>{val}</div>
          </div>
          <span style={{fontSize:'10px',color:G,fontWeight:700}}>{up}</span>
        </div>
      ))}
      <div style={{display:'flex',alignItems:'flex-end',gap:'2px',height:'24px',marginTop:'6px'}}>
        {[30,45,38,55,48,65,58,80].map((h,i)=>(
          <div key={i} style={{flex:1,height:`${h}%`,background:`linear-gradient(180deg,${G}99,${GD}55)`,borderRadius:'2px 2px 0 0'}}/>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   JOURNEY STEPS
══════════════════════════════════════════════════════════════ */
const STEPS = [
  { num:1, title:'Create Your Profile', sub:'Define your skills & vision in 5 min',        Card: ProfileSetupCard },
  { num:2, title:'Get Verified',        sub:'Your Doer Score proves your track record',     Card: VerifyCard       },
  { num:3, title:'AI Matches You',      sub:'87%+ compatibility — not just vibes',           Card: AIMatchCard      },
  { num:4, title:'Join a Team',         sub:"Roles assigned. Equity set. You're in.",       Card: JoinTeamCard     },
  { num:5, title:'Ship & Scale',        sub:'Launch live. Grow MRR. Build your legacy.',    Card: ShipScaleCard    },
];

const LOGOS = [
  {icon:'stripe',label:'stripe'},{icon:'▲',label:'vercel'},{icon:'◈',label:'linear'},
  {icon:'⚡',label:'supabase'},{icon:'⊛',label:'openai'},{icon:'⌘',label:'tailwindcss'},
];

const TRUST = [
  {icon:'🛡',label:'Verified Builders',sub:'Real people. Real skills.'},
  {icon:'✓', label:'Real Execution',   sub:'Tasks. Deadlines. Results.'},
  {icon:'🏆',label:'Doer Score™',      sub:'Reputation that grows.'},
  {icon:'🚀',label:'Ship & Scale',     sub:'Launch. Grow. Succeed.'},
];

const AVATARS = [
  {i:'PP',c:'#7C3AED'},{i:'JK',c:'#0891B2'},{i:'AB',c:'#BE185D'},
  {i:'MS',c:'#D97706'},{i:'EC',c:'#16A34A'},
];

/* ══════════════════════════════════════════════════════════════
   PASSWORD STRENGTH
══════════════════════════════════════════════════════════════ */
function getStrength(pw) {
  if (!pw) return {score:0,label:'',color:''};
  let s = 0;
  if (pw.length>=8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const m = [
    {label:'',color:''},
    {label:'Weak',color:'#F87171'},
    {label:'Fair',color:'#FBBF24'},
    {label:'Good',color:'#60A5FA'},
    {label:'Strong',color:G},
  ];
  return {score:s,...m[s]};
}

/* ══════════════════════════════════════════════════════════════
   SPINNER
══════════════════════════════════════════════════════════════ */
function Spinner() {
  return <span style={{width:'15px',height:'15px',border:'2px solid rgba(0,0,0,0.2)',borderTopColor:'#000',borderRadius:'50%',display:'inline-block',animation:'spin .65s linear infinite'}}/>;
}

/* ══════════════════════════════════════════════════════════════
   REGISTER PAGE
══════════════════════════════════════════════════════════════ */
export default function RegisterPage({ setIsAuth }) {
  const [form, setForm] = useState({name:'',email:'',password:'',confirmPassword:'',skills:'',hoursPerWeek:'20'});
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [focused, setFocused]       = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setActiveStep(p => (p + 1) % STEPS.length), 2800);
    return () => clearInterval(t);
  }, []);

  const handleChange = (e) => {
    setForm(p => ({...p, [e.target.name]: e.target.value}));
    if (error) setError('');
  };

  /* progress bar */
  const filled   = Object.values(form).filter(v => String(v).trim() !== '').length;
  const progress = Math.round((filled / 6) * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true); setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user._id);
      setIsAuth(true);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inpStyle = (name, extra={}) => ({
    width:'100%',padding:'10px 12px 10px 38px',background:'rgba(255,255,255,0.04)',
    border:`1px solid ${focused===name ? G : 'rgba(255,255,255,0.08)'}`,borderRadius:'9px',
    color:WH,fontSize:'13px',outline:'none',transition:'all .2s',boxSizing:'border-box',
    fontFamily:'inherit',boxShadow:focused===name?`0 0 0 3px ${GG}`:undefined,...extra,
  });

  const strength = getStrength(form.password);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;}
        @keyframes spin    {to{transform:rotate(360deg)}}
        @keyframes pulse   {0%,100%{opacity:1}50%{opacity:.35}}
        @keyframes fadeUp  {from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes marquee {from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .step-card   {transition:all .45s cubic-bezier(.16,1,.3,1);}
        .oauth-btn   {transition:all .2s;cursor:pointer;}
        .oauth-btn:hover{background:rgba(255,255,255,0.08)!important;border-color:rgba(255,255,255,0.18)!important;}
        .reg-btn:not(:disabled):hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(74,222,128,.45)!important;}
        .reg-btn{transition:all .2s;}
        input::placeholder{color:rgba(239,255,239,.22);}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        ::-webkit-scrollbar{display:none;}
      `}</style>

      <div style={{minHeight:'100vh',display:'flex',background:BG,fontFamily:"'Inter',-apple-system,sans-serif",overflow:'hidden',position:'relative'}}>

        {/* ══ LEFT PANEL ══ */}
        <div style={{flex:'0 0 58%',display:'flex',flexDirection:'column',padding:'32px 40px 24px',position:'relative',overflow:'hidden',
          background:`radial-gradient(ellipse 70% 50% at 20% 0%,rgba(74,222,128,.07) 0%,transparent 55%),
                      radial-gradient(ellipse 50% 40% at 90% 90%,rgba(74,222,128,.04) 0%,transparent 55%),${BG}`}}>

          {/* grid overlay */}
          <div style={{position:'absolute',inset:0,backgroundImage:`linear-gradient(${BD} 1px,transparent 1px),linear-gradient(90deg,${BD} 1px,transparent 1px)`,backgroundSize:'52px 52px',opacity:.35,pointerEvents:'none'}}/>
          <div style={{position:'absolute',top:'-80px',left:'-80px',width:'400px',height:'400px',borderRadius:'50%',background:`radial-gradient(circle,rgba(74,222,128,.09) 0%,transparent 70%)`,filter:'blur(60px)',pointerEvents:'none'}}/>

          {/* Brand */}
          <div style={{position:'relative',zIndex:2,display:'flex',alignItems:'center',gap:'10px',marginBottom:'28px'}}>
            <div style={{width:'34px',height:'34px',borderRadius:'9px',background:`linear-gradient(135deg,${G},${GD})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',boxShadow:`0 0 20px ${GG}`,fontWeight:900,color:'#000'}}>⚡</div>
            <span style={{fontSize:'19px',fontWeight:800,color:WH,letterSpacing:'-0.3px'}}>CoBuilder</span>
            <span style={{fontSize:'11px',padding:'3px 8px',borderRadius:'999px',background:GG2,border:`1px solid ${GB}`,color:G,fontWeight:600,letterSpacing:'.5px',marginLeft:'4px'}}>BETA</span>
          </div>

          {/* Hero */}
          <div style={{position:'relative',zIndex:2,marginBottom:'28px'}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:'6px',fontSize:'11px',fontWeight:600,color:G,letterSpacing:'1px',textTransform:'uppercase',background:GG2,border:`1px solid ${GB}`,borderRadius:'999px',padding:'4px 12px',marginBottom:'14px'}}>
              <span style={{width:'5px',height:'5px',borderRadius:'50%',background:G,display:'inline-block',boxShadow:`0 0 8px ${G}`,animation:'pulse 2s ease-in-out infinite'}}/>
              Join 2,400+ builders
            </div>
            <h1 style={{fontSize:'clamp(26px,2.8vw,40px)',fontWeight:900,color:WH,margin:'0 0 10px',lineHeight:1.12,letterSpacing:'-1.5px'}}>
              Stop talking.<br/>
              Start{' '}
              <span style={{color:G,textShadow:`0 0 30px ${GG}`}}>shipping.</span>
            </h1>
            <p style={{fontSize:'14px',color:MT2,margin:'0 0 4px',lineHeight:1.6}}>CoBuilder matches you with co-founders who execute — not just dream.</p>
            <p style={{fontSize:'13px',color:MT,margin:0}}>Your Doer Score tells the truth.</p>
          </div>

          {/* Step Journey */}
          <div style={{position:'relative',zIndex:2,marginBottom:'18px',flex:1}}>
            {/* Connecting line */}
            <div style={{position:'absolute',top:'38px',left:'20px',right:'20px',height:'1px',background:`linear-gradient(90deg,transparent,${GB} 10%,${GB} 90%,transparent)`,zIndex:0}}/>

            <div style={{display:'flex',gap:'12px'}}>
              {STEPS.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <div key={step.num} className="step-card" style={{flex:'0 0 calc(20% - 10px)',display:'flex',flexDirection:'column',alignItems:'center',gap:'8px'}}>
                    {/* Badge */}
                    <div style={{
                      width:'28px',height:'28px',borderRadius:'50%',
                      background: isActive ? G : BG2,
                      border:`2px solid ${isActive ? G : BD}`,
                      display:'flex',alignItems:'center',justifyContent:'center',
                      fontSize:'11px',fontWeight:800,
                      color: isActive ? '#000' : MT2,
                      boxShadow: isActive ? `0 0 24px ${GG},0 0 50px ${GG2}` : 'none',
                      transition:'all .45s',position:'relative',zIndex:1,flexShrink:0,
                    }}>{step.num}</div>

                    {/* Card */}
                    <div style={{
                      width:'100%',borderRadius:'12px',
                      border:`1px solid ${isActive ? GB : BD}`,
                      background: isActive ? `linear-gradient(145deg,rgba(74,222,128,.08),rgba(74,222,128,.02))` : 'rgba(255,255,255,0.02)',
                      boxShadow: isActive ? `0 0 30px ${GG2},0 4px 24px rgba(0,0,0,.3)` : '0 2px 12px rgba(0,0,0,.2)',
                      transition:'all .45s cubic-bezier(.16,1,.3,1)',
                      transform: isActive ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                      padding:'8px',overflow:'hidden',
                    }}>
                      <step.Card />
                    </div>

                    {/* Title */}
                    <div style={{textAlign:'center',width:'100%'}}>
                      <div style={{fontSize:'10px',fontWeight:700,color:isActive?G:MT2,lineHeight:1.3,transition:'color .4s'}}>{step.title}</div>
                      <div style={{fontSize:'8px',color:MT,lineHeight:1.4,marginTop:'2px'}}>{step.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dot indicators */}
            <div style={{display:'flex',justifyContent:'center',gap:'5px',marginTop:'14px'}}>
              {STEPS.map((_,i)=>(
                <div key={i} style={{width:i===activeStep?18:5,height:'4px',borderRadius:'999px',background:i===activeStep?G:BD,transition:'all .4s'}}/>
              ))}
            </div>
          </div>

          {/* Social proof */}
          <div style={{position:'relative',zIndex:2,display:'flex',alignItems:'center',gap:'14px',marginBottom:'12px'}}>
            <div style={{display:'flex',alignItems:'center'}}>
              {AVATARS.map(({i,c},idx)=>(
                <div key={i} style={{width:'30px',height:'30px',borderRadius:'50%',background:c,border:`2px solid ${BG}`,marginLeft:idx>0?'-7px':0,zIndex:AVATARS.length-idx,fontSize:'10px',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:800}}>{i}</div>
              ))}
            </div>
            <div>
              <div style={{fontSize:'13px',fontWeight:600,color:WH}}>2,400+ founders</div>
              <div style={{fontSize:'11px',color:MT}}>launched on CoBuilder</div>
            </div>
          </div>

          {/* Trusted logos */}
          <div style={{position:'relative',zIndex:2,marginBottom:'12px'}}>
            <div style={{overflow:'hidden',WebkitMaskImage:'linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent)'}}>
              <div style={{display:'flex',gap:'28px',animation:'marquee 22s linear infinite',width:'max-content'}}>
                {[...LOGOS,...LOGOS].map((l,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'5px',opacity:.4,fontSize:'12px',fontWeight:600,color:MT2,whiteSpace:'nowrap',letterSpacing:'.3px'}}>
                    <span style={{fontSize:'10px'}}>{l.icon}</span>{l.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{position:'relative',zIndex:2,display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'8px'}}>
            {TRUST.map(t=>(
              <div key={t.label} style={{display:'flex',alignItems:'flex-start',gap:'7px',padding:'8px 10px',background:'rgba(255,255,255,0.02)',border:`1px solid ${BD}`,borderRadius:'10px'}}>
                <span style={{fontSize:'13px',flexShrink:0}}>{t.icon}</span>
                <div>
                  <div style={{fontSize:'10px',fontWeight:700,color:MT2}}>{t.label}</div>
                  <div style={{fontSize:'9px',color:MT}}>{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'28px 36px',background:BG2,borderLeft:`1px solid ${BD}`,position:'relative',overflow:'hidden',overflowY:'auto'}}>
          <div style={{position:'absolute',top:'-80px',right:'-80px',width:'300px',height:'300px',borderRadius:'50%',background:`radial-gradient(circle,${GG2} 0%,transparent 70%)`,filter:'blur(50px)',pointerEvents:'none'}}/>

          <div style={{width:'100%',maxWidth:'380px',position:'relative',zIndex:2,animation:'fadeUp .5s ease both'}}>

            {/* Header */}
            <div style={{marginBottom:'22px'}}>
              <h2 style={{fontSize:'22px',fontWeight:800,color:WH,margin:'0 0 5px',letterSpacing:'-0.5px'}}>Create your account</h2>
              <p style={{fontSize:'13px',color:MT,margin:0}}>
                Already a builder?{' '}
                <Link to="/login" style={{color:G,textDecoration:'none',fontWeight:700}}>Sign in →</Link>
              </p>
            </div>

            {/* OAuth */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'18px'}}>
              <button type="button" className="oauth-btn" onClick={()=>alert('Google OAuth — connect in backend')} style={{
                display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                padding:'10px 12px',background:'rgba(255,255,255,0.04)',
                border:`1px solid rgba(255,255,255,0.09)`,borderRadius:'9px',
                color:MT2,fontSize:'13px',fontWeight:500,fontFamily:'inherit',
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button type="button" className="oauth-btn" onClick={()=>alert('GitHub OAuth — connect in backend')} style={{
                display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                padding:'10px 12px',background:'rgba(255,255,255,0.04)',
                border:`1px solid rgba(255,255,255,0.09)`,borderRadius:'9px',
                color:MT2,fontSize:'13px',fontWeight:500,fontFamily:'inherit',
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub
              </button>
            </div>

            {/* Divider */}
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'18px'}}>
              <div style={{flex:1,height:'1px',background:BD}}/>
              <span style={{fontSize:'12px',color:MT}}>or register with email</span>
              <div style={{flex:1,height:'1px',background:BD}}/>
            </div>

            {/* Progress bar */}
            <div style={{marginBottom:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
                <span style={{fontSize:'11px',color:MT}}>Profile completion</span>
                <span style={{fontSize:'11px',color:progress>0?G:MT,fontWeight:600}}>{progress}%</span>
              </div>
              <div style={{height:'3px',borderRadius:'999px',background:'rgba(255,255,255,0.06)'}}>
                <div style={{height:'100%',width:`${progress}%`,borderRadius:'999px',background:`linear-gradient(90deg,${GD},${G})`,transition:'width .4s ease',boxShadow:progress>0?`0 0 8px ${GG}`:undefined}}/>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{padding:'10px 14px',background:'rgba(252,129,129,0.07)',border:'1px solid rgba(252,129,129,0.18)',borderRadius:'9px',color:'#FC8181',fontSize:'12px',marginBottom:'14px',display:'flex',gap:'8px',alignItems:'center'}}>
                <span style={{fontSize:'13px',flexShrink:0}}>⚠️</span>{error}
              </div>
            )}

            <form onSubmit={handleSubmit} autoComplete="off">
              {/* Row 1: Name + Email */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'10px'}}>
                {[
                  {name:'name', label:'Full Name', type:'text', ph:'e.g. Alex Rivera', icon:'👤'},
                  {name:'email',label:'Email',     type:'email',ph:'you@startup.com', icon:'✉️'},
                ].map(f=>(
                  <div key={f.name}>
                    <label style={{display:'block',fontSize:'11px',fontWeight:600,color:MT2,marginBottom:'5px'}}>{f.label}</label>
                    <div style={{position:'relative'}}>
                      <span style={{position:'absolute',left:'10px',top:'50%',transform:'translateY(-50%)',fontSize:'12px',opacity:.5,pointerEvents:'none'}}>{f.icon}</span>
                      <input id={`reg-${f.name}`} name={f.name} type={f.type} value={form[f.name]}
                        placeholder={f.ph} required onChange={handleChange}
                        onFocus={()=>setFocused(f.name)} onBlur={()=>setFocused('')}
                        style={inpStyle(f.name)} autoComplete="off"/>
                    </div>
                  </div>
                ))}
              </div>

              {/* Password */}
              <div style={{marginBottom:'10px'}}>
                <label style={{display:'block',fontSize:'11px',fontWeight:600,color:MT2,marginBottom:'5px'}}>Password</label>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:'10px',top:'50%',transform:'translateY(-50%)',fontSize:'12px',opacity:.5,pointerEvents:'none'}}>🔑</span>
                  <input id="reg-password" name="password" type="password" value={form.password}
                    placeholder="Min 8 chars — make it strong" required onChange={handleChange}
                    onFocus={()=>setFocused('password')} onBlur={()=>setFocused('')}
                    style={inpStyle('password')} autoComplete="new-password"/>
                </div>
                {form.password && (
                  <>
                    <div style={{display:'flex',gap:'4px',marginTop:'6px'}}>
                      {[1,2,3,4].map(n=>(
                        <div key={n} style={{flex:1,height:'3px',borderRadius:'999px',background:strength.score>=n?strength.color:'rgba(255,255,255,0.07)',transition:'background .3s'}}/>
                      ))}
                    </div>
                    {strength.label && <p style={{fontSize:'11px',color:strength.color,margin:'4px 0 0',fontWeight:500}}>{strength.label}</p>}
                  </>
                )}
              </div>

              {/* Confirm Password */}
              <div style={{marginBottom:'10px'}}>
                <label style={{display:'block',fontSize:'11px',fontWeight:600,color:MT2,marginBottom:'5px'}}>Confirm Password</label>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:'10px',top:'50%',transform:'translateY(-50%)',fontSize:'12px',opacity:.5,pointerEvents:'none'}}>✅</span>
                  <input id="reg-confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword}
                    placeholder="Repeat your password" required onChange={handleChange}
                    onFocus={()=>setFocused('confirmPassword')} onBlur={()=>setFocused('')}
                    style={inpStyle('confirmPassword',{
                      borderColor: form.confirmPassword && form.confirmPassword!==form.password ? '#F87171'
                        : focused==='confirmPassword' ? G : 'rgba(255,255,255,0.08)',
                    })} autoComplete="new-password"/>
                </div>
                {form.confirmPassword && form.confirmPassword!==form.password && (
                  <p style={{fontSize:'11px',color:'#F87171',margin:'4px 0 0'}}>Passwords don't match</p>
                )}
              </div>

              {/* Row 2: Skills + Hours */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'18px'}}>
                {[
                  {name:'skills',      label:'Your Skills',  type:'text',  ph:'React, Node, Figma',icon:'⚡'},
                  {name:'hoursPerWeek',label:'Hours / week', type:'number',ph:'20',                icon:'⏱️'},
                ].map(f=>(
                  <div key={f.name}>
                    <label style={{display:'block',fontSize:'11px',fontWeight:600,color:MT2,marginBottom:'5px'}}>{f.label}</label>
                    <div style={{position:'relative'}}>
                      <span style={{position:'absolute',left:'10px',top:'50%',transform:'translateY(-50%)',fontSize:'12px',opacity:.5,pointerEvents:'none'}}>{f.icon}</span>
                      <input id={`reg-${f.name}`} name={f.name} type={f.type} value={form[f.name]}
                        placeholder={f.ph} onChange={handleChange}
                        onFocus={()=>setFocused(f.name)} onBlur={()=>setFocused('')}
                        style={inpStyle(f.name)}
                        min={f.name==='hoursPerWeek'?1:undefined}
                        max={f.name==='hoursPerWeek'?80:undefined}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit */}
              <button id="reg-submit" type="submit" disabled={loading} className="reg-btn" style={{
                width:'100%',padding:'13px',
                background:`linear-gradient(135deg,${G},${GD})`,
                border:'none',borderRadius:'10px',color:'#000',fontSize:'14px',fontWeight:800,
                cursor:loading?'not-allowed':'pointer',
                display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                boxShadow:`0 4px 24px ${GG}`,opacity:loading?.7:1,fontFamily:'inherit',letterSpacing:'.1px',
              }}>
                {loading ? <><Spinner/><span style={{color:'rgba(0,0,0,0.6)'}}>Creating account…</span></> : '🚀 Create My Account'}
              </button>
            </form>

            {/* Legal */}
            <p style={{fontSize:'11px',color:MT,textAlign:'center',marginTop:'14px',lineHeight:1.6}}>
              By signing up you agree to our{' '}
              <span style={{color:MT2,textDecoration:'underline',textDecorationColor:BD,cursor:'pointer'}}>Terms of Service</span>{' '}and{' '}
              <span style={{color:MT2,textDecoration:'underline',textDecorationColor:BD,cursor:'pointer'}}>Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
