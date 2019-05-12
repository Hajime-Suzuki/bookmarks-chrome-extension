import { Omit } from '@material-ui/core'
import axios from 'axios'
import { API_BOOKMARK_URL } from '../../constants'
import { getHeaders } from '../helpers/getHeaders'
import { IBookmark, IGroup } from '../types'

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

const create = async (groupId: IGroup['_id'], input: CreateBookmarkInput) => {
  const categories = input.tags ? input.tags.join(',') : ''

  const { data } = await axios.post<CreateBookmarkResponse>(
    API_BOOKMARK_URL,
    {
      ...input,
      group: groupId,
      categories
    },
    await getHeaders()
  )
  return data.bookmark
}

const update = async (id: IBookmark['_id'], input: UpdateBookmarkInput) => {
  const { data } = await axios.put<{ bookmark: IBookmark }>(
    `${API_BOOKMARK_URL}/${id}`,
    input,
    await getHeaders()
  )
  return data
}

const remove = async (bookmarkId: IBookmark['_id']) => {
  await axios.delete(`${API_BOOKMARK_URL}/${bookmarkId}`, await getHeaders())
}

export const bookmarksAPI = { create, remove, update }
