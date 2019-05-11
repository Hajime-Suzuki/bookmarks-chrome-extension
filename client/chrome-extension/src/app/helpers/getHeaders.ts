import { CognitoUser } from '@aws-amplify/auth'

export const getHeaders = (user: CognitoUser | null) => {
  return {
    headers: {
      ...(user && {
        Authorization: user
          .getSignInUserSession()!
          .getAccessToken()
          .getJwtToken()
      })
    }
  }
}
