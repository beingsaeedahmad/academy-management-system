"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

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

if(student){

  setForm({

    name: student.name ?? "",

    fatherName: student.fatherName ?? "",

    className: student.className ?? "",

    phone: student.phone ?? "",

    address: student.address ?? "",

    monthlyFees:
      student.monthlyFees?.toString() ?? "",

  });

}

}, [student]);




if(!open || !student) return null;




const handleChange = (

e: React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>

) => {

setForm({

  ...form,

  [e.target.name]: e.target.value,

});

};




const handleSubmit = async()=>{

try{


  setLoading(true);



  await updateStudent(

    student.id,

    {

      name: form.name,

      fatherName: form.fatherName,

      className: form.className,

      phone: form.phone,

      address: form.address,

      monthlyFees:
        Number(form.monthlyFees),

    }

  );



  onUpdated();


  onClose();



}catch(error){


  console.error(
    "UPDATE ERROR:",
    error
  );


  alert(
    "Student update failed"
  );


}finally{


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
  bg-black/60
  backdrop-blur-sm
  p-4
  "
>


  <div
    className="
    w-full
    max-w-xl
    rounded-2xl
    border
    border-slate-700
    bg-[#0F172A]
    p-6
    shadow-2xl
    "
  >


    <div className="
    mb-6
    flex
    items-center
    justify-between
    ">


      <h2 className="
      text-xl
      font-bold
      text-white
      ">
        Edit Student
      </h2>



      <button
      onClick={onClose}
      className="
      text-slate-400
      hover:text-white
      "
      >

        <X size={22}/>

      </button>


    </div>



    <div className="space-y-4">


      <input
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Student Name"
      className="
      w-full
      rounded-xl
      border
      border-slate-700
      bg-slate-900
      p-3
      text-white
      "
      />



      <input
      name="fatherName"
      value={form.fatherName}
      onChange={handleChange}
      placeholder="Father Name"
      className="
      w-full
      rounded-xl
      border
      border-slate-700
      bg-slate-900
      p-3
      text-white
      "
      />



      <input
      name="className"
      value={form.className}
      onChange={handleChange}
      placeholder="Class"
      className="
      w-full
      rounded-xl
      border
      border-slate-700
      bg-slate-900
      p-3
      text-white
      "
      />



      <input
      name="phone"
      value={form.phone}
      onChange={handleChange}
      placeholder="Phone"
      className="
      w-full
      rounded-xl
      border
      border-slate-700
      bg-slate-900
      p-3
      text-white
      "
      />



      <input
      name="monthlyFees"
      value={form.monthlyFees}
      onChange={handleChange}
      placeholder="Monthly Fees"
      className="
      w-full
      rounded-xl
      border
      border-slate-700
      bg-slate-900
      p-3
      text-white
      "
      />



      <textarea
      name="address"
      value={form.address}
      onChange={handleChange}
      placeholder="Address"
      className="
      min-h-28
      w-full
      rounded-xl
      border
      border-slate-700
      bg-slate-900
      p-3
      text-white
      "
      />


    </div>



    <button

    onClick={handleSubmit}

    disabled={loading}

    className="
    mt-6
    w-full
    rounded-xl
    bg-blue-600
    py-3
    font-semibold
    text-white
    hover:bg-blue-700
    "

    >

      {
        loading
        ? "Updating..."
        : "Save Changes"
      }


    </button>


  </div>


</div>

);

}