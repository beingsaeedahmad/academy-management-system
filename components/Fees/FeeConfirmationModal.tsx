"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck,
  User,
  CalendarDays,
  Banknote,
  X,
} from "lucide-react";

interface Props {
  open: boolean;
  loading?: boolean;

  studentName: string;
  month: string;
  amount: number;

  onClose: () => void;
  onConfirm: () => void;
}

export default function FeeConfirmationModal({
  open,
  loading = false,
  studentName,
  month,
  amount,
  onClose,
  onConfirm,
}: Props) {
  return (
    <AnimatePresence>

      {open && (

        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: .9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: .95,
            }}
            transition={{
              duration: .25,
            }}
            className="
            w-full
            max-w-xl
            overflow-hidden
            rounded-3xl
            border
            border-slate-700
            bg-[#0f172a]
            shadow-2xl
            shadow-emerald-500/10
          "
          >

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-800 p-7">

              <div className="flex items-center gap-4">

                <div
                  className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-emerald-500/10
                  ring-1
                  ring-emerald-500/20
                "
                >
                  <BadgeCheck
                    size={34}
                    className="text-emerald-400"
                  />
                </div>

                <div>

                  <h2 className="text-3xl font-bold text-white">
                    Collect Fee
                  </h2>

                  <p className="text-slate-400">
                    Confirm Fee Collection
                  </p>

                </div>

              </div>

              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={22} />
              </button>

            </div>

            {/* Body */}

            <div className="space-y-7 p-7">

              <div>

                <h3 className="text-2xl font-semibold text-emerald-400">
                  Confirm Fee Collection
                </h3>

                <p className="mt-2 text-slate-400">
                  Are you sure you want to mark this monthly fee as paid?
                </p>

              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-900">

                <Row
                  icon={<User size={20} />}
                  label="Student"
                  value={studentName}
                />

                <Row
                  icon={<CalendarDays size={20} />}
                  label="Month"
                  value={month}
                />

                <Row
                  last
                  icon={<Banknote size={20} />}
                  label="Amount"
                  value={`Rs. ${amount.toLocaleString()}`}
                  valueClass="text-emerald-400 font-semibold"
                />

              </div>

            </div>

            {/* Footer */}

            <div className="flex gap-4 border-t border-slate-800 p-7">

              <button
                disabled={loading}
                onClick={onClose}
                className="
                flex-1
                rounded-2xl
                border
                border-slate-700
                bg-slate-900
                py-4
                font-medium
                text-white
                transition
                hover:bg-slate-800
              "
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={onConfirm}
                className="
                flex-1
                rounded-2xl
                bg-emerald-600
                py-4
                font-semibold
                text-white
                transition
                hover:bg-emerald-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
              >
                {loading ? "Collecting..." : "✓ Collect Fee"}
              </button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}

function Row({
  icon,
  label,
  value,
  last = false,
  valueClass = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  last?: boolean;
  valueClass?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between p-5 ${
        !last && "border-b border-slate-800"
      }`}
    >
      <div className="flex items-center gap-3 text-slate-400">
        {icon}
        {label}
      </div>

      <div className={`text-lg text-white ${valueClass}`}>
        {value}
      </div>
    </div>
  );
}