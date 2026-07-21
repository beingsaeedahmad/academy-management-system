import { AttendanceColumn } from "./attendanceTypes";

export function getCurrentMonth() {
  return new Date().getMonth() + 1;
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function generateMonthDates(
  year: number,
  month: number
): AttendanceColumn[] {
  const totalDays = new Date(year, month, 0).getDate();

  const today = new Date();

  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(year, month - 1, index + 1);

    return {
      date: date.toISOString().split("T")[0],
      day: index + 1,
      isSunday: date.getDay() === 0,
      isToday:
        today.getDate() === index + 1 &&
        today.getMonth() + 1 === month &&
        today.getFullYear() === year,
    };
  });
}

export function getTodayColumn(
  dates: AttendanceColumn[]
) {
  return dates.findIndex((d) => d.isToday);
}