"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import { createNote } from "@/actions/noteActions";

interface AddNoteModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddNoteModal({
  open,
  onClose,
  onSuccess,
}: AddNoteModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    className: "",
    category: "",
    uploadedBy: "Admin",
    file: null as File | null,
  });

  if (!open) return null;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setForm((prev) => ({
      ...prev,
      file: selectedFile,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await createNote({
        title: form.title,
        description: form.description,
        subject: form.subject,
        className: form.className,
        uploadedBy: form.uploadedBy,
        fileUrl: "",
        fileName: form.file?.name || "",
        fileType: form.file?.type || "",
        fileSize: form.file?.size || 0,
      });

      onSuccess?.();
      onClose();

      setForm({
        title: "",
        description: "",
        subject: "",
        className: "",
        category: "",
        uploadedBy: "Admin",
        file: null,
      });
    } catch (error) {
      console.error("CREATE NOTE ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            Add New Note
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            required
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Note Title"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Description"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          <input
            required
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          <input
            required
            name="className"
            value={form.className}
            onChange={handleChange}
            placeholder="Class"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 p-6 text-slate-400 transition hover:border-blue-500">
            <Upload className="mb-3 h-8 w-8" />

            <span className="text-sm">
              {form.file ? form.file.name : "Choose File"}
            </span>

            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Note"}
          </button>
        </form>
      </div>
    </div>
  );
}