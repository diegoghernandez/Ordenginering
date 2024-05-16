import { CustomInput } from '@/components/common/CustomInput'
import { CustomSelect } from '@/components/common/CustomSelect'
import { FormContainer } from '@/components/common/FormContainer'
import { useServicePromise } from '@/hooks/useServicePromise'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { saveOrder } from '@/services/orderService'
import type { Order } from '@/types'
import StateCities from '@/data/state_cities.json'

interface Props {
   countryList: { code: string, name: string }[]
}

export function CheckoutForm({ countryList }: Props) {
   const { isLoading, error, response, handlePromise } = useServicePromise<Order>(saveOrder)
   const pizzaList = useShoppingCart((state) => state.pizza)

   const states = StateCities.filter(({countryId}) => countryId === 1).flatMap(({ name }) => name)
   const cities = StateCities.filter(({id}) => id === 3901).flatMap(({ cities }) => cities)
   
   const handleData = (formValues: string[]) => {
      const order: Order = {
         idCustomer: 4234,
         country: formValues[0],
         state: formValues[1],
         city: formValues[2],
         street: formValues[3],
         houseNumber: Number(formValues[4]),
         apartment: formValues[5] ? Number(formValues[5]) : null,
         floor: formValues[6] ? Number(formValues[6]) : null,
         pizzaList: pizzaList.map((pizza) => {
            const { id, ...rest } = pizza
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




/* const inputsSelects: {
   id: `${string}-${string}-${string}-${string}-${string}`;
   type: 'input' | 'select';
   parameters: SelectProps | InputProps;
}[] = [{
   id: crypto.randomUUID(),
   type: 'select',
   parameters: {
      label: 'Country*',
      required: true,
      values: countryList.map(({ code }) => code),
      options: countryList.map(({ name }) => name)
   }       
}, {
   id: crypto.randomUUID(),
   type: 'select',
   parameters: {
      label: 'State*',
      required: true,
      values: states,
      options: states
   }
}, {
   id: crypto.randomUUID(),
   type: 'select',
   parameters: {
      label: 'City*',
      required: true,
      values: cities,
      options: cities
   }
}, {
   id: crypto.randomUUID(),
   type: 'input',
   parameters: {
      label: 'Street*',
      required: true,
      placeholder: 'Alameda',
      error: 'street'
   }
}, {
   id: crypto.randomUUID(),
   type: 'input',
   parameters: {
      label: 'House number*',
      type: 'number',
      required: true,
      placeholder: '23532',
      error: 'houseNumber'
   }
}, {
   id: crypto.randomUUID(),
   type: 'input',
   parameters: {
      label: 'Apartment',
      type: 'number',
      required: false,
      placeholder: '432',
      error: 'apartment'
   }
}, {
   id: crypto.randomUUID(),
   type: 'input',
   parameters: {
      label: 'Floor',
      type: 'number',
      required: false,
      placeholder: '12',
      error: 'floor'
   }
}]
 */

/* {inputsSelects.map(({ id, type, parameters }) => {
   const specificError = error?.[parameters.error ?? '']
   return type === 'select' ?
      <CustomSelect
         key={id}
         label={parameters.label}
         values={(parameters as SelectProps).values}
         options={(parameters as SelectProps).options}
         defaultValue={(parameters as SelectProps).defaultValue}
         description={(parameters.error) ? parameters.error : parameters.description}
         required={parameters.required}
         error={parameters.error}
         disable={isLoading}
      /> :
      <CustomInput 
         key={id}
         label={parameters.label}
         type={(parameters as InputProps).type}
         required={parameters.required}
         placeholder={(parameters as InputProps).placeholder}
         description={(specificError) ? specificError : parameters.description}
         error={specificError}
         disable={isLoading}
      />
})} */
