import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api';
import Transactions from './Transactions';
import FeeSummary from './FeeSummary';

const fetchSummary = async () => {
  const { data } = await api.get('/finance/summary');
  return data;
};

const StatCard = ({ label, value, subtitle, accent, icon }) => (
  <div className={`stat-card rounded-2xl border bg-slate-900/60 p-6 backdrop-blur-sm`} style={{ '--card-accent-start': accent[0], '--card-accent-end': accent[1], borderColor: `${accent[0]}22` }}>
    <div className="flex items-start justify-between mb-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</p>
      <span className="p-2 rounded-xl" style={{ background: `${accent[0]}18` }}>
        {icon}
      </span>
    </div>
    <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
    <p className="mt-2 text-xs text-slate-500">{subtitle}</p>
  </div>
);

function BursarDashboard() {
  const [userName, setUserName] = useState('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['financeSummary'],
    queryFn: fetchSummary,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try { setUserName(JSON.parse(storedUser).name || 'Bursar'); }
      catch { setUserName('Bursar'); }
    }
  }, []);

  const initials = userName
    ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'B';

  return (
    <div className="min-h-screen auth-bg px-4 py-8 lg:px-6">
      <div className="mx-auto max-w-6xl space-y-6 fade-in">
        <div className="rounded-2xl border border-emerald-500/15 bg-slate-900/70 p-6 lg:p-8 backdrop-blur-sm shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-emerald-500/25">
                {initials}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="role-badge role-bursar">Bursar</span>
                </div>
                <h1 className="text-xl font-bold text-white">Finance Management</h1>
                <p className="text-sm text-slate-400">Welcome, {userName}. Manage all student financial records.</p>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-3">
            {[1,2,3].map(i => <div key={i} className="skeleton h-36 rounded-2xl"/>)}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/8 px-5 py-4 text-sm text-rose-300 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
            </svg>
            Unable to load financial data. Check your API connection.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            <StatCard
              label="Total Revenue"
              value={`$${(data?.revenue || 0).toLocaleString()}`}
              subtitle="Fees collected this term"
              accent={['#10b981', '#34d399']}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H18M9 10.5H7.875c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125H9"/></svg>}
            />
            <StatCard
              label="Active Students"
              value={(data?.students || 0).toLocaleString()}
              subtitle="Registered learners"
              accent={['#6366f1', '#818cf8']}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>}
            />
            <StatCard
              label="Outstanding Balance"
              value={`$${(data?.outstanding || 0).toLocaleString()}`}
              subtitle="Unpaid fees to collect"
              accent={['#f59e0b', '#fbbf24']}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#f59e0b" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
            />
          </div>
        )}

        <div className="rounded-2xl border border-indigo-500/12 bg-slate-900/60 p-6 backdrop-blur-sm">
          <h2 className="text-base font-semibold text-white mb-4">Quick actions</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <button className="btn-primary justify-center py-3 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
              Record deposit
            </button>
            <button className="btn-secondary justify-center py-3 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9"/></svg>
              View transactions
            </button>
            <button className="btn-secondary justify-center py-3 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
              Generate report
            </button>
          </div>
        </div>

        <FeeSummary role="admin" />
        <Transactions />
      </div>
    </div>
  );
}

export default BursarDashboard;
