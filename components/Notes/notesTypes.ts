export interface Note {

  id: string;

  title: string;

  subject: string;

  className: string;

  fileUrl: string;

  fileType: string;

  uploadedAt: string;

}



export interface NotesSummary {

  totalNotes: number;

  totalDownloads: number;

  totalClasses: number;

  totalSubjects: number;

}