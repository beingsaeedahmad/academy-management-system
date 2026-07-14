"use client";

import Card from "../UI/Card";
import {
  User,
  GraduationCap,
  Phone,
  Wallet,
  MapPin,
} from "lucide-react";


const student = {
  name: "Ali Hassan",
  className: "Class 8",
  fatherName: "Ahmed Khan",
  mobile: "03001234567",
  address: "Okara Punjab",
  monthlyFees: "3000",
};


export default function AdmissionDetails() {

  return (
    <Card
      title="Admission Details"
      subtitle="Student information preview"
    >

      <div className="space-y-5">


        {/* Profile */}

        <div
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-slate-800
            bg-slate-900/50
            p-4
          "
        >

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-blue-500
              to-cyan-500
              text-white
              shadow-[0_0_25px_rgba(37,99,235,.35)]
            "
          >
            <User size={30}/>
          </div>


          <div>

            <h2 className="text-xl font-bold text-white">
              {student.name}
            </h2>

            <p className="text-sm text-slate-400">
              Active Student
            </p>

          </div>


        </div>



        {/* Details */}


        <div className="space-y-3">


          <DetailItem
            icon={<GraduationCap size={20}/>}
            title="Class"
            value={student.className}
          />


          <DetailItem
            icon={<User size={20}/>}
            title="Father Name"
            value={student.fatherName}
          />


          <DetailItem
            icon={<Phone size={20}/>}
            title="Mobile"
            value={student.mobile}
          />


          <DetailItem
            icon={<MapPin size={20}/>}
            title="Address"
            value={student.address}
          />


          <DetailItem
            icon={<Wallet size={20}/>}
            title="Monthly Fees"
            value={`Rs. ${student.monthlyFees}`}
          />


        </div>


      </div>


    </Card>
  );
}



function DetailItem({
  icon,
  title,
  value,
}:{
  icon: React.ReactNode;
  title:string;
  value:string;
}) {

  return (

    <div
      className="
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-slate-800
        bg-slate-900
        p-3
      "
    >

      <div className="text-blue-400">
        {icon}
      </div>


      <div>

        <p className="text-xs text-slate-500">
          {title}
        </p>

        <p className="text-sm font-medium text-white">
          {value}
        </p>

      </div>


    </div>

  );
}