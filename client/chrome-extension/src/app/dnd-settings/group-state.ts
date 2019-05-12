import { IGroup } from '../types'
import { GroupsAPI } from '../api/groups'

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
    if (this.currentGroupIndex === null) {
      return console.warn('current index is not set')
    }
    await GroupsAPI.reorderGroups({
      originId: group._id,
      targetIndex: this.currentGroupIndex
    })
  }
}

export const dndGroupState = new DnDGroupState()
