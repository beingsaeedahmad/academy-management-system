"use client";

import AdmissionForm from "./AdmissionForm";
import AdmissionTable from "./AdmissionTable";

export default function AdmissionPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Admissions
        </h1>

        <p className="mt-2 text-slate-400">
          Add new students and manage admissions.
        </p>
      </div>


      {/* Form Top */}

      <AdmissionForm />


      {/* Table Bottom */}

      <AdmissionTable />


    </div>
  );
}