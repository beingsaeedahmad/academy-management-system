"use client";

import { useRef, useState } from "react";
import {
  BookOpen,
  FileUp,
  File,
  X,
  Loader2,
} from "lucide-react";
import { createSubject } from "@/actions/subjectActions";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void | Promise<void>;
}

export default function AddSubjectModal({
  open,
  onClose,
  onCreated,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    chapter: "",
    className: "",
    teacherName: "",
  });

  const [file, setFile] = useState<File | null>(null);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
  };

  const openFileManager = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!form.subject.trim()) {
      alert("Please enter subject name.");
      return;
    }

    if (!form.chapter.trim()) {
      alert("Please enter chapter name.");
      return;
    }

    if (!form.className.trim()) {
      alert("Please enter class.");
      return;
    }

    if (!form.teacherName.trim()) {
      alert("Please enter teacher name.");
      return;
    }

    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("subject", form.subject);
      formData.append("chapter", form.chapter);
      formData.append("className", form.className);
      formData.append("teacherName", form.teacherName);
      formData.append("file", file);

      await createSubject(formData);

      setForm({
        subject: "",
        chapter: "",
        className: "",
        teacherName: "",
      });

      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await onCreated();

      onClose();
    } catch (error) {
      console.error("CREATE SUBJECT ERROR:", error);
      alert("Failed to upload subject.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => !loading && onClose()}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl"
      >
        <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute right-5 top-5 rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50"
        >
          <X size={19} />
        </button>

        <div className="p-7">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400">
              <BookOpen size={23} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Upload Subject
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add a chapter and upload its file
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Subject
              </label>

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Mathematics"
                autoComplete="off"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Chapter
              </label>

              <input
                name="chapter"
                value={form.chapter}
                onChange={handleChange}
                placeholder="e.g. Chapter 01 - Algebra"
                autoComplete="off"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Class
              </label>

              <input
                name="className"
                value={form.className}
                onChange={handleChange}
                placeholder="e.g. Class 9"
                autoComplete="off"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Teacher Name
              </label>

              <input
                name="teacherName"
                value={form.teacherName}
                onChange={handleChange}
                placeholder="e.g. Ahmad Sir"
                autoComplete="off"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Upload File
              </label>

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />

              {!file ? (
                <button
                  type="button"
                  onClick={openFileManager}
                  className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950 px-5 py-7 text-center transition hover:border-blue-500 hover:bg-blue-500/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400 transition group-hover:bg-blue-600/20">
                    <FileUp size={23} />
                  </div>

                  <p className="mt-3 font-medium text-white">
                    Choose a file
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Click here to open your file manager
                  </p>
                </button>
              ) : (
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <File size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={removeFile}
                    disabled={loading}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <X size={17} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-7 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-800 py-3 font-medium text-slate-300 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Uploading...
                </>
              ) : (
                <>
                  <FileUp size={17} />
                  Upload Subject
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}