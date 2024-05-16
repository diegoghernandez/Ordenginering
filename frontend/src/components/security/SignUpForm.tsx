import { CustomInput } from '@/components/common/CustomInput'
import { FormContainer } from '@/components/common/FormContainer'
import { useServicePromise } from '@/hooks/useServicePromise'
import { registerCustomer } from '@/services/customerService'
import type { CustomerDto } from '@/types'

export function SignUpForm() {
   const { isLoading, error, response, handlePromise } = useServicePromise<CustomerDto>(registerCustomer)

   const handleData = (formValues: string[]) => {
      const customerData: CustomerDto = {
         customerName: formValues[0],
         email: formValues[1],
         password: formValues[2],
         matchingPassword: formValues[3],
         birthDate: formValues[4]
      }

      handlePromise(customerData)
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
            label='Name'
            placeholder='Juan'
            required={true}
            error={error?.name}
            disable={isLoading}
         />
         <CustomInput
            label='Email'
            type='email'
            placeholder='email@name.com'
            required={true}
            error={error?.email}
            disable={isLoading}
         />
         <CustomInput
            label='Password'
            type='password'
            required={true}
            error={error?.password}
            disable={isLoading}
            />
         <CustomInput
            label='Confirm password'
            type='password'
            required={true}
            error={error?.confirmPassword}
            disable={isLoading}
         />
         <CustomInput
            label='Birth Date'
            type='date'
            required={true}
            error={error?.birthDate}
            disable={isLoading}
         />
      </FormContainer>
   )
}
