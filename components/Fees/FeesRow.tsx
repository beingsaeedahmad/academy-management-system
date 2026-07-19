import FeeStatusBadge from "./FeeStatusBadge";

import {
  StudentFee,
} from "./feesTypes";

import {
  calculateRemaining,
  formatCurrency,
} from "./feesUtils";



interface Props {

  fee: StudentFee;

  onPayment:(
    id:string,
    amount:number
  )=>void;

}



export default function FeesRow({

  fee,

  onPayment,

}:Props){


  const remaining =
    calculateRemaining(
      fee.totalFee,
      fee.paidAmount
    );



  return (

    <tr

      className="
      transition-colors

      hover:bg-slate-800/30
      "

    >


      {/* Roll */}

      <td

        className="
        sticky

        left-0

        z-20

        w-14

        min-w-[56px]

        border

        border-slate-700

        bg-[#020817]

        text-center

        text-xs

        font-semibold

        text-white
        "

      >

        {fee.rollNo}

      </td>




      {/* Student Name */}

      <td

        className="
        sticky

        left-14

        z-20

        w-44

        min-w-[176px]

        border

        border-slate-700

        bg-[#020817]

        px-3

        text-xs

        font-medium

        text-white

        whitespace-nowrap
        "

      >

        {fee.name}

      </td>





      {/* Class */}

      <td

        className="
        border

        border-slate-700

        text-center

        text-xs

        text-slate-300
        "

      >

        {fee.className}

      </td>





      {/* Total Fee */}

      <td

        className="
        border

        border-slate-700

        px-2

        text-center

        text-xs

        text-white
        "

      >

        {formatCurrency(
          fee.totalFee
        )}

      </td>





      {/* Paid */}

      <td

        className="
        border

        border-slate-700

        px-2

        text-center

        text-xs

        text-green-300
        "

      >

        {formatCurrency(
          fee.paidAmount
        )}

      </td>





      {/* Due */}

      <td

        className="
        border

        border-slate-700

        px-2

        text-center

        text-xs

        text-red-300
        "

      >

        {formatCurrency(
          remaining
        )}

      </td>





      {/* Status */}

      <td

        className="
        border

        border-slate-700

        text-center
        "

      >

        <FeeStatusBadge

          status={fee.status}

        />

      </td>






      {/* Action */}

      <td

        className="
        border

        border-slate-700

        text-center
        "

      >

        {
          remaining > 0 &&

          <button

      onClick={() => {

 const confirmAction = confirm(
   `${fee.name} ki fee status change karni hai?`
 );


 if(!confirmAction) return;


 onPayment(
   fee.id,
   fee.totalFee
 );

}}

            className="
            rounded-md

            bg-blue-600

            px-3

            py-1

            text-[11px]

            font-semibold

            text-white

            hover:bg-blue-700
            "

          >

            Pay

          </button>

        }


        {
          remaining <= 0 &&

          <span

            className="
            text-[11px]

            text-slate-500
            "

          >

            Completed

          </span>

        }


      </td>



    </tr>

  );

}