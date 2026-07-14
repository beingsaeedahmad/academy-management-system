"use client";

import { useForm } from "react-hook-form";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { useAcademyStore } from "@/store/academyStore";

interface AdmissionFormData {
  admissionNo: string;
  rollNo: string;
  studentName: string;
  gender: string;
  className: string;
  fatherName: string;
  mobile: string;
  address: string;
  monthlyFees: string;
}

export default function AdmissionForm() {
  

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<AdmissionFormData>({
    defaultValues: {
      admissionNo: "AUTO",
      rollNo: "AUTO",
      studentName: "",
      gender: "",
      className: "",
      fatherName: "",
      mobile: "",
      address: "",
      monthlyFees: "",
    },
  });

  const addStudent = useAcademyStore(
  (state) => state.addStudent
);


 const onSubmit = (data: AdmissionFormData) => {

  addStudent({

    admissionNo: data.admissionNo,

    rollNumber: data.rollNo,

    name: data.studentName,

    fatherName: data.fatherName,

    gender: data.gender as "Male" | "Female",

    className: data.className,

    phone: data.mobile,

    address: data.address,

    monthlyFees: Number(data.monthlyFees),

    admissionDate: new Date(),

    photo: "",

  });

  reset({
    admissionNo: "AUTO",
    rollNo: "AUTO",
    studentName: "",
    gender: "",
    className: "",
    fatherName: "",
    mobile: "",
    address: "",
    monthlyFees: "",
  });

};


  return (
    <Card
      title="New Admission"
      subtitle="Register new student"
    >

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >


        {/* Auto Numbers */}

        <div className="grid grid-cols-2 gap-4">

          <Input
            label="Admission No"
            disabled
            {...register("admissionNo")}
          />

          <Input
            label="Roll No"
            disabled
            {...register("rollNo")}
          />

        </div>



        {/* Student */}

        <Input
          label="Student Name"
          placeholder="Enter student name"
          {...register("studentName")}
        />


        <select
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



        {/* Photo */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Student Photo
          </label>

          <input
            type="file"
            accept="image/*"
            className="
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-slate-900
              p-3
              text-sm
              text-slate-300
            "
          />

        </div>



        {/* Academic */}

        <Input
          label="Class"
          placeholder="Example: Class 5"
          {...register("className")}
        />



        {/* Parent */}

        <Input
          label="Father Name"
          placeholder="Enter father name"
          {...register("fatherName")}
        />


        <Input
          label="Mobile No."
          placeholder="03xxxxxxxxx"
          {...register("mobile")}
        />



        {/* Address */}

        <textarea
          {...register("address")}
          placeholder="Complete address"
          className="
            min-h-24
            w-full
            rounded-2xl
            border
            border-slate-700
            bg-slate-900
            p-4
            text-white
            outline-none
            focus:border-blue-500
          "
        />



        {/* Fees */}

        <Input
          label="Monthly Fees"
          placeholder="Enter monthly fee"
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