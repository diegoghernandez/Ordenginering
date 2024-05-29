import { useEffect, useRef, type ReactElement } from 'react'

interface Props {
   fun: () => void
   children?: ReactElement
}

export function DetectEndOfScroll({ fun, children }: Props) {
   const ref = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const options = {
         root: null,
         rootMargin: '0px',
         threshold: 0.1
      }
   
      const observer = new IntersectionObserver((entries) => {
         if (entries[0].isIntersecting) fun()
      }, options)
      const currentElement = ref.current
   
      if (currentElement instanceof HTMLDivElement) {
         observer.observe(currentElement)
      }

      return () => {
         if (currentElement instanceof HTMLDivElement) {
            observer.unobserve(currentElement)
         }
      }
      
   }, [ref, fun])

   return (
      <div ref={ref}>
         {children}
      </div>
   )
}