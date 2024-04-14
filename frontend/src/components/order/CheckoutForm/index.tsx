import { CustomInput } from '@/components/common/CustomInput'
import { CustomSelect } from '@/components/common/CustomSelect'
import StateCities from '@/data/state_cities.json'
import { useServicePromise } from '@/hooks/useServicePromise'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { saveOrder } from '@/services/orderService'
import type { Order } from '@/types'
import { returnValueFromInputsOrSelects } from '@/utils/returnValueFromInputsOrSelects'
import { type FormEvent } from 'react'
import './CheckoutForm.module.css'

interface Props {
   countryList: { code: string, name: string }[]
}

export function CheckoutForm({ countryList }: Props) {
   const { isLoading, error, response, handlePromise } = useServicePromise<Order>(saveOrder)
   const pizzaList = useShoppingCart((state) => state.pizza)

   const states = StateCities.filter(({countryId}) => countryId === 1).flatMap(({ name }) => name)
   const cities = StateCities.filter(({id}) => id === 3901).flatMap(({ cities }) => cities)
   
   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (event.currentTarget instanceof HTMLFormElement) {
         const { elements } = event.currentTarget
         const location = returnValueFromInputsOrSelects(elements)
         
         const order: Order = {
            idCustomer: 4234,
            country: location[0],
            state: location[1],
            city: location[2],
            street: location[3],
            houseNumber: Number(location[4]),
            apartment: location[5] ? Number(location[5]) : null,
            floor: location[6] ? Number(location[6]) : null,
            pizzaList: pizzaList.map((pizza) => {
               const { id, ...rest } = pizza
               return rest
            })
         }         
         
         handlePromise(order)
      }
   }

   return (
      <form onSubmit={handleSubmit}>
         <p>{response}</p>
         <CustomSelect
            label='Country*'
            required={true}
            values={countryList.map(({ code }) => code)}
            options={countryList.map(({ name }) => name)}
            disable={isLoading}
         />
         <CustomSelect
            label='State*'
            required={true}
            values={states}
            options={states}
            disable={isLoading}
         />
         <CustomSelect
            label='City*'
            required={true}
            values={cities}
            options={cities}
            disable={isLoading}
         />
         <CustomInput 
            label='Street*'
            required={true}
            placeholder='tsets'
            description={error?.street}
            error={Boolean(error?.street)}
            disable={isLoading}
         />
         <CustomInput 
            label='House number*'
            required={true}
            type='number'
            placeholder='tsets'
            description={error?.houseNumber}
            error={Boolean(error?.houseNumber)}
            disable={isLoading}
         />
         <CustomInput 
            label='Apartment'
            type='number'
            placeholder='tsets'
            description={error?.apartment}
            error={Boolean(error?.apartment)}
            disable={isLoading}
         />
         <CustomInput 
            label='Floor'
            type='number'
            placeholder='tsets'
            description={error?.floor}
            error={Boolean(error?.floor)}
            disable={isLoading}
         />
         <button 
            className='primary--button'
            disabled={isLoading}
         >Checkout</button>
      </form>
   )
}
