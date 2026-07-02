import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const KivoxLogo = () => (
  <img
    src="/school-badge.jpg"
    alt="Kigaragara VSS Badge"
    className="h-14 w-14 rounded-xl object-cover shadow-md"
  />
);

function Navigation() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('token')));
  const [userName, setUserName] = useState(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return '';
    try { return JSON.parse(stored).name || ''; } catch { return ''; }
  });
  const [userRole, setUserRole] = useState(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return '';
    try { return JSON.parse(stored).role || ''; } catch { return ''; }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setLoggedIn(Boolean(localStorage.getItem('token')));
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUserName(parsed.name || '');
          setUserRole(parsed.role || '');
        } catch {
          setUserName(''); setUserRole('');
        }
      } else {
        setUserName(''); setUserRole('');
      }
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  const dashboardLink = loggedIn
    ? userRole === 'admin'
      ? { to: '/admin-dashboard', label: 'Dashboard' }
      : userRole === 'bursar'
      ? { to: '/bursar-dashboard', label: 'Dashboard' }
      : { to: '/student-dashboard', label: 'Dashboard' }
    : null;

  const roleClass =
    userRole === 'admin' ? 'role-badge role-admin' :
    userRole === 'bursar' ? 'role-badge role-bursar' :
    'role-badge role-student';

  const roleLabel =
    userRole === 'admin' ? 'Admin' :
    userRole === 'bursar' ? 'Bursar' :
    userRole === 'student' ? 'Student' : '';

  const initials = userName
    ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const navLink = (to, label, end = false) => (
    <NavLink
      key={to}
      to={to}
      end={end}
      className={({ isActive }) =>
        `px-4 py-2 rounded-full text-base font-semibold transition-all duration-200 ${isActive
          ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/25'
          : 'text-slate-300 hover:text-white hover:bg-white/5'
        }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <header className="nav-glass sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <NavLink to="/" className="flex items-center gap-3 group">
          <KivoxLogo />
          <div>
            <p className="text-xl font-bold tracking-tight text-white leading-none group-hover:text-indigo-300 transition-colors">
              Kivox FMS
            </p>
            <p className="text-[12px] text-slate-400 leading-none mt-1 tracking-wide uppercase">
              Financial Management System
            </p>
          </div>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          {navLink('/', 'Home', true)}
          {dashboardLink && navLink(dashboardLink.to, dashboardLink.label)}
          {!loggedIn && (
            <>
              {navLink('/login', 'Sign In')}
              <NavLink
                to="/signup"
                className="ml-1 px-5 py-2.5 rounded-full text-base font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25"
              >
                Register
              </NavLink>
            </>
          )}
        </nav>

        {loggedIn && (
          <div className="hidden md:flex items-center gap-3">
            {roleLabel && <span className={roleClass}>{roleLabel}</span>}
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                {initials}
              </div>
              <span className="text-sm text-slate-300 max-w-[120px] truncate">{userName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-full text-sm text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all duration-200"
            >
              Sign out
            </button>
          </div>
        )}

        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-indigo-500/10 bg-slate-950/95 px-4 py-4 space-y-1 fade-in">
          <NavLink to="/" end onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition">Home</NavLink>
          {dashboardLink && (
            <NavLink to={dashboardLink.to} onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition">{dashboardLink.label}</NavLink>
          )}
          {!loggedIn && (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition">Sign In</NavLink>
              <NavLink to="/signup" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-indigo-300 hover:bg-indigo-500/10 transition">Register</NavLink>
            </>
          )}
          {loggedIn && (
            <div className="pt-2 border-t border-white/5">
              <div className="px-4 py-2 text-sm text-slate-400">
                {userName} {roleLabel && <span className={`ml-2 ${roleClass}`}>{roleLabel}</span>}
              </div>
              <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 transition">
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navigation;
