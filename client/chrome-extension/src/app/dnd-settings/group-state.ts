import { IGroup } from '../types'
import { GroupsAPI } from '../api/groups'

class DnDGroupState {
  currentGroupIndex: number | null = null
  updating: boolean = false

  setCurrentGroupIndex(newIndex: number) {
    this.currentGroupIndex = newIndex
  }

  setUpdating(updating: boolean) {
    this.updating = updating
  }

  reset() {
    this.currentGroupIndex = null
    this.updating = false
  }

  async placeReorder(group: IGroup) {
    if (!this.currentGroupIndex) return console.warn('current index is not set')
    await GroupsAPI.reorderGroups({
      originId: group._id,
      targetIndex: this.currentGroupIndex
    })
  }
}

export const dndGroupState = new DnDGroupState()
