import { CardContainer } from '@/components/common/CardContainer'
import { FormContainer } from '@/components/common/FormContainer'
import { useServicePromise } from '@/hooks/useServicePromise'
import { changeProfile, type ChangeProfileValues } from '@/services/changeCustomerService'
import { CustomInput } from '@/components/common/CustomInput'

interface Props {
   name: string,
   birthDate: string
}

export function ProfileForm({ name, birthDate }: Props) {
   const { isLoading, error, response, handlePromise } = useServicePromise<ChangeProfileValues>(changeProfile)

   const handleData = (formValues: string[]) => {
      handlePromise({
         name: formValues[0],
         birthDate: formValues[1],
         id: localStorage.getItem('id') ?? '0',
         password: ''
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
               label='Name'
               defaultValue={name}
               type='text'
               disable={isLoading}
               error={error?.name}
               required={true}
            />
            <CustomInput
               label='Birth Date'
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