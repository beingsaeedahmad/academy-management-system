"use client";

import {
  Download,
  Eye,
  EyeOff,
  FileText,
} from "lucide-react";

import {
  formatDate,
  formatFileSize,
  getFileIcon,
} from "./notesUtils";

import NotesBadge from "./UI/NotesBadge";

import { NoteRowProps } from "./notesTypes";

interface Props {
  note: NoteRowProps["note"];

  onDelete?: (id: string) => void;

  onEdit?: (id: string) => void;

  onDownload?: (
    url: string,
    fileName: string
  ) => void;
}

export default function NotesRow({
  note,
  onDelete,
  onEdit,
  onDownload,
}: Props) {
  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/40 transition">

      {/* File */}
      <td className="px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-xl">
            {getFileIcon(note.fileType)}
          </div>

          <div>
            <p className="font-medium text-white">
              {note.fileName}
            </p>

            <p className="text-xs text-slate-400">
              {formatFileSize(note.fileSize)}
            </p>
          </div>

        </div>

      </td>


      {/* Title */}
      <td className="px-5 py-4">

        <p className="font-semibold text-white">
          {note.title}
        </p>

        {note.description && (
          <p className="mt-1 max-w-xs truncate text-xs text-slate-400">
            {note.description}
          </p>
        )}

      </td>


      {/* Subject */}
      <td className="px-5 py-4 text-slate-300">
        {note.subject}
      </td>


      {/* Class */}
      <td className="px-5 py-4 text-slate-300">
        {note.className}
      </td>


      {/* Category */}
      <td className="px-5 py-4">

        {note.category ? (
          <NotesBadge color="purple">
            {note.category}
          </NotesBadge>
        ) : (
          "-"
        )}

      </td>


      {/* Uploaded By */}
      <td className="px-5 py-4 text-slate-300">
        {note.uploadedBy || "Admin"}
      </td>


      {/* Date */}
      <td className="px-5 py-4 text-slate-300">
        {formatDate(note.createdAt)}
      </td>


      {/* Downloads */}
      <td className="px-5 py-4">

        <div className="flex items-center gap-2 text-slate-300">

          <Download size={16}/>

          {note.downloads}

        </div>

      </td>


      {/* Status */}
      <td className="px-5 py-4">

        {note.isPublished ? (

          <NotesBadge color="green">
            <span className="flex items-center gap-1">
              <Eye size={14}/>
              Published
            </span>
          </NotesBadge>

        ) : (

          <NotesBadge color="red">
            <span className="flex items-center gap-1">
              <EyeOff size={14}/>
              Hidden
            </span>
          </NotesBadge>

        )}

      </td>


      {/* Actions */}
      <td className="px-5 py-4">

        <div className="flex gap-2">

          <button
            onClick={() =>
              onDownload?.(
                note.fileUrl,
                note.fileName
              )
            }
            className="rounded-lg bg-blue-500/15 p-2 text-blue-400 hover:bg-blue-500/25"
          >
            <FileText size={16}/>
          </button>


          <button
            onClick={() =>
              onEdit?.(note.id)
            }
            className="rounded-lg bg-yellow-500/15 p-2 text-yellow-400 hover:bg-yellow-500/25"
          >
            Edit
          </button>


          <button
            onClick={() =>
              onDelete?.(note.id)
            }
            className="rounded-lg bg-red-500/15 p-2 text-red-400 hover:bg-red-500/25"
          >
            Delete
          </button>

        </div>

      </td>

    </tr>
  );
}