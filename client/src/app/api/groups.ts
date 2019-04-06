import axios from 'axios'
import { IBookmark, IGroup } from '../types'
import { API_GROUPS_URL } from '../../constants'

export interface CreateGroupInput {
  title?: string
  bookmark?: {
    title: IBookmark['title']
    url: IBookmark['url']
    img?: IBookmark['img']
    tags?: IBookmark['tags']
  }
}

interface ReorderBookmarkInput {
  type: 'reorder:bookmark' | 'add:bookmark' | 'remove:bookmark'
  bookmark: IBookmark['_id']
  position: number
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

export type ReorderBookmarksAPIArgs = Pick<
  ReorderBookmarkInput,
  'bookmark' | 'position'
> & { groupId: IGroup['_id'] }
const reorderBookmarks = async ({
  bookmark,
  position,
  groupId
}: ReorderBookmarksAPIArgs) => {
  const params: ReorderBookmarkInput = {
    type: 'reorder:bookmark',
    bookmark,
    position
  }
  await axios.put<GroupResponse>(`${API_GROUPS_URL}/${groupId}`, params)
}

export const GroupsAPI = {
  createGroup,
  reorderBookmarks
}
