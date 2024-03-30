function Header({handleClick, handleClickCosts}){
    return(
        <div className="flex">
            <div onClick={handleClickCosts} className="grow rounded-t-lg border-2 bg-cyan-50 hover:cursor-pointer"> 
                <h1 className="text-3xl font-bold py-3">Учет расходов</h1>
            </div>
            <div className="w-8 border-b-2"></div>
            <div onClick={handleClick} className="grow rounded-t-lg border-2 bg-lime-50 hover:cursor-pointer">
                <h1 className="text-3xl font-bold py-3">Учет доходов</h1>
            </div>
        </div>
        
    

    )
}

export default Header