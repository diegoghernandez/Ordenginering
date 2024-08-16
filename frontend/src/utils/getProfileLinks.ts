import profileLinksTranslation from '@/i18n/components/profileLinks.json' with { type: 'json' }
import type { LocalesString } from '@/types'
interface Props {
   customerId: number,
   desireTranslation?: string,
   role: '' | 'USER' | 'ADMIN',
   active: 'PROFILE' | 'ORDER' | 'INGREDIENT'
}

export function getProfileLinks({
   customerId,
   desireTranslation,
   role,
   active
}: Props) {
   const t = profileLinksTranslation[desireTranslation as LocalesString]

   const profileLinks = [{
      url: 'customer/' + customerId,
      name: t.profile,
      active: active === 'PROFILE'
   }, {
      url: `customer/${customerId}/orders`,
      name: t.orders,
      active: active === 'ORDER'
   }]

   if (role === 'ADMIN') profileLinks.push({
      url: 'customer/ingredient',
      name: t.ingredient,
      active: active === 'INGREDIENT'
   })


   return profileLinks
}