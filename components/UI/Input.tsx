"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  className = "",
  type = "text",
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-300">
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div
        className={`
          group flex h-14 items-center gap-3 rounded-2xl
          border
          ${
            error
              ? "border-red-500"
              : "border-slate-700 hover:border-blue-500"
          }
          bg-slate-900
          px-4
          transition-all
          duration-300
          focus-within:border-blue-500
          focus-within:shadow-[0_0_25px_rgba(37,99,235,0.30)]
        `}
      >
        {/* Left Icon */}
        {leftIcon && (
          <div className="text-slate-400 transition-colors group-focus-within:text-blue-400">
            {leftIcon}
          </div>
        )}

        {/* Input */}
        <input
          type={inputType}
          className={`
            h-full
            w-full
            bg-transparent
            text-white
            placeholder:text-slate-500
            outline-none

            ${className}
          `}
          {...props}
        />

        {/* Password Toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400 transition hover:text-blue-400"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}

        {/* Right Icon */}
        {rightIcon && type !== "password" && (
          <div className="text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}