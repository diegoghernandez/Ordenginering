import { useEffect, useState, type FormEvent, type ReactElement } from 'react'
import { Quantity } from '../../constants/quantity'
import { Size } from '../../constants/size'
import { useShoppingCart } from '../../hooks/useShoppingCart'
import type { Pizza } from '../../types'
import { pizzaToLocalStorage } from '../../utils/pizzaToLocalStorage'
import { AddPizza } from '../AddPizza'
import { CustomSelect } from '../CustomSelect'
import { IncreaseQuantity } from '../IncreaseQuantity'
import ingredientsCollection from "../../data/ingredients.json"
import pizzaList from "../../data/pizza.json"
import Style from './CustomizePizzaForm.module.css'

interface Props {
   selectedPizza?: string,
   children: ReactElement
}

export function CustomizePizzaForm({ selectedPizza, children }: Props) {
   const getIngredientsFromSelectedPizza = () => {
      return pizzaList
      .filter((pizzaName) => pizzaName.name.toLowerCase().includes(selectedPizza ?? 'no text'))
      .map((pizza) => ({
         imageAuthor: pizza.image.author,
         ingredients: pizza.ingredients.map((element) => element.toLowerCase())
      }))[0]
   }   

   const [characteristics, setCharacteristics] = useState({
      quantity: 1,
      size: Size.SMALL,
      ingredients: getIngredientsFromSelectedPizza()?.ingredients?.length ?? 0
   })
   const [price, setPrice] = useState(0)
   const [selectedIngredients, setSelectedIngredients] = useState('Vegetables')
   const addPizza = useShoppingCart((state) => state.addPizza)

   useEffect(() => {
      const sizePrices = (size: Size) => {
         switch (size) {
            case Size.SMALL:
               return 50
            case Size.MEDIUM:
               return 100
            case Size.LARGE:
               return 150
         
            default:
               return 0;
         }
      }

      let newPrice = 0
      newPrice += characteristics.ingredients * 20
      newPrice += sizePrices(characteristics.size)      
      newPrice = characteristics.quantity * newPrice

      setPrice(newPrice)
   }, [characteristics])
   
   const handleChange = (event: FormEvent<HTMLFormElement>) => {
      const target = event.target

      if (target instanceof HTMLInputElement) {
         if (target.checked) {
            setCharacteristics((prevState) => ({
               ...prevState,
               ingredients: prevState.ingredients + 1
            }))
         } else {
            setCharacteristics((prevState) => ({
               ...prevState,
               ingredients: prevState.ingredients - 1
            }))
         }
      }
      
      if (target instanceof HTMLSelectElement) {
         setCharacteristics((prevState) => ({
            ...prevState,
            size: Object.values(Size)
               .map((key) => Size[key])
               .filter((value) => value === target.value)[0]
         }))
      }
   }
   
   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      event.stopPropagation()      

      const articles = event.currentTarget.getElementsByTagName('article')
      
      const desireArticles: HTMLElement[] = []
      for (const element of articles) {
         const input = element.querySelector('input')
         if (input?.checked) desireArticles.push(element)
      }

      const newPizza: Pizza = {
         name: 'Custom',
         size: characteristics.size,
         ingredients: desireArticles.map((element) => ({ 
            name: element.querySelector('h3')?.innerHTML ?? '', 
            quantity: Object.values(Quantity)
               .map((key) => Quantity[key])
               .filter((value) => value === element.querySelector('select')?.value)[0]
         }))
      }

      for (let i = 0; i < characteristics.quantity; i++) {
         addPizza(newPizza)
         pizzaToLocalStorage(newPizza)
      }      

   }

   return (
      <form className={Style.form} onChange={handleChange} onSubmit={handleSubmit}>
         <div className={Style.form__customize}>
            <figure>
               {children}
               <figcaption>{getIngredientsFromSelectedPizza()?.imageAuthor ?? 'Image by KamranAydinov on Freepik'}</figcaption>
            </figure>
            <p>${price}</p>
            <div>
               <AddPizza />
               <h2>Quantity</h2>
               <IncreaseQuantity setValue={setCharacteristics} />
               <h2>Size</h2>
               <CustomSelect values={Object.values(Size).map((value) => value)} />
            </div>
         </div>
         <div className={Style.select__container}>
				<h2>Ingredients</h2>
            <ul>
               {ingredientsCollection.map((ingredientType, index) => (
                  <li key={ingredientType.id}>
                     <button 
                        type='button'
                        onClick={() => setSelectedIngredients(ingredientsCollection[index].name)}
                     >{ingredientType.name}</button>
                  </li>
               ))}
            </ul>
            <div className={Style.ingredients__container}>
               {ingredientsCollection.map((ingredientList) => (
                  ingredientList.types.map((ingredient) => (
                     <article 
                        key={ingredient.name} 
                        id={(selectedIngredients === ingredientList.name) ? '' : 'no-display'} 
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
                           defaultChecked={getIngredientsFromSelectedPizza()?.ingredients?.includes(ingredient.name.toLowerCase())}
                           type='checkbox' 
                           className={Style.check} 
                        />
                        <label htmlFor={ingredient.name} className='container'>Add</label>
                        <h4>Quantity</h4>
                        <CustomSelect values={Object.values(Quantity).map((value) => value)} selectedValue={0} />
                     </article>
                  )
               )))}
            </div>
			</div>
      </form>
   )
}