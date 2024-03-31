import { format } from "date-fns";

function Cost({sign, sum, date, category}){
    return(
        <div className='flex justify-between items-center px-5 md:px-40 py-1 mx-1 mt-6 border-2 border-violet-900 rounded-lg bg-white text-lg text-violet-950 font-semibold'>
              <div>
              <p>{format(new Date(date), "dd.MM")}</p>
              <p>{category}</p>
              </div>
              <p className="bg-fuchsia-500 text-white w-28 h-8 px-4 rounded-full">{sign} {sum} р.</p>
        </div>
    )
}

export default Cost