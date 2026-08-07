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
        return "bg-[#064E3B] text-[#34D399] border border-[#10B981]";
  
      case "A":
        return "bg-[#4C0519] text-[#FB7185] border border-[#F43F5E]";
  
      case "L":
        return "bg-[#78350F] text-[#FBBF24] border border-[#F59E0B]";
  
      case "H":
        return "bg-[#172554] text-[#60A5FA] border border-[#3B82F6]";
  
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
        relative
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
        duration-150

        ${
          isSunday
            ? "bg-red-950/40 cursor-not-allowed"
            : "cursor-pointer hover:bg-slate-800"
        }

        ${
          isToday
            ? "ring-1 ring-blue-500"
            : ""
        }

        ${
          isSelected
            ? `
              z-20
              border-sky-400
              bg-sky-400/20
              ring-2
              ring-sky-400
              ring-inset
              scale-105
              shadow-[0_0_0_2px_rgba(56,189,248,0.55),0_0_18px_rgba(56,189,248,0.9)]
            `
            : ""
        }

        ${getBackground()}
      `}
    >
      {status}
    </td>
  );
}