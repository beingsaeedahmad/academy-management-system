"use client";

import {
  BookOpen,
  Download,
  Eye,
  Pencil,
  Trash2,
  UserRound,
} from "lucide-react";

interface SubjectBase {
  id: string;
  name: string;
  code: string;
  chapter?: string | null;
  className: string;
  teacherName?: string | null;
  fileName?: string | null;
  fileType?: string | null;
  fileSize?: number | null;
  fileUrl?: string | null;
  status?: string | null;
}

interface Props<T extends SubjectBase> {
  subjects: T[];
  loading?: boolean;
  onEdit: (subject: T) => void;
  onDelete: (subject: T) => void;
}

function formatFileSize(size?: number | null) {
  if (!size) return "";

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function SubjectsTable<T extends SubjectBase>({
  subjects,
  loading = false,
  onEdit,
  onDelete,
}: Props<T>) {
  if (loading) {
    return (
      <div className="w-full">
        <div className="flex h-32 items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
            Loading subjects...
          </div>
        </div>
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="w-full border-y border-slate-800">
        <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
            <BookOpen
              size={26}
              className="text-blue-400"
            />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-white">
            No Subjects Found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Add a subject to start managing chapters and study files.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden w-full overflow-x-auto md:block">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-300">
                Subject
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-300">
                Chapter
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-300">
                Class
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-300">
                Teacher
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-300">
                File
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-300">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((subject) => (
              <tr
                key={subject.id}
                className="border-b border-slate-800/80 transition-colors hover:bg-slate-900/60"
              >
                {/* SUBJECT */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <BookOpen size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {subject.name}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {subject.code}
                      </p>
                    </div>
                  </div>
                </td>

                {/* CHAPTER */}
                <td className="px-5 py-4">
                  <span className="whitespace-nowrap text-sm text-slate-300">
                    {subject.chapter || "—"}
                  </span>
                </td>

                {/* CLASS */}
                <td className="px-5 py-4">
                  <span className="inline-flex whitespace-nowrap rounded-lg bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300">
                    {subject.className}
                  </span>
                </td>

                {/* TEACHER */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <UserRound
                      size={15}
                      className="shrink-0 text-slate-500"
                    />

                    <span className="whitespace-nowrap text-sm text-slate-300">
                      {subject.teacherName || "Not assigned"}
                    </span>
                  </div>
                </td>

                {/* FILE */}
                <td className="px-5 py-4">
                  {subject.fileName ? (
                    <div className="flex max-w-[250px] items-center gap-2">
                      <div className="shrink-0 text-emerald-400">
                        <BookOpen size={17} />
                      </div>

                      <div className="min-w-0">
                        {subject.fileUrl ? (
                          <a
                            href={subject.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={subject.fileName}
                            className="block truncate text-sm text-slate-300 transition hover:text-blue-400"
                          >
                            {subject.fileName}
                          </a>
                        ) : (
                          <p
                            title={subject.fileName}
                            className="truncate text-sm text-slate-300"
                          >
                            {subject.fileName}
                          </p>
                        )}

                        {subject.fileSize ? (
                          <p className="mt-0.5 text-xs text-slate-600">
                            {formatFileSize(subject.fileSize)}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-600">
                      No file
                    </span>
                  )}
                </td>

                {/* STATUS */}
                <td className="px-5 py-4">
                  {subject.status === "Active" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-500/10 px-3 py-1 text-xs font-medium text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                      {subject.status || "Inactive"}
                    </span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    {/* VIEW */}
                    {subject.fileUrl && (
                      <a
                        href={subject.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View File"
                        className="
                          flex h-8 w-8 items-center justify-center
                          rounded-lg
                          bg-blue-500/10
                          text-blue-400
                          transition
                          hover:bg-blue-500/20
                          hover:text-blue-300
                        "
                      >
                        <Eye size={16} />
                      </a>
                    )}

                    {/* DOWNLOAD */}
                    {subject.fileUrl && (
                      <a
                        href={subject.fileUrl}
                        download={subject.fileName || undefined}
                        title="Download File"
                        className="
                          flex h-8 w-8 items-center justify-center
                          rounded-lg
                          bg-slate-800
                          text-slate-400
                          transition
                          hover:bg-slate-700
                          hover:text-white
                        "
                      >
                        <Download size={16} />
                      </a>
                    )}

                    {/* EDIT */}
                    <button
                      type="button"
                      onClick={() => onEdit(subject)}
                      title="Edit Subject"
                      className="
                        flex h-8 w-8 items-center justify-center
                        rounded-lg
                        bg-amber-500/10
                        text-amber-400
                        transition
                        hover:bg-amber-500/20
                        hover:text-amber-300
                      "
                    >
                      <Pencil size={16} />
                    </button>

                    {/* DELETE */}
                    <button
                      type="button"
                      onClick={() => onDelete(subject)}
                      title="Delete Subject"
                      className="
                        flex h-8 w-8 items-center justify-center
                        rounded-lg
                        bg-red-500/10
                        text-red-400
                        transition
                        hover:bg-red-500/20
                        hover:text-red-300
                      "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="space-y-3 md:hidden">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <BookOpen size={19} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-white">
                    {subject.name}
                  </h3>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {subject.code}
                  </p>
                </div>
              </div>

              {subject.status === "Active" && (
                <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                  Active
                </span>
              )}
            </div>

            {/* Details */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-600">
                  Chapter
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {subject.chapter || "—"}
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-600">
                  Class
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {subject.className}
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-600">
                  Teacher
                </p>

                <p className="mt-1 truncate text-sm text-slate-300">
                  {subject.teacherName || "Not assigned"}
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-600">
                  File
                </p>

                <p className="mt-1 truncate text-sm text-slate-300">
                  {subject.fileName || "No file"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-end gap-2 border-t border-slate-800 pt-4">
              {subject.fileUrl && (
                <a
                  href={subject.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"
                >
                  <Eye size={16} />
                </a>
              )}

              {subject.fileUrl && (
                <a
                  href={subject.fileUrl}
                  download={subject.fileName || undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400"
                >
                  <Download size={16} />
                </a>
              )}

              <button
                type="button"
                onClick={() => onEdit(subject)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400"
              >
                <Pencil size={16} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(subject)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}