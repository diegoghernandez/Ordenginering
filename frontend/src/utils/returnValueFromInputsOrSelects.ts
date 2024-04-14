export function returnValueFromInputsOrSelects(elements: HTMLFormControlsCollection) {
   const values: string[] = []
   
   for (const element of elements) {
      if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement && element.value) {
         values.push(element.value)
      }
   }

   return values
}