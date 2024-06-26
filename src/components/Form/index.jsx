import Button from "components/Button"
import { useState } from "react"
import './Form.css';
import { format} from "date-fns";

function Form({addItem, categories, arr}){
    
    const [sum, setSum] = useState("")
    const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [category, setCategory] = useState(categories[1].name)
    
    function getItem(event, arr){
        let id = 0
        const length = arr.length   
              
        if(length === 0){
            id = length + 1
        }            
        if(length > 0){
            const idLast = arr[0].id
            id = idLast + 1
        }   

        event.preventDefault()
        const item={
            id,
            sum,
            date,
            category
        }
        addItem(item)
        setSum('')
        setDate(date)
        setCategory(categories[1].name)
    }

    function inputSum(event, sum){
        const value = event.target.value
        setSum(value)
        const coincidence = /^\d*$/.test(value)
        if(!coincidence){
            setSum(sum)
        }
    }
    
    return(
        <div>
            <form className="grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-10 items-end mx-1  mb-10 md:mx-1">
            <div className="flex flex-col">
                <label className="label">Сумма</label>
                <input 
                    onChange={(event)=>inputSum(event, sum)}

                    value={sum}
                    name="sum" 
                    type="text" 
                    className="input"
                />
            </div>
            <div className="flex flex-col">
                <label className="label">Дата</label>
                <input
                    onChange={(event)=>setDate(event.target.value)}
                    value={date}
                    type="date" 
                    name="trip-start" 
                    min="2018-01-01" 
                    max="2030-12-31" 
                    className="input"
                />    
            </div>
            <div className="flex flex-col">
                <label className="label">Категория</label>
                <select
                    onChange={(event)=>setCategory(event.target.value)}
                    value={category} 
                    name="category" 
                    type="text" 
                    className="input">
                        {categories.map(category => (
                            <option key={category.name}>{category.name}</option>
                        ))}
                    </select>
            </div>
            <Button handleClick={getItem} title={"Добавить"} type="submit" arr={arr}/>
            </form>
        </div>  
    )
}

export default Form