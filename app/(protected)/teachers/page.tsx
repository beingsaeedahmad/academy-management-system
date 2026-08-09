import { Users } from "lucide-react";

export default function TeachersPage() {
  return (
    <main className="min-h-screen bg-[#020817] p-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
              <Users
                size={21}
                className="text-emerald-400"
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-white">
                Teachers
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage academy teachers
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-dashed border-slate-800 p-10 text-center">
            <p className="text-sm text-slate-500">
              Teachers module is coming soon.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}