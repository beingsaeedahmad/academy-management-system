"use client";

import SearchResultItem from "./SearchResultItem";
import { SearchResult } from "./searchTypes";

interface Props {
  loading: boolean;

  results: SearchResult[];

  open: boolean;
}

export default function SearchDropdown({
  loading,
  results,
  open,
}: Props) {

  if (!open) {
    return null;
  }

  return (

    <div
      className="
        absolute
        left-0
        top-[56px]
        z-50
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-slate-700
        bg-slate-900
        shadow-[0_0_40px_rgba(0,0,0,.45)]
      "
    >

      {loading && (

        <div
          className="
            px-5
            py-6
            text-center
            text-sm
            text-slate-400
          "
        >
          Searching...
        </div>

      )}

      {!loading && results.length === 0 && (

        <div
          className="
            px-5
            py-6
            text-center
            text-sm
            text-slate-500
          "
        >
          No results found.
        </div>

      )}

      {!loading && results.length > 0 && (

        <div
          className="
            max-h-[420px]
            overflow-y-auto
            py-2
          "
        >

          {results.map((result) => (

            <SearchResultItem
              key={result.id}
              result={result}
            />

          ))}

        </div>

      )}

    </div>

  );

}