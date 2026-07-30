"use client";

import { useEffect, useState } from "react";

import {
  getNotes,
} from "@/actions/noteActions";


import NotesOverviewCards from "./NotesOverviewCards";
import NotesToolbar from "./NotesToolbar";
import NotesTable from "./NotesTable";
import NoteCard from "./NoteCard";
import AddNoteModal from "./AddNoteModal";


import {
  Note,
} from "./notesTypes";


import {
  downloadFile,
} from "./notesUtils";



export default function NotesPage() {


  const [notes,setNotes] =
    useState<Note[]>([]);


  const [loading,setLoading] =
    useState(true);



  const [openModal,setOpenModal] =
    useState(false);



  const [search,setSearch] =
    useState("");

  const [classFilter,setClassFilter] =
    useState("");

  const [subjectFilter,setSubjectFilter] =
    useState("");

  const [categoryFilter,setCategoryFilter] =
    useState("");



  async function loadNotes(){

    try{

      setLoading(true);


      const data =
        await getNotes();


      setNotes(data as Note[]);


    }
    finally{

      setLoading(false);

    }

  }



  useEffect(()=>{

    loadNotes();

  },[]);



  const filteredNotes =
    notes.filter((note)=>{


      const searchMatch =
        note.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
        ||
        note.subject
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );



      const classMatch =
        classFilter
          ?
          note.className === classFilter
          :
          true;



      const subjectMatch =
        subjectFilter
          ?
          note.subject === subjectFilter
          :
          true;



      const categoryMatch =
        categoryFilter
          ?
          note.category === categoryFilter
          :
          true;



      return (
        searchMatch &&
        classMatch &&
        subjectMatch &&
        categoryMatch
      );


    });



  const classes =
    [
      ...new Set(
        notes.map(
          note=>note.className
        )
      )
    ];



  const subjects =
    [
      ...new Set(
        notes.map(
          note=>note.subject
        )
      )
    ];



  const categories =
    [
      ...new Set(
        notes
        .map(
          note=>note.category
        )
        .filter(Boolean) as string[]
      )
    ];



  const stats = {

    totalNotes:
      notes.length,


    totalDownloads:
      notes.reduce(
        (sum,note)=>
          sum + note.downloads,
        0
      ),


    publishedNotes:
      notes.filter(
        note=>note.isPublished
      ).length,


    hiddenNotes:
      notes.filter(
        note=>!note.isPublished
      ).length,

  };



  return (

    <div className="space-y-6">


      <NotesOverviewCards
        {...stats}
      />



      <NotesToolbar

        search={search}

        classNameFilter={classFilter}

        subjectFilter={subjectFilter}

        categoryFilter={categoryFilter}


        onSearchChange={
          setSearch
        }

        onClassChange={
          setClassFilter
        }

        onSubjectChange={
          setSubjectFilter
        }

        onCategoryChange={
          setCategoryFilter
        }


        onReset={()=>{

          setSearch("");

          setClassFilter("");

          setSubjectFilter("");

          setCategoryFilter("");

        }}


        onAddNote={()=>setOpenModal(true)}


        classes={classes}

        subjects={subjects}

        categories={categories}

      />



      {
        loading ? (

          <div className="rounded-xl bg-slate-900 p-10 text-center text-slate-400">

            Loading Notes...

          </div>

        )
        :
        (

          <>

            <div className="hidden md:block">

              <NotesTable

                notes={filteredNotes}


                onDownload={
                  downloadFile
                }


                onDelete={
                  loadNotes
                }

              />

            </div>



            <div className="grid gap-5 md:hidden">

              {
                filteredNotes.map(
                  note=>(

                    <NoteCard

                      key={note.id}

                      note={note}


                      onDownload={
                        downloadFile
                      }

                      onDelete={
                        loadNotes
                      }

                    />

                  )
                )
              }

            </div>

          </>

        )
      }



      <AddNoteModal

        open={openModal}

        onClose={
          ()=>setOpenModal(false)
        }

        onSuccess={
          loadNotes
        }

      />


    </div>

  );

}