import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import GoogleSignInButton from '../components/GoogleSignInButton';

function Login() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [alreadySignedIn, setAlreadySignedIn] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAlreadySignedIn(true);
      const timer = setTimeout(() => navigate('/dashboard'), 1200);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.dispatchEvent(new Event('authChange'));
      const role = response.data.user.role;
      navigate(role === 'admin' ? '/admin-dashboard' : role === 'bursar' ? '/bursar-dashboard' : '/student-dashboard');
    } catch {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background image */}
      <img
        src="/kivox2.jpg"
        alt="School background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,20,50,0.65) 0%, rgba(10,20,50,0.45) 100%)' }} />

      <div className="relative z-10 w-full max-w-md fade-in">
        {/* Header above card */}
        <div className="mb-6 text-center">
          <img src="/school-badge.jpg" alt="Badge" className="h-16 w-16 rounded-xl object-cover mx-auto mb-3 shadow-xl ring-2 ring-white/30" />
          <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow">Welcome back</h1>
          <p className="mt-1 text-sm text-white/75">Sign in to your Kigaragara Finance account</p>
        </div>

        {/* Cream form card */}
        <div className="rounded-3xl p-8 shadow-2xl" style={{ background: 'rgba(255,252,242,0.97)', border: '1px solid rgba(255,255,255,0.6)' }}>
          {alreadySignedIn ? (
            <div className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3.5 text-sm text-indigo-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Already signed in. Redirecting to your dashboard...
            </div>
          ) : (
            <>
              <div className="mb-5">
                <GoogleSignInButton label="Sign in with Google" />
              </div>

              <div className="flex items-center gap-3 mb-5 text-amber-800/50 text-xs">
                <div className="flex-1 h-px bg-amber-900/20" />
                <span className="font-medium">or sign in with email</span>
                <div className="flex-1 h-px bg-amber-900/20" />
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email address</label>
                  <input
                    type="email"
                    {...register('email', { required: true })}
                    className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-stone-800 text-sm placeholder-stone-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-stone-700">Password</label>
                    <button type="button" onClick={() => setShowPass(!showPass)} className="text-xs text-indigo-500 hover:text-indigo-700 transition font-medium">
                      {showPass ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'}
                    {...register('password', { required: true })}
                    className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-stone-800 text-sm placeholder-stone-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                    </svg>
                    {errorMessage}
                  </div>
                )}

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-1" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 16px rgba(99,102,241,0.35)' }}>
                  {isSubmitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Signing in...
                    </>
                  ) : 'Sign in'}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-stone-500">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-800 transition">
                  Create one free
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
