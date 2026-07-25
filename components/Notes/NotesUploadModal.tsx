"use client";

import {
  useState,
  DragEvent,
  ChangeEvent,
} from "react";

interface NotesUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (data: {
    title: string;
    className: string;
    subject: string;
    file: File;
  }) => void;
}

export default function NotesUploadModal({
  open,
  onClose,
  onUpload,
}: NotesUploadModalProps) {

  const [title, setTitle] = useState("");
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);


  if (!open) return null;


  function handleFile(
    selectedFile: File
  ) {
    setFile(selectedFile);
  }


  function handleDrop(
    e: DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    setDragging(false);

    const droppedFile =
      e.dataTransfer.files[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  }


  function handleChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const selected =
      e.target.files?.[0];

    if (selected) {
      handleFile(selected);
    }
  }


  function submitUpload() {

    if (!title || !className || !subject || !file) {
      return;
    }


    onUpload({
      title,
      className,
      subject,
      file,
    });


    setTitle("");
    setClassName("");
    setSubject("");
    setFile(null);

    onClose();
  }


  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-xl
          rounded-2xl
          bg-white
          p-6
          shadow-xl
        "
      >

        <div
          className="
            mb-5
            flex
            items-center
            justify-between
          "
        >

          <h2
            className="
              text-xl
              font-bold
              text-slate-900
            "
          >
            Upload Note
          </h2>


          <button
            onClick={onClose}
            className="
              text-slate-500
              hover:text-red-500
            "
          >
            ✕
          </button>

        </div>


        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Note title"
          className="
            mb-3
            w-full
            rounded-xl
            border
            px-4
            py-3
            outline-none
          "
        />


        <div
          className="
            grid
            grid-cols-2
            gap-3
            mb-4
          "
        >

          <select
            value={className}
            onChange={(e)=>setClassName(e.target.value)}
            className="
              rounded-xl
              border
              px-4
              py-3
            "
          >
            <option value="">
              Select Class
            </option>

            <option>
              9th
            </option>

            <option>
              10th
            </option>

            <option>
              1st Year
            </option>

            <option>
              2nd Year
            </option>

          </select>


          <select
            value={subject}
            onChange={(e)=>setSubject(e.target.value)}
            className="
              rounded-xl
              border
              px-4
              py-3
            "
          >

            <option value="">
              Select Subject
            </option>

            <option>
              Physics
            </option>

            <option>
              Chemistry
            </option>

            <option>
              Mathematics
            </option>

            <option>
              English
            </option>

          </select>

        </div>


        <div
          onDragOver={(e)=> {
            e.preventDefault();
            setDragging(true);
          }}

          onDragLeave={()=>setDragging(false)}

          onDrop={handleDrop}

          className={`
            mb-4
            flex
            h-40
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-2xl
            border-2
            border-dashed
            ${
              dragging
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300"
            }
          `}
        >

          <p className="text-slate-600">
            Drag & Drop file here
          </p>

          <span className="my-2 text-sm text-slate-400">
            OR
          </span>


          <label
            className="
              cursor-pointer
              rounded-lg
              bg-blue-600
              px-4
              py-2
              text-white
            "
          >

            Choose File

            <input
              type="file"
              hidden
              onChange={handleChange}
            />

          </label>


          {
            file && (
              <p
                className="
                  mt-3
                  text-sm
                  text-green-600
                "
              >
                {file.name}
              </p>
            )
          }

        </div>


        <button
          onClick={submitUpload}
          className="
            w-full
            rounded-xl
            bg-blue-600
            py-3
            font-semibold
            text-white
            hover:bg-blue-700
          "
        >
          Upload Note
        </button>


      </div>

    </div>
  );
}