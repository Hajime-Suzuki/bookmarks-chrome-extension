import { deleteApi, getApi, postApi, putApi } from '.'
import { API_GROUPS_URL } from '../constants'
import { IBookmark, IGroup } from '../types'

interface FetchBookmarksResponse {
  groups: IGroup[]
}

const fetch = async () => {
  const { data } = await getApi<FetchBookmarksResponse>(API_GROUPS_URL)

  return {
    groups: data.groups
  }
}

interface CreateGroupInput {
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

const createGroup = async (input: CreateGroupInput) => {
  const { data } = await postApi<GroupResponse>(API_GROUPS_URL, input)
  return { newGroup: data.group }
}

interface ReorderBookmarkInput {
  bookmarkId: IBookmark['_id']
  position: number
  from: IGroup['_id']
  to: IGroup['_id']
}

const reorderBookmarks = (args: ReorderBookmarkInput) =>
  putApi<GroupResponse>(`${API_GROUPS_URL}/reorder-bookmarks`, args)

export interface UpdateGroupInput {
  title: IGroup['title']
}

const updateGroup = async (id: IGroup['_id'], args: UpdateGroupInput) =>
  putApi<GroupResponse>(`${API_GROUPS_URL}/${id}`, args)

const deleteGroup = async (id: IGroup['_id']) =>
  deleteApi(`${API_GROUPS_URL}/${id}`)

interface ReorderGroupsInput {
  originId: IGroup['_id']
  targetIndex: number
}
const reorderGroups = async (input: ReorderGroupsInput) => {
  console.log('reorder groups')
  console.log(input)
  return putApi(`${API_GROUPS_URL}/reorder-groups`, input)
}

export const GroupsAPI = {
  fetch,
  createGroup,
  updateGroup,
  deleteGroup,
  reorderBookmarks,
  reorderGroups
}
