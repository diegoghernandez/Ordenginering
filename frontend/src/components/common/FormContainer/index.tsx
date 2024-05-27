import type { FormEvent, ReactElement } from 'react'
import { Callout } from '@/components/common/Callout'
import './FormContainer.module.css'
import { PRIMARY__BUTTON } from '@/constants/styles'

interface Props {
   handleData: (formValues: string[]) => void;
   response: {
      status: number;
      message: string;
   } | null;
   children: ReactElement[];
   submitButton: {
      label: string;
      isLoading: boolean;
   };
}

export function FormContainer({
   handleData,
   response,
   children,
   submitButton
}: Props) {

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {      
      if (event.currentTarget instanceof HTMLFormElement) {
         const { elements } = event.currentTarget
         const formValues: string[] = []
   
         for (const element of elements) {
            if (element instanceof HTMLInputElement 
                  || element instanceof HTMLSelectElement 
                  && element.value
            ) {
               formValues.push(element.value)
            }
         }

         handleData(formValues)
      }
   }

   return (
      <form onSubmit={handleSubmit}>
         {response?.message ? <Callout type={response?.status !== 200 ? 'error' : 'success'} message={response?.message} /> : null}
         {children}
         <button
            className={PRIMARY__BUTTON}
            disabled={submitButton.isLoading}
         >{submitButton.label}</button>
      </form>
   )
}
