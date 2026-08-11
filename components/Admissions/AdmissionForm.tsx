"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Users, Upload, Save, CheckCircle2 } from "lucide-react";

import { createStudent } from "@/actions/studentActions";
import Input from "../UI/Input";

interface AdmissionFormData {
  studentName: string;
  className: string;
  fatherName: string;
  mobile: string;
  address: string;
  monthlyFees: string;
}

export default function AdmissionForm() {
  const [photo, setPhoto] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<AdmissionFormData>({
    defaultValues: {
      studentName: "",
      className: "",
      fatherName: "",
      mobile: "",
      address: "",
      monthlyFees: "",
    },
  });

  const handlePhoto = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: AdmissionFormData) => {
    try {
      setIsSubmitting(true);

      await createStudent({
        name: data.studentName,
        fatherName: data.fatherName,
        className: data.className,
        phone: data.mobile,
        address: data.address,
        monthlyFees: Number(data.monthlyFees),
        photo,
      });

      // Notify other components
      window.dispatchEvent(new Event("student-added"));

      // Reset form
      reset();
      setPhoto("");
    } catch (error) {
      console.error("CREATE STUDENT ERROR:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-slate-800/80
        bg-[#071121]
        shadow-[0_25px_80px_rgba(0,0,0,0.35)]
      "
    >
      {/* Top gradient line */}
      <div
        className="
          absolute
          left-1/2
          top-0
          h-px
          w-2/3
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-blue-400
          to-transparent
        "
      />

      {/* Background glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-72
          w-72
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-32
          h-72
          w-72
          rounded-full
          bg-cyan-500/5
          blur-3xl
        "
      />

      <div className="relative z-10 p-6 sm:p-8">
        {/* ================= HEADER ================= */}

        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-blue-500/20
                bg-blue-500/10
                shadow-[0_0_30px_rgba(59,130,246,0.08)]
              "
            >
              <Users
                size={25}
                className="text-blue-400"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  New Admission
                </h2>

                <span
                  className="
                    hidden
                    rounded-full
                    border
                    border-emerald-500/20
                    bg-emerald-500/5
                    px-2.5
                    py-1
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-emerald-400
                    sm:inline-flex
                  "
                >
                  New
                </span>
              </div>

              <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
                Register a new student in the academy system
              </p>
            </div>
          </div>

          {/* Status */}
          <div
            className="
              hidden
              items-center
              gap-2
              rounded-xl
              border
              border-slate-800
              bg-slate-950/50
              px-3
              py-2
              sm:flex
            "
          >
            <span className="relative flex h-2 w-2">
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-emerald-400
                  opacity-50
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                "
              />
            </span>

            <span className="text-[10px] font-medium text-slate-500">
              Ready
            </span>
          </div>
        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Student Information */}

          <div
            className="
              rounded-2xl
              border
              border-slate-800/70
              bg-slate-950/30
              p-5
              sm:p-6
            "
          >
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                <h3 className="text-sm font-semibold text-white">
                  Student Information
                </h3>
              </div>

              <p className="mt-1 text-[11px] text-slate-600">
                Basic information about the student
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Student Name"
                placeholder="Enter student name"
                autoComplete="off"
                {...register("studentName", {
                  required: true,
                })}
              />

              <Input
                label="Class"
                placeholder="Enter class"
                autoComplete="off"
                {...register("className")}
              />

              <Input
                label="Father Name"
                placeholder="Enter father name"
                autoComplete="off"
                {...register("fatherName")}
              />

              <Input
                label="Mobile Number"
                placeholder="03XXXXXXXXX"
                autoComplete="off"
                {...register("mobile")}
              />
            </div>
          </div>

          {/* Address */}

          <div
            className="
              rounded-2xl
              border
              border-slate-800/70
              bg-slate-950/30
              p-5
              sm:p-6
            "
          >
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                <h3 className="text-sm font-semibold text-white">
                  Contact Information
                </h3>
              </div>

              <p className="mt-1 text-[11px] text-slate-600">
                Contact and residential details
              </p>
            </div>

            <div>
              <label
                htmlFor="address"
                className="
                  mb-2
                  block
                  text-xs
                  font-medium
                  text-slate-400
                "
              >
                Complete Address
              </label>

              <textarea
                id="address"
                autoComplete="off"
                {...register("address")}
                placeholder="Enter student's complete address"
                className="
                  min-h-[120px]
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-slate-700/80
                  bg-slate-900/70
                  px-4
                  py-3.5
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-slate-600
                  transition-all
                  duration-300
                  focus:border-blue-500/60
                  focus:bg-slate-900
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />
            </div>
          </div>

          {/* Fee & Photo */}

          <div
            className="
              rounded-2xl
              border
              border-slate-800/70
              bg-slate-950/30
              p-5
              sm:p-6
            "
          >
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />

                <h3 className="text-sm font-semibold text-white">
                  Admission Details
                </h3>
              </div>

              <p className="mt-1 text-[11px] text-slate-600">
                Fee information and student profile
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Monthly Fee */}

              <Input
                label="Monthly Fee"
                placeholder="Enter monthly fee"
                autoComplete="off"
                {...register("monthlyFees")}
              />

              {/* Photo Upload */}

              <div>
                <label
                  className="
                    mb-2
                    block
                    text-xs
                    font-medium
                    text-slate-400
                  "
                >
                  Student Photo
                </label>

                <label
                  htmlFor="student-photo"
                  className="
                    group
                    flex
                    h-[52px]
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2.5
                    rounded-2xl
                    border
                    border-dashed
                    border-slate-700
                    bg-slate-900/60
                    text-xs
                    font-medium
                    text-slate-500
                    transition-all
                    duration-300
                    hover:border-blue-500/50
                    hover:bg-blue-500/5
                    hover:text-blue-400
                  "
                >
                  <Upload
                    size={17}
                    className="
                      transition-transform
                      duration-300
                      group-hover:-translate-y-0.5
                    "
                  />

                  {photo
                    ? "Photo Selected"
                    : "Upload Student Photo"}

                  <input
                    id="student-photo"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhoto}
                  />
                </label>

                {photo && (
                  <div className="mt-3 flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-emerald-400"
                    />

                    <span className="text-[10px] text-emerald-400">
                      Student photo selected successfully
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= ACTION ================= */}

          <div
            className="
              flex
              flex-col-reverse
              gap-4
              border-t
              border-slate-800/70
              pt-6
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p className="text-[10px] font-medium text-slate-500">
                Admission data will be saved securely
              </p>

              <p className="mt-1 text-[9px] text-slate-700">
                Required fields must be completed before saving
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                group
                flex
                w-full
                items-center
                justify-center
                gap-2.5
                rounded-2xl
                border
                border-blue-400/20
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                px-7
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-[0_10px_35px_rgba(59,130,246,0.25)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_15px_45px_rgba(59,130,246,0.35)]
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:w-auto
              "
            >
              <Save
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />

              {isSubmitting
                ? "Saving..."
                : "Save Admission"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}