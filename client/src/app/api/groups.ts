import axios from 'axios'
import { IBookmark, IGroup } from '../types'
import { API_GROUPS_URL } from '../../constants'
import { Omit } from '@material-ui/core'

export interface CreateGroupInput {
  title?: string
  bookmark?: {
    title: IBookmark['title']
    url: IBookmark['url']
    img?: IBookmark['img']
    tags?: IBookmark['tags']
  }
}

interface GroupResponse {
  group: IGroup
}

const createGroup = async (input: CreateGroupInput) => {
  const { group } = await axios
    .post<GroupResponse>(API_GROUPS_URL, input)
    .then(({ data }) => data)
  return { newGroup: group }
}

interface ReorderBookmarkInput {
  bookmarkId: IBookmark['_id']
  position: number
  from: IGroup['_id']
  to: IGroup['_id']
}

const reorderBookmarks = async (args: ReorderBookmarkInput) => {
  await axios.put<GroupResponse>(`${API_GROUPS_URL}/reorder-bookmarks`, args)
}

export const GroupsAPI = {
  createGroup,
  reorderBookmarks
}
