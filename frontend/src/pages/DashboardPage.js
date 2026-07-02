import React from 'react';
import { useNavigate } from 'react-router-dom';

/* ══════════════════════════════════════════════════════════════
   DESIGN TOKENS
══════════════════════════════════════════════════════════════ */
const G = '#4ADE80';
const GD = '#22C55E';
const BG = '#060B08';
const BG2 = '#0A120D';
const CARD_BG = 'rgba(255,255,255,0.02)';
const CARD_BORDER = 'rgba(255,255,255,0.06)';
const CARD_BORDER_HOVER = 'rgba(74,222,128,0.2)';
const TEXT_MUTED = 'rgba(255,255,255,0.5)';
const TEXT_LIGHT = 'rgba(255,255,255,0.8)';
const WHITE = '#FFFFFF';

/* ══════════════════════════════════════════════════════════════
   ICONS (Minimal SVGs)
══════════════════════════════════════════════════════════════ */
const Icon = ({ name, size = 16, color = 'currentColor', style={} }) => {
  const paths = {
    home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    swipe: 'M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2',
    sparkle: 'M12 2l3 6 6 3-6 3-3 6-3-6-6-3 6-3z',
    users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    check: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3',
    kanban: 'M3 3h18v18H3z M9 3v18 M15 3v18',
    star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    rocket: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l.5-.5m5.5-8.5c1.1-1.1 2.5-3.5 2.5-3.5s-2.4 1.4-3.5 2.5m-5 3.5l5-5c1.1-1.1 2.87-1.53 4.29-.11 1.42 1.42.99 3.19-.11 4.29l-5 5',
    launchpad: 'M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    bar: 'M18 20V10M12 20V4M6 20v-6',
    message: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    mentor: 'M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 0c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z',
    settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z',
    search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35',
    bell: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0',
    plus: 'M12 5v14 M5 12h14',
    eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    flag: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      {paths[name]?.split(' M').map((d,i)=><path key={i} d={i>0?'M'+d:d}/>)}
    </svg>
  );
};

/* ══════════════════════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════════════════════ */

const Card = ({ children, style, className }) => (
  <div className={`ds-card ${className || ''}`} style={{
    background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: '14px',
    padding: '20px', transition: 'all 0.3s ease', ...style
  }}>
    {children}
  </div>
);

const Sparkline = ({ points, color = G, fill = false }) => (
  <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none" style={{overflow:'visible'}}>
    {fill && <path d={`M0,30 L0,${points[0]} ${points.map((p,i)=>`L${(i/(points.length-1))*100},${p}`).join(' ')} L100,30 Z`} fill={`url(#grad-${color.replace('#','')})`} opacity={0.2} />}
    <path d={`M0,${points[0]} ${points.map((p,i)=>`L${(i/(points.length-1))*100},${p}`).join(' ')}`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const Avatar = ({ initials, color, size = 32, src, outline = false }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%', background: color || '#333', 
    border: outline ? `2px solid ${BG}` : 'none', display: 'flex', alignItems: 'center', 
    justifyContent: 'center', fontSize: size*0.4, fontWeight: 700, color: WHITE, overflow: 'hidden', flexShrink: 0
  }}>
    {src ? <img src={src} alt="avatar" style={{width:'100%',height:'100%',objectFit:'cover'}} /> : initials}
  </div>
);

