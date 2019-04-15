import { Omit } from '@material-ui/core'
import axios from 'axios'
import { API_BOOKMARK_URL } from '../../constants'
import { IBookmark, IGroup } from '../types'
import { CognitoUser } from '@aws-amplify/auth/'
import { getHeaders } from '../helpers/getHeaders'

export interface CreateBookmarkInput {
  title: IBookmark['title']
  url: IBookmark['url']
  img?: IBookmark['img']
  tags?: IBookmark['tags']
}

interface CreateBookmarkResponse {
  bookmark: IBookmark
}

type UpdateBookmarkInput = Omit<Partial<IBookmark>, 'tags'> & { tags?: string }

const create = async (
  groupId: IGroup['_id'],
  input: CreateBookmarkInput,
  user: CognitoUser | null
) => {
  const categories = input.tags ? input.tags.join(',') : ''

  const { data } = await axios.post<CreateBookmarkResponse>(
    API_BOOKMARK_URL,
    {
      ...input,
      group: groupId,
      categories
    },
    getHeaders(user)
  )
  return data.bookmark
}

const update = async (
  id: IBookmark['_id'],
  input: UpdateBookmarkInput,
  user: CognitoUser | null
) => {
  const { data } = await axios.put<{ bookmark: IBookmark }>(
    `${API_BOOKMARK_URL}/${id}`,
    input,
    getHeaders(user)
  )
  return data
}

const remove = async (
  bookmarkId: IBookmark['_id'],
  user: CognitoUser | null
) => {
  await axios.delete(`${API_BOOKMARK_URL}/${bookmarkId}`)
}

export const bookmarksAPI = { create, remove, update }
