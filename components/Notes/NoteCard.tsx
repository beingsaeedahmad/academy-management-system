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

import { NoteCardProps } from "./notesTypes";

interface Props {
  note: NoteCardProps["note"];

  onDelete?: (id: string) => void;

  onEdit?: (id: string) => void;

  onDownload?: (
    url: string,
    fileName: string
  ) => void;
}

export default function NoteCard({
  note,
  onDelete,
  onEdit,
  onDownload,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-2xl">
            {getFileIcon(note.fileType)}
          </div>


          <div>

            <h3 className="font-semibold text-white">
              {note.title}
            </h3>

            <p className="text-sm text-slate-400">
              {note.fileName}
            </p>

          </div>

        </div>


        {note.isPublished ? (

          <NotesBadge color="green">
            <span className="flex items-center gap-1">
              <Eye size={14}/>
              Live
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

      </div>


      {/* Details */}

      <div className="mt-5 space-y-3 text-sm">


        <div className="flex justify-between">

          <span className="text-slate-400">
            Subject
          </span>

          <span className="text-white">
            {note.subject}
          </span>

        </div>


        <div className="flex justify-between">

          <span className="text-slate-400">
            Class
          </span>

          <span className="text-white">
            {note.className}
          </span>

        </div>


        <div className="flex justify-between">

          <span className="text-slate-400">
            Size
          </span>

          <span className="text-white">
            {formatFileSize(note.fileSize)}
          </span>

        </div>


        <div className="flex justify-between">

          <span className="text-slate-400">
            Uploaded
          </span>

          <span className="text-white">
            {formatDate(note.createdAt)}
          </span>

        </div>


        <div className="flex justify-between">

          <span className="text-slate-400">
            Downloads
          </span>

          <span className="flex items-center gap-1 text-white">

            <Download size={14}/>

            {note.downloads}

          </span>

        </div>


      </div>


      {/* Actions */}

      <div className="mt-5 flex gap-2">


        <button
          onClick={() =>
            onDownload?.(
              note.fileUrl,
              note.fileName
            )
          }
          className="flex-1 rounded-xl bg-blue-500/15 px-3 py-2 text-sm text-blue-400 hover:bg-blue-500/25"
        >

          <span className="flex items-center justify-center gap-2">

            <FileText size={16}/>

            Open

          </span>

        </button>


        <button
          onClick={() =>
            onEdit?.(note.id)
          }
          className="rounded-xl bg-yellow-500/15 px-4 py-2 text-sm text-yellow-400 hover:bg-yellow-500/25"
        >
          Edit
        </button>


        <button
          onClick={() =>
            onDelete?.(note.id)
          }
          className="rounded-xl bg-red-500/15 px-4 py-2 text-sm text-red-400 hover:bg-red-500/25"
        >
          Delete
        </button>


      </div>


    </div>
  );
}