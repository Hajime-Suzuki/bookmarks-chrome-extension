import React, { FC } from 'react'
import {
  bookmarkDragSource,
  BookmarkDragSourceProps
} from '../../../../dnd-settings/bookmark-drag-source'
import { IBookmark } from '../../../../types'
import Content from './BookmarkContent'
import BottomSection from './BottomSection'
import { CognitoUser } from '@aws-amplify/auth'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Link from '@material-ui/core/Link'
import CardActions from '@material-ui/core/CardActions'

/**
 * @description: This is parent component of a card. This is also the drag source.
 */

export interface BookmarkCardProps {
  bookmark: IBookmark
  index: number
  groupIndex: number
}

const BookmarkCard: FC<BookmarkCardProps> = props => {
  const { bookmark } = props

  return (
    <Card style={{ height: '100%' }}>
      <CardActionArea style={{ height: 90 }}>
        <Link
          color="inherit"
          underline="none"
          style={{ display: 'block' }}
          href={bookmark.url}
          target="blank"
        >
          <Content bookmark={bookmark} />
        </Link>
      </CardActionArea>
      <CardActions disableActionSpacing>
        <BottomSection {...props} />
      </CardActions>
    </Card>
  )
}

/**
 * @description to get component within beginSource etc in React DnD, wrapped component should be class component
 */

class BookmarkCardContainer extends React.Component<
  BookmarkDragSourceProps & WrapperProps
> {
  render() {
    const { connectDragSource, isDragging, ...rest } = this.props

    return connectDragSource(
      <div style={{ height: '100%', opacity: isDragging ? 0.5 : 1 }}>
        <BookmarkCard {...rest} />
      </div>
    )
  }
}

const C = bookmarkDragSource(BookmarkCardContainer)
type WrapperProps = BookmarkCardProps & { user: CognitoUser | null }
export default (props: WrapperProps) => <C {...props} />
