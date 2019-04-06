import { IGroup, IBookmark } from '../types'
import { CreateBookmarkInput } from '../hooks-contexts/useBookmarks'
import { API_BOOKMARK_URL } from '../../constants'
import axios from 'axios'

export interface CreateBookmarkInput {
  title: IBookmark['title']
  url: IBookmark['url']
  img?: IBookmark['img']
  tags?: IBookmark['tags']
}

interface CreateBookmarkResponse {
  bookmark: IBookmark
}

const create = async (groupId: IGroup['_id'], input: CreateBookmarkInput) => {
  const categories = input.tags ? input.tags.join(',') : ''

  const { data } = await axios.post<CreateBookmarkResponse>(API_BOOKMARK_URL, {
    ...input,
    group: groupId,
    categories
  })
  return data.bookmark
}

const remove = async (bookmarkId: IBookmark['_id']) => {
  await axios.delete(`${API_BOOKMARK_URL}/${bookmarkId}`)
}

export const bookmarksAPI = { create, remove }
