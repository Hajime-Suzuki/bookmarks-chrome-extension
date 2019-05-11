import { CognitoUser } from '@aws-amplify/auth'
import axios from 'axios'
import { API_GROUPS_URL } from '../../constants'
import { getHeaders } from '../helpers/getHeaders'
import { IBookmark, IGroup } from '../types'

interface FetchBookmarksResponse {
  groups: IGroup[]
}

export interface CreateGroupInput {
  title?: string
  user: string
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

const fetch = async (user: CognitoUser | null) => {
  const { data } = await axios.get<FetchBookmarksResponse>(
    API_GROUPS_URL,
    getHeaders(user)
  )

  return {
    groups: data.groups
  }
}

const createGroup = async (
  input: CreateGroupInput,
  user: CognitoUser | null
) => {
  const { group } = await axios
    .post<GroupResponse>(API_GROUPS_URL, input, getHeaders(user))
    .then(({ data }) => data)
  return { newGroup: group }
}

interface ReorderBookmarkInput {
  bookmarkId: IBookmark['_id']
  position: number
  from: IGroup['_id']
  to: IGroup['_id']
}

const reorderBookmarks = async (
  args: ReorderBookmarkInput,
  user: CognitoUser | null
) => {
  await axios.put<GroupResponse>(
    `${API_GROUPS_URL}/reorder-bookmarks`,
    args,
    getHeaders(user)
  )
}

export interface UpdateGroupInput {
  title: IGroup['title']
}

const updateGroup = async (
  args: UpdateGroupInput,
  user: CognitoUser | null
) => {
  return await axios
    .put<GroupResponse>(`${API_GROUPS_URL}`, args, getHeaders(user))
    .then(({ data }) => data)
}

const deleteGroup = async (id: IGroup['_id'], user: CognitoUser | null) => {
  await axios.delete(`${API_GROUPS_URL}/${id}`, getHeaders(user))
}

// const reorderGroups = (id:IGroup[])=>{
//   axios.put()
// }

export const GroupsAPI = {
  fetch,
  createGroup,
  updateGroup,
  deleteGroup,
  reorderBookmarks
}
