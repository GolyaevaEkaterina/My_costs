import { format } from "date-fns";

function Cost({sum, date, category}){
    return(
        <div className='grid grid-cols-3 gap-5 px-6 py-1 mt-6 border-2 border-violet-300 rounded-lg bg-white text-lg font-semibold'>
              <p>{sum} р.</p>
              <p>{format(new Date(date), "dd.MM")}</p>
              <p>{category}</p>
        </div>
    )
}

export default Cost