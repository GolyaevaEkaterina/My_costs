
import Diagram from 'components/Diagram';
import './App.css';
import Header from 'components/Header';
import Form from 'components/Form';
import Cost from 'components/Cost';
import categories from 'categories';
import { useEffect, useState } from 'react';

function App() {
  const [costs, setCosts] = useState([])
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [groups, setGroups] = useState([])

  function addCost(cost ){
    setCosts([cost, ...costs])
    console.log(costs)
  } 

  useEffect(()=>{
    createArrGroups()
 
  }, [costs])

  function calculateCategory(category){
    let filteredCosts
    let sum = 0
    if(category === "all"){
      filteredCosts = costs
    }else{
      filteredCosts = costs.filter(cost => cost.category === category)
    }
    
    filteredCosts.map(f => {
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

  const filteredItems = costs.filter(cost => {
    if(categoryFilter === 'all'){
      return true
    }
    return cost.category === categoryFilter
  })

  return (
    <div className="App">
      <Header />
      <Diagram arr={groups}/>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-5 mb-20 mx-10 md:mx-0'>
        {categories.map((c)=>(
          <div className='category bg-violet-300' onClick={() => setCategoryFilter(c)}>
          <p>{c}</p>
          <p>{calculateCategory(c)} р.</p>
          </div>
        ))}                            
             <div className='category bg-black-300' onClick={() => setCategoryFilter('all')}>
              <p>Итого</p>
              <p>{calculateCategory("all")} р.</p>
             </div>
      </div>
      
      <Form 
          addCost={addCost} 
      />
      <div>        
          {filteredItems.map(f => {
            return(
             <div className='grid grid-cols-3 gap-5 px-6 py-3 mt-6 border-2 rounded-lg bg-green-300 text-lg font-semibold'>
              <p>{f.sum} р.</p>
              <p>{f.date}</p>
              <p>{f.category}</p>
             </div>
            )
          })}
      </div>
      <Cost />
    </div>
  );
}

export default App;
