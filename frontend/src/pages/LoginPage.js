import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

/* ══════════════════════════════════════════════════════════════
   DESIGN TOKENS
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
   MINI CARD: FOUNDER MATCHED
══════════════════════════════════════════════════════════════ */
function FounderCard() {
  return (
    <div style={{background:'rgba(255,255,255,0.03)',borderRadius:'10px',padding:'10px',border:`1px solid ${BD}`}}>
      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}>
        <div style={{width:'34px',height:'34px',borderRadius:'50%',background:'linear-gradient(135deg,#7C3AED,#3B82F6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:800,color:'#fff',flexShrink:0,boxShadow:'0 0 10px rgba(124,58,237,0.4)'}}>AR</div>
        <div>
          <div style={{fontSize:'11px',fontWeight:700,color:WH,lineHeight:1.2}}>Alex Rivera</div>
          <div style={{fontSize:'9px',color:MT}}>Full Stack Developer</div>
        </div>
      </div>
      <div style={{display:'flex',gap:'3px',flexWrap:'wrap',marginBottom:'8px'}}>
        {['React','Node.js','TypeScript'].map(s=>(
          <span key={s} style={{fontSize:'8px',padding:'2px 5px',borderRadius:'4px',background:GG2,border:`1px solid ${GB}`,color:G}}>{s}</span>
        ))}
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:GG2,borderRadius:'6px',padding:'5px 8px',border:`1px solid ${GB}`}}>
        <span style={{fontSize:'9px',color:MT}}>Doer Score</span>
        <span style={{fontSize:'15px',fontWeight:800,color:G,textShadow:`0 0 12px ${G}`}}>78</span>
      </div>
      <div style={{fontSize:'8px',color:MT,marginTop:'5px',textAlign:'center'}}>Top 20% of builders</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MINI CARD: TRIAL TASK
══════════════════════════════════════════════════════════════ */
function TaskCard() {
  return (
    <div style={{background:'rgba(255,255,255,0.03)',borderRadius:'10px',padding:'10px',border:`1px solid ${BD}`}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'5px'}}>
        <span style={{fontSize:'11px',fontWeight:700,color:WH}}>Trial Task</span>
        <span style={{fontSize:'8px',padding:'2px 6px',borderRadius:'999px',background:GG,border:`1px solid ${GB}`,color:G,display:'flex',alignItems:'center',gap:'3px'}}>
          <span style={{width:'4px',height:'4px',borderRadius:'50%',background:G,display:'inline-block'}}/>In Progress
        </span>
      </div>
      <p style={{fontSize:'9px',color:MT2,margin:'0 0 8px',lineHeight:1.5}}>Build a landing page<br/>with payments</p>
      <div style={{marginBottom:'5px'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'3px'}}>
          <span style={{fontSize:'8px',color:MT}}>Progress</span>
          <span style={{fontSize:'8px',color:G,fontWeight:700}}>75%</span>
        </div>
        <div style={{height:'3px',borderRadius:'999px',background:'rgba(255,255,255,0.07)'}}>
          <div style={{height:'100%',width:'75%',borderRadius:'999px',background:`linear-gradient(90deg,${GD},${G})`,boxShadow:`0 0 8px ${GG}`}}/>
        </div>
      </div>
      <div style={{fontSize:'9px',color:MT}}>⏱ Deadline: <span style={{color:'#FBBF24',fontWeight:600}}>23h 45m</span></div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MINI CARD: DOER SCORE GAUGE
══════════════════════════════════════════════════════════════ */
function ScoreCard() {
  const r = 22, circ = 2 * Math.PI * r;
  return (
    <div style={{background:'rgba(255,255,255,0.03)',borderRadius:'10px',padding:'10px',border:`1px solid ${BD}`}}>
      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'6px'}}>
        <div style={{position:'relative',width:'52px',height:'52px',flexShrink:0}}>
          <svg width="52" height="52" viewBox="0 0 52 52" style={{transform:'rotate(-90deg)'}}>
            <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4"/>
            <circle cx="26" cy="26" r={r} fill="none" stroke={G} strokeWidth="4"
              strokeDasharray={`${circ*0.95} ${circ}`} strokeLinecap="round"
              style={{filter:`drop-shadow(0 0 6px ${G})`}}/>
          </svg>
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:800,color:G,textShadow:`0 0 12px ${G}`}}>95</div>
        </div>
        <div>
          <div style={{fontSize:'11px',fontWeight:700,color:G}}>Elite Builder</div>
          <div style={{fontSize:'9px',color:MT,marginTop:'2px'}}>Top 3% of builders</div>
          <div style={{fontSize:'8px',color:MT,marginTop:'1px'}}>Score ↑ +17</div>
        </div>
      </div>
      {['Completed 68 tasks','On-time delivery 96%','3 startups launched'].map(t=>(
        <div key={t} style={{display:'flex',alignItems:'center',gap:'5px',marginBottom:'3px'}}>
          <span style={{color:G,fontSize:'9px',flexShrink:0}}>✓</span>
          <span style={{fontSize:'9px',color:MT2}}>{t}</span>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MINI CARD: TEAM WORKSPACE
══════════════════════════════════════════════════════════════ */
function TeamCard() {
  return (
    <div style={{background:'rgba(255,255,255,0.03)',borderRadius:'10px',padding:'10px',border:`1px solid ${BD}`}}>
      <div style={{fontSize:'11px',fontWeight:700,color:WH,marginBottom:'6px'}}>Team Workspace</div>
      <div style={{display:'flex',alignItems:'center',marginBottom:'7px'}}>
        {['#7C3AED','#0891B2','#BE185D','#D97706'].map((c,i)=>(
          <div key={i} style={{width:'22px',height:'22px',borderRadius:'50%',background:c,border:`2px solid ${BG2}`,marginLeft:i>0?'-6px':0,zIndex:4-i,fontSize:'8px',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700}}>
            {['P','J','A','M'][i]}
          </div>
        ))}
        <span style={{fontSize:'9px',color:MT,marginLeft:'8px'}}>4 Members</span>
      </div>
      <div style={{marginBottom:'7px'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'3px'}}>
          <span style={{fontSize:'9px',color:MT}}>Sprint Progress</span>
          <span style={{fontSize:'9px',color:G,fontWeight:700}}>82%</span>
        </div>
        <div style={{height:'3px',borderRadius:'999px',background:'rgba(255,255,255,0.07)'}}>
          <div style={{height:'100%',width:'82%',borderRadius:'999px',background:`linear-gradient(90deg,${GD},${G})`}}/>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'3px'}}>
        {[['24','Done'],['6','Active'],['3','Coming']].map(([n,l])=>(
          <div key={l} style={{textAlign:'center',background:'rgba(255,255,255,0.03)',borderRadius:'5px',padding:'4px 2px'}}>
            <div style={{fontSize:'12px',fontWeight:800,color:G}}>{n}</div>
            <div style={{fontSize:'8px',color:MT}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MINI CARD: SPRINT BOARD
══════════════════════════════════════════════════════════════ */
function SprintCard() {
  return (
    <div style={{background:'rgba(255,255,255,0.03)',borderRadius:'10px',padding:'10px',border:`1px solid ${BD}`}}>
      <div style={{fontSize:'11px',fontWeight:700,color:WH,marginBottom:'7px'}}>Sprint Board</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'4px',marginBottom:'7px'}}>
        {[['To Do','12','rgba(255,255,255,0.04)',MT2],['In Progress','6',GG2,G],['Done','24',GG2,G]].map(([col,n,bg,nc])=>(
          <div key={col} style={{background:bg,border:`1px solid ${col==='Done'?GB:BD}`,borderRadius:'6px',padding:'5px 3px',textAlign:'center'}}>
            <div style={{fontSize:'8px',color:MT,marginBottom:'3px'}}>{col}</div>
            <div style={{fontSize:'16px',fontWeight:800,color:nc}}>{n}</div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'6px',paddingTop:'5px',borderTop:`1px solid ${BD}`}}>
        <span style={{fontSize:'9px',color:MT}}>Team Velocity</span>
        <span style={{fontSize:'9px',fontWeight:700,color:G}}>High ↑</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MINI CARD: LAUNCH LIVE
══════════════════════════════════════════════════════════════ */
function LaunchCard() {
  const bars = [40,55,35,62,48,74,58,80];
  return (
    <div style={{background:'rgba(255,255,255,0.03)',borderRadius:'10px',padding:'10px',border:`1px solid ${BD}`}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'7px'}}>
        <span style={{fontSize:'10px',fontWeight:700,color:WH}}>Launch Dashboard</span>
        <span style={{display:'flex',alignItems:'center',gap:'3px',fontSize:'8px',color:G,fontWeight:600}}>
          <span style={{width:'5px',height:'5px',borderRadius:'50%',background:G,display:'inline-block',boxShadow:`0 0 6px ${G}`}}/>Live
        </span>
      </div>
      <div style={{display:'flex',alignItems:'flex-end',gap:'2px',height:'36px',marginBottom:'6px'}}>
        {bars.map((h,i)=>(
          <div key={i} style={{flex:1,height:`${h}%`,background:`linear-gradient(180deg,${G}99,${GD}55)`,borderRadius:'2px 2px 0 0'}}/>
        ))}
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontSize:'8px',color:MT}}>buildmate.app ↗</span>
        <span style={{fontSize:'8px',color:G}}>↑ 134% WoW</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MINI CARD: REVENUE DASHBOARD
══════════════════════════════════════════════════════════════ */
function RevenueCard() {
  const rows = [
    {label:'Visitors',val:'24,589',pct:'+12.5%'},
    {label:'Customers',val:'1,429',pct:'+8.7%'},
    {label:'Revenue',val:'$48,920',pct:'+13.3%'},
  ];
  return (
    <div style={{background:'rgba(255,255,255,0.03)',borderRadius:'10px',padding:'10px',border:`1px solid ${BD}`}}>
      {rows.map(({label,val,pct},i)=>(
        <div key={label} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'4px 0',borderBottom:i<2?`1px solid ${BD}`:'none'}}>
          <div>
            <div style={{fontSize:'8px',color:MT,marginBottom:'1px'}}>{label}</div>
            <div style={{fontSize:'12px',fontWeight:700,color:WH}}>{val}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:'10px',color:G,fontWeight:700}}>{pct}</div>
            <div style={{display:'flex',alignItems:'flex-end',gap:'1px',height:'16px',marginTop:'2px'}}>
              {[3,5,4,7,6,8,7,9].map((h,i)=>(
                <div key={i} style={{width:'2px',height:`${h}px`,background:G,borderRadius:'1px',opacity:0.7}}/>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   JOURNEY STEPS CONFIG
══════════════════════════════════════════════════════════════ */
const STEPS = [
  { num:1, title:'Founder Matched',      sub:'AI finds your perfect co-founder',         Card: FounderCard },
  { num:2, title:'Trial Task Assigned',  sub:'Prove your skills with real tasks',         Card: TaskCard    },
  { num:3, title:'Doer Score Increases', sub:'Consistency boosts your reputation',        Card: ScoreCard   },
  { num:4, title:'Joined the Team',      sub:"You're in. Let's build together",           Card: TeamCard    },
  { num:5, title:'Sprint Execution',     sub:'Your team ships, not just talks',           Card: SprintCard  },
  { num:6, title:'Launch Live',          sub:'Your product is now live',                  Card: LaunchCard  },
  { num:7, title:'Users & Revenue',      sub:'Real users. Real revenue. Real impact.',    Card: RevenueCard },
];

const LOGOS = [
  { icon:'stripe',    label:'stripe'     },
  { icon:'▲',         label:'vercel'     },
  { icon:'◈',         label:'linear'     },
  { icon:'⚡',         label:'supabase'  },
  { icon:'⊛',         label:'openai'    },
  { icon:'⌘',         label:'tailwindcss'},
];

const TRUST = [
  { icon:'🛡', label:'Verified Builders', sub:'Real people. Real skills.' },
  { icon:'✓',  label:'Real Execution',    sub:'Tasks. Deadlines. Results.' },
  { icon:'🏆', label:'Doer Score™',       sub:'Reputation that grows.' },
  { icon:'🚀', label:'Ship & Scale',      sub:'Launch. Grow. Succeed.' },
];

/* ══════════════════════════════════════════════════════════════
   SPINNER
══════════════════════════════════════════════════════════════ */
function Spinner() {
  return (
    <span style={{width:'15px',height:'15px',border:'2px solid rgba(255,255,255,0.25)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block',animation:'spin .65s linear infinite'}}/>
  );
}

/* ══════════════════════════════════════════════════════════════
   LOGIN PAGE
══════════════════════════════════════════════════════════════ */
export default function LoginPage({ setIsAuth }) {
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPw, setShowPw]         = useState(false);
  const [remember, setRemember]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [focused, setFocused]       = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  /* cycle step highlight */
  useEffect(() => {
    const t = setInterval(() => setActiveStep(p => (p + 1) % STEPS.length), 2600);
    return () => clearInterval(t);
  }, []);

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
      setError(err.response?.data?.error || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const inpStyle = (name) => ({
    width:'100%',padding:'11px 14px 11px 40px',background:'rgba(255,255,255,0.04)',
    border:`1px solid ${focused===name?G:'rgba(255,255,255,0.08)'}`,borderRadius:'10px',
    color:WH,fontSize:'14px',outline:'none',transition:'all .2s',boxSizing:'border-box',
    fontFamily:'inherit',
    boxShadow: focused===name?`0 0 0 3px ${GG}`:undefined,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;}
        @keyframes spin   { to{transform:rotate(360deg)} }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.35} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow   { 0%,100%{box-shadow:0 0 20px ${GG}} 50%{box-shadow:0 0 40px ${GG},0 0 80px ${GG2}} }
        @keyframes marquee{ from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes stepFade{ from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .step-card{transition:all .45s cubic-bezier(.16,1,.3,1);}
        .oauth-btn{transition:all .2s;cursor:pointer;}
        .oauth-btn:hover{background:rgba(255,255,255,0.08)!important;border-color:rgba(255,255,255,0.16)!important;}
        .sign-btn:not(:disabled):hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(74,222,128,.4)!important;}
        .sign-btn{transition:all .2s;}
        input::placeholder{color:rgba(239,255,239,.25);}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        ::-webkit-scrollbar{display:none;}
      `}</style>

      <div style={{minHeight:'100vh',display:'flex',background:BG,fontFamily:"'Inter',-apple-system,sans-serif",overflow:'hidden',position:'relative'}}>

        {/* ══ LEFT PANEL ══ */}
        <div style={{flex:'0 0 65%',display:'flex',flexDirection:'column',padding:'36px 44px 28px',position:'relative',overflow:'hidden',
          background:`radial-gradient(ellipse 70% 50% at 20% 0%,rgba(74,222,128,.07) 0%,transparent 55%),
                      radial-gradient(ellipse 50% 40% at 90% 90%,rgba(74,222,128,.05) 0%,transparent 55%),${BG}`}}>

          {/* grid overlay */}
          <div style={{position:'absolute',inset:0,backgroundImage:`linear-gradient(${BD} 1px,transparent 1px),linear-gradient(90deg,${BD} 1px,transparent 1px)`,backgroundSize:'52px 52px',opacity:.35,pointerEvents:'none'}}/>
          {/* orb */}
          <div style={{position:'absolute',top:'-80px',left:'-80px',width:'400px',height:'400px',borderRadius:'50%',background:`radial-gradient(circle,rgba(74,222,128,.1) 0%,transparent 70%)`,filter:'blur(60px)',pointerEvents:'none'}}/>

          {/* Brand */}
          <div style={{position:'relative',zIndex:2,display:'flex',alignItems:'center',gap:'10px',marginBottom:'32px'}}>
            <div style={{width:'34px',height:'34px',borderRadius:'9px',background:`linear-gradient(135deg,${G},${GD})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',boxShadow:`0 0 20px ${GG}`,fontWeight:900,color:'#000'}}>⚡</div>
            <span style={{fontSize:'19px',fontWeight:800,color:WH,letterSpacing:'-0.3px'}}>CoBuilder</span>
            <span style={{fontSize:'11px',padding:'3px 8px',borderRadius:'999px',background:GG2,border:`1px solid ${GB}`,color:G,fontWeight:600,letterSpacing:'.5px',marginLeft:'4px'}}>BETA</span>
          </div>

          {/* Hero headline */}
          <div style={{position:'relative',zIndex:2,marginBottom:'32px'}}>
            <h1 style={{fontSize:'clamp(28px,3vw,44px)',fontWeight:900,color:WH,margin:'0 0 10px',lineHeight:1.1,letterSpacing:'-1.5px'}}>
              Build with people who{' '}
              <span style={{color:G,textShadow:`0 0 30px ${GG}`,WebkitTextStroke:`0px`}}>ship.</span>
            </h1>
            <p style={{fontSize:'14px',color:MT2,margin:'0 0 4px',lineHeight:1.6}}>Match. Collaborate. Execute. Launch. Grow.</p>
            <p style={{fontSize:'13px',color:MT,margin:0}}>Everything your startup needs, in one workspace.</p>
          </div>

          {/* Journey Steps */}
          <div style={{position:'relative',zIndex:2,marginBottom:'16px',flex:1}}>
            {/* Connecting line */}
            <div style={{position:'absolute',top:'39px',left:'20px',right:'20px',height:'1px',background:`linear-gradient(90deg,transparent,${GB} 15%,${GB} 85%,transparent)`,zIndex:0}}/>
            
            <div style={{display:'flex',gap:'10px',overflowX:'hidden'}}>
              {STEPS.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <div key={step.num} className="step-card" style={{
                    flex:'0 0 calc(14.28% - 9px)',
                    display:'flex',flexDirection:'column',alignItems:'center',gap:'8px',cursor:'default',
                  }}>
                    {/* Number badge */}
                    <div style={{
                      width:'28px',height:'28px',borderRadius:'50%',
                      background: isActive ? G : BG2,
                      border: `2px solid ${isActive ? G : BD}`,
                      display:'flex',alignItems:'center',justifyContent:'center',
                      fontSize:'11px',fontWeight:800,
                      color: isActive ? '#000' : MT2,
                      boxShadow: isActive ? `0 0 20px ${GG},0 0 40px ${GG2}` : 'none',
                      transition:'all .45s',
                      position:'relative',zIndex:1,flexShrink:0,
                    }}>{step.num}</div>

                    {/* Card */}
                    <div style={{
                      width:'100%',
                      borderRadius:'12px',
                      border:`1px solid ${isActive ? GB : BD}`,
                      background: isActive ? `linear-gradient(145deg,rgba(74,222,128,.07),rgba(74,222,128,.02))` : 'rgba(255,255,255,0.025)',
                      boxShadow: isActive ? `0 0 30px ${GG2},0 4px 24px rgba(0,0,0,.3)` : '0 2px 12px rgba(0,0,0,.2)',
                      transition:'all .45s cubic-bezier(.16,1,.3,1)',
                      transform: isActive ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
                      padding:'2px',
                      overflow:'hidden',
                    }}>
                      <div style={{padding:'8px'}}>
                        <step.Card />
                      </div>
                    </div>

                    {/* Title + sub */}
                    <div style={{textAlign:'center',width:'100%'}}>
                      <div style={{fontSize:'10px',fontWeight:700,color: isActive ? G : MT2,lineHeight:1.3,transition:'color .4s'}}>{step.title}</div>
                      <div style={{fontSize:'8px',color:MT,lineHeight:1.4,marginTop:'2px'}}>{step.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cycle indicator */}
            <div style={{display:'flex',justifyContent:'center',gap:'5px',marginTop:'14px'}}>
              {STEPS.map((_,i)=>(
                <div key={i} style={{width:i===activeStep?18:5,height:'4px',borderRadius:'999px',background:i===activeStep?G:BD,transition:'all .4s'}}/>
              ))}
            </div>
          </div>

          {/* Cycle text arrow */}
          <div style={{position:'relative',zIndex:2,textAlign:'center',marginBottom:'16px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
            <div style={{flex:1,height:'1px',background:`linear-gradient(90deg,transparent,${GB})`}}/>
            <span style={{fontSize:'12px',color:MT,whiteSpace:'nowrap'}}>
              The cycle continues.{' '}
              {['Build.','Ship.','Grow.','Repeat.'].map((w,i)=>(
                <span key={w} style={{color:i%2===0?G:MT2,fontWeight:i%2===0?700:400}}>{w} </span>
              ))}
              ←
            </span>
            <div style={{flex:1,height:'1px',background:`linear-gradient(90deg,${GB},transparent)`}}/>
          </div>

          {/* Trusted logos */}
          <div style={{position:'relative',zIndex:2,marginBottom:'16px'}}>
            <div style={{fontSize:'11px',color:MT,textAlign:'center',marginBottom:'10px',letterSpacing:'.5px'}}>
              Trusted by <span style={{color:MT2,fontWeight:600}}>5,000+</span> startup teams
            </div>
            <div style={{overflow:'hidden',WebkitMaskImage:'linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent)'}}>
              <div style={{display:'flex',gap:'32px',animation:'marquee 20s linear infinite',width:'max-content'}}>
                {[...LOGOS,...LOGOS].map((l,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'5px',opacity:.45,whiteSpace:'nowrap',fontSize:'12px',fontWeight:600,color:MT2,letterSpacing:'.3px'}}>
                    <span style={{fontSize:'10px'}}>{l.icon}</span>{l.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{position:'relative',zIndex:2,display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'8px'}}>
            {TRUST.map(t=>(
              <div key={t.label} style={{display:'flex',alignItems:'flex-start',gap:'7px',padding:'8px 10px',background:'rgba(255,255,255,0.025)',border:`1px solid ${BD}`,borderRadius:'10px'}}>
                <span style={{fontSize:'14px',flexShrink:0}}>{t.icon}</span>
                <div>
                  <div style={{fontSize:'10px',fontWeight:700,color:MT2}}>{t.label}</div>
                  <div style={{fontSize:'9px',color:MT}}>{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'32px 40px',background:BG2,borderLeft:`1px solid ${BD}`,position:'relative',overflow:'hidden'}}>
          {/* orb */}
          <div style={{position:'absolute',top:'-100px',right:'-100px',width:'350px',height:'350px',borderRadius:'50%',background:`radial-gradient(circle,${GG2} 0%,transparent 70%)`,filter:'blur(60px)',pointerEvents:'none'}}/>
          <div style={{position:'absolute',bottom:'-60px',left:'-60px',width:'250px',height:'250px',borderRadius:'50%',background:`radial-gradient(circle,rgba(74,222,128,.04) 0%,transparent 70%)`,filter:'blur(40px)',pointerEvents:'none'}}/>

          <div style={{width:'100%',maxWidth:'360px',position:'relative',zIndex:2,animation:'fadeUp .5s ease both'}}>
            {/* Header */}
            <div style={{marginBottom:'28px',textAlign:'center'}}>
              <h2 style={{fontSize:'24px',fontWeight:800,color:WH,margin:'0 0 6px',letterSpacing:'-0.5px'}}>Welcome back</h2>
              <p style={{fontSize:'14px',color:MT,margin:0}}>Let's build something great.</p>
            </div>

            {/* Google OAuth */}
            <button type="button" className="oauth-btn" onClick={()=>alert('Google OAuth — connect in backend')} style={{
              width:'100%',padding:'12px 16px',background:'rgba(255,255,255,0.06)',
              border:`1px solid rgba(255,255,255,0.1)`,borderRadius:'10px',
              color:WH,fontSize:'14px',fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',marginBottom:'20px',fontFamily:'inherit',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}>
              <div style={{flex:1,height:'1px',background:BD}}/>
              <span style={{fontSize:'12px',color:MT}}>or</span>
              <div style={{flex:1,height:'1px',background:BD}}/>
            </div>

            {/* Error */}
            {error && (
              <div style={{padding:'10px 14px',background:'rgba(252,129,129,0.08)',border:'1px solid rgba(252,129,129,0.2)',borderRadius:'10px',color:'#FC8181',fontSize:'13px',marginBottom:'14px',display:'flex',alignItems:'center',gap:'8px'}}>
                <span style={{fontSize:'14px'}}>⚠️</span>{error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div style={{marginBottom:'14px'}}>
                <label style={{display:'block',fontSize:'12px',fontWeight:600,color:MT2,marginBottom:'6px',letterSpacing:'.2px'}}>Email</label>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:'13px',top:'50%',transform:'translateY(-50%)',fontSize:'14px',pointerEvents:'none',opacity:.5}}>✉️</span>
                  <input id="login-email" type="email" required placeholder="name@company.com"
                    value={email} onChange={e=>{setEmail(e.target.value);if(error)setError('');}}
                    onFocus={()=>setFocused('email')} onBlur={()=>setFocused('')}
                    style={inpStyle('email')} autoComplete="email"/>
                </div>
              </div>

              {/* Password */}
              <div style={{marginBottom:'14px'}}>
                <label style={{display:'block',fontSize:'12px',fontWeight:600,color:MT2,marginBottom:'6px'}}>Password</label>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:'13px',top:'50%',transform:'translateY(-50%)',fontSize:'14px',pointerEvents:'none',opacity:.5}}>🔑</span>
                  <input id="login-password" type={showPw?'text':'password'} required placeholder="••••••••"
                    value={password} onChange={e=>{setPassword(e.target.value);if(error)setError('');}}
                    onFocus={()=>setFocused('password')} onBlur={()=>setFocused('')}
                    style={{...inpStyle('password'),paddingRight:'42px'}} autoComplete="current-password"/>
                  <button type="button" onClick={()=>setShowPw(p=>!p)} style={{
                    position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',
                    background:'none',border:'none',cursor:'pointer',color:MT,fontSize:'14px',padding:0,
                    transition:'color .2s',
                  }}>{showPw?'🙈':'👁️'}</button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
                <label style={{display:'flex',alignItems:'center',gap:'7px',cursor:'pointer'}}>
                  <div onClick={()=>setRemember(p=>!p)} style={{
                    width:'16px',height:'16px',borderRadius:'4px',border:`2px solid ${remember?G:BD}`,
                    background:remember?G:'transparent',display:'flex',alignItems:'center',justifyContent:'center',
                    transition:'all .2s',cursor:'pointer',flexShrink:0,
                  }}>
                    {remember && <span style={{color:'#000',fontSize:'10px',fontWeight:900,lineHeight:1}}>✓</span>}
                  </div>
                  <span style={{fontSize:'12px',color:MT2}}>Remember me</span>
                </label>
                <Link to="/forgot-password" style={{fontSize:'12px',color:G,textDecoration:'none',fontWeight:500}}>Forgot password?</Link>
              </div>

              {/* Sign In */}
              <button id="login-submit" type="submit" disabled={loading} className="sign-btn" style={{
                width:'100%',padding:'13px',background:`linear-gradient(135deg,${G},${GD})`,
                border:'none',borderRadius:'10px',color:'#000',fontSize:'15px',fontWeight:800,
                cursor:loading?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                boxShadow:`0 4px 24px ${GG}`,opacity:loading?.7:1,fontFamily:'inherit',
                letterSpacing:'.1px',
              }}>
                {loading ? <><Spinner /><span style={{color:'rgba(0,0,0,0.7)'}}>Signing in…</span></> : 'Sign in'}
              </button>
            </form>

            {/* Create account */}
            <p style={{fontSize:'13px',color:MT,textAlign:'center',marginTop:'18px',margin:'18px 0 16px'}}>
              New here?{' '}
              <Link to="/register" style={{color:G,textDecoration:'none',fontWeight:700}}>Create an account</Link>
            </p>

            {/* Security note */}
            <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 14px',background:'rgba(255,255,255,0.025)',border:`1px solid ${BD}`,borderRadius:'10px',marginTop:'4px'}}>
              <span style={{fontSize:'16px',flexShrink:0}}>🔒</span>
              <span style={{fontSize:'11px',color:MT,lineHeight:1.5}}>Your data is secure with enterprise-grade security and encryption.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
