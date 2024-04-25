import './BodyIncomes.css';
import Form from 'components/Form';
import Item from 'components/Item';
import { useEffect, useState } from 'react';
import CategoriesContainer from 'components/CategoriesContainer'; 
import classNames from 'classnames';
import Months from 'components/Months';
import categoriesIncomes from 'categoriesIncomes';

const BodyIncomes = ({isOpenIncomes}) => {

    const arrIncomes = JSON.parse(localStorage.getItem('incomes'))
    const [incomes, setIncomes] = useState(arrIncomes === null ? [] : arrIncomes)
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [chosenMonth, setChosenMonth] = useState('all')
    const [groupsIncomes, setGroupsIncomes] = useState([])

    function addIncome(income){
        setIncomes([income, ...incomes])
    } 
    
    useEffect(()=>{
        createArrGroupsIncomes()
    }, [incomes, categoryFilter, chosenMonth ])
    
    useEffect(()=>{
        localStorage.setItem('incomes', JSON.stringify(incomes))
    }, [incomes])
    
      
    function calculateIncomes(category){
        let filteredItems
        let sum = 0
    
        if(category === "all" & chosenMonth === 'all'){
          filteredItems = incomes
        }
    
        if(category === "all" & chosenMonth !== 'all'){
          filteredItems = incomes.filter(income => {
            const date = new Date (income.date)
            const month = date.getMonth()
    
            if(category === 'all' & chosenMonth === month){
              return true
            }
        })}
    
        if(category !== "all" & chosenMonth === 'all'){
          filteredItems = incomes.filter(income => income.category === category)
        }
    
        if(category !== "all" & chosenMonth !== 'all'){
          filteredItems = incomes.filter(income => {
            const date = new Date (income.date)
            const month = date.getMonth()
    
            if(income.category === category & chosenMonth === month){
              return true
            }
        })}
        
        filteredItems.map(f => {
          const secondSum = Number(f.sum)
          sum = sum + secondSum      
        })
        return sum
    }  
    
    function createArrGroupsIncomes(){
        const newGroups = [...groupsIncomes]
        categoriesIncomes.map(c => {
          const sum = calculateIncomes(c.name)
          const indx = categoriesIncomes.indexOf(c)
          const group = {
            name: c.name,
            value: sum,
          }
          newGroups.splice(indx, 1, group)     
        })
        setGroupsIncomes(newGroups)
    }

    const filteredIncomes = incomes.filter(income => {
        const date = new Date (income.date)
        const month = date.getMonth()
    
        if(categoryFilter === 'all' & chosenMonth === 'all'){
          return true
        }
        if(month === chosenMonth & income.category === categoryFilter){
          return month === chosenMonth & income.category === categoryFilter
        }
        if(month === chosenMonth & categoryFilter === "all"){
          return month === chosenMonth
        }
        if(chosenMonth === 'all' & income.category === categoryFilter){
          return income.category === categoryFilter
        }
    })
    
    function deleteIncome(id){
        const newArr = [...incomes]
        incomes.map( i => {
          if(i.id === id){
            const indx = incomes.indexOf(i)
            newArr.splice(indx,1)
          }
        })
        setIncomes(newArr)
    }
    
    return(
        <div className={classNames('rounded-b-lg border-t-0 p-1 md:p-4 container-incomes shadow-blue-500 shadow-lg',{
            'hidden': !isOpenIncomes
            })}>
            <Months handleClick={setChosenMonth}/>        
            <CategoriesContainer 
              setCategoryFilter={setCategoryFilter} 
              calculateCategory={calculateIncomes}
              arr={groupsIncomes}
              categories={categoriesIncomes}
              all={'allIncomes'}
            />      
            <Form addItem={addIncome} categories={categoriesIncomes} arr={incomes}/>
            <div>
                {filteredIncomes.length === 0 && (
                  <div className='text-white font-semibold text-lg mb-6'> Нет доходов в этой категории </div>
                )}        
                {filteredIncomes.length > 0 && filteredIncomes.map(f => {
                  return(                
                    <Item sign={'+'} sum={f.sum} date={f.date} category={f.category} id={f.id} deleteItem={deleteIncome}/>
                  )
                })}
            </div>              
        </div>
    )
}

export default BodyIncomes