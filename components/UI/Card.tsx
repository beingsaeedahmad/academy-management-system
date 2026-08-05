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
        relative overflow-hidden rounded-2xl
        border border-slate-800/80
        bg-slate-900/40
        backdrop-blur-sm
        ${
          hover
            ? "transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-[0_8px_32px_rgba(0,0,0,0.24)]"
            : ""
        }
        ${className}
      `}
    >
      {(title || subtitle || icon || action) && (
        <div className="flex items-start justify-between border-b border-slate-800/80 px-6 py-5">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                {icon}
              </div>
            )}

            <div>
              {title && (
                <h2 className="text-base font-semibold text-white">{title}</h2>
              )}

              {subtitle && (
                <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>
              )}
            </div>
          </div>

          {action}
        </div>
      )}

      <div className="px-6 py-5">{children}</div>
    </div>
  );
}
