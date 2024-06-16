import { useId, type ChangeEvent } from 'react'
import type { UserInputProps } from '@/types'

export interface InputProps extends UserInputProps {
   defaultValue?: string
   placeholder?: string
   type?: string
   minValue?: number
   maxValue?: number
   accept?: string
   onChange?: (event: ChangeEvent<HTMLInputElement>) => void
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
   disable = true,
   accept,
   onChange
}: InputProps) {
   const customInputId = useId()
   
   return (
      <div className='user-input'>
         <label htmlFor={customInputId}>{label}</label>
         {description ? <p id={customInputId + '-describe'}>{description}.</p> : null}
         <input 
            id={customInputId}
            name={label.toLowerCase().replace(' ', '-')}
            type={type}
            required={required}
            defaultValue={defaultValue}
            min={minValue}
            max={maxValue}
            placeholder={placeholder}
            disabled={disable}
            accept={accept}
            onChange={onChange}
            aria-invalid={Boolean(error)}
            aria-describedby={`${customInputId}-describe ${customInputId}-error`}
         />
         {error ? <p id={customInputId + '-error'}>{error}</p> : null}
      </div>
   )
}
