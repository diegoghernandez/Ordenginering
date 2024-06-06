import { useId } from 'react'
import type { UserInputProps } from '@/types'

export interface InputProps extends UserInputProps {
   defaultValue?: string
   placeholder?: string
   type?: string
   minValue?: number
   maxValue?: number
}

export function CustomInput({
   label,
   placeholder = '',
   defaultValue = '',
   minValue,
   maxValue,
   type = 'text',
   required = false,
   description,
   error = '',
   disable = true
}: InputProps) {
   const customInputId = useId()
   
   return (
      <div className='user-input'>
         <label htmlFor={customInputId}>{label}</label>
         {description ? <p id={customInputId + '-describe'}>{description}</p> : null}
         <input 
            id={customInputId} 
            type={type}
            required={required}
            defaultValue={defaultValue}
            min={minValue}
            max={maxValue}
            placeholder={placeholder}
            disabled={disable}
            aria-invalid={Boolean(error)}
            aria-describedby={customInputId + '-describe'}
         />
         {error ? <p id={customInputId + '-describe'}>{error}</p> : null}
      </div>
   )
}
