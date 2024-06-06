export function getFormValue(parameter: string, formValues: FormData) {
   return formValues.get(parameter.toLowerCase().replace(' ', '-')) as string ?? ''
}