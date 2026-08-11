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
  Hash,
  ShieldCheck,
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
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/80
        p-4
        backdrop-blur-md
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          h-72
          w-72
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />

      <div
        className="
          relative
          flex
          max-h-[92vh]
          w-full
          max-w-3xl
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-slate-700/70
          bg-[#07111f]/95
          shadow-2xl
          shadow-black/50
          backdrop-blur-2xl
        "
      >
        {/* Top accent */}
        <div
          className="
            absolute
            left-0
            right-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-blue-500
            to-transparent
          "
        />

        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-800/80
            px-5
            py-5
            sm:px-7
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-blue-500/20
                bg-blue-500/10
                text-blue-400
                shadow-lg
                shadow-blue-500/10
              "
            >
              <User size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  Edit Student
                </h2>

                <span
                  className="
                    hidden
                    rounded-full
                    border
                    border-blue-500/20
                    bg-blue-500/10
                    px-2
                    py-0.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-blue-400
                    sm:inline-flex
                  "
                >
                  Profile
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Update student information and fee details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-800
              bg-slate-900/70
              text-slate-400
              transition
              hover:border-slate-700
              hover:bg-slate-800
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* Student Identity */}
        <div className="border-b border-slate-800/80 px-5 py-4 sm:px-7">
          <div
            className="
              flex
              flex-col
              gap-4
              rounded-2xl
              border
              border-slate-800
              bg-slate-900/50
              p-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-500/10
                  text-blue-400
                "
              >
                {student.photo ? (
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <User size={20} />
                )}
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  {student.name}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Student Profile
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <IdentityBadge
                icon={<Hash size={13} />}
                label="Admission"
                value={student.admissionNo}
              />

              <IdentityBadge
                icon={<ShieldCheck size={13} />}
                label="Roll"
                value={student.rollNumber}
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
              Student Details
            </p>

            <h3 className="mt-1 text-base font-semibold text-white">
              Personal Information
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              label="Student Name"
              icon={<UserRound size={16} />}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter student name"
              disabled={loading}
            />

            <FormField
              label="Father Name"
              icon={<UserRound size={16} />}
              name="fatherName"
              value={form.fatherName}
              onChange={handleChange}
              placeholder="Enter father name"
              disabled={loading}
            />

            <FormField
              label="Class"
              icon={<GraduationCap size={16} />}
              name="className"
              value={form.className}
              onChange={handleChange}
              placeholder="Enter class"
              disabled={loading}
            />

            <FormField
              label="Mobile Number"
              icon={<Phone size={16} />}
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="03XXXXXXXXX"
              disabled={loading}
            />

            {/* Monthly Fee */}
            <div>
              <label
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                <Wallet size={15} className="text-blue-400" />
                Monthly Fee
              </label>

              <div className="relative">
                <span
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-xs
                    font-semibold
                    text-slate-500
                  "
                >
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
                    border-slate-800
                    bg-slate-900/70
                    py-3
                    pl-12
                    pr-4
                    text-sm
                    text-white
                    outline-none
                    transition-all
                    placeholder:text-slate-600
                    hover:border-slate-700
                    focus:border-blue-500/60
                    focus:bg-slate-900
                    focus:ring-4
                    focus:ring-blue-500/10
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                <ShieldCheck
                  size={15}
                  className="text-emerald-400"
                />
                Current Status
              </label>

              <div
                className="
                  flex
                  h-[46px]
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-emerald-500/20
                  bg-emerald-500/5
                  px-4
                "
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

                <span className="text-sm font-medium text-emerald-400">
                  {student.status ?? "Active"}
                </span>

                <span className="ml-auto text-[10px] text-slate-600">
                  Current
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                <MapPin size={15} className="text-blue-400" />
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
                  border-slate-800
                  bg-slate-900/70
                  px-4
                  py-3
                  text-sm
                  leading-6
                  text-white
                  outline-none
                  transition-all
                  placeholder:text-slate-600
                  hover:border-slate-700
                  focus:border-blue-500/60
                  focus:bg-slate-900
                  focus:ring-4
                  focus:ring-blue-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-50
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
            border-slate-800/80
            bg-slate-900/40
            px-5
            py-4
            sm:flex-row
            sm:justify-end
            sm:px-7
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              border
              border-slate-800
              bg-slate-900
              px-5
              py-2.5
              text-sm
              font-medium
              text-slate-400
              transition-all
              hover:border-slate-700
              hover:bg-slate-800
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-40
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
              border
              border-blue-400/20
              bg-blue-600
              px-6
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-600/20
              transition-all
              hover:bg-blue-500
              hover:shadow-blue-500/30
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
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

/* ------------------------------------------------ */
/* Form Field */
/* ------------------------------------------------ */

interface FormFieldProps {
  label: string;
  icon: React.ReactNode;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder: string;
  disabled: boolean;
}

function FormField({
  label,
  icon,
  name,
  value,
  onChange,
  placeholder,
  disabled,
}: FormFieldProps) {
  return (
    <div>
      <label
        className="
          mb-2
          flex
          items-center
          gap-2
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-slate-400
        "
      >
        <span className="text-blue-400">
          {icon}
        </span>

        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="
          w-full
          rounded-xl
          border
          border-slate-800
          bg-slate-900/70
          px-4
          py-3
          text-sm
          text-white
          outline-none
          transition-all
          placeholder:text-slate-600
          hover:border-slate-700
          focus:border-blue-500/60
          focus:bg-slate-900
          focus:ring-4
          focus:ring-blue-500/10
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      />
    </div>
  );
}

/* ------------------------------------------------ */
/* Identity Badge */
/* ------------------------------------------------ */

function IdentityBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-slate-800
        bg-slate-950/50
        px-3
        py-2
      "
    >
      <span className="text-blue-400">
        {icon}
      </span>

      <div>
        <p className="text-[9px] uppercase tracking-wider text-slate-600">
          {label}
        </p>

        <p className="text-xs font-semibold text-slate-300">
          {value}
        </p>
      </div>
    </div>
  );
}