"use client";

import {
  Download,
  Eye,
  Trash2,
  FileText,
  FileImage,
  FileArchive,
} from "lucide-react";

import {
  Note,
} from "./notesTypes";

import {
  getFileBadge,
} from "./notesUtils";


interface Props {

  note: Note;


  onDownload: (
    id:string
  ) => void;


  onDelete: (
    id:string
  ) => void;

}



export default function NotesRow({

  note,

  onDownload,

  onDelete,

}: Props) {



  const uploaded =
    new Date(
      note.uploadedAt
    ).toLocaleDateString();





  function FileIcon(){

    const type =
      note.fileType.toLowerCase();



    if(
      type.includes("image")
    ){

      return (

        <FileImage
          size={22}
          className="text-green-400"
        />

      );

    }




    if(
      type.includes("zip") ||
      type.includes("rar")
    ){

      return (

        <FileArchive
          size={22}
          className="text-yellow-400"
        />

      );

    }




    return (

      <FileText
        size={22}
        className="text-red-400"
      />

    );


  }







  return (


    <tr
      className="
      border-b
      border-slate-800
      odd:bg-[#09101d]
      even:bg-[#0B1220]
      hover:bg-blue-950/20
      transition-all
      "
    >





      {/* File */}


      <td
        className="
        px-5
        py-4
        "
      >


        <div
          className="
          flex
          items-center
          gap-3
          "
        >


          <div
            className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-slate-800
            "
          >

            <FileIcon />

          </div>





          <div>


            <p
              className="
              font-semibold
              text-white
              "
            >

              {note.title}

            </p>



            <p
              className="
              text-xs
              text-slate-400
              "
            >

              {note.fileType}

            </p>


          </div>


        </div>


      </td>







      {/* Subject */}


      <td
        className="
        px-4
        py-4
        text-center
        text-slate-300
        "
      >

        {note.subject}

      </td>









      {/* Class */}


      <td
        className="
        px-4
        py-4
        text-center
        text-slate-300
        "
      >

        {note.className}

      </td>









      {/* Type */}


      <td
        className="
        px-4
        py-4
        text-center
        "
      >


        <span
          className={`
          rounded-full
          px-3
          py-1
          text-xs
          font-semibold

          ${getFileBadge(
            note.fileType
          )}

          `}
        >

          {note.fileType}

        </span>


      </td>









      {/* Size */}


      <td
        className="
        px-4
        py-4
        text-center
        text-slate-300
        "
      >

        -

      </td>









      {/* Downloads */}


      <td
        className="
        px-4
        py-4
        text-center
        font-semibold
        text-blue-400
        "
      >

        0

      </td>









      {/* Uploaded */}


      <td
        className="
        px-4
        py-4
        text-center
        text-slate-300
        "
      >

        {uploaded}

      </td>









      {/* Actions */}


      <td
        className="
        px-4
        py-4
        "
      >


        <div
          className="
          flex
          items-center
          justify-center
          gap-2
          "
        >





          {/* View */}


          <a
            href={
              note.fileUrl
            }

            target="_blank"

            rel="noopener noreferrer"

            className="
            rounded-lg
            bg-slate-700
            p-2
            text-slate-300
            hover:bg-slate-600
            "
          >

            <Eye
              size={16}
            />

          </a>









          {/* Download */}


          <button

            onClick={() =>
              onDownload(
                note.id
              )
            }

            className="
            rounded-lg
            bg-blue-600
            p-2
            text-white
            hover:bg-blue-700
            "
          >

            <Download
              size={16}
            />

          </button>









          {/* Delete */}


          <button

            onClick={() => {

              if(
                confirm(
                  "Delete this note?"
                )
              ){

                onDelete(
                  note.id
                );

              }

            }}


            className="
            rounded-lg
            bg-red-600
            p-2
            text-white
            hover:bg-red-700
            "
          >

            <Trash2
              size={16}
            />

          </button>




        </div>


      </td>





    </tr>


  );

}