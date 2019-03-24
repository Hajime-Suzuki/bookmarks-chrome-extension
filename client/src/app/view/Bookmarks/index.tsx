import { Grid, Omit } from '@material-ui/core'
import React, { FC, useContext, useEffect } from 'react'
import {
  bookmarkDropTarget,
  BookmarkDropTargetProps
} from '../../dnd-settings/bookmark-drop-target'

import {
  tabDropTarget,
  TabDropTargetProps
} from '../../dnd-settings/tab-drop-target'
import { BookmarkContext } from '../../hooks-contexts/useBookmarks'
import { OpenedTabContext } from '../../hooks-contexts/useOpenedTabs'
import { theme } from '../../styles/theme'
import { Tab } from '../../types'
import BookmarkCard from './components/bookmark-card'
import EditModal from './components/EditModal'

/**
 * @description: this component is wrapper of the bookmark cards. This is the drop target of bookmarks and tabs.
 */

type BookmarksProps = Pick<BookmarkContext, 'bookmarks'>
const Bookmarks: FC<BookmarksProps> = ({ bookmarks }) => {
  return (
    <Grid container spacing={24} justify="flex-start">
      {bookmarks.map((bm, i) => {
        return (
          <Grid key={bm._id} item xs={12} sm={6} md={4} lg={3}>
            <BookmarkCard bookmark={bm} index={i} />
          </Grid>
        )
      })}
      <EditModal />
    </Grid>
  )
}

// TODO: clean. In the wrapper, by specifying context type, this component is necessary. Wrapper component can handle create bookmark inside the endDrag!

const DnDContainer: FC<
  Omit<
    DnDContainerWrapperProps,
    'bookmarkConnectDropSource' | 'tabConnectDropTarget'
  >
> = props => {
  const { droppedItem } = props
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

  return <Bookmarks bookmarks={bookmarks} />
}

/**
 * @description:
 * Since a component must be a class component to be able to refer this component in DropTargetSpec, this is needed.
 */

export type DnDContainerWrapperProps = TabDropTargetProps &
  BookmarkDropTargetProps
class BookmarkDnDWrapper extends React.Component<DnDContainerWrapperProps> {
  static contextType = BookmarkContext
  render() {
    const {
      bookmarkConnectDropSource,
      tabConnectDropTarget,
      ...rest
    } = this.props

    return bookmarkConnectDropSource(
      tabConnectDropTarget(
        <div
          style={{
            backgroundColor: this.props.isDragging ? '#ffefe8' : 'inherit',
            padding: theme.spacing.unit * 2
          }}
        >
          <DnDContainer {...rest} />{' '}
        </div>
      )
    )
  }
}

// Wrapper.contextType = BookmarkContext

export default tabDropTarget(bookmarkDropTarget(BookmarkDnDWrapper))
