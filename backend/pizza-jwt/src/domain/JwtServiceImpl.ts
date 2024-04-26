import * as jose from 'jose'
import { JwtService } from './service/JwtService.js'

const secret = new TextEncoder().encode('SECRET')
const alg = 'HS256'

export class JwtServiceImpl extends JwtService {
   createJwt = async (email: string): Promise<string> => {
      return new jose.SignJWT()
      .setProtectedHeader({ alg, role: 'USER' })
      .setIssuedAt()
      .setIssuer('pizza-jwt')
      .setSubject(email)
      .setExpirationTime('15d')
      .sign(secret)
   }

   verifyJwt = async (token: string): Promise<jose.JWTVerifyResult<jose.JWTPayload>> => {
      return jose.jwtVerify(token, secret)
   }
}
