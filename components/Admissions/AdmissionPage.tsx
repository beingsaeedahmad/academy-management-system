import AdmissionForm from "./AdmissionForm";
import AdmissionTable from "./AdmissionTable";

export default function AdmissionPage() {
  return (
    <div className="space-y-6">
      <AdmissionForm />

      
      <AdmissionTable />
    </div>
  );
}