import {
  LucideIcon,
  Wallet,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";


import {
  FeesSummary,
} from "./feesTypes";


import {
  formatCurrency,
} from "./feesUtils";



interface Props {

  summary: FeesSummary;

}



interface CardItem {

  title:string;

  value:number;

  icon:LucideIcon;

  color:string;

}




export default function FeesSummaryCards({
  summary,
}:Props){


  const cards:CardItem[] = [

    {
      title:"Total Fees",
      value:summary.total,
      icon:Wallet,
      color:
      "border-blue-500/30 from-blue-500/20 to-blue-900/20",
    },


    {
      title:"Paid",
      value:summary.paid,
      icon:CheckCircle,
      color:
      "border-green-500/30 from-green-500/20 to-green-900/20",
    },


    {
      title:"Pending",
      value:summary.pending,
      icon:Clock,
      color:
      "border-yellow-500/30 from-yellow-500/20 to-yellow-900/20",
    },


    {
      title:"Overdue",
      value:summary.overdue,
      icon:AlertCircle,
      color:
      "border-red-500/30 from-red-500/20 to-red-900/20",
    },

  ];



  return (

    <div

      className="
      grid

      grid-cols-1

      sm:grid-cols-2

      xl:grid-cols-4

      gap-5
      "

    >

      {
        cards.map((card)=>(

          <div

            key={card.title}

            className={`
            
            rounded-3xl

            border

            bg-gradient-to-br

            ${card.color}

            p-5

            backdrop-blur-xl

            shadow-[0_0_25px_rgba(37,99,235,0.12)]

            transition-all

            duration-300

            hover:-translate-y-1

            hover:shadow-[0_0_35px_rgba(37,99,235,0.25)]

            `}
          >


            <div

              className="
              flex

              items-center

              justify-between
              "

            >



              <div>

                <p

                  className="
                  text-sm

                  text-slate-400
                  "

                >

                  {card.title}

                </p>



                <h2

                  className="
                  mt-2

                  text-2xl

                  font-bold

                  text-white
                  "

                >

                  {formatCurrency(card.value)}

                </h2>


              </div>





              <div

                className="
                flex

                h-14

                w-14

                items-center

                justify-center

                rounded-2xl

                bg-white/10

                backdrop-blur-md

                shadow-inner
                "

              >

                <card.icon

                  className="
                  h-7

                  w-7

                  text-white
                  "

                />

              </div>



            </div>


          </div>


        ))
      }


    </div>

  );

}