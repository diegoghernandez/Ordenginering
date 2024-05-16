import { CardContainer } from '@/components/common/CardContainer'
import { FormContainer } from '@/components/common/FormContainer'
import { useServicePromise } from '@/hooks/useServicePromise'
import { changePassword, type ChangePasswordValues } from '@/services/changeCustomerService'
import { CustomInput } from '@/components/common/CustomInput'

export function PasswordForm() {
   const { isLoading, error, response, handlePromise } = useServicePromise<ChangePasswordValues>(changePassword)

   const handleData = (formValues: string[]) => {
      handlePromise({
         newPassword: formValues[1],
         id: localStorage.getItem('id') ?? '0',
         password: formValues[0]
      })
   }

   return (
      <CardContainer styleClass=''>
         <FormContainer
            response={response}
            handleData={handleData}
            submitButton={{
               label: 'Save Password',
               isLoading,
            }}
         >
            <h3>Password</h3>
            <CustomInput 
               label='Current Password'
               type='password'
               disable={isLoading}
               error={error?.currentPassword}
               required={true}
            />
            <CustomInput 
               label='New Password'
               type='password'
               disable={isLoading}
               error={error?.newPassword}
               required={true}
            />
            <CustomInput 
               label='Repeat Password'
               type='password'
               disable={isLoading}
               error={error?.repeatPassword}
               required={true}
            />
         </FormContainer>
      </CardContainer>
   )
}