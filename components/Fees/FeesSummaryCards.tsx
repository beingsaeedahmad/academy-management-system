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
  activeStatus?: string | null;
  onCardClick?: (status: string | null) => void;

}



interface CardItem {

  title:string;

  value:number;

  icon:LucideIcon;

  color:string;

  status:string | null;

}




export default function FeesSummaryCards({
  summary,
  activeStatus,
  onCardClick,
}:Props){


const cards: CardItem[] = [
  {
    title: "Total Fees",
    value: summary.total,
    icon: Wallet,
    color:
      "from-blue-500/20 via-blue-500/10 to-slate-900 border-blue-500/30 shadow-blue-500/20",
    status: null,
  },
  {
    title: "Paid",
    value: summary.paid,
    icon: CheckCircle,
    color:
      "from-emerald-500/20 via-emerald-500/10 to-slate-900 border-emerald-500/30 shadow-emerald-500/20",
    status: "Paid",
  },
  {
    title: "Pending",
    value: summary.pending,
    icon: Clock,
    color:
      "from-amber-500/20 via-amber-500/10 to-slate-900 border-amber-500/30 shadow-amber-500/20",
    status: "Pending",
  },
  {
    title: "Overdue",
    value: summary.overdue,
    icon: AlertCircle,
    color:
      "from-rose-500/20 via-rose-500/10 to-slate-900 border-rose-500/30 shadow-rose-500/20",
    status: "Overdue",
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

          <button
            key={card.title}
            type="button"
            onClick={() => onCardClick?.(card.status)}
            className={`
            rounded-0xl
            border
            bg-gradient-to-br
            ${card.color}
            p-5
            text-left
            backdrop-blur-xl
            shadow-[0_0_25px_rgba(37,99,235,0.12)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-[0_0_35px_rgba(37,99,235,0.25)]
            ${activeStatus === card.status ? "border-white bg-white/10 shadow-[0_0_35px_rgba(255,255,255,0.18)]" : "hover:border-blue-400"}
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

                rounded-0xl

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


          </button>


        ))
      }


    </div>

  );

}