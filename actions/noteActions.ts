"use server";

import { prisma } from "@/lib/prisma";


// ================= GET ALL NOTES =================

export async function getNotes() {

  try {

    const notes = await prisma.note.findMany({

      orderBy: {
        createdAt: "desc",
      },

    });


    return notes;


  } catch (error) {

    console.log(
      "GET NOTES ERROR",
      error
    );


    return [];

  }

}



// ================= CREATE NOTE =================


export interface CreateNoteData {

  title: string;

  subject: string;

  className: string;

  description?: string;

  fileUrl?: string;

  uploadedBy?: string;

}



export async function createNote(
  data: CreateNoteData
) {


  try {


    const note = await prisma.note.create({

      data: {

        title: data.title,

        subject: data.subject,

        className: data.className,

        description: data.description,

        fileUrl: data.fileUrl,

        uploadedBy: data.uploadedBy,

      },

    });



    return note;


  } catch (error) {


    console.log(
      "CREATE NOTE ERROR",
      error
    );


    throw new Error(
      "Note creation failed"
    );


  }


}




// ================= DELETE NOTE =================


export async function deleteNote(
  id:string
){


  try{


    await prisma.note.delete({

      where:{
        id
      }

    });


    return {
      success:true
    };


  }
  catch(error){


    console.log(
      "DELETE NOTE ERROR",
      error
    );


    return {
      success:false
    };


  }


}