
import Diagram from 'components/Diagram';
import './App.css';
import Header from 'components/Header';
import Form from 'components/Form';
import Cost from 'components/Cost';
import categories from 'categories';
import months from 'months';
import { useEffect, useState } from 'react';
import CategoriesContainer from 'components/CategoriesContainer'; 
import { format, compareAsc } from "date-fns";
import classNames from 'classnames';
import Months from 'components/Months';
import categoriesIncomes from 'categoriesIncomes';

function App() {
  const [costs, setCosts] = useState([])
  // const [incomes, setIncomes] = useState([])
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [groups, setGroups] = useState([])
  const [chosenMonth, setChosenMonth] = useState('all')

  function addCost(cost){
    setCosts([cost, ...costs])
  } 
  // function addIncome(income){
  //   setIncomes([income, ...incomes])
  //   console.log(incomes)
  // } 

  useEffect(()=>{
    createArrGroups() 
  }, [costs, categoryFilter, chosenMonth ])

  function calculateCategory(category){
    let filteredItems
    let sum = 0

    if(category === "all" & chosenMonth === 'all'){
      filteredItems = costs
    }

    if(category === "all" & chosenMonth != 'all'){
      filteredItems = costs.filter(cost => {
        const date = new Date (cost.date)
        const month = date.getMonth()

        if(category === 'all' & chosenMonth === month){
          return true
        }
      })}

    if(category != "all" & chosenMonth === 'all'){
      filteredItems = costs.filter(cost => cost.category === category)
    }

    if(category != "all" & chosenMonth != 'all'){
      filteredItems = costs.filter(cost => {
        const date = new Date (cost.date)
        const month = date.getMonth()

        if(cost.category === category & chosenMonth === month){
          return true
        }
      })
    }
    
    filteredItems.map(f => {
      const secondSum = Number(f.sum)
      sum = sum + secondSum
    })
    return sum
  }  

  function createArrGroups(){
    const newGroups = [...groups]
    categories.map(c => {
      const sum = calculateCategory(c)
      const indx = categories.indexOf(c)
      const group = {
        name: c,
        value: sum,
      }
      newGroups.splice(indx, 1, group)     
    })
    console.log(newGroups)
    setGroups(newGroups)
  }
  
  const[isOpenIncomes, setIsOpenIncomes] = useState(false)
  const[isOpenCosts, setIsOpenCosts] = useState(true)
  

  function openIncomes(){
    setIsOpenIncomes(!isOpenIncomes)
    setIsOpenCosts(!isOpenCosts)
  }
  function openCosts(){
    setIsOpenCosts(!isOpenCosts)
    setIsOpenIncomes(!isOpenIncomes)
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

  // const filteredIncomes = incomes.filter(income => {
  //   const date = new Date (income.date)
  //   const month = date.getMonth()

  //   if(categoryFilter === 'all' & chosenMonth === 'all'){
  //     return true
  //   }
  //   if(month === chosenMonth & income.category === categoryFilter){
  //     return month === chosenMonth & income.category === categoryFilter
  //   }
  //   if(month === chosenMonth & categoryFilter === "all"){
  //     return month === chosenMonth
  //   }
  //   if(chosenMonth === 'all' & income.category === categoryFilter){
  //     return income.category === categoryFilter
  //   }
  // })

  return (
    <div className="App">
      <Header handleClick={()=>openIncomes()} handleClickCosts={()=>openCosts()}/>
      <div className={classNames('rounded-b-lg border-2 border-t-0 p-4 bg-cyan-50',{
        'hidden': !isOpenCosts
        })}>
        <Months handleClick={setChosenMonth}/>        
        <CategoriesContainer 
          setCategoryFilter={setCategoryFilter} 
          calculateCategory={calculateCategory}
          arr={groups}
          categories={categories}
        />      
        <Form addItem={addCost} categories={categories}/>
        <div>        
            {filteredCosts.map(f => {
              return(
                <Cost sum={f.sum} date={f.date} category={f.category}/>
              )
            })}
        </div>
      </div>
      
      <div className={classNames('rounded-b-lg border-2 border-t-0 p-4 bg-lime-50',{
        'hidden': !isOpenIncomes
        })}>
        {/* <Months handleClick={setChosenMonth}/>        
        <CategoriesContainer 
          setCategoryFilter={setCategoryFilter} 
          calculateCategory={calculateCategory}
          arr={groups}
          categories={categoriesIncomes}
        />      
        <Form addItem={addIncome} categories={categoriesIncomes}/>
        <div>        
            {filteredIncomes.map(f => {
              return(
                <Cost sum={f.sum} date={f.date} category={f.category}/>
              )
            })}
        </div> */}
      

      </div>
    </div>
  );
}

export default App;
