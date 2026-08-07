"use client";

import { useEffect, useState } from "react";
import {
  X,
  User,
  UserRound,
  GraduationCap,
  Phone,
  MapPin,
  Wallet,
  Save,
  Loader2,
} from "lucide-react";
import { Student } from "@/types";
import { updateStudent } from "@/actions/studentActions";

interface Props {
  student: Student | null;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditStudentModal({
  student,
  open,
  onClose,
  onUpdated,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    className: "",
    phone: "",
    address: "",
    monthlyFees: "",
  });

  useEffect(() => {
    if (student) {
      setForm({
        name: student.name ?? "",
        fatherName: student.fatherName ?? "",
        className: student.className ?? "",
        phone: student.phone ?? "",
        address: student.address ?? "",
        monthlyFees: student.monthlyFees?.toString() ?? "",
      });
    }
  }, [student]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, loading, onClose]);

  if (!open || !student) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Student name is required");
      return;
    }

    try {
      setLoading(true);

      await updateStudent(student.id, {
        name: form.name.trim(),
        fatherName: form.fatherName.trim(),
        className: form.className.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        monthlyFees: Number(form.monthlyFees) || 0,
      });

      onUpdated();
      onClose();
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      alert("Student update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-2xl
          overflow-hidden
          rounded-2xl
          border
          border-slate-700
          bg-slate-950
          shadow-2xl
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-800
            bg-slate-900/80
            px-6
            py-5
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-blue-600/15
                text-blue-400
              "
            >
              <User size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Edit Student
              </h2>

              <p className="mt-0.5 text-sm text-slate-400">
                Update student information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Student Info */}
        <div className="border-b border-slate-800 px-6 py-4">
          <div
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-slate-800
              bg-slate-900/50
              px-4
              py-3
            "
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Admission No
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-200">
                {student.admissionNo}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Roll No
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-200">
                {student.rollNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-h-[65vh] overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Student Name */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <UserRound size={16} className="text-blue-400" />
                Student Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter student name"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            {/* Father Name */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <UserRound size={16} className="text-blue-400" />
                Father Name
              </label>

              <input
                name="fatherName"
                value={form.fatherName}
                onChange={handleChange}
                placeholder="Enter father name"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            {/* Class */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <GraduationCap size={16} className="text-blue-400" />
                Class
              </label>

              <input
                name="className"
                value={form.className}
                onChange={handleChange}
                placeholder="Enter class"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <Phone size={16} className="text-blue-400" />
                Mobile Number
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="03XXXXXXXXX"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            {/* Monthly Fees */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <Wallet size={16} className="text-blue-400" />
                Monthly Fee
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                  Rs.
                </span>

                <input
                  name="monthlyFees"
                  type="number"
                  min="0"
                  value={form.monthlyFees}
                  onChange={handleChange}
                  placeholder="0"
                  disabled={loading}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-900
                    py-3
                    pl-12
                    pr-4
                    text-sm
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-600
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/10
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <MapPin size={16} className="text-blue-400" />
                Address
              </label>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter complete address"
                disabled={loading}
                className="
                  min-h-28
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="
            flex
            flex-col-reverse
            gap-3
            border-t
            border-slate-800
            bg-slate-900/50
            px-6
            py-4
            sm:flex-row
            sm:justify-end
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-5
              py-2.5
              text-sm
              font-medium
              text-slate-300
              transition
              hover:bg-slate-700
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-600/20
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}