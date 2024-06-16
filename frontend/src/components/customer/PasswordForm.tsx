import { CardContainer } from '@/components/common/CardContainer'
import { CustomInput } from '@/components/common/CustomInput'
import { FormContainer } from '@/components/common/FormContainer'
import { useServicePromise } from '@/hooks/useServicePromise'
import { changePassword, type ChangePasswordValues } from '@/services/changeCustomerService'
import { getFormValue } from '@/utils/getFormValue'

export function PasswordForm() {
   const { isLoading, error, response, handlePromise } = useServicePromise<ChangePasswordValues, string>(changePassword)

   const labels = {
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      repeatPassword: 'Repeat Password'
   }

   const handleData = (formValues: FormData) => {
      handlePromise({
         password: getFormValue(labels.currentPassword, formValues),
         newPassword: getFormValue(labels.newPassword, formValues),
         id: localStorage.getItem('id') ?? '0'
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
               label={labels.currentPassword}
               type='password'
               disable={isLoading}
               error={error?.currentPassword}
               required={true}
            />
            <CustomInput 
               label={labels.newPassword}
               type='password'
               disable={isLoading}
               error={error?.newPassword}
               required={true}
            />
            <CustomInput 
               label={labels.repeatPassword}
               type='password'
               disable={isLoading}
               error={error?.repeatPassword}
               required={true}
            />
         </FormContainer>
      </CardContainer>
   )
}