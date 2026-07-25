"use client";

interface NotesViewerProps {
  open: boolean;
  onClose: () => void;

  note?: {
    title: string;
    subject: string;
    className: string;
    fileUrl: string;
    fileType: string;
  } | null;
}


export default function NotesViewer({
  open,
  onClose,
  note,
}: NotesViewerProps) {

  if (!open || !note) return null;


  const isPdf =
    note.fileType === "PDF";


  const isImage =
    note.fileType === "IMAGE";


  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
    >

      <div
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-4xl
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-xl
        "
      >


        <div
          className="
            flex
            items-center
            justify-between
            border-b
            p-5
          "
        >

          <div>

            <h2
              className="
                text-xl
                font-bold
                text-slate-900
              "
            >
              {note.title}
            </h2>


            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              {note.className} • {note.subject}
            </p>

          </div>


          <button
            onClick={onClose}
            className="
              text-xl
              text-slate-500
              hover:text-red-500
            "
          >
            ✕
          </button>

        </div>



        <div
          className="
            flex-1
            overflow-auto
            p-5
          "
        >

          {
            isPdf && (
              <iframe
                src={note.fileUrl}
                className="
                  h-[65vh]
                  w-full
                  rounded-xl
                  border
                "
              />
            )
          }



          {
            isImage && (
              <img
                src={note.fileUrl}
                alt={note.title}
                className="
                  mx-auto
                  max-h-[65vh]
                  rounded-xl
                  object-contain
                "
              />
            )
          }



          {
            !isPdf && !isImage && (
              <div
                className="
                  rounded-xl
                  bg-slate-50
                  p-8
                  text-center
                "
              >

                <p
                  className="
                    text-slate-600
                  "
                >
                  Preview is not available for this file type.
                </p>

              </div>
            )
          }

        </div>



        <div
          className="
            flex
            justify-end
            gap-3
            border-t
            p-5
          "
        >

          <a
            href={note.fileUrl}
            download
            className="
              rounded-xl
              bg-blue-600
              px-5
              py-3
              font-semibold
              text-white
              hover:bg-blue-700
            "
          >
            Download
          </a>


        </div>


      </div>

    </div>
  );
}