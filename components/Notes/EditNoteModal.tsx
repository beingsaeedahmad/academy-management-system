"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { updateNote } from "@/actions/noteActions";
import { Note } from "./notesTypes";

interface EditNoteModalProps {
  open: boolean;
  note: Note | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EditNoteModal({
  open,
  note,
  onClose,
  onSuccess,
}: EditNoteModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    className: "",
    category: "",
    uploadedBy: "",
    isPublished: true,
  });

  useEffect(() => {
    if (!note) return;

    setForm({
      title: note.title,
      description: note.description,
      subject: note.subject,
      className: note.className,
      category: note.category ?? "",
      uploadedBy: note.uploadedBy,
      isPublished: note.isPublished,
    });
  }, [note]);

  if (!open || !note) return null;

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "isPublished"
          ? value === "true"
          : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await updateNote(note.id, {
        title: form.title,
        description: form.description,
        subject: form.subject,
        className: form.className,
        category: form.category,
        uploadedBy: form.uploadedBy,
        isPublished: form.isPublished,
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Edit Note
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <textarea
            rows={4}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <input
            name="className"
            value={form.className}
            onChange={handleChange}
            placeholder="Class"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <input
            name="uploadedBy"
            value={form.uploadedBy}
            onChange={handleChange}
            placeholder="Uploaded By"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <select
            name="isPublished"
            value={String(form.isPublished)}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          >
            <option value="true">Published</option>
            <option value="false">Hidden</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Note"}
          </button>
        </form>
      </div>
    </div>
  );
}