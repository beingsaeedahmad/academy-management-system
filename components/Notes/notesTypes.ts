export type NoteFileType =
  | "pdf"
  | "doc"
  | "docx"
  | "ppt"
  | "pptx"
  | "xls"
  | "xlsx"
  | "jpg"
  | "jpeg"
  | "png"
  | "other";

export interface Note {
  id: string;

  title: string;

  description: string | null;

  subject: string;

  className: string;

  category: string | null;

  uploadedBy: string | null;

  fileName: string;

  fileUrl: string;

  fileType: string;

  fileSize: number;

  downloads: number;

  isPublished: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export interface CreateNoteFormData {
  title: string;

  description: string;

  subject: string;

  className: string;

  category: string;

  uploadedBy: string;

  file: File | null;
}

export interface NotesFilter {
  search: string;

  className: string;

  subject: string;

  category: string;

  publishedOnly: boolean;
}

export interface NotesStats {
  totalNotes: number;

  totalDownloads: number;

  publishedNotes: number;

  hiddenNotes: number;
}

export interface NotesTableProps {
  notes: Note[];
}

export interface NotesRowProps {
  note: Note;
}

export interface NoteCardProps {
  note: Note;
}

export interface NoteRowProps {
  note: Note;
}

export interface NoteCardProps {
  note: Note;
}

export interface NotesTableProps {
  notes: Note[];
}