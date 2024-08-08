import { middleware } from 'astro:i18n'
import { defineMiddleware, sequence } from 'astro:middleware'

const userMiddleware = defineMiddleware((ctx, next) => {
   const path = ctx.url.pathname
   
   if (!path.includes('/en') && !path.includes('/es')) {
      // return Response.redirect(new URL('/client/en', ctx.url), 302)
      const redirectPath = ctx.request.headers.get('accept-language')?.includes('es')
         ? '/client/es'
         : '/client/en'
      return ctx.redirect(redirectPath, 302)
   }
   
   return next()
})

export const onRequest = sequence(
   userMiddleware,
   middleware({
      redirectToDefaultLocale: false,
      prefixDefaultLocale: true
   })
)