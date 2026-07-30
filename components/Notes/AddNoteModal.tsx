"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";

import {
  createNote,
} from "@/actions/noteActions";

import NotesButton from "./UI/NotesButton";


interface AddNoteModalProps {

  open: boolean;

  onClose: () => void;

  onSuccess?: () => void;

}


export default function AddNoteModal({
  open,
  onClose,
  onSuccess,
}: AddNoteModalProps) {


  const [loading, setLoading] =
    useState(false);



  const [form, setForm] =
    useState({

      title: "",
      description: "",
      subject: "",
      className: "",
      category: "",
      uploadedBy: "Admin",

      file: null as File | null,

    });



  if (!open) return null;



  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  }



  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const selectedFile =
      e.target.files?.[0];


    if (!selectedFile) return;



    setForm({

      ...form,

      file: selectedFile,

    });

  }



  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();


    try {

      setLoading(true);



      await createNote({

        title: form.title,

        description: form.description,

        subject: form.subject,

        className: form.className,

        uploadedBy: form.uploadedBy,


        fileUrl: "",


        fileName:
          form.file?.name || "",


        fileType:
          form.file?.type || "",


        fileSize:
          form.file?.size || 0,

      });



      onSuccess?.();

      onClose();



    } catch (error) {


      console.log(
        "CREATE NOTE ERROR",
        error
      );


    } finally {


      setLoading(false);


    }

  }



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">


      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6">


        <div className="mb-6 flex items-center justify-between">


          <h2 className="text-xl font-bold text-white">
            Add New Note
          </h2>


          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
          >

            <X size={20} />

          </button>


        </div>



        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >


          <input
            required
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Note title"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />



          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />



          <input
            required
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />



          <input
            required
            name="className"
            value={form.className}
            onChange={handleChange}
            placeholder="Class"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />



          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />



          <label className="block cursor-pointer rounded-xl border border-dashed border-slate-700 p-5 text-center text-slate-400 hover:border-blue-500">


            <Upload className="mx-auto mb-2" />


            <p>
              {
                form.file
                  ? form.file.name
                  : "Choose File"
              }
            </p>



            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />


          </label>



          <NotesButton
            type="submit"
            disabled={loading}
            className="w-full"
          >

            {
              loading
                ? "Saving..."
                : "Save Note"
            }


          </NotesButton>



        </form>


      </div>


    </div>

  );

}