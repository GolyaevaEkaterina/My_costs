import months from "months";
import classNames from 'classnames';
import { useEffect, useState } from 'react';

function Months({handleClick}){
    // const[isClick, setIsClick] = useState(false)
    return(
        <div className='grid grid-cols-12 gap-x-1 gap-y-2 mb-6'>
          {months.map(month => {
            return(            
                <div className='px-2 py-1 mt-1 rounded-full text-xs font-semibold h-6 bg-slate-200 hover:cursor-pointer hover:scale-105 duration-100'
                
                // {classNames('px-2 py-1 mt-1 rounded-full text-xs font-semibold h-6  hover:cursor-pointer hover:scale-105 duration-100',{
                //   'bg-green-400': isClick,
                //   'bg-slate-200' : !isClick
                //   })}
                    onClick={() => {handleClick(month.number)}}>
                    {month.name}
                </div>
            )
          })}

                <div className='px-5 py-1 mt-1 rounded-full text-base font-semibold h-8 text-base bg-slate-200 hover:cursor-pointer hover:scale-105 duration-100'
                    onClick={() => handleClick('all')}>
                    <p>все</p>
                </div>

        </div>
    )
}

export default Months