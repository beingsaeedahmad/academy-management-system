"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createStudent } from "@/actions/studentActions";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";

interface AdmissionFormData {
  studentName: string;
  gender: string;
  className: string;
  fatherName: string;
  mobile: string;
  address: string;
  monthlyFees: string;
}

export default function AdmissionForm() {


  const [photo, setPhoto] = useState("");

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<AdmissionFormData>({
    defaultValues: {
      studentName: "",
      gender: "",
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

  const onSubmit = async (
  data: AdmissionFormData
) => {
   await createStudent({

  name: data.studentName,

  fatherName: data.fatherName,

  gender: data.gender,

  className: data.className,

  phone: data.mobile,

  address: data.address,

  monthlyFees: Number(data.monthlyFees),

  photo,

});

    reset();

    setPhoto("");
  };

  return (
    <Card
      title="New Admission"
      subtitle="Register New Student"
    >
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Student Name */}

        <Input
          label="Student Name"
          placeholder="Enter Student Name"
          autoComplete="off"
          {...register("studentName", {
            required: true,
          })}
        />

        {/* Gender */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Gender
          </label>

          <select
            autoComplete="off"
            {...register("gender")}
            className="
            h-12
            w-full
            rounded-2xl
            border
            border-slate-700
            bg-slate-900
            px-4
            text-white
            outline-none
            transition
            focus:border-blue-500
          "
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

          </select>

        </div>

        {/* Photo */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Student Photo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            className="
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-slate-900
              p-3
              text-slate-300
            "
          />

          {photo && (

            <div className="mt-5 flex justify-center">

              <img
                src={photo}
                alt="Preview"
                className="
                  h-32
                  w-32
                  rounded-full
                  border-4
                  border-blue-600
                  object-cover
                "
              />

            </div>

          )}

        </div>

        {/* Class */}

        <Input
          label="Class"
          placeholder="Example : Class 5"
          autoComplete="off"
          {...register("className")}
        />

        {/* Father */}

        <Input
          label="Father Name"
          placeholder="Enter Father Name"
          autoComplete="off"
          {...register("fatherName")}
        />

        {/* Mobile */}

        <Input
          label="Mobile Number"
          placeholder="03XXXXXXXXX"
          autoComplete="off"
          {...register("mobile")}
        />

        {/* Address */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Address
          </label>

          <textarea
            autoComplete="off"
            {...register("address")}
            placeholder="Complete Address"
            className="
              min-h-28
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-slate-900
              p-4
              text-white
              outline-none
              transition
              focus:border-blue-500
            "
          />

        </div>

        {/* Monthly Fee */}

        <Input
          label="Monthly Fee"
          placeholder="Enter Monthly Fee"
          autoComplete="off"
          {...register("monthlyFees")}
        />

        <Button
          type="submit"
          fullWidth
        >
          Save Admission
        </Button>

      </form>
    </Card>
  );
}