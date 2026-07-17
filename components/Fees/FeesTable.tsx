import FeesRow from "./FeesRow";


import {
  StudentFee,
} from "./feesTypes";



interface Props {

  fees:StudentFee[];

  onPayment:
  (
    id:string,
    amount:number
  )=>void;

}




export default function FeesTable({

  fees,

  onPayment,

}:Props){



  return (

    <div

      className="
      rounded-xl

      border

      border-slate-800

      bg-[#0F172A]

      shadow-xl

      overflow-hidden
      "

    >


      <div

        className="
        overflow-x-auto
        "

      >


        <table

          className="
          w-full

          table-fixed

          border-collapse
          "

        >



          {/* HEADER */}

          <thead

            className="
            sticky

            top-0

            z-40
            "

          >

            <tr>


              <th

                className="
                sticky

                left-0

                z-50

                w-14

                min-w-[56px]

                border

                border-slate-700

                bg-[#0F172A]

                py-3

                text-xs

                font-bold

                text-white
                "

              >

                Roll

              </th>




              <th

                className="
                sticky

                left-14

                z-50

                w-44

                min-w-[176px]

                border

                border-slate-700

                bg-[#0F172A]

                px-3

                text-left

                text-xs

                font-bold

                text-white
                "

              >

                Student Name

              </th>





              {
                [
                  "Class",
                  "Total Fee",
                  "Paid",
                  "Due",
                  "Status",
                  "Action"
                ]
                .map(title=>(

                  <th

                    key={title}

                    className="
                    border

                    border-slate-700

                    bg-[#0F172A]

                    py-3

                    text-xs

                    font-bold

                    text-white
                    "

                  >

                    {title}

                  </th>

                ))
              }



            </tr>


          </thead>





          <tbody>


            {
              fees.map((fee)=>(

                <FeesRow

                  key={fee.id}

                  fee={fee}

                  onPayment={
                    onPayment
                  }

                />

              ))
            }


          </tbody>




        </table>


      </div>


    </div>

  );

}