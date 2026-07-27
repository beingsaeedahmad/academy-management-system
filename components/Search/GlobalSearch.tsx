"use client";

import {
  Search,
  Users,
  Wallet,
  BookOpen,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { globalSearch } from "@/actions/searchActions";

export default function GlobalSearch() {

  const router = useRouter();

  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState<any>({
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

                  {results.students.map((student: any) => (

                    <button
                      key={student.id}
                      onClick={() => {

                        router.push("/students");

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

                      <Users
                        className="text-blue-400"
                        size={18}
                      />

                      <div className="text-left">

                        <p className="text-white">

                          {student.name}

                        </p>

                        <p className="text-xs text-slate-400">

                          {student.rollNumber}

                        </p>

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

                  {results.notes.map((note: any) => (

                    <button
                      key={note.id}
                      onClick={() => {

                        router.push("/notes");

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

                  {results.fees.map((fee: any) => (

                    <button
                      key={fee.id}
                      onClick={() => {

                        router.push("/fees");

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