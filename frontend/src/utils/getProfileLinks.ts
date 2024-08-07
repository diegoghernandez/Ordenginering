import profileLinksTranslation from '@/i18n/components/profileLinks.json'

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
   const t = profileLinksTranslation[desireTranslation as 'en' | 'es' ?? 'en']

   const profileLinks = [{
      url: 'customer/' + customerId,
      name: t.Profile,
      active: active === 'PROFILE'
   }, {
      url: `customer/${customerId}/orders`,
      name: t.Orders,
      active: active === 'ORDER'
   }]

   if (role === 'ADMIN') profileLinks.push({
      url: 'customer/ingredient',
      name: t.Ingredient,
      active: active === 'INGREDIENT'
   })


   return profileLinks
}