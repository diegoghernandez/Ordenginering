export function redirectToDesireLanguage(language: string) {
   const newPath = globalThis.location.pathname.replace(/\/e[n,s]/, '/' + language)         
   globalThis.location.assign(newPath)
}