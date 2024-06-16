export function getProfileLinks(customerId: number, role: '' | 'USER' | 'ADMIN', active: 'PROFILE' | 'ORDER' | 'INGREDIENT') {
   return [{
      url: '/client/customer/' + customerId,
      name: 'Profile',
      active: active === 'PROFILE'
   }, {
      url: `/client/customer/${customerId}/orders`,
      name: 'Orders',
      active: active === 'ORDER'
   }, {
      url: '/client/customer/ingredient',
      name: 'Ingredient',
      active: active === 'INGREDIENT'
   }]
}