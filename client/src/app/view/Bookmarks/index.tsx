import { Grid } from '@material-ui/core'
import React, { FC, useContext } from 'react'
import {
  bookmarkDropTarget,
  BookmarkDropTargetProps
} from '../../dnd-settings/bookmark-drop-target'
import {
  tabDropTarget,
  TabDropTargetProps
} from '../../dnd-settings/tab-drop-target'
import { GroupContext } from '../../hooks-contexts/useGroups'
import { theme } from '../../styles/theme'
import { IBookmark, IGroup } from '../../types'
import BookmarkCard from './components/bookmark-card'
import EditModal from './components/EditModal'
import {
  useBookmarks,
  BookmarkContext
} from '../../hooks-contexts/useBookmarks'

interface BookmarksProps {
  bookmarks: IBookmark[]
}
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

/**
 * @description:
 * Since a component must be a class component to be able to refer this component in DropTargetSpec, this is needed.
 */

export type DnDContainerWrapperProps = TabDropTargetProps &
  BookmarkDropTargetProps &
  GroupContext &
  BookmarksProps & { groupId: IGroup['_id'] }

const BookmarkDnDWrapper = tabDropTarget(
  bookmarkDropTarget(
    class extends React.Component<DnDContainerWrapperProps> {
      render() {
        const {
          bookmarkConnectDropSource,
          tabConnectDropTarget,
          bookmarks
        } = this.props

        return bookmarkConnectDropSource(
          tabConnectDropTarget(
            <div
              style={{
                margin: '1em',
                backgroundColor: this.props.isDragging ? '#ffefe8' : 'inherit',
                padding: theme.spacing.unit * 2
              }}
            >
              <Bookmarks bookmarks={bookmarks} />
            </div>
          )
        )
      }
    }
  )
)

const Groups = () => {
  const groupContext = useContext(GroupContext)
  const { groups } = groupContext
  if (!groups) return <div>Loading...</div>
  return (
    <>
      {groups &&
        groups.map(g => {
          return (
            <div
              key={g._id}
              style={{
                margin: '1em'
              }}
            >
              <div>{g.title}</div>
              <div>{g._id}</div>
              <BookmarkDnDWrapper
                key={g._id}
                bookmarks={g.bookmarks}
                groupId={g._id}
                {...groupContext}
              />
              {/* <Bookmarks bookmarks={group.bookmarks} /> */}
            </div>
          )
        })}
    </>
  )
}

export default Groups
