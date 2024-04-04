import './App.css';
import Header from 'components/Header';
import Form from 'components/Form';
import Item from 'components/Item';
import categories from 'categories';
import { useEffect, useState } from 'react';
import CategoriesContainer from 'components/CategoriesContainer'; 
import classNames from 'classnames';
import Months from 'components/Months';
import categoriesIncomes from 'categoriesIncomes';

function App() {
  const arrCosts = JSON.parse(localStorage.getItem('costs'))
  const arrIncomes = JSON.parse(localStorage.getItem('incomes'))

  const [costs, setCosts] = useState(arrCosts === null ? [] : arrCosts)
  const [incomes, setIncomes] = useState(arrIncomes === null ? [] : arrIncomes)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [groupsCosts, setGroupsCosts] = useState([])
  const [groupsIncomes, setGroupsIncomes] = useState([])
  const [chosenMonth, setChosenMonth] = useState('all')

  function addCost(cost){
    setCosts([cost, ...costs])
  } 
  function addIncome(income){
    setIncomes([income, ...incomes])
    console.log(incomes)
  } 
  useEffect(()=>{
    console.log('mount')
  }, [])

  useEffect(()=>{
    createArrGroupsCosts() 
    createArrGroupsIncomes()
  }, [costs, incomes, categoryFilter, chosenMonth ])

  useEffect(()=>{
    localStorage.setItem('incomes', JSON.stringify(incomes))
  }, [incomes])

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
      })
    }
    
    filteredItems.map(f => {
      const secondSum = Number(f.sum)
      sum = sum + secondSum
    })
    return sum
  }  
  
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
      })
    }
    
    filteredItems.map(f => {
      const secondSum = Number(f.sum)
      sum = sum + secondSum      
    })
    return sum
  }  
  
  function createArrGroupsCosts(){
    const newGroups = [...groupsCosts]
    categories.map(c => {
      const sum = calculateCosts(c)
      const indx = categories.indexOf(c)
      const group = {
        name: c,
        value: sum,
      }
      newGroups.splice(indx, 1, group)     
    })
    setGroupsCosts(newGroups)
  }

  function createArrGroupsIncomes(){
    const newGroups = [...groupsIncomes]
    categoriesIncomes.map(c => {
      const sum = calculateIncomes(c)
      const indx = categoriesIncomes.indexOf(c)
      const group = {
        name: c,
        value: sum,
      }
      newGroups.splice(indx, 1, group)     
    })
    setGroupsIncomes(newGroups)
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

  return (
    <div className='background min-h-screen'>
      <div className="App">
      <Header handleClick={()=>openIncomes()} handleClickCosts={()=>openCosts()}/>
      <div className={classNames('rounded-b-lg border-t-0 p-1 md:p-4 container-costs shadow-violet-500 shadow-lg',{
        'hidden': !isOpenCosts
        })}>
        <Months handleClick={setChosenMonth}/>        
        <CategoriesContainer 
          setCategoryFilter={setCategoryFilter} 
          calculateCategory={calculateCosts}
          arr={groupsCosts}
          categories={categories}
          all={'allCosts'}
        />      
        <Form addItem={addCost} categories={categories} arr={costs}/>
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
      </div>
    </div>
  );
}

export default App;
