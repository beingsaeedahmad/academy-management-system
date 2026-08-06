"use server";

import { prisma } from "@/lib/prisma";
import type { Student } from "@/types";


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



// CREATE STUDENT

export async function createStudent(
  data: CreateStudentData
) {

  try {


    // Generate Unique Admission No & Roll No

    const totalStudents = await prisma.student.count();


    let nextNumber = totalStudents + 1;



    let admissionNo =
      `ADM-${String(nextNumber).padStart(4, "0")}`;


    let rollNumber =
      `R-${String(nextNumber).padStart(4, "0")}`;




    // Check duplicate admission number

    while (

      await prisma.student.findUnique({

        where: {

          admissionNo,

        },

      })

    ) {


      nextNumber++;


      admissionNo =
        `ADM-${String(nextNumber).padStart(4, "0")}`;


      rollNumber =
        `R-${String(nextNumber).padStart(4, "0")}`;


    }





    // Create Student

    const student = await prisma.student.create({

      data: {


        admissionNo,


        rollNumber,


        name: data.name,


        fatherName: data.fatherName,


        gender: data.gender ?? null,


        className: data.className,


        phone: data.phone,


        address: data.address ?? null,


        monthlyFees: data.monthlyFees,


        photo: data.photo ?? null,


        admissionDate: new Date(),


      },


    });






    // Automatically create Fee Record

 await prisma.fee.create({
  data: {
    studentId: student.id,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    totalFee: student.monthlyFees,
    paidAmount: 0,
    dueDate: new Date(),
    status: "Pending",
  },
});



    return student;



  } catch (error) {


    console.error(

      "CREATE STUDENT ERROR:",

      error

    );


    throw error;


  }

}







// GET ALL STUDENTS

export async function getStudents(): Promise<Student[]> {


  try {


    const students = await prisma.student.findMany({

orderBy: [
  {
    className: "asc",
  },
  {
    name: "asc",
  },
],


      include: {


        fees: true,


      },


    });



    return students;



  } catch (error) {


    console.error(

      "GET STUDENTS ERROR:",

      error

    );


    throw error;


  }

}







export async function getStudentById(id: string) {
  try {
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        fees: true,
        attendance: true,
      },
    });

    return student;
  } catch (error) {
    console.error("GET STUDENT BY ID ERROR:", error);
    throw error;
  }
}

export async function deleteStudent(id:string){

  console.log(
    "SERVER DELETE START:",
    id
  );


  try {


    await prisma.attendance.deleteMany({
      where:{
        studentId:id
      }
    });


    await prisma.fee.deleteMany({
      where:{
        studentId:id
      }
    });



    const deleted =
      await prisma.student.delete({
        where:{
          id
        }
      });



    console.log(
      "SERVER DELETE DONE:",
      deleted.id
    );


    return {
      success:true,
      id:deleted.id
    };


  } catch(error){

    console.error(
      "SERVER DELETE ERROR:",
      error
    );

    throw error;

  }

}
// UPDATE STUDENT

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



  } catch (error) {


    console.error(

      "UPDATE STUDENT ERROR:",

      error

    );


    throw error;


  }

}
// ================= STUDENT STATS =================

export async function getStudentStats() {
  try {
    const today = new Date();

    const firstDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const nextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );

    const [
      totalStudents,
      activeStudents,
      newAdmissions,
      feeDefaulters,
    ] = await Promise.all([
      prisma.student.count(),

      prisma.student.count({
        where: {
          status: "Active",
        },
      }),

      prisma.student.count({
        where: {
          createdAt: {
            gte: firstDay,
            lt: nextMonth,
          },
        },
      }),

      prisma.fee.count({
        where: {
          month: today.getMonth() + 1,
          year: today.getFullYear(),
          status: {
            in: ["Pending", "Overdue"],
          },
        },
      }),
    ]);

    return {
      totalStudents,
      activeStudents,
      newAdmissions,
      feeDefaulters,
    };
  } catch (error) {
    console.error("GET STUDENT STATS ERROR:", error);
    throw error;
  }
}

