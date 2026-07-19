"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  StudentFee,
} from "./feesTypes";

import {
  calculateFeesSummary,
  getFeeStatus,
} from "./feesUtils";

import {
  getStudents,
} from "@/actions/studentActions";

import {
  Student,
} from "@/types";


export default function useFees(){

  const [fees,setFees] =
    useState<StudentFee[]>([]);


  const [search,setSearch] =
    useState("");


  const [selectedClass,setSelectedClass] =
    useState("All");



  // ==========================
  // LOAD STUDENTS FROM DATABASE
  // ==========================

  useEffect(()=>{


    async function loadFees(){

      const students: Student[] =
        await getStudents();


      const feeData: StudentFee[] =
        students.map((student)=>({

          id: student.id,

rollNo: student.rollNumber,
          name: student.name,

          className: student.className,

          totalFee: student.monthlyFees,

          paidAmount:0,

          dueDate:
            new Date().toISOString(),

          status:"Pending",

        }));


      setFees(feeData);


    }


    loadFees();


  },[]);





  const filteredFees =
    useMemo(()=>{


      return fees.filter((item)=>{


        const matchSearch =
          item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );


        const matchClass =
          selectedClass==="All"
          ||
          item.className===selectedClass;



        return (
          matchSearch &&
          matchClass
        );


      });


    },[
      fees,
      search,
      selectedClass
    ]);





  const summary =
    useMemo(()=>{


      return calculateFeesSummary(
        fees
      );


    },[fees]);







  function updatePayment(
    id:string,
    amount:number
  ){


    setFees(prev=>

      prev.map(item=>{


        if(item.id!==id)
          return item;


        const paid =
          item.paidAmount + amount;



        return {

          ...item,

          paidAmount:paid,


          status:
          getFeeStatus(
            item.totalFee,
            paid,
            item.dueDate
          )

        };


      })

    );


  }





  return {

    fees:filteredFees,

    summary,

    search,

    setSearch,

    selectedClass,

    setSelectedClass,

    updatePayment,

  };


}