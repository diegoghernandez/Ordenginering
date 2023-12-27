import Style from "./customSelect.module.css";

interface Props {
   values: string[],
   selectedValue?: number
}

export function CustomSelect({ values, selectedValue = 1 }: Props) {
   return (
      <div className={Style.selectContainer}>
         <select defaultValue={values[selectedValue]} className="container">
            {values?.map((value) => (
               <option key={value} value={value}>{value}</option>
            ))}
         </select>
      </div>
   )
}