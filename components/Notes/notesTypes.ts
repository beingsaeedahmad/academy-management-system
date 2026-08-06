export interface Note {
  id: string;

  title: string;

  description: string;

  subject: string;

  className: string;

  category: string | null;

  uploadedBy: string;

  fileUrl: string;

  fileName: string;

  fileType: string;

  fileSize: number;

  downloads: number;

  isPublished: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export interface CreateNoteData {
  title: string;

  description: string;

  subject: string;

  className: string;

  category?: string;

  uploadedBy: string;

  fileUrl: string;

  fileName: string;

  fileType: string;

  fileSize: number;
}

export interface UpdateNoteData {
  title?: string;

  description?: string;

  subject?: string;

  className?: string;

  category?: string;

  uploadedBy?: string;

  fileUrl?: string;

  fileName?: string;

  fileType?: string;

  fileSize?: number;

  downloads?: number;

  isPublished?: boolean;
}

export interface NotesStats {
  totalNotes: number;

  totalDownloads: number;

  publishedNotes: number;

  hiddenNotes: number;
}