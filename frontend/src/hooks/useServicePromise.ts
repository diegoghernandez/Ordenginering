import { StatusError } from '@/services/exceptions/StatusError'
import { useState } from 'react'

export function useServicePromise<Type>(servicePromise: (valueForPromise: Type) => Promise<string>) {
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [error, setError] = useState<{[key: string]: string}>({})
   const [response, setResponse] = useState<string>('')

   const handlePromise = (valueForPromise: Type) => {
      setIsLoading(true)
      setError({})
      
      setTimeout(() => {
         servicePromise(valueForPromise)
            .then((result) => {
               setIsLoading(false)
               setResponse(result)
               console.log('Yessssss');
            })
            .catch((e) => {
               setIsLoading(false)
               if (e instanceof StatusError) {
                  setResponse(e.message)                  
                  setError(e.fieldError)
               }
               // eslint-disable-next-line no-console
               console.error(e)
            })
      }, 800)
   }

   return {
      isLoading,
      error,
      response,
      handlePromise
   }
}