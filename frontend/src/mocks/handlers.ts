import { changeCustomerHandler } from './domains/changeCustomerHandler'
import { customerHandler } from './domains/customerHandler'
import { ingredientHandler } from './domains/ingredientHandler'
import { jwtHandler } from './domains/jwtHandler'
import { orderHandler } from './domains/orderHandler'
import { pizzaHandler } from './domains/pizzaHandler'

export const handlers = [
   ...customerHandler,
   ...changeCustomerHandler,
   ...ingredientHandler,
   ...pizzaHandler,
   ...orderHandler,
   ...jwtHandler
]