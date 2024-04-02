import { useEffect, useState, type FormEvent, type ReactElement } from 'react'
import { Quantity } from '@/constants/quantity'
import { Size } from '@/constants/size'
import pizzaList from '@/data/pizza.json'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { AddPizza } from '@/components/AddPizza'
import { CustomSelect } from '@/components/CustomSelect'
import { SelectQuantity } from '@/components/SelectQuantity'
import { IngredientsContainer } from '@/components/Ingredients/IngredientsContainer'
import Style from './CustomizePizzaForm.module.css'
import type { IngredientRequest } from '@/types'
import { getPizzaPrice } from '@/utils/getPizzaPrice'

interface Props {
   ingredients: IngredientRequest[]
   selectedPizza?: string,
   children: ReactElement
}

export function CustomizePizzaForm({ ingredients, selectedPizza, children }: Props) {
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
   const addPizza = useShoppingCart((state) => state.addPizza)

   useEffect(() => {
      setPrice(getPizzaPrice(characteristics.ingredients, characteristics.size, characteristics.quantity))
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
         pizzaName: `Custom ${selectedPizza}`,
         image: '',
         size: characteristics.size,
         ingredientNameDtoList: desireArticles.map((element) => ({ 
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
               <figcaption>{getIngredientsFromSelectedPizza()?.imageAuthor}</figcaption>
            </figure>
            <p>${price}</p>
            <div>
               <AddPizza />
               <h2>Quantity</h2>
               <SelectQuantity setValue={setCharacteristics} />
               <h2>Size</h2>
               <CustomSelect values={Object.values(Size).map((value) => value)} />
            </div>
         </div>
         <IngredientsContainer ingredients={ingredients} preSelectedIngredients={getIngredientsFromSelectedPizza()?.ingredients} />
      </form>
   )
}