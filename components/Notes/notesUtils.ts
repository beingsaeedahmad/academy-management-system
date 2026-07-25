import {
  Note,
  NotesSummary,
} from "./notesTypes";





export function calculateNotesSummary(
  notes: Note[]
): NotesSummary {


  return {

    totalNotes:
      notes.length,


    totalDownloads:
      0,


    totalClasses:
      new Set(
        notes.map(
          (note) =>
            note.className
        )
      ).size,


    totalSubjects:
      new Set(
        notes.map(
          (note) =>
            note.subject
        )
      ).size,


  };

}








export function getFileBadge(
  type: string
) {


  const fileType =
    type.toLowerCase();




  if (
    fileType.includes("pdf")
  ) {

    return `
      bg-red-500/20
      text-red-400
    `;

  }






  if (
    fileType.includes("image") ||
    fileType.includes("png") ||
    fileType.includes("jpg") ||
    fileType.includes("jpeg")
  ) {

    return `
      bg-green-500/20
      text-green-400
    `;

  }






  if (
    fileType.includes("word") ||
    fileType.includes("doc")
  ) {

    return `
      bg-blue-500/20
      text-blue-400
    `;

  }







  if (
    fileType.includes("zip") ||
    fileType.includes("rar")
  ) {

    return `
      bg-yellow-500/20
      text-yellow-400
    `;

  }







  return `
    bg-slate-500/20
    text-slate-300
  `;


}








export function formatFileSize(
  size:number
) {


  if (!size || size <= 0) {

    return "-";

  }



  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
  ];



  const index =
    Math.floor(
      Math.log(size) /
      Math.log(1024)
    );



  return (

    Math.round(
      size /
      Math.pow(
        1024,
        index
      )
    )

    +

    " "

    +

    units[index]

  );


}