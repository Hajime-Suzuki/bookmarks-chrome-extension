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
}

export const dndGroupState = new DnDGroupState()
