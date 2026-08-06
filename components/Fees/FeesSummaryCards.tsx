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
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  status: string | null;
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
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      status: null,
    },
    {
      title: "Paid",
      value: summary.paid,
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      status: "Paid",
    },
    {
      title: "Pending",
      value: summary.pending,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      status: "Pending",
    },
    {
      title: "Overdue",
      value: summary.overdue,
      icon: AlertCircle,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
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
            rounded-2xl
            border
            ${card.border}
            bg-slate-900
            p-6
            text-left
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
            ${
              activeStatus === card.status
                ? "ring-2 ring-blue-500"
                : ""
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                {card.title}
              </p>
        
              <h2 className="mt-3 text-3xl font-bold text-white">
                {formatCurrency(card.value)}
              </h2>
            </div>
        
            <div
              className={`
                ${card.bg}
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-xl
              `}
            >
              <card.icon
                className={`${card.color} h-7 w-7`}
              />
            </div>
          </div>
        </button>


        ))
      }


    </div>

  );

}