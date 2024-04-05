import './BodyMain.css';
import Form from 'components/Form';
import Item from 'components/Item';

import CategoriesContainer from 'components/CategoriesContainer'; 
import classNames from 'classnames';
import Months from 'components/Months';


const BodyMain = ({handleClick, setCategoryFilter, calculateCategory, arrForDiagram, categories, all, addItem, arr, filteredItems, sign, deleteItem}) => {


    return(
        <div className='rounded-b-lg border-t-0 p-1 md:p-4 container-costs shadow-violet-500 shadow-lg'>
            <Months handleClick={handleClick}/>        
            <CategoriesContainer 
              setCategoryFilter={setCategoryFilter} 
              calculateCategory={calculateCategory}
              arrForDiagram={arrForDiagram}
              categories={categories}
              all={all}
            />      
            <Form addItem={addItem} categories={categories} arr={arr}/>
            <div>
                {filteredItems.length === 0 && (
                  <div className='text-white font-semibold text-lg mb-6'> Нет трат в этой категории </div>
                )}        
              {filteredItems.length > 0 && filteredItems.map( (f) => {
                  return(
                    <Item sign={sign} sum={f.sum} date={f.date} category={f.category} id={f.id} deleteItem={deleteItem}/>
                  )
                })}
            </div>
          </div>
    )
}

export default BodyMain