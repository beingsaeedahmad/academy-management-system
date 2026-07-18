"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import EditStudentModal from "./EditStudentModal";

import {
  getStudents,
  deleteStudent,
} from "@/actions/studentActions";

import { Student } from "@/types";


interface Props {
  onView: (student: Student) => void;
}


export default function StudentTable({
  onView,
}: Props) {


  const [students, setStudents] = useState<Student[]>([]);

  const [editStudent, setEditStudent] =
    useState<Student | null>(null);


  const router = useRouter();



  useEffect(() => {


    async function loadStudents() {

      try {

        const data = await getStudents();

        setStudents(data);

      } catch(error) {

        console.error(
          "STUDENTS LOAD ERROR:",
          error
        );

      }

    }


    loadStudents();


  }, []);
    return (

    <div
      className="
      overflow-hidden
      rounded-2xl
      border
      border-slate-800
      bg-slate-900
      shadow-xl
      "
    >

      <div className="overflow-x-auto">


        <table className="w-full">


          <thead
            className="
            bg-slate-950
            border-b
            border-slate-800
            "
          >

            <tr
              className="
              text-left
              text-sm
              font-semibold
              text-slate-300
              "
            >

              <th className="px-6 py-4">Photo</th>

              <th className="px-6 py-4">Admission No</th>

              <th className="px-6 py-4">Roll No</th>

              <th className="px-6 py-4">Student Name</th>

              <th className="px-6 py-4">Father Name</th>

              <th className="px-6 py-4">Class</th>

              <th className="px-6 py-4">Phone</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>



          <tbody>


          {
            students.length === 0 ? (

              <tr>

                <td
                  colSpan={9}
                  className="
                  py-16
                  text-center
                  text-slate-500
                  "
                >

                  No students found.

                </td>

              </tr>


            ) : (


              students.map((student)=>(


                <tr
                  key={student.id}
                  className="
                  border-b
                  border-slate-800
                  hover:bg-slate-800/60
                  "
                >


                  <td className="px-6 py-4">

                    {
                      student.photo ? (

                        <img
                          src={student.photo}
                          alt={student.name}
                          className="
                          h-12
                          w-12
                          rounded-full
                          object-cover
                          "
                        />

                      ) : (

                        <div
                          className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          bg-blue-600
                          text-white
                          "
                        >

                          {student.name.charAt(0)}

                        </div>

                      )
                    }

                  </td>


                  <td className="px-6 py-4 text-slate-200">
                    {student.admissionNo}
                  </td>


                  <td className="px-6 py-4 text-slate-200">
                    {student.rollNumber}
                  </td>


                  <td className="px-6 py-4 text-white font-semibold">
                    {student.name}
                  </td>


                  <td className="px-6 py-4 text-slate-200">
                    {student.fatherName}
                  </td>


                  <td className="px-6 py-4 text-slate-200">
                    {student.className}
                  </td>


                  <td className="px-6 py-4 text-slate-200">
                    {student.phone}
                  </td>


                  <td className="px-6 py-4">

                    <span
                      className="
                      rounded-full
                      bg-green-500/20
                      px-3
                      py-1
                      text-xs
                      text-green-400
                      "
                    >
                      Active
                    </span>

                  </td>
                                    <td className="px-6 py-4">

                    <div
                      className="
                      flex
                      justify-center
                      gap-2
                      "
                    >


                      <button
                        onClick={() => onView(student)}
                        className="
                        rounded-lg
                        bg-blue-500/10
                        p-2
                        text-blue-400
                        "
                      >

                        <Eye size={18}/>

                      </button>



                      <button
                        onClick={() => setEditStudent(student)}
                        className="
                        rounded-lg
                        bg-yellow-500/10
                        p-2
                        text-yellow-400
                        "
                      >

                        <Pencil size={18}/>

                      </button>



                      <button
                        onClick={async()=>{

                          const ok = confirm(
                            "Delete this student?"
                          );

                          if(!ok) return;


                          await deleteStudent(
                            student.id
                          );


                          setStudents((prev)=>
                            prev.filter(
                              item =>
                              item.id !== student.id
                            )
                          );


                          router.refresh();

                        }}

                        className="
                        rounded-lg
                        bg-red-500/10
                        p-2
                        text-red-400
                        "
                      >

                        <Trash2 size={18}/>

                      </button>


                    </div>


                  </td>


                </tr>


              ))

            )

          }


          </tbody>


        </table>


      </div>

{editStudent && (
  <EditStudentModal
    student={editStudent}
    open={true}
    onClose={() => setEditStudent(null)}
    onUpdated={async () => {

      const data = await getStudents();

      setStudents(data);

      setEditStudent(null);

    }}
  />
)}

    </div>

  );

}