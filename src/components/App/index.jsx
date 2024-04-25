import './App.css';
import BodyCosts from 'components/BodyCosts';
import BodyIncomes from 'components/BodyIncomes';
import Header from 'components/Header';
import { useEffect, useState } from 'react';

function App() {
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

  return (
    <div className='background min-h-screen'>
      <div className="App">

      <Header handleClick={()=>openIncomes()} handleClickCosts={()=>openCosts()}/>

      <BodyCosts isOpenCosts={isOpenCosts}/>
      <BodyIncomes isOpenIncomes={isOpenIncomes}/>
      
      </div>
    </div>
  );
}

export default App;
