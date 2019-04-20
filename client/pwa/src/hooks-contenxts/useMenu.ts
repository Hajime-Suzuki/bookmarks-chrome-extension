import { useState } from 'react'

type ClickEvent = React.MouseEvent<HTMLElement, MouseEvent>

interface Item {
  id: string | null
  index: number | null
}

export const useMenu = () => {
  const [anchor, setAnchor] = useState<any>(null)
  const [selectedItem, setSelectedItem] = useState<Item>({
    id: null,
    index: null
  })
  const openMenu = (e: ClickEvent) => {
    setAnchor(e.currentTarget)
  }

  const closeMenu = () => setAnchor(null)

  const selectItem = (item: Item) => {
    setSelectedItem(item)
    closeMenu()
  }

  const deselectItem = () => {
    setSelectedItem({ id: null, index: null })
  }

  return {
    selectedItem,
    anchor,
    open,
    selectItem,
    deselectItem,
    openMenu,
    closeMenu
  }
}
