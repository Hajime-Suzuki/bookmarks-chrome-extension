import * as jwt from 'jsonwebtoken'
import * as jwkToPem from 'jwk-to-pem'
import axios from 'axios'
import * as createError from 'http-errors'

if (!process.env.AWS_REGION || !process.env.AWS_COGNITO_USER_POOL_ID) {
  console.error('AWS_COGNITO_USER_POOL_ID and AWS_REGION are required')
}

export const authChecker = async (token: any) => {
  const decoded: any = jwt.decode(token, { complete: true })
  const kid = decoded.header.kid

  const jwks: any[] = await axios
    .get(
      `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${
        process.env.AWS_COGNITO_USER_POOL_ID
      }/.well-known/jwks.json`
    )
    .then(({ data }) => data.keys)

  const matchedIndex = jwks.findIndex(key => key.kid === kid)

  const jwk = jwks[matchedIndex]

  if (!jwk) createError(400, 'incorrect kid')

  const pem = jwkToPem(jwk)
  const res: any = jwt.verify(token, pem)
  return res.username
}
