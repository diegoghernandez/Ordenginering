import { StatusError } from '@/services/exceptions/StatusError'
import { useState } from 'react'

export function useServicePromise<Type>(servicePromise: (valueForPromise: Type) => Promise<string>) {
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [error, setError] = useState<{[key: string]: string}| undefined>({})
   const [response, setResponse] = useState<{status: number, message: string} | null>(null)

   const handlePromise = (valueForPromise: Type) => {
      setIsLoading(true)
      setError({})
      setResponse(null)
      
      setTimeout(() => {
         servicePromise(valueForPromise)  
            .then((result) => setResponse({
               status: 200,
               message: result
            }))
            .catch((e) => {
               setIsLoading(false)
               if (e instanceof StatusError) {
                  setResponse({
                     status: e.status,
                     message: e.message
                  })  
                  setError(e?.fieldError)
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