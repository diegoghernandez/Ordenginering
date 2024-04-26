import * as jose from 'jose'

export abstract class JwtService {
   abstract createJwt(email: string): Promise<string>

   abstract verifyJwt(token: string): Promise<jose.JWTVerifyResult<jose.JWTPayload>>
}
