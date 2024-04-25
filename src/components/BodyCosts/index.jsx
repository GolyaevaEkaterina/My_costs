import './BodyCosts.css';
import Months from 'components/Months';
import CategoriesContainer from 'components/CategoriesContainer'; 
import Form from 'components/Form';
import Item from 'components/Item';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import categoriesCosts from 'categoriesCosts';

const BodyCosts = ({isOpenCosts}) => {
    const arrCosts = JSON.parse(localStorage.getItem('costs'))
    const [costs, setCosts] = useState(arrCosts === null ? [] : arrCosts)
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [groupsCosts, setGroupsCosts] = useState([])
    const [chosenMonth, setChosenMonth] = useState('all')

    function addCost(cost){
        setCosts([cost, ...costs])
    } 

    useEffect(()=>{
        createArrGroupsCosts() 
    }, [costs, categoryFilter, chosenMonth ])

    useEffect(()=>{
        localStorage.setItem('costs', JSON.stringify(costs))
        console.log('apdate costs')
    }, [costs])

    function calculateCosts(category){
        let filteredItems
        let sum = 0
    
        if(category === "all" & chosenMonth === 'all'){
          filteredItems = costs
        }
    
        if(category === "all" & chosenMonth !== 'all'){
          filteredItems = costs.filter( (cost) => {
            const date = new Date (cost.date)
            const month = date.getMonth()
    
            if(category === 'all' & chosenMonth === month){
              return true
            }
        })}
    
        if(category !== "all" & chosenMonth === 'all'){
          filteredItems = costs.filter(cost => cost.category === category)
        }
    
        if(category !== "all" & chosenMonth !== 'all'){
          filteredItems = costs.filter(cost => {
            const date = new Date (cost.date)
            const month = date.getMonth()
    
            if(cost.category === category & chosenMonth === month){
              return true
            }
        })}
        
        filteredItems.map(f => {
          const secondSum = Number(f.sum)
          sum = sum + secondSum
        })
        return sum
    }
    
    function createArrGroupsCosts(){
        const newGroups = [...groupsCosts]
        categoriesCosts.map(c => {
          const sum = calculateCosts(c.name)
          const indx = categoriesCosts.indexOf(c)
          const group = {
            name: c.name,
            value: sum,
          }
          newGroups.splice(indx, 1, group)     
        })
        setGroupsCosts(newGroups)
    }

    const filteredCosts = costs.filter(cost => {
        const date = new Date (cost.date)
        const month = date.getMonth()
    
        if(categoryFilter === 'all' & chosenMonth === 'all'){
          return true
        }
        if(month === chosenMonth & cost.category === categoryFilter){
          return month === chosenMonth & cost.category === categoryFilter
        }
        if(month === chosenMonth & categoryFilter === "all"){
          return month === chosenMonth
        }
        if(chosenMonth === 'all' & cost.category === categoryFilter){
          return cost.category === categoryFilter
        }
    })

    function deleteCost(id){
        const newArr = [...costs]
        costs.map( c => {
          if(c.id === id){
            const indx = costs.indexOf(c)
            newArr.splice(indx,1)
          }
        })
        setCosts(newArr)
    }
    
    return(
        <div className={classNames('rounded-b-lg border-t-0 p-1 md:p-4 container-costs shadow-violet-500 shadow-lg',{
            'hidden': !isOpenCosts
            })}>
            <Months handleClick={setChosenMonth}/>        
            <CategoriesContainer 
              setCategoryFilter={setCategoryFilter} 
              calculateCategory={calculateCosts}
              arr={groupsCosts}
              categories={categoriesCosts}
              all={'allCosts'}
            />      
            <Form addItem={addCost} categories={categoriesCosts} arr={costs}/>
            <div>
                {filteredCosts.length === 0 && (
                  <div className='text-white font-semibold text-lg mb-6'> Нет трат в этой категории </div>
                )}        
              {filteredCosts.length > 0 && filteredCosts.map( (f) => {
                  return(
                    <Item sign={'-'} sum={f.sum} date={f.date} category={f.category} id={f.id} deleteItem={deleteCost}/>
                  )
                })}
            </div>
          </div>
    )
}

export default BodyCosts