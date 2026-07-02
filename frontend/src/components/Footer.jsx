import { Link } from 'react-router-dom';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Sign In' },
  { to: '/signup', label: 'Register' },
  { to: '/student-dashboard', label: 'Student Dashboard' },
  { to: '/bursar-dashboard', label: 'Bursar Dashboard' },
];

const socials = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    color: '#1877F2',
    bg: 'rgba(24,119,242,0.15)',
    border: 'rgba(24,119,242,0.35)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/256752690294?text=Hello%2C%20I%20am%20contacting%20you%20from%20the%20Kivox%20FMS%20website%20regarding%20Kigaragara%20Vocational%20Secondary%20School.',
    color: '#25D366',
    bg: 'rgba(37,211,102,0.15)',
    border: 'rgba(37,211,102,0.35)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    color: '#E1306C',
    bg: 'rgba(225,48,108,0.15)',
    border: 'rgba(225,48,108,0.35)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'linear-gradient(135deg, #0c2a4a 0%, #0e3460 50%, #0c2a4a 100%)', borderTop: '1px solid rgba(100,180,255,0.15)' }} className="mt-auto">
      <div className="mx-auto max-w-6xl px-4 lg:px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src="/school-badge.jpg" alt="Kigaragara VSS Badge" className="h-14 w-14 rounded-xl object-cover shadow-lg ring-2 ring-sky-400/30" />
              <div>
                <p className="text-base font-bold text-white leading-none">Kivox FMS</p>
                <p className="text-[11px] text-sky-300/70 leading-none mt-1 tracking-wide uppercase">Financial Management System</p>
              </div>
            </div>
            <p className="text-sm text-sky-100/60 leading-relaxed mb-6">
              Kigaragara Vocational Secondary School's official financial management system.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-300 mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-sky-100/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-sky-400 group-hover:translate-x-0.5 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-300 mb-5">Contacts</h3>
            <ul className="space-y-4">
              {/* Phone 1 */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#38bdf8" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] text-sky-300/60 uppercase tracking-wider mb-0.5">Phone</p>
                  <a href="tel:+256752690294" className="text-sm text-sky-100/80 hover:text-white transition-colors block">+256 752 690 294</a>
                  <a href="tel:+256771411974" className="text-sm text-sky-100/80 hover:text-white transition-colors block">+256 771 411 974</a>
                </div>
              </li>
              {/* Email 1 */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.28)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#fbbf24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] text-sky-300/60 uppercase tracking-wider mb-0.5">Email</p>
                  <a href="mailto:kigaragaravocational@yahoo.com" className="text-sm text-sky-100/80 hover:text-white transition-colors block break-all">kigaragaravocational@yahoo.com</a>
                  <a href="mailto:juliusbegumya@gmail.com" className="text-sm text-sky-100/80 hover:text-white transition-colors block">juliusbegumya@gmail.com</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-300 mb-5">Location</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#a78bfa" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] text-sky-300/60 uppercase tracking-wider mb-0.5">Address</p>
                  <p className="text-sm text-sky-100/80 leading-relaxed">
                    Kitanda Village,<br />
                    Bukanga North County,<br />
                    Isingiro District, Uganda
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.28)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#34d399" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] text-sky-300/60 uppercase tracking-wider mb-0.5">Post Office</p>
                  <p className="text-sm text-sky-100/80">P.O.Box 481, Isingiro</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(100,180,255,0.12)' }}>
          <p className="text-xs text-sky-100/40">
            © {year} Kivox Financial Management System · Kigaragara Vocational Secondary School
          </p>
          <p className="text-xs font-semibold" style={{ color: '#f0c040' }}>
            "Education is our future"
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
