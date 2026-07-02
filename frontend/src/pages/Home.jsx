import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const slides = [
  {
    src: '/kivox1.jpg',
    caption: 'Building the Future of Kigaragara',
  },
  {
    src: '/kivox2.jpg',
    caption: 'Nurturing Excellence & Character',
  },
  {
    src: '/kivox3.jpg',
    caption: 'Our Campus — Kitanda Village, Isingiro',
  },
];

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    title: 'Manage Payments',
    desc: 'Record and process student fee payments quickly and accurately with a complete audit trail.',
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'rgba(59,130,246,0.35)',
    border: 'border-blue-400/30',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    title: 'Track Fees',
    desc: 'Monitor outstanding balances per student and class. Know exactly who has paid and what remains.',
    gradient: 'from-violet-500 to-purple-400',
    glow: 'rgba(139,92,246,0.35)',
    border: 'border-violet-400/30',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Perform Analytics',
    desc: 'Visualise revenue trends, class breakdowns, and financial performance with interactive reports.',
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'rgba(16,185,129,0.35)',
    border: 'border-emerald-400/30',
  },
];

const stats = [
  { value: '500+', label: 'Students Managed', icon: '🎓' },
  { value: 'S.1–S.6', label: 'All Class Levels', icon: '📚' },
  { value: '3', label: 'User Roles', icon: '👥' },
  { value: '99.9%', label: 'Uptime', icon: '⚡' },
];

function Home() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setFading(false);
      }, 600);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx) => {
    if (idx === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 50%, #0a0a1a 100%)' }}>
      {/* ── HERO with background slider ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background image slider */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            key={current}
            src={slides[current].src}
            alt={slides[current].caption}
            className="absolute inset-0 w-full h-full object-cover slider-zoom"
            style={{
              opacity: fading ? 0 : 1,
              transition: 'opacity 0.7s ease-in-out',
            }}
          />
          {/* Lighter overlay — just enough for text to read */}
          <div className="absolute inset-0"
            style={{
              background: `
                linear-gradient(to right, rgba(5,5,20,0.60) 0%, rgba(5,5,20,0.30) 50%, rgba(5,5,20,0.55) 100%),
                linear-gradient(to top, rgba(5,5,20,0.80) 0%, transparent 55%)
              `
            }}
          />
          {/* Subtle colour tint */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(6,182,212,0.06) 50%, rgba(236,72,153,0.06) 100%)' }}
          />
        </div>

        {/* Animated glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)' }} />

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center fade-in">
          {/* School badge + label */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <img src="/school-badge.jpg" alt="School Badge" className="h-24 w-24 rounded-2xl object-cover shadow-2xl ring-2 ring-white/20" />
            <div className="text-left">
              <p className="text-base font-bold tracking-widest uppercase" style={{ color: '#f0c040' }}>
                Kigaragara Vocational Secondary School
              </p>
              <p className="text-sm text-slate-300 mt-1">"Educ. Is Our Future"</p>
            </div>
          </div>

          <h1 className="hero-title font-extrabold tracking-tight text-white mb-3 drop-shadow-lg">
            Welcome to
          </h1>
          <h1 className="hero-title font-extrabold tracking-tight mb-6 drop-shadow-lg">
            <span style={{
              background: 'linear-gradient(90deg, #818cf8, #38bdf8, #34d399, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Kivox Financial
            </span>
            <br />
            <span className="text-white">Management System</span>
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-4 drop-shadow">
            This system manages payments, tracks fees and performs analytics —
            giving students, bursars, and administrators a complete view of school finances.
          </p>

          {/* Slide caption */}
          <p className="text-sm font-medium mb-10 px-4 py-1.5 rounded-full inline-block"
            style={{ background: 'rgba(255,255,255,0.08)', color: '#f0c040', border: '1px solid rgba(240,192,64,0.25)' }}>
            📍 {slides[current].caption}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              className="btn-primary px-9 py-4 text-base shadow-2xl"
              to="/login"
              style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', boxShadow: '0 8px 32px rgba(99,102,241,0.4)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Sign In
            </Link>
            <Link
              className="btn-secondary px-9 py-4 text-base font-semibold"
              to="/signup"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
              Register
            </Link>
          </div>

          {/* Slide dots */}
          <div className="flex justify-center gap-3 mt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '2rem' : '0.6rem',
                  height: '0.6rem',
                  background: i === current
                    ? 'linear-gradient(90deg, #818cf8, #38bdf8)'
                    : 'rgba(255,255,255,0.25)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, #080818)' }} />
      </section>

      {/* ── FEATURES ── */}
      <section style={{ background: 'linear-gradient(180deg, #080818 0%, #0d1225 100%)' }} className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What Kivox FMS Offers</h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">Everything you need to manage school finances in one place.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border p-7 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  boxShadow: `0 4px 30px ${f.glow}`,
                }}
              >
                <div
                  className={`inline-flex rounded-2xl p-4 mb-5 bg-gradient-to-br ${f.gradient}`}
                  style={{ boxShadow: `0 6px 24px ${f.glow}` }}
                >
                  <span className="text-white">{f.icon}</span>
                </div>
                <h3 className="font-bold text-white mb-2 text-xl">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #0d1225 0%, #111827 100%)' }}>
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(6,182,212,0.08) 50%, rgba(236,72,153,0.08) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 8px 40px rgba(99,102,241,0.15)',
            }}
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="mt-1 text-xs text-slate-400 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
