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
import {
  EditBookmarkModalProvider,
  EditGroupModalContextProvider
} from '../../hooks-contexts/useModal'
import { theme } from '../../styles/theme'
import { IBookmark, IGroup } from '../../types'
import BookmarkCard from './components/bookmark-card'
import BookmarkEditModal from './components/BookmarkEditModal'
import Group from './components/group/Group'

export interface BookmarksProps {
  bookmarks: IBookmark[]
  groupId: IGroup['_id']
  groupIndex: number
}
const Bookmarks: FC<BookmarksProps> = ({ bookmarks, groupId, groupIndex }) => {
  return (
    <Grid container spacing={24} justify="flex-start">
      {bookmarks.map((bm, i) => {
        return (
          <Grid key={bm._id} item xs={12} sm={6} md={4} lg={3}>
            <BookmarkCard bookmark={bm} index={i} />
          </Grid>
        )
      })}
      <BookmarkEditModal
        groupId={groupId}
        bookmarks={bookmarks}
        groupIndex={groupIndex}
      />
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
  BookmarksProps

const BookmarkDnDWrapper: (
  args: BookmarksProps & GroupContext
) => JSX.Element | null = tabDropTarget(
  bookmarkDropTarget(
    class extends React.Component<DnDContainerWrapperProps> {
      render() {
        const {
          bookmarkConnectDropSource,
          tabConnectDropTarget,
          ...restProps
        } = this.props

        return bookmarkConnectDropSource(
          tabConnectDropTarget(
            <div
              style={{
                backgroundColor: this.props.isDragging ? '#ffefe8' : 'inherit',
                padding: `0 ${theme.spacing.unit}px ${theme.spacing.unit}px`,
                minHeight: '50px'
              }}
            >
              <Bookmarks {...restProps} />
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
    <EditGroupModalContextProvider>
      <EditBookmarkModalProvider>
        {groups &&
          groups.map((group, i) => {
            return (
              <div
                key={group._id}
                style={{
                  margin: '1em'
                }}
              >
                <Group group={group} index={i}>
                  <BookmarkDnDWrapper
                    key={group._id}
                    bookmarks={group.bookmarks}
                    groupId={group._id}
                    groupIndex={i}
                    {...groupContext}
                  />
                </Group>
              </div>
            )
          })}
      </EditBookmarkModalProvider>
    </EditGroupModalContextProvider>
  )
}

export default Groups
