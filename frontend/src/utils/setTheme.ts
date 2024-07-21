type AllowedClass = 'dark' | 'no-dark'

function addClassToHtmlTag(htmlClassList: DOMTokenList, addClass: AllowedClass, removeClass:  AllowedClass) {
   htmlClassList.remove(removeClass)
   htmlClassList.add(addClass)
   localStorage.setItem('theme', addClass)
}

export function setTheme() {
   const htmlElement = document.querySelector('html')
   const isDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches

   if (htmlElement instanceof HTMLElement) {
      const htmlClassList = htmlElement.classList
      if (isDark && htmlClassList.length === 0) {
         addClassToHtmlTag(htmlClassList, 'no-dark', 'dark')
         return
      }

      if (htmlClassList.contains('dark')) addClassToHtmlTag(htmlClassList, 'no-dark', 'dark')
      else addClassToHtmlTag(htmlClassList, 'dark', 'no-dark')
   }
}