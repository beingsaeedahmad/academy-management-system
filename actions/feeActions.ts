"use server";

import { prisma } from "@/lib/prisma";


// Get all fees
export async function getFees() {

  const fees = await prisma.fee.findMany({

    include: {
      student: true,
    },

    orderBy: {
      createdAt: "desc",
    },

  });


  return fees;

}



// Create fee record for student
export async function createFee(
  studentId: string,
  amount: number
) {

  const fee = await prisma.fee.create({

    data: {

      studentId,

      totalFee: amount,

      paidAmount: 0,

      dueDate: new Date(),

      status: "Pending",

    },

  });


  return fee;

}



// Update payment
export async function updateFeePayment(
  id: string,
  amount: number
) {


  const fee =
    await prisma.fee.findUnique({

      where:{
        id,
      },

    });



  if(!fee){
    throw new Error(
      "Fee record not found"
    );
  }



  const paidAmount =
    fee.paidAmount + amount;



  const status =
    paidAmount >= fee.totalFee
    ? "Paid"
    : "Pending";



  return await prisma.fee.update({

    where:{
      id,
    },


    data:{

      paidAmount,

      status,

    },

  });


}