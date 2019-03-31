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

interface CreateGroupResponse {
  group: IGroup
}

const createGroup = async (input: CreateGroupInput) => {
  const { group } = await axios
    .post<CreateGroupResponse>(API_GROUPS_URL, input)
    .then(({ data }) => data)
  return { newGroup: group }
}

export const GroupAPI = {
  createGroup
}
