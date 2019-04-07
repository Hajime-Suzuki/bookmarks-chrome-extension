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

export interface UpdateGroupInput {
  title: IGroup['title']
}

const updateGroup = async (id: IGroup['_id'], args: UpdateGroupInput) => {
  return await axios
    .put<GroupResponse>(`${API_GROUPS_URL}/${id}`, args)
    .then(({ data }) => data)
}

const deleteGroup = async (id: IGroup['_id']) => {
  await axios.delete(`${API_GROUPS_URL}/${id}`)
}

export const GroupsAPI = {
  createGroup,
  updateGroup,
  deleteGroup,
  reorderBookmarks
}
