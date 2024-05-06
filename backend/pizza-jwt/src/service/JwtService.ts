import * as jose from 'jose'
import { CustomerRoleRepository } from '../../types.js'

const secret = new TextEncoder().encode('SECRET')
const alg = 'HS256'

export class JwtService {
   readonly customerRoleRepository: CustomerRoleRepository

   constructor(customerRoleRepository: CustomerRoleRepository) {
      this.customerRoleRepository = customerRoleRepository
   }

   createJwt = async (id: number) => {
      const customerRole = await this.customerRoleRepository.geByCustomerRoleId(id)

      if (customerRole.length === 0) throw new Error('Customer not found')

      return await new jose.SignJWT()
         .setProtectedHeader({
            alg,
            id: customerRole[0].customer_role_id,
            role: customerRole[0].role_name
         })
         .setIssuedAt()
         .setIssuer('pizza-jwt')
         .setExpirationTime('15d')
         .sign(secret)
   }

   verifyJwt = async (token: string) => {
      return await jose.jwtVerify(token, secret)
   }
}
