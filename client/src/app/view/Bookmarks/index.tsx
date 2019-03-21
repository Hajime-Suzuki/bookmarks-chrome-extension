import { Grid } from '@material-ui/core'
import React, { FC, useContext } from 'react'
import { BookmarkContext } from '../../hooks-contexts/useBookmarks'
import BookmarkCard from './components/BookmarkCard'
import EditModal from './components/EditModal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Bookmarks: FC<{}> = () => {
  const { bookmarks } = useContext(BookmarkContext)
  return (
    <>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Grid container spacing={24} justify="flex-start">
              {bookmarks.map(bm => {
                return (
                  <Draggable
                    draggableId={bm._id}
                    key={bm._id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {() => (
                      <Grid item xs={12} sm={6} md={4} lg={3}>
                        <BookmarkCard bookmark={bm} />
                      </Grid>
                    )}
                  </Draggable>
                )
              })}
            </Grid>
          </div>
        )}
      </Droppable>
      <EditModal />
    </>
  )
}

export default Bookmarks
