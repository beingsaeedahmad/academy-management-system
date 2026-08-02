"use client";

import {
  Search,
  Users,
  Wallet,
  BookOpen,
  CalendarCheck2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { globalSearch } from "@/actions/searchActions";

type SearchStudentResult = {
  id: string;
  name: string;
  rollNumber: string;
  className: string;
  status: string;
  feeSummary: {
    balance: number;
    paidAmount: number;
    totalFee: number;
  };
  attendanceSummary: {
    present: number;
    absent: number;
    late: number;
    total: number;
  };
};

type SearchNoteResult = {
  id: string;
  title: string;
  subject: string;
};

type SearchFeeResult = {
  id: string;
  status: string;
  student: {
    name: string;
  };
};

type SearchResults = {
  students: SearchStudentResult[];
  notes: SearchNoteResult[];
  fees: SearchFeeResult[];
};

export default function GlobalSearch() {

  const router = useRouter();

  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState<SearchResults>({
    students: [],
    notes: [],
    fees: [],
  });

  useEffect(() => {

    const timer = setTimeout(async () => {

      if (!query.trim()) {

        setResults({
          students: [],
          notes: [],
          fees: [],
        });

        return;

      }

      setLoading(true);

      try {

        const data = await globalSearch(query);

        setResults(data);

      } finally {

        setLoading(false);

      }

    }, 300);

    return () => clearTimeout(timer);

  }, [query]);

  useEffect(() => {

    function handleKey(e: KeyboardEvent) {

      if (e.ctrlKey && e.key.toLowerCase() === "k") {

        e.preventDefault();

        setOpen(true);

      }

      if (e.key === "Escape") {

        setOpen(false);

      }

    }

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );

  }, []);

  return (

    <div className="relative w-[420px]">

      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-500
        "
      />

      <input
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        placeholder="Search students, fees, notes..."
        className="
          h-12
          w-full
          rounded-2xl
          border
          border-slate-700
          bg-slate-900
          pl-12
          pr-24
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          focus:border-blue-500
        "
      />

      <span
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          rounded-lg
          border
          border-slate-700
          bg-slate-800
          px-2
          py-1
          text-xs
          text-slate-400
        "
      >
        Ctrl K
      </span>

      {open && (

        <div
          className="
            absolute
            mt-3
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-slate-700
            bg-slate-900
            shadow-2xl
            z-50
          "
        >

          {loading && (

            <div className="p-4 text-slate-400">

              Searching...

            </div>

          )}

          {!loading && (

            <>

              {results.students.length > 0 && (

                <>

                  <div className="px-4 py-2 text-xs text-slate-500">

                    STUDENTS

                  </div>

                  {results.students.map((student: SearchStudentResult) => (

                    <button
                      key={student.id}
                      onClick={() => {

                        router.push(`/students?studentId=${student.id}&view=student`);

                        setOpen(false);

                      }}
                      className="
                        flex
                        w-full
                        flex-col
                        items-start
                        gap-3
                        p-4
                        text-left
                        hover:bg-slate-800
                      "
                    >

                      <div className="flex w-full items-start justify-between gap-3">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">

                            <Users size={18} />

                          </div>

                          <div>

                            <p className="font-semibold text-white">

                              {student.name}

                            </p>

                            <p className="text-xs text-slate-400">

                              {student.rollNumber} • {student.className}

                            </p>

                          </div>

                        </div>

                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">

                          {student.status}

                        </span>

                      </div>

                      <div className="grid w-full gap-2 sm:grid-cols-2">

                        <div className="rounded-xl border border-slate-800 bg-slate-800/70 p-2.5">

                          <div className="text-[11px] uppercase tracking-wide text-slate-500">

                            Fee

                          </div>

                          <div className="mt-1 text-sm text-white">

                            {student.feeSummary.balance > 0
                              ? `Due ${student.feeSummary.balance}`
                              : "Fee cleared"}

                          </div>

                          <div className="text-xs text-slate-400">

                            Paid {student.feeSummary.paidAmount} / {student.feeSummary.totalFee}

                          </div>

                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-800/70 p-2.5">

                          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-slate-500">

                            <CalendarCheck2 size={12} />

                            Attendance

                          </div>

                          <div className="mt-1 text-sm text-white">

                            {student.attendanceSummary.present}P • {student.attendanceSummary.absent}A • {student.attendanceSummary.late}L

                          </div>

                          <div className="text-xs text-slate-400">

                            {student.attendanceSummary.total} records

                          </div>

                        </div>

                      </div>

                    </button>

                  ))}

                </>

              )}

              {results.notes.length > 0 && (

                <>

                  <div className="px-4 py-2 text-xs text-slate-500">

                    NOTES

                  </div>

                  {results.notes.map((note: SearchNoteResult) => (

                    <button
                      key={note.id}
                      onClick={() => {

                        router.push(`/notes?studentId=${student.id}`);

                        setOpen(false);

                      }}
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        p-4
                        hover:bg-slate-800
                      "
                    >

                      <BookOpen
                        className="text-green-400"
                        size={18}
                      />

                      <div className="text-left">

                        <p className="text-white">

                          {note.title}

                        </p>

                        <p className="text-xs text-slate-400">

                          {note.subject}

                        </p>

                      </div>

                    </button>

                  ))}

                </>

              )}

              {results.fees.length > 0 && (

                <>

                  <div className="px-4 py-2 text-xs text-slate-500">

                    FEES

                  </div>

                  {results.fees.map((fee: SearchFeeResult) => (

                    <button
                      key={fee.id}
                      onClick={() => {

                        router.push(`/fees?studentId=${fee.student.id}`);

                        setOpen(false);

                      }}
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        p-4
                        hover:bg-slate-800
                      "
                    >

                      <Wallet
                        className="text-yellow-400"
                        size={18}
                      />

                      <div className="text-left">

                        <p className="text-white">

                          {fee.student.name}

                        </p>

                        <p className="text-xs text-slate-400">

                          {fee.status}

                        </p>

                      </div>

                    </button>

                  ))}

                </>

              )}

              {!results.students.length &&
               !results.notes.length &&
               !results.fees.length &&
               query && (

                <div className="p-5 text-slate-500">

                  No results found.

                </div>

              )}

            </>

          )}

        </div>

      )}

    </div>

  );

}