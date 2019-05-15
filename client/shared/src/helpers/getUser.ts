import { Auth } from 'aws-amplify'
import { CognitoUser } from '@aws-amplify/auth'

export const getUser = async (): Promise<CognitoUser> =>
  Auth.currentAuthenticatedUser()
