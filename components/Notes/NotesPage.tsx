"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getNotes,
} from "@/actions/noteActions";

import NotesHeader from "./NotesHeader";
import NotesOverviewCards from "./NotesOverviewCards";
import NotesTable from "./NotesTable";
import AddNoteModal from "./AddNoteModal";
import EditNoteModal from "./EditNoteModal";
import DeleteNoteDialog from "./DeleteNoteDialog";
import NotesViewer from "./NotesViewer";

import { Note } from "./notesTypes";

export default function NotesPage() {

  const [notes, setNotes] =
    useState<Note[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);

  const [showViewer, setShowViewer] =
    useState(false);

  const [selectedNote, setSelectedNote] =
    useState<Note | null>(null);

  async function loadNotes() {

    try {

      setLoading(true);

      const data =
        await getNotes();

      setNotes(data as Note[]);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadNotes();

  }, []);
  const filteredNotes = useMemo(() => {

    return notes.filter((note) => {

      const keyword = search.toLowerCase();

      return (
        note.title.toLowerCase().includes(keyword) ||
        note.subject.toLowerCase().includes(keyword) ||
        note.className.toLowerCase().includes(keyword) ||
        note.uploadedBy.toLowerCase().includes(keyword)
      );

    });

  }, [notes, search]);

  const stats = useMemo(() => {

    return {

      totalNotes: notes.length,

      totalDownloads: notes.reduce(
        (sum, note) => sum + note.downloads,
        0
      ),

      publishedNotes: notes.filter(
        (note) => note.isPublished
      ).length,

      hiddenNotes: notes.filter(
        (note) => !note.isPublished
      ).length,

    };

  }, [notes]);

  function handleView(note: Note) {

    setSelectedNote(note);

    setShowViewer(true);

  }

  function handleEdit(note: Note) {

    setSelectedNote(note);

    setShowEditModal(true);

  }

  function handleDelete(note: Note) {

    setSelectedNote(note);

    setShowDeleteDialog(true);

  }

  function handleDownload(note: Note) {

    if (!note.fileUrl) return;

    window.open(note.fileUrl, "_blank");

  }

  function handleExport() {

    console.log("Export Notes");

  }

  function handlePrint() {

    window.print();

  }
  return (
    <div className="space-y-6">

      <NotesHeader
        search={search}
        onSearchChange={setSearch}
        onAddNote={() => setShowAddModal(true)}
        onExport={handleExport}
        onPrint={handlePrint}
      />

      <NotesOverviewCards
        totalNotes={stats.totalNotes}
        totalDownloads={stats.totalDownloads}
        publishedNotes={stats.publishedNotes}
        hiddenNotes={stats.hiddenNotes}
      />

      {loading ? (

        <div className="flex h-72 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">

          <p className="text-lg text-slate-400">
            Loading notes...
          </p>

        </div>

      ) : (

        <NotesTable
          notes={filteredNotes}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDownload={handleDownload}
        />

      )}

      <AddNoteModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadNotes}
      />

      <EditNoteModal
        open={showEditModal}
        note={selectedNote}
        onClose={() => {
          setShowEditModal(false);
          setSelectedNote(null);
        }}
        onSuccess={loadNotes}
      />
            <DeleteNoteDialog
        open={showDeleteDialog}
        noteId={selectedNote?.id ?? null}
        noteTitle={selectedNote?.title ?? ""}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedNote(null);
        }}
        onSuccess={loadNotes}
      />

      <NotesViewer
        open={showViewer}
        note={selectedNote}
        onClose={() => {
          setShowViewer(false);
          setSelectedNote(null);
        }}
      />

    </div>
  );
}