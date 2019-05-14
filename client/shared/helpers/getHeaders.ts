import { getUser } from './getUser'

export const getHeaders = async () => {
  const user = await getUser()
  const session = user.getSignInUserSession()
  return {
    headers: {
      ...(session && {
        Authorization: session.getAccessToken().getJwtToken()
      })
    }
  }
}
