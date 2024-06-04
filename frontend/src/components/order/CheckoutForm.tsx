import { CustomInput } from '@/components/common/CustomInput'
import { CustomSelect } from '@/components/common/CustomSelect'
import { FormContainer } from '@/components/common/FormContainer'
import StateCities from '@/data/state_cities.json'
import { useServicePromise } from '@/hooks/useServicePromise'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { saveOrder } from '@/services/orderService'
import type { OrderRequest } from '@/types'

interface Props {
   countryList: { code: string, name: string }[]
}

export function CheckoutForm({ countryList }: Props) {
   const { isLoading, error, response, handlePromise } = useServicePromise<OrderRequest>(saveOrder)
   const pizzaList = useShoppingCart((state) => state.pizza)

   const states = StateCities.filter(({countryId}) => countryId === 1).flatMap(({ name }) => name)
   const cities = StateCities.filter(({id}) => id === 3901).flatMap(({ cities }) => cities)
   
   const handleData = (formValues: string[]) => {
      const order: OrderRequest = {
         idCustomer: Number(localStorage.getItem('id')) ?? '0',
         country: formValues[0],
         state: formValues[1],
         city: formValues[2],
         street: formValues[3],
         houseNumber: Number(formValues[4]),
         apartment: formValues[5] ? Number(formValues[5]) : null,
         floor: formValues[6] ? Number(formValues[6]) : null,
         pizzaList: pizzaList.map((pizza) => {
            const { idPizza, ...rest } = pizza
            return rest
         })
      }
      
      handlePromise(order)
   }

   return (
      <FormContainer
         handleData={handleData}
         response={response}
         submitButton={{
            label: 'Checkout',
            isLoading: isLoading
         }}
      >
         <CustomSelect
            label='Country*'
            required={true}
            values={countryList.map(({ code }) => code)}
            options={countryList.map(({ name }) => name)}
            defaultValue={{
               value: '',
               text: '--Please choose an option--'
            }}
            disable={isLoading}
         />
         <CustomSelect
            label='State*'
            required={true}
            values={states}
            options={states}
            defaultValue={{
               value: '',
               text: '--Please choose an option--'
            }}
            disable={isLoading}
         />
         <CustomSelect
            label='City*'
            required={true}
            values={cities}
            options={cities}
            defaultValue={{
               value: '',
               text: '--Please choose an option--'
            }}
            disable={isLoading}
         />
         <CustomInput 
            label='Street*'
            required={true}
            placeholder='Alameda'
            error={error?.street}
            disable={isLoading}
         />
         <CustomInput 
            label='House number*'
            required={true}
            type='number'
            placeholder='867'
            error={error?.houseNumber}
            disable={isLoading}
         />
         <CustomInput 
            label='Apartment'
            type='number'
            placeholder='321'
            error={error?.apartment}
            disable={isLoading}
         />
         <CustomInput 
            label='Floor'
            type='number'
            placeholder='2'
            error={error?.floor}
            disable={isLoading}
         />
      </FormContainer>
   )
}