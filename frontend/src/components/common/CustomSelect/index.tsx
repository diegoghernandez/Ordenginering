import { useId } from 'react'
import type { UserInputProps } from '@/types'
import Styles from './CustomSelect.module.css'

interface Props extends UserInputProps {
   values: string[];
   options: string[]
   defaultValue?: {
      value: string;
      text: string;
   };
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
   error = false,
   disable = false
}: Props) {
   const customLabelId = useId()
   return (
      <div className={`${Styles.custom__select} user__input`}>
         <label htmlFor={customLabelId}>{label}</label>
         {description ? <p id={customLabelId + '-describe'}>{description}</p> : null}
         <select 
            id={customLabelId} 
            name={label}
            autoComplete='on'
            required={required}
            disabled={disable}
            aria-invalid={Boolean(error)}
            aria-describedby={customLabelId + '-describe'}
         >
            <option value={defaultValue.value}>{defaultValue.text}</option>
            {values?.map((value, index) => (
               <option key={value} value={value}>{options[index]}</option>
            ))}
         </select>
         <span></span>
      </div>
   )
}