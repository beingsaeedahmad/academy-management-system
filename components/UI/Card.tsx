"use client";

import * as React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export default function Card({
  children,
  title,
  subtitle,
  icon,
  action,
  hover = true,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl
        border border-slate-800
        bg-gradient-to-br
        from-slate-900
        via-slate-900
        to-slate-950
        shadow-[0_0_30px_rgba(37,99,235,0.08)]
        ${
          hover
            ? "transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(37,99,235,0.18)]"
            : ""
        }
        ${className}
      `}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-400/5" />

      {(title || subtitle || icon || action) && (
        <div className="relative flex items-start justify-between border-b border-slate-800 px-6 py-5">
          <div className="flex items-center gap-4">
            {icon && (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400">
                {icon}
              </div>
            )}

            <div>
              {title && (
                <h2 className="text-lg font-bold text-white">{title}</h2>
              )}

              {subtitle && (
                <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
              )}
            </div>
          </div>

          {action}
        </div>
      )}

      <div className="relative p-6">{children}</div>
    </div>
  );
}