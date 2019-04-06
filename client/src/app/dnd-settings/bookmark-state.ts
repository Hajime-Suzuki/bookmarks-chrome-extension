class DnDBookmarkState {
  currentIndex: number | null = null
  currentGroup: string | null = null

  setCurrentIndex(newIndex: number) {
    this.currentIndex = newIndex
  }
  setCurrentGroup(newGroup: string) {
    this.currentGroup = newGroup
  }

  reset() {
    this.currentIndex = null
    this.currentGroup = null
  }
}

export const dndBookmarkState = new DnDBookmarkState()
