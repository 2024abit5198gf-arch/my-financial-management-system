import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Spinner = () => (
  <svg className="h-5 w-5 animate-spin text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
  </svg>
);

function GoogleSignInButton({ role, label }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [gsiReady, setGsiReady] = useState(false);
  const navigate = useNavigate();

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) return;
    const checkGsi = () => {
      if (window.google?.accounts?.oauth2) {
        setGsiReady(true);
      } else {
        setTimeout(checkGsi, 200);
      }
    };
    checkGsi();
  }, [clientId]);

  const handleGoogleToken = useCallback(async (accessToken) => {
    try {
      const response = await api.post('/auth/google', {
        access_token: accessToken,
        role,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.dispatchEvent(new Event('authChange'));
      const userRole = response.data.user.role;
      navigate(
        userRole === 'admin' ? '/admin-dashboard' :
        userRole === 'bursar' ? '/bursar-dashboard' :
        '/student-dashboard'
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [role, navigate]);

  const handleClick = useCallback(() => {
    if (!clientId || !gsiReady) return;
    setError('');
    setLoading(true);

    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'email profile',
        callback: (response) => {
          if (response.error) {
            setError('Google sign-in was cancelled or failed.');
            setLoading(false);
            return;
          }
          handleGoogleToken(response.access_token);
        },
      });
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } catch {
      setError('Google sign-in could not be started.');
      setLoading(false);
    }
  }, [clientId, gsiReady, handleGoogleToken]);

  if (!clientId) {
    return (
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/8 px-4 py-3 text-sm text-amber-300/80 text-center">
        Set <code className="font-mono text-amber-200">VITE_GOOGLE_CLIENT_ID</code> to enable Google sign-in.
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading || !gsiReady}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.65rem',
          width: '100%',
          padding: '0.875rem 1.5rem',
          borderRadius: '0.875rem',
          background: '#fff',
          border: '2px solid #3b82f6',
          cursor: loading || !gsiReady ? 'not-allowed' : 'pointer',
          opacity: loading || !gsiReady ? 0.65 : 1,
          boxShadow: '0 2px 10px rgba(59,130,246,0.15)',
          transition: 'box-shadow 0.18s ease, border-color 0.18s ease',
        }}
        onMouseEnter={e => { if (!loading && gsiReady) e.currentTarget.style.boxShadow = '0 4px 18px rgba(59,130,246,0.28)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(59,130,246,0.15)'; }}
      >
        {loading ? <Spinner /> : <GoogleIcon />}
        <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1d4ed8', letterSpacing: '0.01em' }}>
          {loading ? 'Connecting to Google...' : (label || 'Continue with Google')}
        </span>
      </button>
      {error && (
        <p className="mt-2 text-center text-sm text-rose-400">{error}</p>
      )}
    </div>
  );
}

export default GoogleSignInButton;
