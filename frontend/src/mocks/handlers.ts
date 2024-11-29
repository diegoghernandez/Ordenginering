import { changeCustomerHandler } from '@/mocks/domains/changeCustomerHandler'
import { authHandler } from '@/mocks/domains/authHandler'
import { ingredientHandler } from '@/mocks/domains/ingredientHandler'
import { jwtHandler } from '@/mocks/domains/jwtHandler'
import { orderHandler } from '@/mocks/domains/orderHandler'
import { pizzaHandler } from '@/mocks/domains/pizzaHandler'
import { customerHandler } from '@/mocks/domains/customerHandler'

export const handlers = [
	...customerHandler,
	...authHandler,
	...changeCustomerHandler,
	...ingredientHandler,
	...pizzaHandler,
	...orderHandler,
	...jwtHandler,
]
