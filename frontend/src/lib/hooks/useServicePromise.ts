import { StatusError } from '@/services/exceptions/StatusError'
import { useState } from 'react'

export function useServicePromise<Request, Response>(servicePromise: (valueForPromise: Request) => Promise<Response>) {
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [error, setError] = useState<{[key: string]: string}| undefined>({})
   const [response, setResponse] = useState<{status: number, message: Response | string} | null>(null)

   const handlePromise = (valueForPromise: Request) => {
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
      setError,
      response,
      handlePromise
   }
}