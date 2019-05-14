import { GroupsAPI } from '@bookmarks/shared/api/groups'
import { IBookmark } from '../types'

interface ReorderArgs {
  bookmarkId: IBookmark['_id']
  position: number
  from: IBookmark['group']
  to: IBookmark['group']
}

class DnDBookmarkState {
  currentBookmarkIndex: number | null = null
  currentGroup: string | null = null
  originGroupIndex: number | null = null
  updating: boolean = false

  setCurrentBookmarkIndex(newIndex: number) {
    this.currentBookmarkIndex = newIndex
  }
  setCurrentGroup(newGroup: string) {
    this.currentGroup = newGroup
  }

  setUpdating(updating: boolean) {
    this.updating = updating
  }

  setOriginGroupIndex(index: number) {
    this.originGroupIndex = index
  }

  reset() {
    this.currentBookmarkIndex = null
    this.currentGroup = null
    this.originGroupIndex = null
    this.updating = false
  }

  async placeReorder({ bookmarkId, position, from, to }: ReorderArgs) {
    this.setUpdating(true)
    await GroupsAPI.reorderBookmarks({ bookmarkId, position, from, to })
    this.setUpdating(false)
  }
}

export const dndBookmarkState = new DnDBookmarkState()
