export interface Subject {
    id: string;
    name: string;
    code: string;
    chapter: string;
    className: string;
    teacherName: string | null;
    fileName: string | null;
    fileType: string | null;
    fileSize: number | null;
    fileUrl: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }