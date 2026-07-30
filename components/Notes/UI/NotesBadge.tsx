import clsx from "clsx";

interface NotesBadgeProps {
  children: React.ReactNode;
  color?:
    | "blue"
    | "green"
    | "red"
    | "yellow"
    | "purple"
    | "gray";
}

export default function NotesBadge({
  children,
  color = "blue",
}: NotesBadgeProps) {
  const colors = {
    blue: "bg-blue-500/15 text-blue-400",

    green: "bg-emerald-500/15 text-emerald-400",

    red: "bg-red-500/15 text-red-400",

    yellow: "bg-yellow-500/15 text-yellow-400",

    purple: "bg-purple-500/15 text-purple-400",

    gray: "bg-slate-500/15 text-slate-300",
  };

  return (
    <span
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-semibold",
        colors[color]
      )}
    >
      {children}
    </span>
  );
}