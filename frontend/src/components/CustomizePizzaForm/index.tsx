import { useEffect, useState, type FormEvent, type ReactElement } from 'react'
import { Quantity } from '../../constants/quantity'
import { Size } from '../../constants/size'
import ingredientsCollection from "../../data/ingredients.json"
import pizzaList from "../../data/pizza.json"
import { useShoppingCart } from '../../hooks/useShoppingCart'
import { AddPizza } from '../AddPizza'
import { CustomSelect } from '../CustomSelect'
import { IncreaseQuantity } from '../IncreaseQuantity'
import { IngredientCard } from './IngredientCard'
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
      size: Size.MEDIUM,
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

      const newPizza = {
         name: `Custom ${selectedPizza}`,
         size: characteristics.size,
         ingredients: desireArticles.map((element) => ({ 
            name: element.querySelector('h3')?.innerHTML ?? '', 
            quantity: Object.values(Quantity)
               .map((key) => Quantity[key])
               .filter((value) => value === element.querySelector('select')?.value)[0]
         })),
         quantity: characteristics.quantity
      }
      addPizza(newPizza)
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
                     <IngredientCard 
                        key={ingredient.name}
                        isType={selectedIngredients === ingredientList.name} 
                        ingredient={ingredient}
                        isUsed={getIngredientsFromSelectedPizza()?.ingredients?.includes(ingredient.name.toLowerCase())}
                     />
                  ))
               ))}
            </div>
			</div>
      </form>
   )
}