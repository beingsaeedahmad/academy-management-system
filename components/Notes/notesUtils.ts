import { Note } from "./notesTypes";

export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];

  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function getFileExtension(fileName: string): string {
  const parts = fileName.split(".");
  return parts.length > 1
    ? parts.pop()!.toLowerCase()
    : "";
}

export function getFileIcon(fileType: string): string {
  const type = fileType.toLowerCase();

  if (type.includes("pdf")) return "📕";

  if (
    type.includes("word") ||
    type.includes("doc")
  )
    return "📘";

  if (
    type.includes("excel") ||
    type.includes("sheet") ||
    type.includes("xls")
  )
    return "📗";

  if (
    type.includes("powerpoint") ||
    type.includes("presentation") ||
    type.includes("ppt")
  )
    return "📙";

  if (type.includes("image")) return "🖼️";

  if (type.includes("zip")) return "🗜️";

  return "📄";
}

export function getFileBadgeColor(fileType: string): string {
  const type = fileType.toLowerCase();

  if (type.includes("pdf"))
    return "bg-red-500/20 text-red-400";

  if (
    type.includes("word") ||
    type.includes("doc")
  )
    return "bg-blue-500/20 text-blue-400";

  if (
    type.includes("excel") ||
    type.includes("xls")
  )
    return "bg-green-500/20 text-green-400";

  if (
    type.includes("powerpoint") ||
    type.includes("ppt")
  )
    return "bg-orange-500/20 text-orange-400";

  if (type.includes("image"))
    return "bg-pink-500/20 text-pink-400";

  return "bg-slate-500/20 text-slate-300";
}

export function sortNotesByNewest(notes: Note[]): Note[] {
  return [...notes].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );
}

export function downloadFile(
  fileUrl: string,
  fileName: string
) {
  const link = document.createElement("a");

  link.href = fileUrl;

  link.download = fileName;

  link.target = "_blank";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}