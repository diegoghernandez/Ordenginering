export function compareStringsOfNames(firstName: string, secondName: string) {
   return firstName.toLocaleLowerCase().replace(' ', '-') === secondName.toLocaleLowerCase().replace(' ', '-')
}