"use client";

import {
  Search,
  GraduationCap,
  Plus,
  RefreshCw,
  Download,
} from "lucide-react";

interface Props {
  search: string;

  setSearch: (
    value: string
  ) => void;

  selectedClass: string;

  setSelectedClass: (
    value: string
  ) => void;
}

export default function FeesToolbar({
  search,
  setSearch,
  selectedClass,
  setSelectedClass,
}: Props) {
  return (
    <div
      className="
        mb-6
        rounded-3xl
        border
        border-slate-800
        bg-gradient-to-br
        from-[#0F172A]
        to-[#111827]
        p-5
        shadow-2xl
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >
        {/* Left Side */}

        <div
          className="
            flex
            flex-1
            flex-col
            gap-4
            lg:flex-row
          "
        >
          {/* Search */}

          <div className="relative flex-1">
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
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search student..."
              className="
                h-12
                w-full
                rounded-2xl
                border
                border-slate-700
                bg-[#020817]
                pl-12
                pr-4
                text-sm
                text-white
                placeholder:text-slate-500
                outline-none
                transition-all
                duration-300
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-500/30
              "
            />
          </div>

          {/* Class Filter */}

          <div className="relative">
            <GraduationCap
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-500
              "
            />

            <select
              value={selectedClass}
              onChange={(e) =>
                setSelectedClass(
                  e.target.value
                )
              }
              className="
                h-12
                min-w-[190px]
                rounded-2xl
                border
                border-slate-700
                bg-[#020817]
                pl-11
                pr-5
                text-sm
                text-white
                outline-none
                transition-all
                duration-300
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-500/30
              "
            >
              <option value="All">
                All Classes
              </option>

              <option value="10-A">
                10-A
              </option>

              <option value="10-B">
                10-B
              </option>

              <option value="9-A">
                9-A
              </option>
            </select>
          </div>
        </div>

        {/* Right Side */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <button
            className="
              flex
              h-11
              items-center
              gap-2
              rounded-2xl
              border
              border-slate-700
              bg-slate-900
              px-4
              text-sm
              text-slate-300
              transition-all
              hover:border-blue-500
              hover:text-white
            "
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            className="
              flex
              h-11
              items-center
              gap-2
              rounded-2xl
              border
              border-slate-700
              bg-slate-900
              px-4
              text-sm
              text-slate-300
              transition-all
              hover:border-blue-500
              hover:text-white
            "
          >
            <Download size={16} />
            Export
          </button>

          <button
            className="
              flex
              h-11
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              px-6
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-600/30
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <Plus size={18} />
            Collect Fee
          </button>
        </div>
      </div>
    </div>
  );
}