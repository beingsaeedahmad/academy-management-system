"use client";

interface NotesFiltersProps {
  search: string;
  className: string;
  subject: string;
  fileType: string;

  setSearch: (value: string) => void;
  setClassName: (value: string) => void;
  setSubject: (value: string) => void;
  setFileType: (value: string) => void;
}

export default function NotesFilters({
  search,
  className,
  subject,
  fileType,
  setSearch,
  setClassName,
  setSubject,
  setFileType,
}: NotesFiltersProps) {
  return (
    <div
      className="
        mb-6
        grid
        grid-cols-1
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        md:grid-cols-4
      "
    >

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search notes..."
        className="
          rounded-xl
          border
          border-slate-200
          px-4
          py-3
          outline-none
          focus:border-blue-500
        "
      />


      <select
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        className="
          rounded-xl
          border
          border-slate-200
          px-4
          py-3
          outline-none
          focus:border-blue-500
        "
      >
        <option value="">
          All Classes
        </option>

        <option value="9th">
          9th
        </option>

        <option value="10th">
          10th
        </option>

        <option value="1st Year">
          1st Year
        </option>

        <option value="2nd Year">
          2nd Year
        </option>
      </select>


      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="
          rounded-xl
          border
          border-slate-200
          px-4
          py-3
          outline-none
          focus:border-blue-500
        "
      >
        <option value="">
          All Subjects
        </option>

        <option value="Physics">
          Physics
        </option>

        <option value="Chemistry">
          Chemistry
        </option>

        <option value="Mathematics">
          Mathematics
        </option>

        <option value="English">
          English
        </option>
      </select>


      <select
        value={fileType}
        onChange={(e) => setFileType(e.target.value)}
        className="
          rounded-xl
          border
          border-slate-200
          px-4
          py-3
          outline-none
          focus:border-blue-500
        "
      >
        <option value="">
          All Files
        </option>

        <option value="PDF">
          PDF
        </option>

        <option value="DOCX">
          DOCX
        </option>

        <option value="IMAGE">
          Image
        </option>
      </select>

    </div>
  );
}