import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AreaChart, Area, Tooltip, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';
import api from '../api';

const fetchSummary = async () => {
  const { data } = await api.get('/finance/summary');
  return data;
};

function Dashboard() {
  const [userName, setUserName] = useState('');
  const { data, isLoading, error } = useQuery(['financeSummary'], fetchSummary, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUserName(JSON.parse(storedUser).name || 'Finance Manager');
      } catch {
        setUserName('Finance Manager');
      }
    }
  }, []);

  const chartData = data?.chart || [];

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/35">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">School finance</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Dashboard overview</h1>
            <p className="mt-2 text-sm text-slate-400">Welcome back{userName ? `, ${userName}` : ''}.</p>
          </div>
          <div className="rounded-3xl bg-slate-950 px-5 py-3 text-sm text-slate-300">
            Updated live with student revenue metrics
          </div>
        </div>

        {isLoading ? (
          <div className="mt-10 text-slate-300">Loading finance summary...</div>
        ) : error ? (
          <div className="mt-10 text-rose-400">Unable to load summary. Check API connection.</div>
        ) : !data ? (
          <div className="mt-10 text-slate-300">Loading finance summary...</div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-slate-950 p-6 text-slate-100 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Total revenue</p>
              <p className="mt-4 text-4xl font-semibold">${data.revenue.toLocaleString()}</p>
              <p className="mt-3 text-slate-400">Fees collected from students this term.</p>
            </div>
            <div className="rounded-3xl bg-slate-950 p-6 text-slate-100 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Active students</p>
              <p className="mt-4 text-4xl font-semibold">{data.students}</p>
              <p className="mt-3 text-slate-400">Registered learners at Kigaragara Vocational Secondary School.</p>
            </div>
            <div className="rounded-3xl bg-slate-950 p-6 text-slate-100 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Outstanding balance</p>
              <p className="mt-4 text-4xl font-semibold">${data.outstanding.toLocaleString()}</p>
              <p className="mt-3 text-slate-400">Unpaid tuition and fees remaining.</p>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/35">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Enrollment trend</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Enrollment & fees growth</h2>
          </div>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
              <Area type="monotone" dataKey="value" stroke="#38bdf8" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
