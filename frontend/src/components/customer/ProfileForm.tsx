import { CardContainer } from '@/components/common/CardContainer'
import { FormContainer } from '@/components/common/FormContainer'
import { useServicePromise } from '@/hooks/useServicePromise'
import { changeProfile, type ChangeProfileValues } from '@/services/changeCustomerService'
import { CustomInput } from '@/components/common/CustomInput'
import { getFormValue } from '@/utils/getFormValue'

interface Props {
   name: string,
   birthDate: string
}

export function ProfileForm({ name, birthDate }: Props) {
   const { isLoading, error, response, handlePromise } = useServicePromise<ChangeProfileValues>(changeProfile)

   const labels = {
      name: 'Name',
      birthDate: 'Birth Date'
   }

   const handleData = (formValues: FormData) => {
      handlePromise({
         name: getFormValue(labels.name, formValues),
         birthDate: getFormValue(labels.birthDate, formValues),
         id: localStorage.getItem('id') ?? '0',
         password: 'no-necessary'
      })
   }

   return (
      <CardContainer styleClass=''>
         <FormContainer
            response={response}
            handleData={handleData}
            submitButton={{
               label: 'Save Changes',
               isLoading,
            }}
            >
            <h3>Profile</h3>
            <CustomInput
               label={labels.name}
               defaultValue={name}
               type='text'
               disable={isLoading}
               error={error?.name}
               required={true}
            />
            <CustomInput
               label={labels.birthDate}
               defaultValue={birthDate}
               type='date'
               disable={isLoading}
               error={error?.name}
               required={true}
            />
         </FormContainer>
      </CardContainer>
   )
}