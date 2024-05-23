import { useId } from 'react'
import type { UserInputProps } from '@/types'
import Styles from './CustomSelect.module.css'

export interface SelectProps extends UserInputProps {
   values: string[];
   options: string[]
   defaultValue?: {
      value: string;
      text: string;
   }
   onChange?: (value: string) => void
}

export function CustomSelect({ 
   label, 
   values, 
   options, 
   defaultValue = {
      value: '',
      text: '--Please choose an option--'
   },
   description,
   required = true,
   error = '',
   disable = false,
   onChange
}: SelectProps) {
   const customSelectId = useId()
   return (
      <div className={`${Styles.custom__select} user__input`}>
         <label htmlFor={customSelectId}>{label}</label>
         {description ? <p id={customSelectId + '-describe'}>{description}</p> : null}
         <select
            id={customSelectId} 
            name={label}
            autoComplete='on'
            required={required}
            disabled={disable}
            onChange={(element) => onChange?.(element.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={customSelectId + '-describe'}
         >
            <option value={defaultValue.value}>{defaultValue.text}</option>
            {values?.map((value, index) => (
               <option key={value} value={value}>{options[index]}</option>
            ))}
         </select>
         <span></span>
         {error ? <p id={customSelectId + '-describe'}>{error}</p> : null}
      </div>
   )
}