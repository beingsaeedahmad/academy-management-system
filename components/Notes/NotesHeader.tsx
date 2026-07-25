"use client";

interface NotesHeaderProps {
  totalNotes: number;
  onUpload: () => void;
}

export default function NotesHeader({
  totalNotes,
  onUpload,
}: NotesHeaderProps) {
  return (
    <div
      className="
        mb-6
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          Notes Management
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          Manage academy notes, study material and uploaded files.
        </p>

        <div
          className="
            mt-4
            inline-flex
            items-center
            rounded-full
            bg-blue-50
            px-4
            py-2
            text-sm
            font-medium
            text-blue-600
          "
        >
          Total Notes: {totalNotes}
        </div>
      </div>


      <button
        onClick={onUpload}
        className="
          rounded-xl
          bg-blue-600
          px-6
          py-3
          font-semibold
          text-white
          shadow-md
          transition
          hover:bg-blue-700
          active:scale-95
        "
      >
        + Upload Note
      </button>
    </div>
  );
}