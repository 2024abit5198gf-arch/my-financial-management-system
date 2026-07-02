import { useState } from 'react';
import api from '../api';

const classOptions = [
  { value: 's1', label: 'S.1' },
  { value: 's2', label: 'S.2' },
  { value: 's3', label: 'S.3' },
  { value: 's4', label: 'S.4' },
  { value: 's5', label: 'S.5' },
  { value: 's6', label: 'S.6' },
];

const feeAmounts = {
  s1: 2100,
  s2: 2200,
  s3: 2300,
  s4: 2400,
  s5: 2500,
  s6: 2600,
};

function FeePayment({ onSuccess }) {
  const [classLevel, setClassLevel] = useState('s1');
  const [paymentOption, setPaymentOption] = useState('full');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalFee = feeAmounts[classLevel] || 0;
  const displayAmount = paymentOption === 'full' ? totalFee : totalFee / 2;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setIsSuccess(false);
    try {
      const response = await api.post('/transactions/pay', { classLevel, paymentOption });
      setMessage(`Payment confirmed. Reference: ${response.data.transaction.reference}`);
      setIsSuccess(true);
      onSuccess?.(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Payment failed. Please try again.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-indigo-500/12 bg-slate-900/60 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#818cf8" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">Pay school fees</h3>
          <p className="text-xs text-slate-400">Select your class and payment option</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Class level</label>
          <div className="grid grid-cols-3 gap-2">
            {classOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setClassLevel(opt.value)}
                className={`rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                  classLevel === opt.value
                    ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/30'
                    : 'border-slate-700/50 bg-slate-800/40 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Payment option</label>
          <div className="grid grid-cols-2 gap-3">
            {['full', 'half'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setPaymentOption(opt)}
                className={`rounded-xl border py-3 text-sm font-medium transition-all ${
                  paymentOption === opt
                    ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/30'
                    : 'border-slate-700/50 bg-slate-800/40 text-slate-400 hover:border-slate-600'
                }`}
              >
                {opt === 'full' ? 'Full fees' : 'Half fees'}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-indigo-500/15 bg-slate-950/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Class fee ({classOptions.find(o => o.value === classLevel)?.label})</span>
            <span className="text-sm text-slate-300">${totalFee.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-800 pt-2 mt-2">
            <span className="text-xs font-semibold text-slate-300">Amount due ({paymentOption === 'full' ? '100%' : '50%'})</span>
            <span className="text-xl font-bold text-white">${displayAmount.toLocaleString()}</span>
          </div>
        </div>

        {message && (
          <div className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${
            isSuccess
              ? 'border-emerald-500/25 bg-emerald-500/8 text-emerald-300'
              : 'border-rose-500/25 bg-rose-500/8 text-rose-300'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="mt-0.5 flex-shrink-0">
              {isSuccess
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              }
            </svg>
            {message}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full py-3">
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing payment...
            </>
          ) : (
            `Pay ${paymentOption === 'full' ? 'full' : 'half'} fees — $${displayAmount.toLocaleString()}`
          )}
        </button>
      </form>
    </div>
  );
}

export default FeePayment;
