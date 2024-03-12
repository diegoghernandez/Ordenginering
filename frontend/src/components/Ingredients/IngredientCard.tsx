import { Quantity } from '../../constants/quantity'
import { CustomSelect } from '../CustomSelect'
import Styles from './Ingredients.module.css'

interface Props {
   isType: boolean,
   ingredient: {
      name: string,
      img: string,
      author: string
   },
   isUsed: boolean
}

export function IngredientCard({ isType, ingredient, isUsed } : Props) {   
   return (
      <article
         hidden={isType}
         id={(isType) ? '' : 'no-display'} 
         className='container'>
         <figure>
            <img 
               src={`/images/${ingredient.img}.jpg`}
               alt={ingredient.name}
               width='130'
               height='80'
               loading='lazy'
               decoding='async'
            />
            <figcaption>{ingredient.author}</figcaption>
         </figure>
         <h3>{ingredient.name}</h3>
         <input 
            id={ingredient.name} 
            defaultChecked={isUsed}
            type='checkbox' 
            className={Styles.check} 
         />
         <label htmlFor={ingredient.name} className='container'>Add</label>
         <h4>Quantity</h4>
         <CustomSelect values={Object.values(Quantity).map((value) => value)} selectedValue={0} />
      </article>
   )
}
