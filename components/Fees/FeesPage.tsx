"use client";


import FeesSummaryCards from "./FeesSummaryCards";


import FeesTable from "./FeesTable";

import useFees from "./useFees";



export default function FeesPage(){


  const {

    fees,

    summary,

    search,

    setSearch,

    selectedClass,

    setSelectedClass,

    updatePayment,

  } = useFees();




  return (

    <div

      className="
      min-h-screen

      rounded-xl

      border

      border-slate-800

      bg-[#020817]

      p-5

      shadow-xl

      space-y-5
      "

    >



      {/* Header */}

      <div

        className="
        rounded-xl

        border

        border-slate-800

        bg-[#0F172A]

        p-4
        "

      >

        <h1

          className="
          text-xl

          font-bold

          text-white
          "

        >

          Fees Management

        </h1>


        <p

          className="
          mt-1

          text-xs

          text-slate-400
          "

        >

          Manage student fee records and payment status

        </p>


      </div>





      {/* Summary */}

      <FeesSummaryCards

        summary={summary}

      />










      {/* Table */}

      <FeesTable

        fees={fees}

        onPayment={
          updatePayment
        }

      />


    </div>

  );

}