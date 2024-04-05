import "./Header.css";
import { Link } from "react-router-dom";

function Header(){
    return(
        <div className="flex">
            <Link to={'/costs'} className="grow rounded-t-lg hover:cursor-pointer title-costs"> 
                <h1 className="text-xl md:text-3xl text-white font-bold py-3">Учет расходов</h1>
            </Link>
            <div className="w-2 md:w-8"></div>
            <Link to={'/incomes'} className="grow rounded-t-lg hover:cursor-pointer title-incomes">
                <h1 className="text-xl md:text-3xl text-white font-bold py-3">Учет доходов</h1>
            </Link>
        </div>
        
    

    )
}

export default Header