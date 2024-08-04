import { CustomInput } from '@/components/common/CustomInput'
import { CustomSelect } from '@/components/common/CustomSelect'
import { FormContainer } from '@/components/common/FormContainer'
import { SmallModalContainer } from '@/components/common/SmallModalContainer'
import { PRIMARY__BUTTON } from '@/constants/styles'
import { useServicePromise } from '@/hooks/useServicePromise'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { saveOrder } from '@/services/orderService'
import type { IPData, OrderRequest } from '@/types'
import { getFormValue } from '@/utils/getFormValue'
import { getRelativeLocaleUrl } from 'astro:i18n'
import { useEffect, useRef } from 'react'

export type CheckoutFormTraduction = {
   submitLabel: string
   dialogAccept: string
   selectDefaultText: string
   labels: {
      country: string
      state: string
      city: string
      street: string
      houseNumber: string
      floor: string
      apartment: string
   }
   placeholder: {
      houseNumber: string
      floor: string
      apartment: string
   }
}

interface Props {
   countryList: { code: string, name: string }[]
   ipData: IPData
   currentLocale: string
   t: CheckoutFormTraduction
}

export function CheckoutForm({ countryList, ipData, currentLocale, t }: Props) {
   const { isLoading, error, response, handlePromise } = useServicePromise<OrderRequest, string>(saveOrder)
   const pizzaList = useShoppingCart((state) => state.pizza)
   const clearCart = useShoppingCart((state) => state.clearCart)
   const dialogRef = useRef<HTMLDialogElement>(null)

   const labels = t.labels

   const handleData = (formValues: FormData) => {
      const order: OrderRequest = {
         idCustomer: Number(localStorage.getItem('id')) ?? '0',
         country: getFormValue(labels.country, formValues),
         state: getFormValue(labels.state, formValues),
         city: getFormValue(labels.city, formValues),
         street: getFormValue(labels.street, formValues),
         houseNumber: Number(getFormValue(labels.houseNumber, formValues)),
         floor: Number(getFormValue(labels.floor, formValues)),
         apartment: Number(getFormValue(labels.apartment, formValues)),
         pizzaList: pizzaList.map((pizza) => {
            const { idPizza, ...rest } = pizza
            return rest
         })
      }
      
      handlePromise(order)
   }

   useEffect(() => {
      if (response?.status === 200 && dialogRef.current instanceof HTMLDialogElement) {
         dialogRef.current.showModal()
         clearCart()
      }
   }, [response?.status, clearCart])


   return (
      <FormContainer
         handleData={handleData}
         response={response?.status !== 200 ? response : null}
         submitButton={{
            label: t.submitLabel,
            isLoading: isLoading
         }}
      >
         <SmallModalContainer ref={dialogRef}>
            <>
               <h2>{response?.message}</h2>
               <a href={getRelativeLocaleUrl(currentLocale, 'menu')} className={PRIMARY__BUTTON}>{t.dialogAccept}</a>
            </>
         </SmallModalContainer>
         <CustomSelect
            label={labels.country}
            required={true}
            values={countryList.map(({ code }) => code)}
            options={countryList.map(({ name }) => name)}
            selectedOption={ipData.country_code_iso3}
            defaultValue={{
               value: '',
               text: t.selectDefaultText
            }}
            disable={isLoading}
         />
         <CustomInput
            label={labels.state}
            required={true}
            placeholder='Nuevo Leon'
            defaultValue={ipData.region}
            error={error?.state}
            disable={isLoading}
         />
         <CustomInput
            label={labels.city}
            required={true}
            placeholder='Guanajuato'
            error={error?.city}
            disable={isLoading}
         />
         <CustomInput 
            label={labels.street}
            required={true}
            placeholder='Alameda'
            error={error?.street}
            disable={isLoading}
         />
         <CustomInput 
            label={labels.houseNumber}
            required={true}
            type='number'
            placeholder={t.placeholder.houseNumber}
            minValue={1}
            error={error?.houseNumber}
            disable={isLoading}
         />
         <CustomInput 
            label={labels.floor}
            type='number'
            placeholder={t.placeholder.floor}
            minValue={1}
            maxValue={200}
            error={error?.floor}
            disable={isLoading}
         />
         <CustomInput 
            label={labels.apartment}
            type='number'
            placeholder={t.placeholder.apartment}
            minValue={1}
            maxValue={30000}
            error={error?.apartment}
            disable={isLoading}
         />
      </FormContainer>
   )
}