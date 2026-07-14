"use client";

import * as React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-300 outline-none select-none disabled:cursor-not-allowed disabled:opacity-60";

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  const variants = {
    primary:
      "bg-blue-600 text-white border border-blue-500 shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(37,99,235,0.55)] hover:-translate-y-0.5",

    secondary:
      "bg-slate-800 text-slate-100 border border-slate-700 hover:border-blue-500 hover:bg-slate-700 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]",

    success:
      "bg-emerald-600 text-white border border-emerald-500 shadow-[0_0_25px_rgba(34,197,94,0.35)] hover:bg-emerald-500 hover:shadow-[0_0_35px_rgba(34,197,94,0.55)]",

    danger:
      "bg-red-600 text-white border border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.35)] hover:bg-red-500 hover:shadow-[0_0_35px_rgba(239,68,68,0.55)]",

    ghost:
      "bg-transparent text-slate-300 border border-slate-700 hover:border-blue-500 hover:text-white hover:bg-slate-800",
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${sizes[size]}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        children
      )}
    </button>
  );
}