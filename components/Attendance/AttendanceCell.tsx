"use client";

import { AttendanceStatus } from "./attendanceTypes";

interface AttendanceCellProps {
  status: AttendanceStatus;
  isSelected: boolean;
  isToday: boolean;
  isSunday: boolean;
  onClick: () => void;
  onChange: (status: AttendanceStatus) => void;
}

const STATUS_ORDER: AttendanceStatus[] = [
  "",
  "P",
  "A",
  "L",
  "H",
];

export default function AttendanceCell({
  status,
  isSelected,
  isToday,
  isSunday,
  onClick,
  onChange,
}: AttendanceCellProps) {

  function nextStatus(): AttendanceStatus {
    const current = STATUS_ORDER.indexOf(status);

    return STATUS_ORDER[
      (current + 1) % STATUS_ORDER.length
    ];
  }

  function getBackground() {
    switch (status) {
      case "P":
        return "bg-green-600 text-white";

      case "A":
        return "bg-red-600 text-white";

      case "L":
        return "bg-yellow-400 text-black";

      case "H":
        return "bg-blue-600 text-white";

      default:
        return "";
    }
  }

  function handleClick() {
    onClick();
  }

  function handleDoubleClick(
    e: React.MouseEvent<HTMLTableCellElement>
  ) {
    e.preventDefault();
    e.stopPropagation();

    if (isSunday) return;

    onChange(nextStatus());
  }

  return (
    <td
      tabIndex={0}
      data-selected={isSelected ? "true" : "false"}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`
        w-7
        min-w-[28px]
        h-8
        border
        border-slate-700
        text-[11px]
        font-bold
        text-center
        align-middle
        select-none
        outline-none
        transition-all

        ${
          isSunday
            ? "bg-red-950/40 cursor-not-allowed"
            : "cursor-pointer hover:bg-slate-800"
        }

        ${isToday ? "ring-1 ring-blue-400" : ""}

        ${isSelected ? "outline outline-2 outline-blue-500" : ""}

        ${getBackground()}
      `}
    >
      {status}
    </td>
  );
}