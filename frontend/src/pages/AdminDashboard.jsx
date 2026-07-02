import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AreaChart, Area, Tooltip, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';
import api from '../api';
import FeeSummary from './FeeSummary';

const fetchSummary = async () => {
  const { data } = await api.get('/finance/summary');
  return data;
};

const StatCard = ({ label, value, subtitle, accent, icon }) => (
  <div className="stat-card rounded-2xl border bg-slate-900/60 p-6 backdrop-blur-sm" style={{ '--card-accent-start': accent[0], '--card-accent-end': accent[1], borderColor: `${accent[0]}22` }}>
    <div className="flex items-start justify-between mb-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</p>
      <span className="p-2 rounded-xl" style={{ background: `${accent[0]}18` }}>{icon}</span>
    </div>
    <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
    <p className="mt-2 text-xs text-slate-500">{subtitle}</p>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-indigo-500/20 bg-slate-900/90 px-4 py-3 backdrop-blur-sm shadow-xl">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        <p className="text-sm font-semibold text-indigo-300">${payload[0]?.value?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const ROLES = [
  { value: 'bursar', label: 'Bursar', color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
  { value: 'admin', label: 'Admin', color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)' },
  { value: 'student', label: 'Student', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)' },
];

const roleStyle = (role) => ROLES.find(r => r.value === role) || ROLES[2];

function AddUserModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'bursar', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [err, setErr] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(''); setSuccess('');
    setSubmitting(true);
    try {
      await api.post('/auth/admin/create-user', form);
      setSuccess(`${form.role.charAt(0).toUpperCase() + form.role.slice(1)} account for ${form.name} created successfully!`);
      setForm({ name: '', email: '', role: 'bursar', password: '' });
    } catch (error) {
      setErr(error.response?.data?.message || 'Failed to create user. Check API connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-md rounded-3xl shadow-2xl fade-in" style={{ background: '#0f172a', border: '1px solid rgba(139,92,246,0.25)' }}>
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-white/5">
          <div>
            <h3 className="text-lg font-bold text-white">Add Staff Account</h3>
            <p className="text-xs text-slate-400 mt-0.5">Create a new Bursar or Admin user</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition p-1 rounded-lg hover:bg-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-4">
          {/* Role selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Assign Role</label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map(r => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, role: r.value }))}
                  className="py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
                  style={{
                    background: form.role === r.value ? r.bg : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${form.role === r.value ? r.border : 'rgba(255,255,255,0.08)'}`,
                    color: form.role === r.value ? r.color : '#94a3b8',
                    boxShadow: form.role === r.value ? `0 0 12px ${r.bg}` : 'none',
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">Full Name</label>
            <input
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="input-field"
              placeholder="e.g. Julius Begumya"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">Email Address</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="input-field"
              placeholder="staff@kigaragara.ac.ug"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-slate-300">Temporary Password</label>
              <button type="button" onClick={() => setShowPass(!showPass)} className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition">
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              required
              type={showPass ? 'text' : 'password'}
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="input-field"
              placeholder="Min. 6 characters"
              minLength={6}
            />
          </div>

          {success && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {success}
            </div>
          )}
          {err && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
              {err}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center py-3">Cancel</button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex-1 justify-center py-3"
              style={{ background: 'linear-gradient(135deg,#8b5cf6,#6366f1)' }}
            >
              {submitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Creating...
                </>
              ) : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [userName, setUserName] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const { data, isLoading, error } = useQuery({
    queryKey: ['financeSummary'],
    queryFn: fetchSummary,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try { setUserName(JSON.parse(storedUser).name || 'Admin'); }
      catch { setUserName('Admin'); }
    }
  }, []);

  const chartData = data?.chart || [];
  const initials = userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'A';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'User Management' },
  ];

  return (
    <div className="min-h-screen auth-bg px-4 py-8 lg:px-6">
      {showAddUser && <AddUserModal onClose={() => setShowAddUser(false)} />}

      <div className="mx-auto max-w-6xl space-y-6 fade-in">
        {/* Header */}
        <div className="rounded-2xl border border-violet-500/15 bg-slate-900/70 p-6 lg:p-8 backdrop-blur-sm shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-violet-500/25">
                {initials}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="role-badge role-admin">Administrator</span>
                </div>
                <h1 className="text-xl font-bold text-white">System Overview</h1>
                <p className="text-sm text-slate-400">Welcome back, {userName}. Full system control and oversight.</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddUser(true)}
              className="btn-primary px-5 py-2.5 text-sm"
              style={{ background: 'linear-gradient(135deg,#8b5cf6,#6366f1)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/></svg>
              Add Staff User
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 border-b border-white/5 pb-0">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className="px-5 py-2.5 rounded-t-xl text-sm font-semibold transition-all duration-200 -mb-px"
                style={{
                  background: activeTab === t.id ? 'rgba(139,92,246,0.12)' : 'transparent',
                  color: activeTab === t.id ? '#c4b5fd' : '#64748b',
                  borderBottom: activeTab === t.id ? '2px solid #8b5cf6' : '2px solid transparent',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <>
            {isLoading ? (
              <div className="grid gap-5 md:grid-cols-3">
                {[1,2,3].map(i => <div key={i} className="skeleton h-36 rounded-2xl"/>)}
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/8 px-5 py-4 text-sm text-rose-300 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
                Unable to load summary. Check API connection.
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-3">
                <StatCard label="Total Revenue" value={`$${(data?.revenue || 0).toLocaleString()}`} subtitle="Fees collected from all students" accent={['#10b981', '#34d399']}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75"/></svg>}
                />
                <StatCard label="Active Students" value={(data?.students || 0).toLocaleString()} subtitle="Registered at Kigaragara VSS" accent={['#6366f1', '#818cf8']}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>}
                />
                <StatCard label="Outstanding Balance" value={`$${(data?.outstanding || 0).toLocaleString()}`} subtitle="Unpaid tuition and fees" accent={['#f59e0b', '#fbbf24']}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#f59e0b" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                />
              </div>
            )}

            {chartData.length > 0 && (
              <div className="rounded-2xl border border-indigo-500/12 bg-slate-900/60 p-6 backdrop-blur-sm">
                <h2 className="text-base font-semibold text-white mb-6">Revenue trend</h2>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/>
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false}/>
                    <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`}/>
                    <Tooltip content={<CustomTooltip />}/>
                    <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fill="url(#revenueGrad)"/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            <FeeSummary role="admin" />
          </>
        )}

        {/* ── USER MANAGEMENT TAB ── */}
        {activeTab === 'users' && (
          <div className="space-y-5">
            {/* Info banner */}
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/8 px-5 py-4 flex items-start gap-4">
              <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#a78bfa" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
              </span>
              <div>
                <p className="text-sm font-bold text-violet-300">Admin-Only Access</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Only Administrators can create Bursar and Admin accounts. Students register themselves. Use the button below or the <strong className="text-violet-300">Add Staff User</strong> button above.
                </p>
              </div>
            </div>

            {/* Role cards */}
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  role: 'bursar', label: 'Bursar', color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)',
                  desc: 'Can record payments, view all student accounts, generate fee reports, and manage transactions.',
                  permissions: ['Record fee payments', 'View all student balances', 'Generate financial reports', 'Manage transactions'],
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75"/></svg>,
                },
                {
                  role: 'admin', label: 'Administrator', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)',
                  desc: 'Full system access. Can create/manage users, view all data, and configure system settings.',
                  permissions: ['Full system access', 'Create & manage users', 'Assign roles & permissions', 'System configuration'],
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#8b5cf6" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>,
                },
                {
                  role: 'student', label: 'Student', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)',
                  desc: 'Self-registered. Can view their own balance, pay fees, and track their transaction history.',
                  permissions: ['View own balance', 'Pay fees online', 'View transaction history', 'Download receipts'],
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#3b82f6" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>,
                },
              ].map(r => (
                <div key={r.role} className="rounded-2xl p-5" style={{ background: r.bg, border: `1px solid ${r.border}` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0" style={{ background: `${r.bg}`, border: `1px solid ${r.border}` }}>{r.icon}</span>
                    <div>
                      <p className="font-bold text-white text-sm">{r.label}</p>
                      <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: r.color }}>
                        {r.role === 'student' ? 'Self-registered' : 'Admin-created'}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{r.desc}</p>
                  <ul className="space-y-1.5">
                    {r.permissions.map(p => (
                      <li key={p} className="flex items-center gap-2 text-xs text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: r.color, flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Add Staff CTA */}
            <div className="rounded-2xl border border-dashed border-violet-500/30 bg-violet-500/5 p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#a78bfa" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/></svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Add a New Staff Member</h3>
              <p className="text-sm text-slate-400 mb-5 max-w-sm mx-auto">Create a Bursar or Admin account and assign the appropriate role. Staff can sign in immediately after creation.</p>
              <button
                onClick={() => setShowAddUser(true)}
                className="btn-primary px-8 py-3 text-sm"
                style={{ background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', boxShadow: '0 4px 20px rgba(139,92,246,0.35)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/></svg>
                Add Staff User
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
