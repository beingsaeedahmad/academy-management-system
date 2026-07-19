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

export async function getStudents() {


  try {


    const students = await prisma.student.findMany({


      orderBy: {


        createdAt: "desc",


      },


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







// DELETE STUDENT

export async function deleteStudent(
  id: string
) {


  try {



    // Delete related fees first

    await prisma.fee.deleteMany({

      where: {

        studentId: id,

      },

    });





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