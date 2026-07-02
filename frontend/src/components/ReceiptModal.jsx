import { useRef } from 'react';

const SCHOOL = {
  name: 'KIGARAGARA VOCATIONAL SECONDARY SCHOOL',
  motto: '"Educ. Is Our Future"',
  address: 'Kitanda Village, Bukanga North County, Isingiro District',
  poBox: 'P.O.Box 481, Isingiro',
  phones: ['+256 752 690 294', '+256 771 411 974'],
  emails: ['kigaragaravocational@yahoo.com', 'juliusbegumya@gmail.com'],
};

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-UG', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

function formatAmount(amount) {
  return Number(amount).toLocaleString('en-UG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function ReceiptModal({ transaction, onClose }) {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalBody = document.body.innerHTML;
    document.body.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', Arial, sans-serif; background: #fff; color: #111; }
      </style>
      ${printContents}
    `;
    window.print();
    document.body.innerHTML = originalBody;
    window.location.reload();
  };

  if (!transaction) return null;

  const classLabel = transaction.class_level
    ? `S.${transaction.class_level.replace('s', '')}`
    : '—';

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 py-8 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(6px)' }}
    >
      <div className="w-full max-w-2xl fade-in">
        {/* Toolbar (screen only) */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#34d399" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Official Fee Receipt</p>
              <p className="text-xs text-slate-400">Ref: {transaction.reference}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition"
              style={{ background: 'linear-gradient(135deg,#10b981,#059669)', boxShadow: '0 3px 14px rgba(16,185,129,0.35)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"/>
              </svg>
              Print Receipt
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              Close
            </button>
          </div>
        </div>

        {/* ──────────── RECEIPT (printable) ──────────── */}
        <div ref={printRef}>
          <div style={{
            background: '#ffffff',
            border: '1px solid #d1d5db',
            borderRadius: '12px',
            padding: '0',
            fontFamily: 'Arial, sans-serif',
            color: '#111827',
            maxWidth: '680px',
            margin: '0 auto',
            boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
            overflow: 'hidden',
          }}>

            {/* ── HEADER ── */}
            <div style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
              padding: '28px 32px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}>
              <img
                src="/school-badge.jpg"
                alt="School Badge"
                style={{
                  width: '80px', height: '80px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  border: '2px solid rgba(255,255,255,0.25)',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#fbbf24', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>
                  Republic of Uganda — Official Receipt
                </div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, marginBottom: '5px' }}>
                  {SCHOOL.name}
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8', lineHeight: 1.6 }}>
                  {SCHOOL.address}<br />
                  {SCHOOL.poBox}<br />
                  📞 {SCHOOL.phones.join('  |  ')}<br />
                  ✉ {SCHOOL.emails[0]}
                </div>
              </div>
            </div>

            {/* ── RECEIPT TITLE BAND ── */}
            <div style={{
              background: '#4f46e5',
              padding: '10px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Official Fee Receipt
              </span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#c7d2fe' }}>
                {SCHOOL.motto}
              </span>
            </div>

            {/* ── BODY ── */}
            <div style={{ padding: '28px 32px' }}>

              {/* Reference & Date row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', background: '#f8fafc', borderRadius: '8px', padding: '12px 16px', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontSize: '9px', color: '#6b7280', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3px' }}>Receipt No.</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e1b4b', fontFamily: 'monospace' }}>{transaction.reference}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '9px', color: '#6b7280', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3px' }}>Date of Payment</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{formatDate(transaction.created_at)}</div>
                </div>
              </div>

              {/* Student details */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#4f46e5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '2px solid #e0e7ff', paddingBottom: '6px' }}>
                  Student Information
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {[
                      ['Student Name', transaction.student_name || 'N/A'],
                      ['Class Level', classLabel],
                      ['Payment Type', transaction.description || 'School Fee Payment'],
                      ['Payment Method', 'Cash / Bank Deposit'],
                    ].map(([label, value]) => (
                      <tr key={label} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '9px 0', fontSize: '12px', color: '#64748b', fontWeight: 600, width: '40%' }}>{label}</td>
                        <td style={{ padding: '9px 0', fontSize: '12px', color: '#111827', fontWeight: 700 }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Amount paid — big highlight */}
              <div style={{
                background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                border: '2px solid #10b981',
                borderRadius: '10px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
              }}>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#065f46', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>Amount Paid</div>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#065f46', lineHeight: 1 }}>
                    UGX {formatAmount(transaction.amount)}
                  </div>
                  <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px' }}>
                    ({transaction.description?.toLowerCase().includes('full') ? 'Full Term Payment' : 'Partial / Half Term Payment'})
                  </div>
                </div>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  background: '#10b981',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>

              {/* Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: '#f0fdf4', border: '1px solid #bbf7d0',
                  borderRadius: '100px', padding: '5px 14px',
                  fontSize: '11px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>
                  ● Payment Status: {(transaction.status || 'completed').toUpperCase()}
                </div>
              </div>

              {/* Signatures */}
              <div style={{ borderTop: '2px dashed #e2e8f0', paddingTop: '24px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#4f46e5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
                  Authorisation &amp; Signatures
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                  {/* Student signature */}
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>Student / Guardian Signature</div>
                    <div style={{ borderBottom: '1.5px solid #374151', height: '48px', marginBottom: '6px', background: 'repeating-linear-gradient(90deg,transparent,transparent 4px,#f3f4f6 4px,#f3f4f6 5px)', borderRadius: '4px 4px 0 0' }}></div>
                    <div style={{ fontSize: '10px', color: '#9ca3af' }}>Name: {transaction.student_name || '________________________________'}</div>
                  </div>
                  {/* Bursar signature */}
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>Bursar's Signature &amp; Stamp</div>
                    <div style={{ borderBottom: '1.5px solid #374151', height: '48px', marginBottom: '6px', background: 'repeating-linear-gradient(90deg,transparent,transparent 4px,#f3f4f6 4px,#f3f4f6 5px)', borderRadius: '4px 4px 0 0' }}></div>
                    <div style={{ fontSize: '10px', color: '#9ca3af' }}>Date: ______________________</div>
                  </div>
                </div>

                {/* Headteacher signature row */}
                <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>Head Teacher's Signature</div>
                    <div style={{ borderBottom: '1.5px solid #374151', height: '48px', marginBottom: '6px', background: 'repeating-linear-gradient(90deg,transparent,transparent 4px,#f3f4f6 4px,#f3f4f6 5px)', borderRadius: '4px 4px 0 0' }}></div>
                    <div style={{ fontSize: '10px', color: '#9ca3af' }}>Tel: {SCHOOL.phones[0]}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>Official School Stamp</div>
                    <div style={{
                      height: '56px', borderRadius: '8px', marginBottom: '6px',
                      border: '2px dashed #d1d5db',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '10px', color: '#d1d5db', fontWeight: 600, letterSpacing: '0.05em',
                    }}>
                      OFFICIAL STAMP
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── FOOTER ── */}
            <div style={{
              background: '#0f172a',
              padding: '14px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
              <div style={{ fontSize: '9px', color: '#64748b', letterSpacing: '0.05em' }}>
                🔒 This receipt is valid only when signed, stamped, and issued by the Bursar.
              </div>
              <div style={{ fontSize: '9px', color: '#475569', fontFamily: 'monospace' }}>
                Printed: {new Date().toLocaleString('en-UG')} · Kivox FMS
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiptModal;
