import { useEffect, useState } from 'react';
import FeePayment from './FeePayment';
import Transactions from './Transactions';
import FeeSummary from './FeeSummary';

function StudentDashboard() {
  const [userName, setUserName] = useState('');
  const [latestPayment, setLatestPayment] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUserName(JSON.parse(storedUser).name || 'Student');
      } catch {
        setUserName('Student');
      }
    }
  }, []);

  const handlePaymentSuccess = (paymentData) => {
    setLatestPayment(paymentData);
  };

  const initials = userName
    ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'S';

  return (
    <div className="min-h-screen auth-bg px-4 py-8 lg:px-6">
      <div className="mx-auto max-w-6xl space-y-6 fade-in">
        <div className="rounded-2xl border border-blue-500/15 bg-slate-900/70 p-6 lg:p-8 backdrop-blur-sm shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-blue-500/25">
                {initials}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="role-badge role-student">Student</span>
                </div>
                <h1 className="text-xl font-bold text-white">Welcome back, {userName || 'Student'}</h1>
                <p className="text-sm text-slate-400">Manage your school fee payments and account balance.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/8 px-4 py-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"/>
              <span className="text-xs font-medium text-emerald-300">Account active</span>
            </div>
          </div>
        </div>

        <FeeSummary role="student" />

        {latestPayment && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/8 p-5 flex items-start gap-3 fade-in">
            <div className="mt-0.5 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#34d399" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-300">Payment successful!</p>
              <p className="text-xs text-emerald-400/80 mt-0.5">Reference: {latestPayment.transaction?.reference} · Amount: ${Number(latestPayment.amount).toFixed(2)}</p>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <FeePayment onSuccess={handlePaymentSuccess} />
          <Transactions />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
