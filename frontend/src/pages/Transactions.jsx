import { useEffect, useState } from 'react';
import api from '../api';
import ReceiptModal from '../components/ReceiptModal';

const statusColors = {
  completed: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
  pending: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
  failed: 'border-rose-500/25 bg-rose-500/10 text-rose-300',
};

function getUserRole() {
  try {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u).role : 'student';
  } catch {
    return 'student';
  }
}

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTx, setSelectedTx] = useState(null);
  const role = getUserRole();
  const canPrint = role === 'bursar' || role === 'admin';

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/transactions');
        setTransactions(response.data);
      } catch {
        setError('Unable to load transactions.');
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <>
      {selectedTx && (
        <ReceiptModal transaction={selectedTx} onClose={() => setSelectedTx(null)} />
      )}

      <div className="rounded-2xl border border-indigo-500/12 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#a78bfa" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Transactions</h2>
              <p className="text-xs text-slate-400">
                {canPrint ? 'All student payments — click receipt icon to print' : 'Recent payments and deposits'}
              </p>
            </div>
          </div>
          {canPrint && (
            <div className="flex items-center gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/8 px-3 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#34d399" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"/>
              </svg>
              <span className="text-xs font-semibold text-emerald-300">Print enabled</span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="skeleton h-20 rounded-xl"/>)}
          </div>
        ) : error ? (
          <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/8 px-4 py-3 text-sm text-rose-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
            </svg>
            {error}
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#334155" strokeWidth={1.2} className="mb-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
            </svg>
            <p className="text-sm text-slate-500">No transactions yet</p>
            <p className="text-xs text-slate-600 mt-1">Transactions will appear here once fees are paid.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-4 hover:border-slate-700/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-100 truncate">{tx.description}</p>
                    {canPrint && tx.student_name && (
                      <p className="text-xs font-medium text-indigo-300 mt-0.5">
                        👤 {tx.student_name}
                      </p>
                    )}
                    <p className="text-xs text-slate-500 mt-0.5">Ref: {tx.reference}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusColors[tx.status] || statusColors.pending}`}>
                      {tx.status}
                    </span>
                    {canPrint && tx.status === 'completed' && (
                      <button
                        onClick={() => setSelectedTx(tx)}
                        title="Print Receipt"
                        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all"
                        style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.25)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(16,185,129,0.12)'}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#34d399" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500 capitalize">{tx.type?.replace('_', ' ')}</span>
                  <span className="text-base font-bold text-white">UGX {Number(tx.amount).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Transactions;
