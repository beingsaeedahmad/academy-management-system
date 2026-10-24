"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";

import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";
import {
  createTeacher,
  deleteTeacher,
  getTeachers,
  updateTeacher,
  type TeacherInput,
} from "@/actions/teacherActions";

type Teacher = Awaited<ReturnType<typeof getTeachers>>[number];

const emptyForm: TeacherInput = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  qualification: "",
  className: "",
  status: "Active",
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [form, setForm] = useState<TeacherInput>(emptyForm);
  const [error, setError] = useState("");

  async function loadTeachers() {
    try {
      setError("");
      const data = await getTeachers();
      setTeachers(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load teachers.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTeachers();
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return teachers.filter((teacher) =>
      [teacher.name, teacher.subject, teacher.phone, teacher.className]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [teachers, search]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(teacher: Teacher) {
    setEditing(teacher);
    setForm({
      name: teacher.name,
      phone: teacher.phone,
      email: teacher.email ?? "",
      subject: teacher.subject,
      qualification: teacher.qualification ?? "",
      className: teacher.className ?? "",
      status: teacher.status,
    });
    setOpen(true);
  }

  async function handleSave() {
    try {
      setSaving(true);
      if (editing) {
        await updateTeacher(editing.id, form);
      } else {
        await createTeacher(form);
      }
      setOpen(false);
      await loadTeachers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Unable to save teacher.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(teacher: Teacher) {
    if (!confirm(`Delete ${teacher.name}?`)) return;

    await deleteTeacher(teacher.id);
    await loadTeachers();
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
            <Users size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Teachers
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage faculty, assigned subjects, and class ownership
            </p>
          </div>
        </div>

        <Button onClick={openCreate} size="sm">
          <Plus size={16} className="mr-2" />
          Add Teacher
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Total Teachers
          </p>
          <p className="mt-2 text-3xl font-bold text-white">{teachers.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">Active</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {teachers.filter((teacher) => teacher.status === "Active").length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Subjects Covered
          </p>
          <p className="mt-2 text-3xl font-bold text-white">
            {new Set(teachers.map((teacher) => teacher.subject)).size}
          </p>
        </div>
      </div>

      <div className="relative">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search teacher, subject, class or phone..."
          className="h-12 w-full rounded-2xl border border-slate-800 bg-slate-900/50 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">
            Loading teachers...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="mx-auto text-slate-600" size={32} />
            <p className="mt-3 text-sm font-medium text-slate-300">
              No teachers found
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Add faculty to assign classes and subjects.
            </p>
            <button
              type="button"
              onClick={openCreate}
              className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Add first teacher
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Teacher</th>
                  <th className="px-5 py-4">Subject</th>
                  <th className="px-5 py-4">Class</th>
                  <th className="px-5 py-4">Phone</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="border-b border-slate-800/70 last:border-0 hover:bg-slate-900/70"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">{teacher.name}</p>
                      <p className="text-xs text-slate-500">
                        {teacher.qualification || "Faculty"}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-slate-300">{teacher.subject}</td>
                    <td className="px-5 py-4 text-slate-300">
                      {teacher.className || "—"}
                    </td>
                    <td className="px-5 py-4 text-slate-300">{teacher.phone}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          teacher.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-700/50 text-slate-300"
                        }`}
                      >
                        {teacher.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(teacher)}
                          className="rounded-lg border border-slate-800 p-2 text-slate-400 hover:text-white"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(teacher)}
                          className="rounded-lg border border-slate-800 p-2 text-slate-400 hover:text-red-400"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Teacher" : "Add Teacher"}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" loading={saving} onClick={handleSave}>
              Save Teacher
            </Button>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Full Name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <Input
            label="Phone"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
          <Input
            label="Subject"
            value={form.subject}
            onChange={(event) =>
              setForm({ ...form, subject: event.target.value })
            }
          />
          <Input
            label="Qualification"
            value={form.qualification}
            onChange={(event) =>
              setForm({ ...form, qualification: event.target.value })
            }
          />
          <Input
            label="Assigned Class"
            value={form.className}
            onChange={(event) =>
              setForm({ ...form, className: event.target.value })
            }
          />
        </div>
      </Modal>
    </div>
  );
}
