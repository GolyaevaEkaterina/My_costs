import { format } from "date-fns";

function Item({sign, sum, date, category, id, deleteItem}){
    return(
        <div className='flex justify-between items-center px-5 md:px-20 py-2 mx-1 mt-6 border-2 border-violet-900 rounded-lg bg-white text-lg text-violet-950 font-semibold'>
              <div className="flex gap-8">
              <p>{format(new Date(date), "dd.MM")}</p>
              <p>{category}</p>
              </div>
              <div className="flex items-center gap-20">
              <p className="bg-fuchsia-500 text-white w-28 h-8 px-4 rounded-full">{sign} {sum} р.</p>
              <button 
                className="hover:cursor-pointer hover:scale-110 duration-100 text-violet-900"
                onClick={() => deleteItem(id)}
              >
                    <i className="hover:cursor-pointer" class="fa-solid fa-trash"></i>
              </button>
              </div>
              
        </div>
    )
}

export default Item