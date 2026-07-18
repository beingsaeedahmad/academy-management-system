"use server";

import { prisma } from "@/lib/prisma";


interface CreateStudentData {

  name: string;

  fatherName: string;

  gender?: string;

  className: string;

  phone: string;

  address?: string;

  monthlyFees: number;

  photo?: string;

}



export async function createStudent(
  data: CreateStudentData
) {

  try {

    const count = await prisma.student.count();


    const admissionNo =
      `ADM-${String(count + 1).padStart(4, "0")}`;


    const rollNumber =
      `R-${String(count + 1).padStart(4, "0")}`;



    const student = await prisma.student.create({

      data: {

        admissionNo,

        rollNumber,


        name: data.name,


        fatherName: data.fatherName,


        gender: data.gender,


        className: data.className,


        phone: data.phone,


        address: data.address,


        monthlyFees: data.monthlyFees,


        photo: data.photo,


        admissionDate: new Date(),

      },

    });



    return student;



  } catch (error) {


    console.error(
      "CREATE STUDENT ERROR:",
      error
    );


    throw new Error(
      "Student creation failed"
    );


  }

}





export async function getStudents() {


  const students = await prisma.student.findMany({

    orderBy: {

      createdAt: "desc",

    },

  });


  return students;


}
export async function deleteStudent(id: string) {
  try {
    await prisma.student.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
    };

  } catch (error) {

    console.error(
      "DELETE STUDENT ERROR:",
      error
    );

    throw new Error(
      "Student delete failed"
    );
  }
}
export async function updateStudent(
  id: string,
  data: {
    name?: string;
    fatherName?: string;
    gender?: string;
    className?: string;
    phone?: string;
    address?: string;
    monthlyFees?: number;
    photo?: string;
  }
) {

  try {

    const student = await prisma.student.update({

      where: {
        id,
      },

      data,

    });


    return student;


  } catch(error) {

    console.error(
      "UPDATE STUDENT ERROR:",
      error
    );


    throw new Error(
      "Student update failed"
    );

  }

}