import { Grid } from '@material-ui/core'
import React, { FC, useContext, useEffect } from 'react'
import { DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd'
import { DnDTypes } from '../../../constants'
import { BookmarkContext } from '../../hooks-contexts/useBookmarks'
import { OpenedTabContext } from '../../hooks-contexts/useOpenedTabs'
import { Tab } from '../../types'
import BookmarkCard from './components/bookmark-card'
import EditModal from './components/EditModal'

const Bookmarks: FC<Pick<BookmarkContext, 'bookmarks'>> = ({ bookmarks }) => {
  return (
    <Grid container spacing={24} justify="flex-start">
      {bookmarks.map(bm => {
        return (
          <Grid key={bm._id} item xs={12} sm={6} md={4} lg={3}>
            <BookmarkCard bookmark={bm} />
          </Grid>
        )
      })}
      <EditModal />
    </Grid>
  )
}

const DnDContainer: FC<ReturnType<typeof collect>> = ({
  connectDropTarget,
  droppedItem
}) => {
  const { bookmarks, createBookmark: submit } = useContext(BookmarkContext)
  const { closeTab } = useContext(OpenedTabContext)

  const createBookmark = async ({ title, url, favIconUrl, id }: Tab) => {
    if (!title || !url) return console.warn('title and url are required')
    await submit({ title, url, img: favIconUrl, tags: undefined })
    closeTab(id!)
  }

  useEffect(() => {
    if (droppedItem) createBookmark(droppedItem)
  }, [droppedItem])

  return connectDropTarget(
    <div>
      <Bookmarks bookmarks={bookmarks} />
    </div>
  )
}

const collect = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  droppedItem: (monitor.didDrop() && (monitor.getItem().tab as Tab)) || null,
  connectDropTarget: connect.dropTarget()
})

export default DropTarget(DnDTypes.tabs, {}, collect)(DnDContainer)
