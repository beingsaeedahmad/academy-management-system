interface Props {

    children: React.ReactNode;

    type?: 
    | "default"
    | "success"
    | "warning"
    | "danger";

}


export default function NotesBadge({

    children,

    type="default",

}:Props){


    const styles = {

        default:
        "bg-slate-100 text-slate-700",

        success:
        "bg-green-100 text-green-700",

        warning:
        "bg-yellow-100 text-yellow-700",

        danger:
        "bg-red-100 text-red-700",

    };


    return (

        <span
            className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                ${styles[type]}
            `}
        >

            {children}

        </span>

    );

}