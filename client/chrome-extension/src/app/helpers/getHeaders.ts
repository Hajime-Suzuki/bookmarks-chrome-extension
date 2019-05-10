import { CognitoUser } from '@aws-amplify/auth'

export const getHeaders = (user: CognitoUser | null) => {
  return {
    headers: {
      ...(user && {
        authorization: user
          .getSignInUserSession()!
          .getAccessToken()
          .getJwtToken()
      })
    }
  }
}