/* ══════════════════════════════════════════════════════════════
   MAIN DASHBOARD PAGE
══════════════════════════════════════════════════════════════ */
export default function DashboardPage({ user, logout }) {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; background: ${BG}; color: ${WHITE}; font-family: 'Inter', sans-serif; overflow: hidden; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        
        .ds-card:hover { border-color: ${CARD_BORDER_HOVER}; box-shadow: 0 4px 20px rgba(74,222,128,0.05); }
        .sidebar-item { display: flex; alignItems: center; gap: 12px; padding: 10px 14px; border-radius: 8px; cursor: pointer; transition: all 0.2s; color: ${TEXT_MUTED}; font-size: 13px; font-weight: 500; margin-bottom: 2px; }
        .sidebar-item:hover { color: ${WHITE}; background: rgba(255,255,255,0.03); }
        .sidebar-item.active { background: rgba(74,222,128,0.1); color: ${G}; font-weight: 600; position: relative; }
        .sidebar-item.active::after { content: ''; position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 4px; height: 4px; border-radius: 50%; background: ${G}; box-shadow: 0 0 8px ${G}; }
        
        .top-nav-link { color: ${TEXT_MUTED}; font-size: 14px; font-weight: 500; cursor: pointer; transition: 0.2s; padding: 6px 12px; border-radius: 6px; }
        .top-nav-link:hover { color: ${WHITE}; background: rgba(255,255,255,0.05); }
        .top-nav-link.active { color: ${G}; background: rgba(74,222,128,0.1); font-weight: 600; }
        
        .btn-primary { background: rgba(74,222,128,0.1); border: 1px solid ${CARD_BORDER_HOVER}; color: ${G}; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 6px; }
        .btn-primary:hover { background: ${G}; color: ${BG}; box-shadow: 0 0 15px rgba(74,222,128,0.4); }
        
        .stepper-line { position: absolute; top: 14px; left: 24px; right: 24px; height: 2px; background: rgba(255,255,255,0.1); z-index: 0; }
        .stepper-line-fill { position: absolute; top: 0; left: 0; height: 100%; background: ${G}; transition: width 0.5s; box-shadow: 0 0 10px ${G}; }
        
        /* Subtle green glow behind main content */
        .bg-glow { position: absolute; top: 0; right: 10%; width: 600px; height: 300px; background: radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%); filter: blur(60px); pointer-events: none; z-index: 0; }
      `}</style>

      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        
        {/* ══════════════════════════════════════════════════════════════
            SIDEBAR
        ══════════════════════════════════════════════════════════════ */}
        <div style={{ width: '250px', background: BG2, borderRight: `1px solid ${CARD_BORDER}`, display: 'flex', flexDirection: 'column', zIndex: 10 }}>
          
          {/* Logo */}
          <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `linear-gradient(135deg, ${G}, ${GD})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 900, fontSize: '12px' }}>BM</div>
            <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.5px' }}>BuildMate</span>
          </div>

          {/* Nav List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px' }}>
            <div className="sidebar-item active"><Icon name="home"/> Dashboard</div>
            <div className="sidebar-item"><Icon name="swipe"/> Swipe</div>
            <div className="sidebar-item"><Icon name="sparkle"/> AI Match</div>
            <div className="sidebar-item" style={{justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}><Icon name="users"/> Matches</div>
              <span style={{fontSize:'10px',background:'rgba(74,222,128,0.1)',color:G,padding:'2px 6px',borderRadius:'4px'}}>12</span>
            </div>
            <div className="sidebar-item"><Icon name="users"/> Teams</div>
            <div className="sidebar-item"><Icon name="check"/> Tasks</div>
            <div className="sidebar-item"><Icon name="kanban"/> Sprint Board</div>
            <div className="sidebar-item"><Icon name="star"/> Doer Score</div>
            <div className="sidebar-item"><Icon name="rocket"/> Startup Builder</div>
            <div className="sidebar-item"><Icon name="launchpad"/> Launchpad</div>
            <div className="sidebar-item"><Icon name="bar"/> Analytics</div>
            <div className="sidebar-item" style={{justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}><Icon name="message"/> Messages</div>
              <span style={{fontSize:'10px',background:'rgba(74,222,128,0.1)',color:G,padding:'2px 6px',borderRadius:'4px'}}>8</span>
            </div>
            <div className="sidebar-item"><Icon name="mentor"/> Mentorship</div>
            <div className="sidebar-item"><Icon name="settings"/> Settings</div>
          </div>

          {/* User Profile Area */}
          <div style={{ padding: '20px', borderTop: `1px solid ${CARD_BORDER}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Avatar src="https://i.pravatar.cc/100?img=11" size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{user?.name || 'Alex Rivera'}</div>
                <div style={{ fontSize: '11px', color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Icon name="star" size={10} color="#FBBF24" /> Elite Builder
                </div>
              </div>
              <Icon name="settings" size={14} color={TEXT_MUTED} style={{cursor:'pointer'}} onClick={logout} />
            </div>

            {/* Doer Score Widget in Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="50" cy="50" r="45" fill="none" stroke={CARD_BORDER} strokeWidth="6" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke={G} strokeWidth="6" strokeDasharray="283" strokeDashoffset={283 * (1 - 0.92)} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 4px ${G})` }} />
                </svg>
                <div style={{ position: 'absolute', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: WHITE, lineHeight: 1 }}>92</div>
                  <div style={{ fontSize: '9px', color: TEXT_MUTED, marginTop: '2px' }}>Doer Score</div>
                </div>
              </div>
              <div style={{ fontSize: '11px', color: '#FBBF24', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                👑 Top 3% of builders
              </div>
              <div style={{ fontSize: '10px', color: G, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ↑ 8 pts this week
                <div style={{ width: '30px', height: '12px' }}><Sparkline points={[15,20,15,25,22,28,30]} color={G} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MAIN CONTENT AREA
        ══════════════════════════════════════════════════════════════ */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          <div className="bg-glow" />

          {/* Top Nav */}
          <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', borderBottom: `1px solid ${CARD_BORDER}`, zIndex: 10, background: 'rgba(6,11,8,0.8)', backdropFilter: 'blur(12px)' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div className="top-nav-link active">Dashboard</div>
              <div className="top-nav-link">Swipe</div>
              <div className="top-nav-link">AI Match</div>
              <div className="top-nav-link">Matches</div>
              <div className="top-nav-link">Top 100</div>
              <div className="top-nav-link">Startup</div>
              <div className="top-nav-link">Skills</div>
              <div className="top-nav-link">Mentor</div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <Icon name="search" size={14} color={TEXT_MUTED} style={{ position: 'absolute', left: '12px', top: '9px' }} />
                <input type="text" placeholder="Search anything..." style={{ width: '220px', background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: '8px', padding: '8px 12px 8px 34px', color: WHITE, fontSize: '13px', outline: 'none' }} />
                <span style={{ position: 'absolute', right: '12px', top: '8px', fontSize: '11px', color: TEXT_MUTED, background: 'rgba(255,255,255,0.05)', padding: '2px 4px', borderRadius: '4px' }}>⌘K</span>
              </div>
              <div style={{ position: 'relative', cursor: 'pointer' }}>
                <Icon name="bell" size={20} color={TEXT_LIGHT} />
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: G, color: BG, fontSize: '9px', fontWeight: 800, width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
              </div>
              <button className="btn-primary"><Icon name="plus" size={14} /> New Project</button>
            </div>
          </div>

          {/* Scrollable Dashboard */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '30px', zIndex: 1, position: 'relative' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', animation: 'fadeUp 0.6s ease-out' }}>
              
              {/* Header */}
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>Welcome back, {user?.name?.split(' ')[0] || 'Alex'}! 👋</h1>
                <p style={{ fontSize: '14px', color: TEXT_MUTED, margin: 0 }}>Here's what's happening with your builder journey today.</p>
              </div>

              {/* ══ ROW 1: TOP METRICS ══ */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                
                {[
                  { icon: 'users', label: 'Matches', val: '12', sub: 'Active connections', trend: '↑ 3 new this week' },
                  { icon: 'eye', label: 'Profile Views', val: '156', sub: 'People viewed you', trend: '↑ 12.5% this week' },
                  { icon: 'users', label: 'Teams', val: '3', sub: 'Teams you\'re in', trend: '↑ 1 new this week' },
                  { icon: 'star', label: 'Doer Score', val: '92', sub: 'Elite Builder', trend: '↑ 8 pts this week' },
                ].map((m, i) => (
                  <Card key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(74,222,128,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={m.icon} size={16} color={G} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: WHITE }}>{m.label}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1, marginBottom: '6px' }}>{m.val}</div>
                      <div style={{ fontSize: '11px', color: TEXT_MUTED, marginBottom: '12px' }}>{m.sub}</div>
                      <div style={{ fontSize: '11px', color: G, fontWeight: 500 }}>{m.trend}</div>
                    </div>
                  </Card>
                ))}

                {/* Large Launch Status Card */}
                <Card style={{ flex: 2, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ position: 'absolute', right: 0, bottom: 0, width: '150px', height: '60px', zIndex: 0 }}>
                    <Sparkline points={[20,18,22,25,24,28,30]} color={G} fill={true} />
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600 }}>Launch Status</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 600, color: G, background: 'rgba(74,222,128,0.1)', padding: '4px 8px', borderRadius: '4px', border: `1px solid ${CARD_BORDER_HOVER}` }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: G, animation: 'pulse 2s infinite' }} /> LIVE
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '30px' }}>
                      <div>
                        <div style={{ fontSize: '11px', color: TEXT_MUTED, marginBottom: '4px' }}>Visitors</div>
                        <div style={{ fontSize: '20px', fontWeight: 700 }}>24,583</div>
                        <div style={{ fontSize: '10px', color: G, marginTop: '2px' }}>↑ 18.6%</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: TEXT_MUTED, marginBottom: '4px' }}>Customers</div>
                        <div style={{ fontSize: '20px', fontWeight: 700 }}>342</div>
                        <div style={{ fontSize: '10px', color: G, marginTop: '2px' }}>↑ 24.3%</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: TEXT_MUTED, marginBottom: '4px' }}>Revenue</div>
                        <div style={{ fontSize: '20px', fontWeight: 700 }}>₹2.45L</div>
                        <div style={{ fontSize: '10px', color: G, marginTop: '2px' }}>↑ 15.3%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ position: 'relative', zIndex: 1, marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${CARD_BORDER}`, paddingTop: '12px' }}>
                    <div>
                      <div style={{ fontSize: '10px', color: TEXT_MUTED }}>Landing Page</div>
                      <div style={{ fontSize: '12px', color: G, fontWeight: 500, cursor: 'pointer' }}>buildmate.app <Icon name="search" size={10} style={{marginLeft: '4px'}} /></div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* ══ ROW 2: TODAY'S MISSION ══ */}
              <Card style={{ marginBottom: '16px', padding: '24px 30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  
                  <div style={{ width: '220px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px 0' }}>Today's Mission</h3>
                    <p style={{ fontSize: '11px', color: TEXT_MUTED, margin: 0, lineHeight: 1.4 }}>Complete the essential steps to move forward.</p>
                  </div>

                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative', padding: '0 40px' }}>
                    <div style={{ position: 'absolute', top: '16px', left: '60px', right: '60px', height: '1px', background: CARD_BORDER, zIndex: 0 }} />
                    <div style={{ position: 'absolute', top: '16px', left: '60px', width: '25%', height: '1px', background: G, zIndex: 0 }} />
                    <div style={{ position: 'absolute', top: '16px', left: 'calc(60px + 25%)', width: '25%', height: '1px', borderTop: `1px dashed ${G}`, zIndex: 0 }} />
                    
                    {[
                      { label: 'Complete Trial Task', status: 'Done', type: 'done' },
                      { label: 'Invite Co-founder', status: 'In Progress', type: 'active' },
                      { label: 'Finish Landing Page', status: 'Pending', type: 'pending' },
                      { label: 'Launch MVP', status: 'Pending', type: 'pending' },
                    ].map((step, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                        <div style={{ 
                          width: '32px', height: '32px', borderRadius: '50%', background: BG, border: `2px solid ${step.type === 'done' ? G : step.type === 'active' ? G : CARD_BORDER}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px',
                          boxShadow: step.type === 'active' ? `0 0 15px rgba(74,222,128,0.2)` : 'none'
                        }}>
                          {step.type === 'done' && <Icon name="check" size={14} color={G} />}
                        </div>
                        <div style={{ fontSize: '11px', fontWeight: 500, color: step.type === 'pending' ? TEXT_MUTED : WHITE, textAlign: 'center' }}>{step.label}</div>
                        <div style={{ fontSize: '10px', color: step.type === 'done' ? G : TEXT_MUTED, marginTop: '2px' }}>{step.status}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: `1px solid ${CARD_BORDER}`, paddingLeft: '30px' }}>
                    <div style={{ position: 'relative', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="50" cy="50" r="45" fill="none" stroke={CARD_BORDER} strokeWidth="8" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke={WHITE} strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 * (1 - 0.72)} strokeLinecap="round" />
                      </svg>
                      <div style={{ position: 'absolute', fontSize: '14px', fontWeight: 700 }}>72%</div>
                    </div>
                    <span style={{ fontSize: '12px', color: TEXT_MUTED }}>Overall Progress</span>
                  </div>
                </div>
              </Card>

              {/* ══ ROW 3: THREE COLUMNS ══ */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                
                {/* COLUMN 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Your Journey */}
                  <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <Icon name="flag" size={16} color={G} />
                      <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Your Journey</h3>
                    </div>
                    <p style={{ fontSize: '11px', color: TEXT_MUTED, margin: '0 0 20px 24px' }}>Track your progress in building your startup</p>
                    
                    <div style={{ position: 'relative', padding: '0 10px' }}>
                      <div style={{ position: 'absolute', top: '12px', left: '20px', right: '20px', height: '1px', background: CARD_BORDER, zIndex: 0 }} />
                      <div style={{ position: 'absolute', top: '12px', left: '20px', width: '50%', height: '1px', background: G, zIndex: 0 }} />
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {[
                          { n:1, label: 'Find Co-founder', sub: 'Swipe & connect', status: 'Completed', t:'done' },
                          { n:2, label: 'Complete Trial', sub: 'Prove your skills', status: 'Completed', t:'done' },
                          { n:3, label: 'Join a Team', sub: 'Build together', status: 'In Progress', t:'active' },
                          { n:4, label: 'Launch Startup', sub: 'Go live & grow', status: 'Pending', t:'pending' },
                          { n:5, label: 'Grow & Scale', sub: 'Revenue & impact', status: 'Pending', t:'pending' },
                        ].map((s,i) => (
                          <div key={i} style={{ width: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                            <div style={{ width:'24px', height:'24px', borderRadius:'50%', background: s.t==='done' ? G : s.t==='active' ? BG : BG2, border: `1px solid ${s.t==='done' ? G : s.t==='active' ? G : CARD_BORDER}`, color: s.t==='done' ? BG : WHITE, fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', boxShadow: s.t==='active' ? `0 0 10px rgba(74,222,128,0.2)` : 'none' }}>
                              {s.t === 'done' ? <Icon name="check" size={12} /> : s.n}
                            </div>
                            <div style={{ fontSize: '9px', fontWeight: 600, color: s.t==='pending' ? TEXT_MUTED : WHITE, textAlign: 'center', lineHeight: 1.2 }}>{s.label}</div>
                            <div style={{ fontSize: '8px', color: TEXT_MUTED, textAlign: 'center', margin: '2px 0' }}>{s.sub}</div>
                            <div style={{ fontSize: '8px', color: s.t==='done' ? G : s.t==='active' ? '#FBBF24' : TEXT_MUTED }}>{s.t==='done' ? '✓ Completed' : s.t==='active' ? '○ In Progress' : '○ Pending'}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Recommended for you */}
                  <Card>
                    <div style={{ fontSize: '11px', color: TEXT_MUTED, marginBottom: '12px' }}>Recommended for you</div>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                      {[
                        { img:'https://i.pravatar.cc/100?img=5', name:'Maya Chen', role:'Product Designer', tags:['UI/UX','Figma'], match:'95%' },
                        { img:'https://i.pravatar.cc/100?img=12', name:'Dev Patel', role:'Full Stack Developer', tags:['React','Node.js'], match:'93%' },
                        { img:'https://i.pravatar.cc/100?img=9', name:'Sara Johnson', role:'Marketing Expert', tags:['Growth','SEO'], match:'90%' },
                      ].map((u,i) => (
                        <div key={i} style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: `1px solid ${CARD_BORDER}`, borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                          <Avatar src={u.img} size={40} />
                          <div style={{ fontSize: '12px', fontWeight: 600, margin: '8px 0 2px' }}>{u.name}</div>
                          <div style={{ fontSize: '10px', color: TEXT_MUTED, marginBottom: '8px' }}>{u.role}</div>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '10px' }}>
                            {u.tags.map(t => <span key={t} style={{ fontSize: '9px', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', color: TEXT_LIGHT }}>{t}</span>)}
                          </div>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: G }}>{u.match} Match</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: '12px', color: G, cursor: 'pointer' }}>View all matches →</div>
                  </Card>

                  {/* Team Progress */}
                  <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <Icon name="users" size={16} color={G} />
                      <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Team Progress</h3>
                    </div>
                    <p style={{ fontSize: '11px', color: TEXT_MUTED, margin: '0 0 16px 24px' }}>You have 3 active teams</p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon name="users" size={20} color={WHITE} />
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600 }}>Design Lab</div>
                          <div style={{ fontSize: '11px', color: TEXT_MUTED }}>Building AI powered design tool</div>
                          <div style={{ fontSize: '10px', color: TEXT_MUTED, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            4 members
                            <div style={{ display: 'flex', marginLeft: '6px' }}>
                              {[5,11,12].map((n,i) => <Avatar key={n} src={`https://i.pravatar.cc/100?img=${n}`} size={16} outline={true} />)}
                              <Avatar initials="+1" size={16} outline={true} color={CARD_BORDER} />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ width: '120px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '6px' }}>
                          <span style={{ fontSize: '10px', color: TEXT_MUTED }}>Sprint Progress</span>
                          <span style={{ fontSize: '10px', fontWeight: 600 }}>75%</span>
                        </div>
                        <div style={{ width: '100%', height: '4px', background: CARD_BORDER, borderRadius: '2px', marginBottom: '10px' }}>
                          <div style={{ width: '75%', height: '100%', background: G, borderRadius: '2px' }} />
                        </div>
                        <div style={{ fontSize: '11px', color: G, cursor: 'pointer' }}>View Team →</div>
                      </div>
                    </div>
                  </Card>

                </div>

                {/* COLUMN 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Your Activity */}
                  <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Icon name="sparkle" size={16} color={G} />
                        <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Your Activity</h3>
                      </div>
                      <div style={{ fontSize: '11px', color: TEXT_MUTED, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                        This Week <Icon name="search" size={10} style={{transform:'rotate(90deg)'}} />
                      </div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '24px', width: '1px', background: CARD_BORDER, zIndex: 0 }} />
                      
                      {[
                        { i: 'check', c: G, l: 'Trial task submitted', t: '2 hours ago' },
                        { i: 'users', c: TEXT_MUTED, l: 'Profile completed', t: '2 days ago' },
                        { img: 'https://i.pravatar.cc/100?img=5', l: 'Connected with Maya Chen', t: '2 days ago' },
                        { i: 'users', c: '#FBBF24', l: 'Joined Design Lab team', t: '3 days ago' },
                        { i: 'star', c: TEXT_MUTED, l: 'Sprint review completed', t: '5 days ago' },
                        { i: 'star', c: G, l: 'Doer Score increased', t: '6 days ago', right: '+8' },
                      ].map((a,i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', position: 'relative', zIndex: 1 }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: BG2, border: `1px solid ${CARD_BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                            {a.img ? <img src={a.img} alt="" style={{width:'100%',height:'100%'}}/> : <Icon name={a.i} size={12} color={a.c} />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '12px', color: WHITE, lineHeight: 1.2 }}>{a.l}</div>
                            <div style={{ fontSize: '10px', color: TEXT_MUTED, marginTop: '2px' }}>{a.t}</div>
                          </div>
                          {a.right && <div style={{ fontSize: '12px', fontWeight: 700, color: G }}>{a.right}</div>}
                        </div>
                      ))}
                    </div>

                    <div style={{ fontSize: '12px', color: G, cursor: 'pointer', marginTop: '20px' }}>View all activity →</div>
                  </Card>

                  {/* Startup Builder */}
                  <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <Icon name="rocket" size={16} color={G} />
                      <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Startup Builder</h3>
                    </div>
                    <p style={{ fontSize: '11px', color: TEXT_MUTED, margin: '0 0 16px 24px' }}>Your startup is one step away</p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '10px', border: `1px solid ${CARD_BORDER}` }}>
                      <div style={{ width: '60px', height: '40px', background: `linear-gradient(135deg, ${CARD_BORDER}, transparent)`, borderRadius: '6px', border: `1px solid ${CARD_BORDER}`, display: 'flex', flexDirection: 'column', gap: '2px', padding: '6px' }}>
                        <div style={{ height: '4px', width: '60%', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
                        <div style={{ height: '4px', width: '40%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />
                        <div style={{ height: '4px', width: '80%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: 600 }}>BuildMate</div>
                        <div style={{ fontSize: '10px', color: TEXT_MUTED }}>AI Co-founder Matching Platform</div>
                      </div>
                      <div style={{ fontSize: '10px', color: G, background: 'rgba(74,222,128,0.1)', padding: '4px 8px', borderRadius: '4px' }}>In Progress</div>
                    </div>
                    
                    <button style={{ width: '100%', marginTop: '12px', padding: '10px', background: 'transparent', border: `1px solid ${CARD_BORDER}`, color: WHITE, borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: '0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onMouseOver={e=>e.currentTarget.style.borderColor=G} onMouseOut={e=>e.currentTarget.style.borderColor=CARD_BORDER}>
                      Continue Building →
                    </button>
                  </Card>

                </div>

                {/* COLUMN 3 */}
                <Card style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon name="bar" size={16} color={G} />
                      <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Analytics Overview</h3>
                    </div>
                    <div style={{ fontSize: '11px', color: TEXT_MUTED, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                      This Month <Icon name="search" size={10} style={{transform:'rotate(90deg)'}} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
                    {[
                      { l: 'Profile Views', v: '2,482', t: '↑ 18.6%', pts: [10,15,12,20,18,25,22,30] },
                      { l: 'Matches', v: '127', t: '↑ 24.3%', pts: [5,10,8,15,12,18,22,25] },
                      { l: 'Messages', v: '342', t: '↑ 12.8%', pts: [20,18,25,22,28,25,30,28] },
                      { l: 'Team Invites', v: '28', t: '↑ 7.4%', pts: [5,8,6,10,12,10,15,12] },
                    ].map((m,i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ width: '80px' }}>
                          <div style={{ fontSize: '11px', color: TEXT_MUTED, marginBottom: '2px' }}>{m.l}</div>
                          <div style={{ fontSize: '18px', fontWeight: 700 }}>{m.v}</div>
                        </div>
                        <div style={{ width: '80px', height: '24px' }}>
                          <Sparkline points={m.pts} />
                        </div>
                        <div style={{ fontSize: '11px', color: G, fontWeight: 500, width: '45px', textAlign: 'right' }}>{m.t}</div>
                      </div>
                    ))}
                  </div>
                </Card>

              </div>

              {/* ══ ROW 4: BOTTOM TRUST BADGES ══ */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '12px', marginTop: '24px' }}>
                {[
                  { i: 'shield', l: 'Verified Builders', s: 'Real people. Real skills.' },
                  { i: 'sparkle', l: 'AI Matching', s: 'Smart compatibility.' },
                  { i: 'check', l: 'Real Execution', s: 'Tasks. Deadlines. Results.' },
                  { i: 'star', l: 'Doer Score', s: 'Reputation that grows.' },
                  { i: 'rocket', l: 'Launch & Scale', s: 'Launch. Grow. Succeed.' },
                ].map((b,i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: CARD_BG, border: `1px solid ${CARD_BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={b.i} size={14} color={G} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: WHITE }}>{b.l}</div>
                      <div style={{ fontSize: '10px', color: TEXT_MUTED }}>{b.s}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
