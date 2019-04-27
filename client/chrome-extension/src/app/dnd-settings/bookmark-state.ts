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
}

export const dndBookmarkState = new DnDBookmarkState()
