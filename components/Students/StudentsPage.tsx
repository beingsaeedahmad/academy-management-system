"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  UserPlus,
  Download,
  Printer,
} from "lucide-react";

import { Student } from "@/types";
import { getStudentById } from "@/actions/studentActions";

import StudentCard from "./StudentCard";
import StudentTable from "./StudentTable";
import StudentProfile from "./StudentProfile";

export default function StudentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] = useState<
    "all" | "active" | "new" | "defaulters"
  >("all");

  function openProfile(student: Student) {
    setSelectedStudent(student);
    setProfileOpen(true);
  }

  function closeProfile() {
    setProfileOpen(false);
    setSelectedStudent(null);

    if (searchParams.get("studentId")) {
      router.replace("/students");
    }
  }

  useEffect(() => {
    const studentId = searchParams.get("studentId");

    if (studentId === null) return;

    let mounted = true;

    async function loadStudent(id: string) {
      try {
        const student = await getStudentById(id);

        if (!mounted) return;

        if (student) {
          setSelectedStudent(student as Student);
          setProfileOpen(true);
        }
      } catch (error) {
        console.error("Failed to load student:", error);
      }
    }

    loadStudent(studentId);

    return () => {
      mounted = false;
    };
  }, [searchParams]);

  if (profileOpen && selectedStudent) {
    return (
      <StudentProfile
        student={selectedStudent}
        onClose={closeProfile}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Students
          </h1>

          <p className="mt-1 text-slate-400">
            Manage all academy students
          </p>
        </div>

        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
          >
            <Download size={18} />
            Export
          </button>

          <button
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
          >
            <Printer size={18} />
            Print
          </button>

          <button
            onClick={() => router.push("/admissions")}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <UserPlus size={18} />
            Add Student
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Name, Admission No, Roll No or Phone..."
          className="h-12 w-full rounded-2xl border border-slate-700 bg-slate-900 pl-11 pr-4 text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* Statistics */}
      <StudentCard
        filter={filter}
        setFilter={setFilter}
      />

      {/* Students Table */}
      <StudentTable
        search={search}
        filter={filter}
        onView={openProfile}
      />
    </div>
  );
}