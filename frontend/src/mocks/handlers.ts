import { customerHandler } from './domains/customerHandler'
import { ingredientsHandler } from './domains/ingredientsHandler'
import { orderHandler } from './domains/orderHandler'
import { pizzaHandler } from './domains/pizzaHandler'

export const handlers = [
   ...customerHandler,
   ...ingredientsHandler,
   ...pizzaHandler,
   ...orderHandler
]