"use client";

import { useState } from "react";
import { Search, UserPlus, Download, Printer } from "lucide-react";
import { Student } from "@/types";

import StudentCard from "./StudentCard";
import StudentTable from "./StudentTable";
import StudentProfile from "./StudentProfile";

export default function StudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const openProfile = (student: Student) => {
    setSelectedStudent(student);
    setProfileOpen(true);
  };

  const closeProfile = () => {
    setProfileOpen(false);
    setSelectedStudent(null);
  };

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
          <button className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-white hover:bg-slate-700">
            <Download size={18} />
            Export
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-white hover:bg-slate-700">
            <Printer size={18} />
            Print
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
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
          placeholder="Search by Name, Admission No, Roll No or Phone..."
          className="h-12 w-full rounded-2xl border border-slate-700 bg-slate-900 pl-11 pr-4 text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* Cards */}
      <StudentCard />

      {/* Table */}
      <StudentTable onView={openProfile} />

      {/* Drawer */}
      <StudentProfile
        student={selectedStudent}
        open={profileOpen}
        onClose={closeProfile}
      />

    </div>
  );
}