import { CustomInput } from '@/components/common/CustomInput'
import { CustomSelect } from '@/components/common/CustomSelect'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { saveOrder } from '@/services/orderService'
import type { Order } from '@/types'
import type { FormEvent } from 'react'
import StateCities from '@/data/state_cities.json'
import './CheckoutForm.module.css'

interface Props {
   countryList: { code: string, name: string }[]
}

export function CheckoutForm({ countryList }: Props) {
   const pizzaList = useShoppingCart((state) => state.pizza)

   const states = StateCities.filter(({countryId}) => countryId === 1).flatMap(({ name }) => name)
   const cities = StateCities.filter(({id}) => id === 3901).flatMap(({ cities }) => cities)
   
   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (event.currentTarget instanceof HTMLFormElement) {
         const { elements } = event.currentTarget
         const location: string[] = []
         
         for (const element of elements) {
            if (element instanceof HTMLInputElement && element.value) {
               location.push(element.value)
            }
         }
         
         const order: Order = {
            idCustomer: 4234,
            country: location[0],
            city: location[1],
            street: location[2],
            houseNumber: Number(location[3]),
            apartment: location[4] ? Number(location[4]) : null,
            floor: location[5] ? Number(location[5]) : null,
            pizzaList: pizzaList.map((pizza) => {
               const { id, ...rest } = pizza
               return rest
            })
         }
         
         saveOrder(order)
            .then((result) => {
               console.log('Yessssss');
               
            })
      }
   }

   return (
      <form onSubmit={handleSubmit}>
         <CustomSelect
            label='Country*'
            required={true}
            values={countryList.map(({ code }) => code)}
            options={countryList.map(({ name }) => name)}
         />
         <CustomSelect
            label='State*'
            required={true}
            values={states}
            options={states}
         />
         <CustomSelect
            label='City*'
            required={true}
            values={cities}
            options={cities}
         />
         <CustomInput 
            label='Street*'
            required={true}
            placeholder='tsets'
         />
         <CustomInput 
            label='House number*'
            required={true}
            type='number'
            placeholder='tsets'
         />
         <CustomInput 
            label='Apartment'
            type='number'
            placeholder='tsets'
         />
         <CustomInput 
            label='Floor'
            type='number'
            placeholder='tsets'
         />
         <button className='primary--button'>Checkout</button>
      </form>
   )
}
