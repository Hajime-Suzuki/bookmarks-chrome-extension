import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Link,
  Typography
} from '@material-ui/core'
import React, { FC } from 'react'
import { IBookmark } from '../../../types'

interface Props {
  bookmark: IBookmark
}

const cardStyle = {
  width: 30,
  height: 30
}
const BookmarkCard: FC<Props> = ({ bookmark }) => {
  const { title, url, img } = bookmark
  return (
    <Link color="inherit" underline="none" href={url} target="blank">
      <Card onClick={() => console.log('click')} style={{ height: '100%' }}>
        <CardActionArea style={{ height: '100%' }}>
          <CardContent>
            <Grid container alignItems="center" spacing={8} wrap="nowrap">
              <Grid item>
                {img ? (
                  <img src={img} style={cardStyle} />
                ) : (
                  <Avatar style={cardStyle} />
                )}
              </Grid>
              <Grid item>
                <Typography>{title}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default BookmarkCard
