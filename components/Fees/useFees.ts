"use client";


import {
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



const initialFees: StudentFee[] = [

  {
    id:"1",
    rollNo:1,
    name:"Ali Khan",
    className:"10-A",
    totalFee:50000,
    paidAmount:50000,
    dueDate:"2026-07-10",
    status:"Paid",
  },


  {
    id:"2",
    rollNo:2,
    name:"Ahmed Ali",
    className:"10-B",
    totalFee:50000,
    paidAmount:30000,
    dueDate:"2026-07-20",
    status:"Pending",
  },


  {
    id:"3",
    rollNo:3,
    name:"Sara Khan",
    className:"9-A",
    totalFee:45000,
    paidAmount:0,
    dueDate:"2026-06-15",
    status:"Overdue",
  },

];



export default function useFees(){


  const [fees,setFees] =
    useState<StudentFee[]>(
      initialFees
    );


  const [search,setSearch] =
    useState("");



  const [selectedClass,setSelectedClass] =
    useState("All");



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


        if(item.id !== id)
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