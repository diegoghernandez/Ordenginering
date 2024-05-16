import { CardContainer } from '@/components/common/CardContainer'
import { FormContainer } from '@/components/common/FormContainer'
import { CustomInput } from '../common/CustomInput'
import { useServicePromise } from '@/hooks/useServicePromise'
import { changeEmail, type ChangeEmailValues } from '@/services/changeCustomerService'

interface Props {
   email: string
}

export function EmailForm({ email }: Props) {
   const { isLoading, error, response, handlePromise } = useServicePromise<ChangeEmailValues>(changeEmail)

   const handleData = (formValues: string[]) => {
      handlePromise({
         email: formValues[2],
         id: localStorage.getItem('id') ?? '0',
         password: formValues[1]
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
               label='Current Email Address'
               defaultValue={email}
               type='email'
               disable={true}
               error={error?.currentPassword}
               required={true}
            />
            <CustomInput 
               label='Current Password'
               type='password'
               disable={isLoading}
               error={error?.currentPassword}
               required={true}
            />
            <CustomInput 
               label='New Email Address'
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