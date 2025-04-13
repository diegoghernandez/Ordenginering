import { getRelativeLocaleUrl } from 'astro:i18n'

export const getLoginUrl = (locale: string) => getRelativeLocaleUrl(locale, 'login')