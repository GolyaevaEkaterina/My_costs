import months from "months";
// import classNames from 'classnames';

function Months({handleClick}){
    // const[isClick, setIsClick] = useState(false)
    return(
        <div className='grid grid-cols-6 md:grid-cols-12 gap-x-1 gap-y-2 md:mb-6'>
          {months.map(month => {
            return(            
                <div className='py-1 mt-1 rounded-full text-xs text-violet-950 font-semibold h-6 bg-white hover:cursor-pointer hover:scale-105 duration-100'
                
                // {classNames('px-2 py-1 mt-1 rounded-full text-xs font-semibold h-6  hover:cursor-pointer hover:scale-105 duration-100',{
                //   'bg-green-400': isClick,
                //   'bg-slate-200' : !isClick
                //   })}
                    onClick={() => {handleClick(month.number)}}>
                    {month.name}
                </div>
            )
          })}

                <div className='px-1 py-1 mt-1 rounded-full text-base text-violet-950 font-semibold h-8 text-base bg-white hover:cursor-pointer hover:scale-105 duration-100'
                    onClick={() => handleClick('all')}>
                    <p>все</p>
                </div>

        </div>
    )
}

export default Months