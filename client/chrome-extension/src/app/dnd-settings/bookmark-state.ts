class DnDBookmarkState {
  currentIndex: number | null = null
  currentGroup: string | null = null
  originGroupIndex: number | null = null
  updating: boolean = false

  setCurrentIndex(newIndex: number) {
    this.currentIndex = newIndex
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
    this.currentIndex = null
    this.currentGroup = null
    this.originGroupIndex = null
    this.updating = false
  }
}

export const dndBookmarkState = new DnDBookmarkState()
