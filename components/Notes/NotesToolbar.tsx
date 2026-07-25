"use client";

import {
  Search,
  Upload,
} from "lucide-react";


interface Props {

  search: string;

  setSearch: (
    value: string
  ) => void;


  selectedClass: string;

  setSelectedClass: (
    value: string
  ) => void;


  selectedSubject: string;

  setSelectedSubject: (
    value: string
  ) => void;


  onUpload?: () => void;

}



const classes = [
  "All",
  "Nursery",
  "Prep",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
];


const subjects = [
  "All",
  "English",
  "Urdu",
  "Mathematics",
  "Science",
  "Computer",
  "Islamiyat",
  "Pakistan Studies",
];



export default function NotesToolbar({

  search,

  setSearch,

  selectedClass,

  setSelectedClass,

  selectedSubject,

  setSelectedSubject,

  onUpload,

}: Props) {


  return (

    <div
      className="
      rounded-2xl
      border
      border-slate-800
      bg-[#0F172A]
      p-5
      "
    >


      <div
        className="
        grid
        gap-4
        lg:grid-cols-4
        "
      >


        {/* Search */}

        <div
          className="
          relative
          "
        >

          <Search

            size={18}

            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            "

          />


          <input

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            placeholder="Search notes..."

            className="
            h-11
            w-full
            rounded-xl
            border
            border-slate-700
            bg-[#020817]
            pl-11
            pr-4
            text-sm
            text-white
            outline-none
            focus:border-blue-500
            "

          />

        </div>




        {/* Class Filter */}

        <select

          value={selectedClass}

          onChange={(e) =>
            setSelectedClass(
              e.target.value
            )
          }

          className="
          h-11
          rounded-xl
          border
          border-slate-700
          bg-[#020817]
          px-4
          text-sm
          text-white
          "

        >

          {classes.map((item) => (

            <option

              key={item}

              value={item}

            >

              {item}

            </option>

          ))}


        </select>




        {/* Subject Filter */}

        <select

          value={selectedSubject}

          onChange={(e) =>
            setSelectedSubject(
              e.target.value
            )
          }

          className="
          h-11
          rounded-xl
          border
          border-slate-700
          bg-[#020817]
          px-4
          text-sm
          text-white
          "

        >

          {subjects.map((item) => (

            <option

              key={item}

              value={item}

            >

              {item}

            </option>

          ))}


        </select>




        {/* Upload Button */}

        <button

          onClick={onUpload}

          className="
          flex
          h-11
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-blue-600
          font-semibold
          text-white
          transition
          hover:bg-blue-700
          "

        >

          <Upload size={18}/>

          Upload Notes


        </button>



      </div>


    </div>

  );

}