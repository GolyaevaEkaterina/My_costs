import "./Header.css";
function Header({handleClick, handleClickCosts}){
    return(
        <div className="flex">
            <div onClick={handleClickCosts} className="grow rounded-t-lg hover:cursor-pointer title-costs"> 
                <h1 className="text-xl md:text-3xl text-white font-bold py-3">Учет расходов</h1>
            </div>
            <div className="w-2 md:w-8"></div>
            <div onClick={handleClick} className="grow rounded-t-lg hover:cursor-pointer title-incomes">
                <h1 className="text-xl md:text-3xl text-white font-bold py-3">Учет доходов</h1>
            </div>
        </div>
        
    

    )
}

export default Header