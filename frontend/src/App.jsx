import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import BursarDashboard from './pages/BursarDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/bursar-dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['bursar', 'admin']}>
                <BursarDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/unauthorized"
            element={
              <div className="auth-bg min-h-[60vh] flex items-center justify-center px-4">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-white mb-3">Access Denied</h1>
                  <p className="text-slate-400">You do not have permission to view this page.</p>
                </div>
              </div>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/256752690294?text=Hello%2C%20I%20am%20contacting%20you%20from%20the%20Kivox%20FMS%20website%20regarding%20Kigaragara%20Vocational%20Secondary%20School."
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '1.75rem',
          right: '1.75rem',
          zIndex: 9999,
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '9999px',
          background: '#25D366',
          boxShadow: '0 4px 24px rgba(37,211,102,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.12)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,211,102,0.65)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(37,211,102,0.5)';
        }}
      >
        {/* Pulse ring */}
        <span style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '9999px',
          background: 'rgba(37,211,102,0.4)',
          animation: 'whatsappPulse 2s ease-out infinite',
        }} />
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ position: 'relative', zIndex: 1 }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

export default App;
