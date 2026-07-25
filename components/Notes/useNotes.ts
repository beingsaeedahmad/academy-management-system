"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  calculateNotesSummary,
} from "./notesUtils";

import {
  Note,
} from "./notesTypes";

import {
  getNotes,
  deleteNote,
} from "@/actions/noteActions";


export default function useNotes() {


  const [
    notes,
    setNotes
  ] = useState<Note[]>([]);



  const [
    search,
    setSearch
  ] = useState("");



  const [
    selectedClass,
    setSelectedClass
  ] = useState("All");



  const [
    selectedSubject,
    setSelectedSubject
  ] = useState("All");





  async function loadNotes() {

    try {

      const data =
        await getNotes();



      const formatted: Note[] =
        data.map((note:any) => ({

          id: note.id,


          title:
            note.title,


          subject:
            note.subject,


          className:
            note.className,


          fileUrl:
            note.fileUrl,


          fileType:
            note.fileType,



          uploadedAt:
            note.createdAt
              .toISOString(),


        }));


      setNotes(formatted);



    } catch(error) {

      console.error(
        "LOAD NOTES ERROR:",
        error
      );

    }

  }





  useEffect(() => {

    loadNotes();

  }, []);







  const filteredNotes =
    useMemo(() => {


      return notes.filter(
        (note)=>{


          const matchSearch =
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




          const matchClass =
            selectedClass === "All"
            ||
            note.className === selectedClass;




          const matchSubject =
            selectedSubject === "All"
            ||
            note.subject === selectedSubject;




          return (
            matchSearch &&
            matchClass &&
            matchSubject
          );


        }
      );


    },[
      notes,
      search,
      selectedClass,
      selectedSubject
    ]);








  const summary =
    useMemo(()=>{


      return calculateNotesSummary(
        notes
      );


    },[
      notes
    ]);








  async function removeNote(
    id:string
  ){

    try {


      await deleteNote(id);


      await loadNotes();



    } catch(error){


      console.error(
        "DELETE NOTE ERROR:",
        error
      );


    }


  }









  return {


    notes:
      filteredNotes,


    summary,



    search,

    setSearch,



    selectedClass,

    setSelectedClass,



    selectedSubject,

    setSelectedSubject,



    removeNote,



    reload:
      loadNotes,


  };

}