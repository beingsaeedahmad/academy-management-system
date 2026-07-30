"use client";

import {
  Download,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  deleteNote,
  incrementDownloads,
  togglePublish,
} from "@/actions/noteActions";

import { downloadFile } from "./notesUtils";

interface NoteActionsProps {
  id: string;

  fileUrl: string;

  fileName: string;

  isPublished: boolean;

  onEdit?: () => void;

  onRefresh?: () => void;
}

export default function NoteActions({
  id,
  fileUrl,
  fileName,
  isPublished,
  onEdit,
  onRefresh,
}: NoteActionsProps) {


  async function handleDownload() {

    await incrementDownloads(id);

    downloadFile(
      fileUrl,
      fileName
    );

    onRefresh?.();

  }



  async function handleDelete() {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this note?"
      );


    if (!confirmDelete) return;


    const result =
      await deleteNote(id);


    if (result.success) {

      onRefresh?.();

    }

  }



  async function handlePublish() {

    await togglePublish(
      id,
      !isPublished
    );


    onRefresh?.();

  }



  return (

    <div className="flex items-center gap-2">


      <button
        onClick={handleDownload}
        className="rounded-lg bg-blue-500/15 p-2 text-blue-400 transition hover:bg-blue-500/25"
        title="Download"
      >
        <Download size={16}/>
      </button>



      <button
        onClick={onEdit}
        className="rounded-lg bg-yellow-500/15 p-2 text-yellow-400 transition hover:bg-yellow-500/25"
        title="Edit"
      >
        <Edit size={16}/>
      </button>



      <button
        onClick={handlePublish}
        className="rounded-lg bg-emerald-500/15 p-2 text-emerald-400 transition hover:bg-emerald-500/25"
        title="Publish"
      >

        {isPublished ? (
          <EyeOff size={16}/>
        ) : (
          <Eye size={16}/>
        )}

      </button>



      <button
        onClick={handleDelete}
        className="rounded-lg bg-red-500/15 p-2 text-red-400 transition hover:bg-red-500/25"
        title="Delete"
      >
        <Trash2 size={16}/>
      </button>


    </div>

  );

}