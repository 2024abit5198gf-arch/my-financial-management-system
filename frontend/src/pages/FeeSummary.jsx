import { useEffect, useState } from 'react';
import api from '../api';

function FeeSummary({ role }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await api.get('/finance/fees');
        setData(response.data);
      } catch (err) {
        setError('Unable to load fee data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-slate-300">Loading fee information...</div>;
  }

  if (error) {
    return <div className="text-rose-400">{error}</div>;
  }

  if (!data) {
    return <div className="text-slate-300">No fee data available.</div>;
  }

  if (role === 'student') {
    const { student } = data;
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/20">
        <h2 className="text-xl font-semibold text-white">Your fee balance</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl bg-slate-900 p-5 text-slate-100">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Class</p>
            <p className="mt-3 text-2xl font-semibold">{student.classLevel?.toUpperCase()}</p>
          </div>
          <div className="rounded-3xl bg-slate-900 p-5 text-slate-100">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Total fees</p>
            <p className="mt-3 text-2xl font-semibold">${student.totalFees.toLocaleString()}</p>
          </div>
          <div className="rounded-3xl bg-slate-900 p-5 text-slate-100">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Outstanding</p>
            <p className="mt-3 text-2xl font-semibold">${student.outstandingFees.toLocaleString()}</p>
          </div>
        </div>
      </div>
    );
  }

  const classOptions = ['', 's1', 's2', 's3', 's4', 's5', 's6'];
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredStudents = data.studentBalances.filter((student) => {
    const matchesName = student.name.toLowerCase().includes(normalizedSearch);
    const matchesClass = classFilter ? student.classLevel === classFilter : true;
    return matchesName && matchesClass;
  });

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/20">
      <h2 className="text-xl font-semibold text-white">Class fee balances</h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {data.classTotals.map((classData) => (
          <div key={classData.classLevel} className="rounded-3xl bg-slate-900 p-5 text-slate-100">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">{classData.classLevel}</p>
            <p className="mt-3 text-2xl font-semibold">{classData.totalStudents} students</p>
            <p className="mt-2 text-slate-400">Fees: ${classData.totalFees.toLocaleString()}</p>
            <p className="mt-2 text-slate-400">Outstanding: ${classData.outstandingFees.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Fee balance by student</h3>
            <p className="mt-1 text-sm text-slate-400">Search by student name or filter by class.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student"
              className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
            />
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
            >
              {classOptions.map((option) => (
                <option key={option} value={option}>
                  {option ? option.toUpperCase() : 'All classes'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-200">
            <thead className="bg-slate-950">
              <tr>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Class</th>
                <th className="px-4 py-3 font-semibold">Total Fees</th>
                <th className="px-4 py-3 font-semibold">Outstanding</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-slate-400">
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isOverdue = Number(student.outstandingFees) > 0;
                  return (
                    <tr
                      key={student.id}
                      className={isOverdue ? 'bg-rose-950/30' : ''}
                    >
                      <td className="px-4 py-3 text-slate-100">
                        <div className="flex items-center gap-3">
                          <span>{student.name}</span>
                          {isOverdue && (
                            <span className="rounded-full bg-rose-500/15 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-rose-300">
                              Overdue
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-100">{student.classLevel?.toUpperCase()}</td>
                      <td className="px-4 py-3 text-slate-100">${student.totalFees.toLocaleString()}</td>
                      <td className={isOverdue ? 'px-4 py-3 text-rose-300' : 'px-4 py-3 text-slate-100'}>${student.outstandingFees.toLocaleString()}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FeeSummary;
