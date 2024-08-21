function applyTheme() {
   const htmlElement = document.querySelector('html')
   const theme = localStorage.getItem('theme') ?? ''
   if (htmlElement instanceof HTMLElement && theme) htmlElement.classList.add(theme)
}
document.addEventListener('astro:after-swap', applyTheme);
applyTheme()