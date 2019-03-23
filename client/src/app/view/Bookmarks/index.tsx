import { Grid } from '@material-ui/core'
import React, { FC, useContext, useEffect } from 'react'
import { DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd'
import { DnDTypes } from '../../../constants'
import { BookmarkContext } from '../../hooks-contexts/useBookmarks'
import { OpenedTabContext } from '../../hooks-contexts/useOpenedTabs'
import { Tab } from '../../types'
import BookmarkCard from './components/bookmark-card'
import EditModal from './components/EditModal'
import { theme } from '../../styles/theme'

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

const DnDContainer: FC<
  ReturnType<typeof tabDropCollect> & ReturnType<typeof bookmarkDropCollect>
> = props => {
  const {
    tabConnectDropTarget,
    bookmarkConnectDropSource,
    droppedItem,
    isDragging
  } = props
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

  return bookmarkConnectDropSource(
    tabConnectDropTarget(
      <div
        style={{
          backgroundColor: isDragging ? '#ffefe8' : 'inherit',
          padding: theme.spacing.unit * 2
        }}
      >
        <Bookmarks bookmarks={bookmarks} />
      </div>
    )
  )
}

const tabDropCollect = (
  connect: DropTargetConnector,
  monitor: DropTargetMonitor
) => ({
  isDragging: !!monitor.getItem(),
  droppedItem: (monitor.didDrop() && (monitor.getItem().tab as Tab)) || null,
  tabConnectDropTarget: connect.dropTarget()
})

const dropSource = {
  drop: () => {
    console.log('bookmark dragged')
  }
}

const bookmarkDropCollect = (
  connect: DropTargetConnector,
  monitor: DropTargetMonitor
) => ({
  bookmarkConnectDropSource: connect.dropTarget()
})

export default DropTarget(DnDTypes.tabs, {}, tabDropCollect)(
  DropTarget(DnDTypes.bookmarks, dropSource, bookmarkDropCollect)(DnDContainer)
)
