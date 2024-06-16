export function getFormValue(parameter: string, formValues: FormData) {
   const value = formValues.get(parameter.toLowerCase().replace(' ', '-'))
   return value as string ?? ''
}