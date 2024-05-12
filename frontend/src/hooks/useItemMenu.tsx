import { useState } from 'react'

interface Props {
   buttonTextList: string[],
   typeList: string[]
}

export function useItemMenu({
   buttonTextList,
   typeList
}: Props) {
   const [selectedType, setSelectedType] = useState('VEGETABLE')

   return {
      type: selectedType,
      selectorButtons: 
         <ul>
            {buttonTextList.map((text, index) => (
               <li key={typeList[index]}>
                  <button 
                     type='button'
                     onClick={() => setSelectedType(typeList[index])}
                  >{text}</button>
               </li>
            ))}
         </ul>
   }
}
