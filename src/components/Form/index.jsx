import Button from "components/Button"
import { useState } from "react"
const categories = ['Продукты', 'Транспорт', 'Красота', 'Рестораны', 'Развлечения']
function Form({addCost, filterByTransport, filterByProducts, filterByBeauty, filterByRestaurants, filterByEntertainments, calculateSumAll}){
    const [sum, setSum] = useState(" ")
    const [date, setDate] = useState("0000-00-00")
    const [category, setCategory] = useState(categories[1])
    
    function getCost(event){
        event.preventDefault()
        const cost={
            sum,
            date,
            category
        }
        calculateSumAll(cost)
        filterByTransport(cost)
        filterByProducts(cost)
        filterByBeauty(cost)
        filterByRestaurants(cost)
        filterByEntertainments(cost)
        addCost(cost)
        setSum('')
        setDate('')
        setCategory(categories[1])
    }

    
    return(
        <div>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-10 items-end mx-16 mb-10 md:mx-0">
            <div className="flex flex-col">
                <label>Сумма</label>
                <input 
                    onChange={(event)=>setSum(event.target.value)}
                    value={sum}
                    name="sum" 
                    type="number" 
                    className="h-10 border-2 rounded-lg border-green-600"
                />
            </div>
            <div className="flex flex-col">
                <label>Дата</label>
                <input
                    onChange={(event)=>setDate(event.target.value)}
                    value={date} 
                    type="date" 
                    name="trip-start" 
                    min="2018-01-01" 
                    max="2030-12-31" 
                    className="h-10 border-2 rounded-lg border-green-600"
                />    
            </div>
            <div className="flex flex-col">
                <label>Категория</label>
                <select
                    onChange={(event)=>setCategory(event.target.value)}
                    value={category} 
                    name="category" 
                    type="text" 
                    className="h-10 border-2 rounded-lg border-green-600">
                        {categories.map(category => (
                            <option key={category}>{category}</option>
                        ))}
                    </select>
            </div>
            <Button handleClick={getCost} title={"Добавить"} type="submit"/>
            </form>
        </div>  
    )
}

export default Form