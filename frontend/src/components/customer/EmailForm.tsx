import { CardContainer } from '@/components/common/CardContainer'
import { CustomInput } from '@/components/common/CustomInput'
import { FormContainer } from '@/components/common/FormContainer'
import { useServicePromise } from '@/hooks/useServicePromise'
import { changeEmail, type ChangeEmailValues } from '@/services/changeCustomerService'
import { getFormValue } from '@/utils/getFormValue'

export type EmailFormTranslation = {
   labels: {
      currentEmail: string
      newEmail: string
      currentPassword: string
   }
   title: string
   submitLabel: string
}


interface Props {
   email: string
   t: EmailFormTranslation
}

export function EmailForm({ email, t }: Props) {
   const { isLoading, error, response, handlePromise } = useServicePromise<ChangeEmailValues, string>(changeEmail)

   const labels = t.labels

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
               label: t.submitLabel,
               isLoading,
            }}
         >
            <h3>{t.title}</h3>
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