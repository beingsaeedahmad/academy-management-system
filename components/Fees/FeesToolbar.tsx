interface Props {

  search:string;

  setSearch:
  (
    value:string
  )=>void;


  selectedClass:string;


  setSelectedClass:
  (
    value:string
  )=>void;

}



export default function FeesToolbar({

  search,

  setSearch,

  selectedClass,

  setSelectedClass,

}:Props){


  return (

    <div

      className="
      flex

      flex-col

      md:flex-row

      gap-3

      rounded-xl

      border

      border-slate-700

      bg-[#0F172A]

      p-4

      "

    >


      {/* Search */}

      <input

        value={search}

        onChange={(e)=>
          setSearch(
            e.target.value
          )
        }

        placeholder="Search student..."

        className="
        h-9

        flex-1

        rounded-lg

        border

        border-slate-700

        bg-[#020817]

        px-3

        text-xs

        text-white

        outline-none

        placeholder:text-slate-500
        "

      />



      {/* Class Filter */}

      <select

        value={selectedClass}

        onChange={(e)=>
          setSelectedClass(
            e.target.value
          )
        }

        className="
        h-9

        rounded-lg

        border

        border-slate-700

        bg-[#020817]

        px-3

        text-xs

        text-white

        outline-none
        "

      >

        <option value="All">
          All Classes
        </option>


        <option value="10-A">
          10-A
        </option>


        <option value="10-B">
          10-B
        </option>


        <option value="9-A">
          9-A
        </option>


      </select>




      {/* Button */}

      <button

        className="
        h-9

        rounded-lg

        bg-blue-600

        px-4

        text-xs

        font-semibold

        text-white

        hover:bg-blue-700

        transition
        "

      >

        + Add Payment

      </button>



    </div>

  );

}