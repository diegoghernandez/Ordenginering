import * as jose from 'jose'

const secret = new TextEncoder().encode('SECRET')
const alg = 'HS256'

export async function createJwt(email: string): Promise<string> {
   return await new jose.SignJWT()
      .setProtectedHeader({ alg, role: 'USER' })
      .setIssuedAt()
      .setIssuer('pizza-jwt')
      .setSubject(email)
      .setExpirationTime('15d')
      .sign(secret)
}

export async function verifyJwt(token: string): Promise<jose.JWTVerifyResult<jose.JWTPayload>> {
   return await jose.jwtVerify(token, secret)
}
