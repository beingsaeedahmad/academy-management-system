import {
  FeeStatus,
} from "./feesTypes";


interface Props {

  status: FeeStatus;

}


export default function FeeStatusBadge({
  status,
}:Props){


  const styles = {

    Paid:
      "bg-green-900/40 text-green-300 border-green-700",

    Pending:
      "bg-yellow-900/40 text-yellow-300 border-yellow-700",

    Overdue:
      "bg-red-900/40 text-red-300 border-red-700",

  };



  return (

    <span
      className={`
        inline-flex

        items-center

        rounded-full

        border

        px-2

        py-1

        text-[11px]

        font-semibold

        ${styles[status]}
      `}
    >

      {status}

    </span>

  );

}