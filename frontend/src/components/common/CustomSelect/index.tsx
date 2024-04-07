import { useId } from 'react'
import type { UserInputProps } from '@/types'
import Styles from './CustomSelect.module.css'

interface Props extends UserInputProps {
   values: string[];
   options: string[]
   required?: boolean
   selectedValue?: number;
}

export function CustomSelect({ label, values, options, required = true }: Props) {
   const labelId = useId()
   return (
      <div className={`${Styles.custom__select} user__input`}>
         <label htmlFor={labelId}>{label}</label>
         <select 
            id={labelId} 
            name={label}
            /* defaultValue={values[selectedValue]}  */
            autoComplete='on'
            required={required}
         >
            <option value=''>--Please choose an option--</option>
            {values?.map((value, index) => (
               <option key={value} value={value}>{options[index]}</option>
            ))}
         </select>
         <span></span>
      </div>
   )
}