"use client";

import Card from "../UI/Card";
import {
  Eye,
  Edit,
  Trash2,
} from "lucide-react";


const admissions = [
  {
    id: 1,
    name: "Ali Hassan",
    className: "Class 8",
    fatherName: "Ahmed Khan",
    mobile: "03001234567",
    fees: "3000",
  },
  {
    id: 2,
    name: "Ayesha Malik",
    className: "Class 6",
    fatherName: "Muhammad Malik",
    mobile: "03111234567",
    fees: "2500",
  },
];


export default function AdmissionTable() {

  return (
    <Card
      title="Admissions List"
      subtitle="Recently registered students"
    >

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b border-slate-800 text-sm text-slate-400">

              <th className="px-4 py-3">
                Student
              </th>

              <th className="px-4 py-3">
                Class
              </th>

              <th className="px-4 py-3">
                Father
              </th>

              <th className="px-4 py-3">
                Mobile
              </th>

              <th className="px-4 py-3">
                Fees
              </th>

              <th className="px-4 py-3">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {admissions.map((student) => (

              <tr
                key={student.id}
                className="
                  border-b
                  border-slate-800
                  text-slate-300
                  transition
                  hover:bg-slate-900
                "
              >

                <td className="px-4 py-4 font-medium text-white">
                  {student.name}
                </td>


                <td className="px-4 py-4">
                  {student.className}
                </td>


                <td className="px-4 py-4">
                  {student.fatherName}
                </td>


                <td className="px-4 py-4">
                  {student.mobile}
                </td>


                <td className="px-4 py-4 text-blue-400">
                  Rs. {student.fees}
                </td>


                <td className="px-4 py-4">

                  <div className="flex gap-2">


                    <button
                      className="
                        rounded-xl
                        border
                        border-slate-700
                        p-2
                        text-blue-400
                        hover:border-blue-500
                      "
                    >
                      <Eye size={18}/>
                    </button>


                    <button
                      className="
                        rounded-xl
                        border
                        border-slate-700
                        p-2
                        text-green-400
                        hover:border-green-500
                      "
                    >
                      <Edit size={18}/>
                    </button>


                    <button
                      className="
                        rounded-xl
                        border
                        border-slate-700
                        p-2
                        text-red-400
                        hover:border-red-500
                      "
                    >
                      <Trash2 size={18}/>
                    </button>


                  </div>

                </td>


              </tr>

            ))}


          </tbody>


        </table>

      </div>


    </Card>
  );
}