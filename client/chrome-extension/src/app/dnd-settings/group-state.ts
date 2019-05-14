import { GroupsAPI } from '@bookmarks/shared/src/api/groups'
import { IGroup } from '@bookmarks/shared/src/types'

class DnDGroupState {
  currentGroupIndex: number | null = null
  originGroupIndex: number | null = null
  updating: boolean = false

  setCurrentGroupIndex(newIndex: number) {
    this.currentGroupIndex = newIndex
  }
  setOriginGroupIndex(index: number) {
    this.originGroupIndex = index
  }

  setUpdating(updating: boolean) {
    this.updating = updating
  }
  reset() {
    this.currentGroupIndex = null
    this.updating = false
    this.originGroupIndex = null
  }

  async placeReorder(group: IGroup) {
    this.setUpdating(true)

    if (this.currentGroupIndex === null) {
      return console.warn('current index is not set')
    }

    await GroupsAPI.reorderGroups({
      originId: group._id,
      targetIndex: this.currentGroupIndex
    })

    this.setUpdating(false)
  }
}

export const dndGroupState = new DnDGroupState()
