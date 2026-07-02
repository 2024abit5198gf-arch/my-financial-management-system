import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="auth-bg min-h-screen flex items-center justify-center px-4">
      <div className="text-center fade-in">
        <p className="text-8xl font-black text-gradient mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-slate-400 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
          </svg>
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
