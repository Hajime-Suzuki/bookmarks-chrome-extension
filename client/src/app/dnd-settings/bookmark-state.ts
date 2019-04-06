class DnDBookmarkState {
  currentIndex: number | null = null
  currentGroup: string | null = null
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

  reset() {
    this.currentIndex = null
    this.currentGroup = null
    this.updating = false
  }
}

export const dndBookmarkState = new DnDBookmarkState()
