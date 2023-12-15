import Style from "./customSelect.module.css";

interface Props {
   values: string[]
}

export function CustomSelect({ values }: Props) {
   return (
      <div className={Style.selectContainer}>
         <select className="container">
            {values?.map((value) => (
               <option key={value} value={value}>{value}</option>
            ))}
         </select>
      </div>
   )
}