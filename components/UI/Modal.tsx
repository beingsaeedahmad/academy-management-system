"use client";

import * as React from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-2xl
          overflow-hidden
          rounded-3xl
          border
          border-slate-800
          bg-gradient-to-br
          from-slate-900
          via-slate-900
          to-slate-950
          shadow-[0_0_45px_rgba(37,99,235,0.20)]
          animate-in
          fade-in
          zoom-in-95
          duration-300
        "
      >
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-400/5" />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-slate-400
              transition-all
              duration-300
              hover:bg-slate-800
              hover:text-white
              hover:shadow-[0_0_20px_rgba(37,99,235,0.30)]
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="relative max-h-[70vh] overflow-y-auto p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="relative border-t border-slate-800 px-6 py-5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}