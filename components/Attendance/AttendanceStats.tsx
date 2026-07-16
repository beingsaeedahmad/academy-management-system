export default function AttendanceStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-slate-400">Present</p>
        <h2 className="mt-2 text-3xl font-bold text-green-400">0</h2>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-slate-400">Absent</p>
        <h2 className="mt-2 text-3xl font-bold text-red-400">0</h2>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-slate-400">Leave</p>
        <h2 className="mt-2 text-3xl font-bold text-yellow-400">0</h2>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <p className="text-slate-400">Total Students</p>
        <h2 className="mt-2 text-3xl font-bold text-blue-400">0</h2>
      </div>
    </div>
  );
}