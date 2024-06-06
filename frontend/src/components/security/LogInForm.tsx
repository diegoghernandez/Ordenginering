import { CustomInput } from '@/components/common/CustomInput'
import { FormContainer } from '@/components/common/FormContainer'
import { useServicePromise } from '@/hooks/useServicePromise'
import { logIn } from '@/services/customerService'
import type { CustomerLogIn } from '@/types'
import { getFormValue } from '@/utils/getFormValue'
import { useEffect } from 'react'

export function LogInForm() {
   const { isLoading, error, response, handlePromise } = useServicePromise<CustomerLogIn>(logIn)

   const labels = {
      email: 'Email',
      password: 'Password'
   }

   const handleData = (formValues: FormData) => {
      const customerLogIn = {
         email: getFormValue(labels.email, formValues),
         password: getFormValue(labels.password, formValues)
      }

      handlePromise(customerLogIn)
   }

   useEffect(() => {
      if (response?.status === 200) {
         localStorage.setItem('id', response.message)
         
         if(history.length <= 2) globalThis.location.pathname = '/client'
         else history.back()
      }
   }, [response])
   

   return (
      <FormContainer
         handleData={handleData}
         response={response}
         submitButton={{
            label: 'Sign In',
            isLoading
         }}
      >
         <CustomInput 
            label={labels.email}
            placeholder='email@name.com'
            required={true}
            type='email'
            error={error?.email}
            disable={isLoading}
         />
         <CustomInput 
            label={labels.password}
            required={true}
            type='password'
            error={error?.password}
            disable={isLoading}
         />
      </FormContainer>
   )   
}