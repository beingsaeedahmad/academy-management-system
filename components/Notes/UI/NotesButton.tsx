interface Props {

    children: React.ReactNode;

    onClick?:()=>void;

    type?:
    | "primary"
    | "secondary"
    | "danger";

    disabled?:boolean;

}


export default function NotesButton({

    children,

    onClick,

    type="primary",

    disabled=false,

}:Props){


    const styles={


        primary:
        `
        bg-blue-600
        text-white
        hover:bg-blue-700
        `,


        secondary:
        `
        bg-slate-200
        text-slate-800
        hover:bg-slate-300
        `,


        danger:
        `
        bg-red-600
        text-white
        hover:bg-red-700
        `,


    };



    return (

        <button

            disabled={disabled}

            onClick={onClick}

            className={`
                px-4
                py-2
                rounded-xl
                text-sm
                font-semibold
                transition
                duration-200
                disabled:opacity-50
                ${styles[type]}
            `}

        >

            {children}

        </button>

    );


}