import './CategoriesContainer.css';
import Diagram from 'components/Diagram';

function CategoriesContainer({setCategoryFilter, calculateCategory, arrForDiagram, categories}) {
    return(
      <div className='grid md:grid-cols-2 items-center content-center mb-4 md:mb-10'>
          <div>
            <Diagram arr={arrForDiagram} />
          </div>

          <div className='grid grid-cols-2 items-center content-center gap-1 md:gap-3 mb-2 md:pr-10 pt-5 mx-1 md:mx-0'>
            {categories.map((c)=>(
              <div className='category bg-white text-violet-800' onClick={() => setCategoryFilter(c)}>
              <p>{c}</p>
              <p>{calculateCategory(c)} р.</p>
              </div>
            ))}                            
                <div className='category bg-violet-950 text-white' onClick={() => setCategoryFilter('all')}>
                  <p>Итого</p>
                  <p>{calculateCategory("all")} р.</p>
                </div>
          </div>
      </div>
    )
}

export default CategoriesContainer