import { CardContainer } from '@/components/common/CardContainer'
import { FormContainer } from '@/components/common/FormContainer'
import { CustomInput } from '@/components/common/CustomInput'
import { useServicePromise } from '@/hooks/useServicePromise'
import { changeEmail, type ChangeEmailValues } from '@/services/changeCustomerService'
import { getFormValue } from '@/utils/getFormValue'

interface Props {
   email: string
}

export function EmailForm({ email }: Props) {
   const { isLoading, error, response, handlePromise } = useServicePromise<ChangeEmailValues, string>(changeEmail)

   const labels = {
      currentEmail: 'Current Email Address',
      newEmail: 'New Email Address',
      currentPassword: 'Current Password'
   }

   const handleData = (formValues: FormData) => {
      handlePromise({
         email: getFormValue(labels.newEmail, formValues),
         password: getFormValue(labels.currentPassword, formValues),
         id: localStorage.getItem('id') ?? '0'
      })
   }

   return (
      <CardContainer styleClass=''>
         <FormContainer
            response={response}
            handleData={handleData}
            submitButton={{
               label: 'Save Email',
               isLoading,
            }}
         >
            <h3>Email address</h3>
            <CustomInput 
               label={labels.currentEmail}
               defaultValue={email}
               type='email'
               disable={true}
               error={error?.currentPassword}
               required={true}
            />
            <CustomInput 
               label={labels.currentPassword}
               type='password'
               disable={isLoading}
               error={error?.currentPassword}
               required={true}
            />
            <CustomInput 
               label={labels.newEmail}
               placeholder='email@email.com'
               type='email'
               disable={isLoading}
               error={error?.currentPassword}
               required={true}
            />
         </FormContainer>
      </CardContainer>
   )
}