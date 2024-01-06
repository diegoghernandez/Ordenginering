import { customerHandler } from "./domains/customerHandler";
import { ingredientsHandler } from "./domains/ingredientsHandler";
import { pizzaHandler } from "./domains/pizzaHandler";

export const handlers = [
   ...customerHandler,
   ...ingredientsHandler,
   ...pizzaHandler
]