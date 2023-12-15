import { useEffect, useId, useState, type FormEvent, type ReactElement } from 'react'
import { Quantity } from '../../constants/quantity'
import { Size } from '../../constants/size'
import type { Pizza } from '../../types'
import { AddPizza } from '../AddPizza'
import { IncreaseQuantity } from '../IncreaseQuantity'
import { useShoppingCart } from '../../hooks/useShoppingCart'
import { pizzaToLocalStorage } from '../../utils/pizzaToLocalStorage'
import { CustomSelect } from '../CustomSelect'
import Style from './customizeForm.module.css'

interface Props {
   children: ReactElement,
}

export function FormWrapper({ children }: Props) {
   const [characteristics, setCharacteristics] = useState({
      quantity: 1,
      size: Size.SMALL,
      ingredients: 0
   })
   const [price, setPrice] = useState(0)
   const ingredientId = useId()
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
            name: element.querySelector('h3')?.innerText ?? '', 
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
      <form onChange={handleChange} onSubmit={handleSubmit}>
         <div>
            {children}
            <p>${price}</p>
            <div slot="pizza-characteristics">
				<AddPizza />
				<h2>Quantity</h2>
				<IncreaseQuantity setValue={setCharacteristics} />
				<h2>Size</h2>
				<CustomSelect values={Object.values(Size).map((value) => value)} />
			</div>
         </div>
         <div>
				<h2>Ingredients</h2>
				<article className={`${Style.article} container`}>
					<img 
						src='https://static.phdvasia.com/br/menu/single/desktop_thumbnail_1b3ba745-698b-4866-aa54-c551cbcff003.jpg' 
						alt=''
					/>
					<h3>Pepperoni</h3>
					<input type='checkbox' className={Style.check} id={ingredientId} />
					<label htmlFor={ingredientId} className='container'>Add</label>
					<h4>Quantity</h4>
               <CustomSelect values={Object.values(Quantity).map((value) => value)} />
				</article>
			</div>
      </form>
   )
}