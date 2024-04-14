import { useId } from 'react'
import type { UserInputProps } from '@/types'

export interface InputProps extends UserInputProps {
   type?: string;
   placeholder: string;
}

export function CustomInput({
   label,
   type = 'text',
   required = false,
   placeholder = 'example',
   description,
   error = '',
   disable = true
}: InputProps) {
   const customInputId = useId()
   
   return (
      <div className='user__input'>
         <label htmlFor={customInputId}>{label}</label>
         {description ? <p id={customInputId + '-describe'}>{description}</p> : null}
         <input 
            id={customInputId} 
            type={type}
            required={required}
            placeholder={placeholder}
            disabled={disable}
            aria-invalid={Boolean(error)}
            aria-describedby={customInputId + '-describe'}
         />
         {error ? <p id={customInputId + '-describe'}>{error}</p> : null}
      </div>
   )
}
