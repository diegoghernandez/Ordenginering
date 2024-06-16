import { CustomInput } from '@/components/common/CustomInput'
import { FormContainer } from '@/components/common/FormContainer'
import { useServicePromise } from '@/hooks/useServicePromise'
import { registerCustomer } from '@/services/customerService'
import type { CustomerDto } from '@/types'
import { getFormValue } from '@/utils/getFormValue'

export function SignUpForm() {
   const { isLoading, error, setError, response, handlePromise } = useServicePromise<CustomerDto, string>(registerCustomer)

   const labels = {
      customerName: 'Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      birthDate: 'Birth Date'
   }
   
   const handleData = (formValues: FormData) => {
      if (getFormValue(labels.password, formValues) !== getFormValue(labels.confirmPassword, formValues)) {
         setError({
            password: "Passwords don't match",
            confirmPassword: "Passwords don't match"
         })
      } else {
         const customerData: CustomerDto = {
            customerName: getFormValue(labels.customerName, formValues),
            email: getFormValue(labels.email, formValues),
            password: getFormValue(labels.password, formValues),
            matchingPassword: getFormValue(labels.confirmPassword, formValues),
            birthDate: getFormValue(labels.birthDate, formValues)
         }
   
         handlePromise(customerData)
      }

   }

   return (
      <FormContainer
         handleData={handleData}
         response={response}
         submitButton={{
            label: 'Sign Up',
            isLoading
         }}
      >
         <CustomInput
            label={labels.customerName}
            placeholder='Juan'
            required={true}
            error={error?.name}
            disable={isLoading}
         />
         <CustomInput
            label={labels.email}
            type='email'
            placeholder='email@name.com'
            required={true}
            error={error?.email}
            disable={isLoading}
         />
         <CustomInput
            label={labels.password}
            type='password'
            required={true}
            error={error?.password}
            disable={isLoading}
            />
         <CustomInput
            label={labels.confirmPassword}
            type='password'
            required={true}
            error={error?.confirmPassword}
            disable={isLoading}
         />
         <CustomInput
            label={labels.birthDate}
            type='date'
            required={true}
            error={error?.birthDate}
            disable={isLoading}
         />
      </FormContainer>
   )
}
