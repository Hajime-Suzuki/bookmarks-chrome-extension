import { CognitoUser } from '@aws-amplify/auth'

export const getHeaders = (user: CognitoUser | null) => {
  return {
    headers: {
      ...(user && {
        authentication:
          user &&
          user
            .getSignInUserSession()!
            .getAccessToken()
            .getJwtToken()
      })
    }
  }
}
