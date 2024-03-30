import categories from 'categories';
import './CategoriesContainer.css';
import Diagram from 'components/Diagram';

function CategoriesContainer({setCategoryFilter, calculateCategory, arr, categories}) {
    return(
      <div className='grid md:grid-cols-2 items-center content-center mb-10'>
          <div>
            <Diagram arr={arr}/>
          </div>

          <div className='grid grid-cols-1 items-center content-center md:grid-cols-2 gap-3 mb-2 pr-10 pt-5 mx-2 md:mx-0'>
            {categories.map((c)=>(
              <div className='category bg-violet-300' onClick={() => setCategoryFilter(c)}>
              <p>{c}</p>
              <p>{calculateCategory(c)} р.</p>
              </div>
            ))}                            
                <div className='category bg-white border-2' onClick={() => setCategoryFilter('all')}>
                  <p>Итого</p>
                  <p>{calculateCategory("all")} р.</p>
                </div>
          </div>
      </div>
    )
}

export default CategoriesContainer