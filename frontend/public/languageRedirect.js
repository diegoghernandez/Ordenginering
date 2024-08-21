const desireLanguage = localStorage.getItem('language')
if (!globalThis.location.pathname.includes('/' + desireLanguage) && desireLanguage) {
   const newPath = globalThis.location.pathname.replace(/\/e[n,s]/, '/' + desireLanguage)         
   globalThis.location.assign(newPath)
}