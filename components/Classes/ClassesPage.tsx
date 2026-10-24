"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Pencil,
  Plus,
  School,
  Search,
  Trash2,
} from "lucide-react";

import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";
import {
  createClass,
  deleteClass,
  getClasses,
  updateClass,
  type ClassInput,
  type ClassRecord,
} from "@/actions/classActions";

const emptyForm: ClassInput = {
  name: "",
  section: "",
  teacherName: "",
  room: "",
  capacity: 30,
  status: "Active",
};

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<ClassRecord | null>(null);
  const [form, setForm] = useState<ClassInput>(emptyForm);

  async function loadClasses() {
    try {
      const data = await getClasses();
      setClasses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClasses();
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return classes.filter((item) =>
      [item.name, item.section, item.teacherName, item.room]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [classes, search]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(item: ClassRecord) {
    setEditing(item);
    setForm({
      name: item.name,
      section: item.section ?? "",
      teacherName: item.teacherName ?? "",
      room: item.room ?? "",
      capacity: item.capacity,
      status: item.status,
    });
    setOpen(true);
  }

  async function handleSave() {
    try {
      setSaving(true);
      if (editing) {
        await updateClass(editing.id, form);
      } else {
        await createClass(form);
      }
      setOpen(false);
      await loadClasses();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to save class.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: ClassRecord) {
    if (!confirm(`Delete class ${item.name}?`)) return;
    await deleteClass(item.id);
    await loadClasses();
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
            <School size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Classes
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Organize sections, rooms, capacity, and assigned teachers
            </p>
          </div>
        </div>

        <Button onClick={openCreate} size="sm">
          <Plus size={16} className="mr-2" />
          Add Class
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Total Classes
          </p>
          <p className="mt-2 text-3xl font-bold text-white">{classes.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Enrolled Students
          </p>
          <p className="mt-2 text-3xl font-bold text-white">
            {classes.reduce((sum, item) => sum + item.studentCount, 0)}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Available Seats
          </p>
          <p className="mt-2 text-3xl font-bold text-white">
            {classes.reduce(
              (sum, item) => sum + Math.max(item.capacity - item.studentCount, 0),
              0
            )}
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
          placeholder="Search class, teacher or room..."
          className="h-12 w-full rounded-2xl border border-slate-800 bg-slate-900/50 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <div className="col-span-full rounded-2xl border border-slate-800 p-10 text-center text-sm text-slate-500">
            Loading classes...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-800 p-12 text-center">
            <School className="mx-auto text-slate-600" size={32} />
            <p className="mt-3 text-sm font-medium text-slate-300">
              No classes found
            </p>
            <button
              type="button"
              onClick={openCreate}
              className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Create first class
            </button>
          </div>
        ) : (
          filtered.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">{item.name}</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.section || "General section"} · Room {item.room || "TBA"}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs ${
                    item.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-slate-700/40 text-slate-300"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                  <p className="text-[11px] text-slate-500">Students</p>
                  <p className="mt-1 font-semibold text-white">
                    {item.studentCount}/{item.capacity}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                  <p className="text-[11px] text-slate-500">Teacher</p>
                  <p className="mt-1 truncate font-semibold text-white">
                    {item.teacherName || "Unassigned"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  className="rounded-lg border border-slate-800 p-2 text-slate-400 hover:text-white"
                >
                  <Pencil size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  className="rounded-lg border border-slate-800 p-2 text-slate-400 hover:text-red-400"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Class" : "Add Class"}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" loading={saving} onClick={handleSave}>
              Save Class
            </Button>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Class Name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <Input
            label="Section"
            value={form.section}
            onChange={(event) =>
              setForm({ ...form, section: event.target.value })
            }
          />
          <Input
            label="Teacher"
            value={form.teacherName}
            onChange={(event) =>
              setForm({ ...form, teacherName: event.target.value })
            }
          />
          <Input
            label="Room"
            value={form.room}
            onChange={(event) => setForm({ ...form, room: event.target.value })}
          />
          <Input
            label="Capacity"
            type="number"
            value={String(form.capacity ?? 30)}
            onChange={(event) =>
              setForm({ ...form, capacity: Number(event.target.value) })
            }
          />
        </div>
      </Modal>
    </div>
  );
}
