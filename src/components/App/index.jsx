
import Diagram from 'components/Diagram';
import './App.css';
import Header from 'components/Header';
import Form from 'components/Form';
import Cost from 'components/Cost';
import { useState } from 'react';

function App() {
  const [costs, setCosts] = useState([])

  const [transports, setTransports] = useState([])
  const [products, setProducts] = useState([])
  const [beauty, setBeauty] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [entertainments, setEntertainments] = useState([])

  let [sumTransport, setSumTransport ] = useState(0)
  let [sumProducts, setSumProducts ] = useState(0)
  let [sumBeauty, setSumBeauty ] = useState(0)
  let [sumRestaurants, setSumRestaurants ] = useState(0)
  let [sumEntertainments, setSumEntertainments ] = useState(0)

  let [sumAll, setSumAll] = useState(0)


  function addCost(cost ){
    setCosts([...costs, cost])
    console.log(costs)
  } 

  function calculateSumAll(cost){
    sumAll = 0
    costs.map(cost => {
      const secondSum = Number(cost.sum)
       sumAll = sumAll + secondSum
    })
    setSumAll(sumAll)
  }
  
  function filterByTransport(cost){
    sumTransport = 0
    const filteredByTransport = costs.filter(cost => cost.category === "Транспорт")
    setTransports(filteredByTransport)
    
    transports.map(transport => {
      const secondSum = Number(transport.sum)
       sumTransport = sumTransport + secondSum
    })
    setSumTransport(sumTransport)
    
  } 

  function filterByProducts(cost){
    sumProducts = 0
    const filteredByProducts = costs.filter(cost => cost.category === "Продукты")
    setProducts(filteredByProducts)
    
    products.map(product => {
      const secondSum = Number(product.sum)
       sumProducts = sumProducts + secondSum
    })
    setSumProducts(sumProducts)
  }

  function filterByBeauty(cost){
    sumBeauty = 0
    const filteredByBeauty = costs.filter(cost => cost.category === "Красота")
    setBeauty(filteredByBeauty)
    
    beauty.map(b => {
      const secondSum = Number(b.sum)
       sumBeauty = sumBeauty + secondSum
    })
    setSumBeauty(sumBeauty)
  }

  function filterByRestaurants(cost){
    sumRestaurants = 0
    const filteredByRestaurants = costs.filter(cost => cost.category === "Рестораны")
    setRestaurants(filteredByRestaurants)
    
    restaurants.map(r => {
      const secondSum = Number(r.sum)
       sumRestaurants = sumRestaurants + secondSum
    })
    setSumRestaurants(sumRestaurants)
  }

  function filterByEntertainments(cost){
    sumEntertainments = 0
    const filteredByEntertainments = costs.filter(cost => cost.category === "Развлечения")
    setEntertainments(filteredByEntertainments)
    
    entertainments.map(e => {
      const secondSum = Number(e.sum)
       sumEntertainments = sumEntertainments + secondSum
    })
    setSumEntertainments(sumEntertainments)
  }

  return (
    <div className="App">
      <Header />
      <Diagram />
      <div className='grid grid-cols-2 md:grid-cols-5 gap-5 mb-20 mx-10 md:mx-0'>                             
             <div className='category bg-red-300'>
              <p>Транспорт</p>
              <p>{sumTransport} р.</p>
             </div>
             <div className='category bg-lime-300'>
              <p>Продукты</p>
              <p>{sumProducts} р.</p>
             </div>
             <div className='category bg-cyan-300'>
              <p>Красота</p>
              <p>{sumBeauty} р.</p>
             </div>
             <div className='category bg-amber-300'>
              <p>Рестораны</p>
              <p>{sumRestaurants} р.</p>
             </div>
             <div className='category bg-violet-300'>
              <p>Развлечения</p>
              <p>{sumEntertainments} р.</p>
             </div>
             <div className='category bg-black-300'>
              <p>Итого</p>
              <p>{sumAll} р.</p>
             </div>
      </div>
      <Form 
          addCost={addCost} 
          calculateSumAll={calculateSumAll}
          filterByTransport={filterByTransport} 
          filterByProducts={filterByProducts}
          filterByBeauty={filterByBeauty}
          filterByRestaurants={filterByRestaurants}
          filterByEntertainments={filterByEntertainments}
      />
      <div>        
          {costs.map(cost => {
            return(
             <div className='grid grid-cols-3 gap-5 px-6 py-3 mt-6 border-2 rounded-lg bg-green-300 text-lg font-semibold'>
              <p>{cost.sum} р.</p>
              <p>{cost.date}</p>
              <p>{cost.category}</p>
             </div>
            )
          })}
      </div>
      <Cost />
    </div>
  );
}

export default App;
