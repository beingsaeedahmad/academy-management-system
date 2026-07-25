"use client";

import {
  ArrowUpDown,
} from "lucide-react";

import NotesRow from "./NotesRow";

import {
  Note,
} from "./notesTypes";


interface Props {

  notes?: Note[];

  onDownload: (
    id:string
  ) => void;


  onDelete: (
    id:string
  ) => void;

}



const headers = [
  "Subject",
  "Class",
  "Type",
  "Size",
  "Downloads",
  "Uploaded",
  "Actions",
];




export default function NotesTable({

  notes = [],

  onDownload,

  onDelete,

}: Props) {



  return (

    <div
      className="
      overflow-hidden
      rounded-3xl
      border
      border-slate-800
      bg-[#0B1120]
      shadow-[0_15px_40px_rgba(0,0,0,.45)]
      "
    >


      <div className="overflow-x-auto">


        <table
          className="
          w-full
          border-separate
          border-spacing-0
          "
        >


          <thead>

            <tr
              className="
              bg-[#111827]
              "
            >


              <th
                className="
                rounded-tl-3xl
                border-b
                border-slate-700
                px-5
                py-4
                text-left
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-slate-300
                "
              >

                <div
                  className="
                  flex
                  items-center
                  gap-2
                  "
                >

                  File

                  <ArrowUpDown size={14}/>

                </div>


              </th>





              {
                headers.map(
                  (
                    item,
                    index
                  ) => (

                    <th
                      key={item}
                      className={`
                      border-b
                      border-slate-700
                      px-5
                      py-4
                      text-center
                      text-xs
                      font-bold
                      uppercase
                      tracking-widest
                      text-slate-300
                      whitespace-nowrap

                      ${
                        index === headers.length - 1
                        ? "rounded-tr-3xl"
                        : ""
                      }
                      `}
                    >

                      <div
                        className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        "
                      >

                        {item}

                        <ArrowUpDown size={14}/>

                      </div>


                    </th>

                  )
                )
              }


            </tr>


          </thead>






          <tbody>


            {
              notes.length > 0 ?


              notes.map(
                (note)=> (

                  <NotesRow

                    key={
                      note.id
                    }


                    note={
                      note
                    }


                    onDownload={
                      onDownload
                    }


                    onDelete={
                      onDelete
                    }


                  />

                )
              )


              :


              (

                <tr>

                  <td

                    colSpan={8}

                    className="
                    py-16
                    text-center
                    text-slate-400
                    "
                  >

                    No Notes Found


                  </td>


                </tr>

              )

            }



          </tbody>


        </table>


      </div>


    </div>

  );

}