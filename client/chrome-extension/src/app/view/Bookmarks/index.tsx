import React, { FC, useContext, useCallback, useMemo } from 'react'
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
import { OpenedTabContext } from '../../hooks-contexts/useOpenedTabs'
import { theme } from '../../styles/theme'
import { IBookmark, IGroup } from '../../types'
import BookmarkCard from './components/bookmark-card'
import BookmarkEditModal from './components/BookmarkEditModal'
import Group from './components/group/Group'
import { UserContext } from '../../hooks-contexts/useUser'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

const useGridSize = () => {
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'))

  let GRID_SIZE = 1
  if (isSmUp) GRID_SIZE = 2
  if (isMdUp) GRID_SIZE = 3
  if (isLgUp) GRID_SIZE = 4
  return GRID_SIZE
}

export interface BookmarksProps {
  bookmarks: IBookmark[]
  groupId: IGroup['_id']
  groupIndex: number
}

export const Bookmarks: FC<BookmarksProps> = ({
  bookmarks,
  groupId,
  groupIndex
}) => {
  const { user } = useContext(UserContext)
  return (
    <Grid container spacing={24} justify="flex-start">
      {bookmarks.map((bm, i) => {
        return (
          <Grid key={bm._id} item xs={12} sm={6} md={4} lg={3}>
            <BookmarkCard bookmark={bm} index={i} user={user} />
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
  OwnProps

type OwnProps = GroupContext &
  Pick<OpenedTabContext, 'closeTab'> &
  BookmarksProps

const BookmarkDnDWrapper: (
  args: OwnProps & { gridSize: ReturnType<typeof useGridSize> }
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
  const { closeTab } = useContext(OpenedTabContext)
  const GRID_SIZE = useGridSize()
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
                    closeTab={closeTab}
                    gridSize={GRID_SIZE}
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
