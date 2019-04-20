import { GroupContext } from '@bookmarks/extension/src/app/hooks-contexts/useGroups'
import React, { Fragment, useContext } from 'react'

const Groups = () => {
  const { groups } = useContext(GroupContext)
  if (!groups) return <div>Loading</div>

  return (
    <>
      {groups.map(group => {
        return (
          <Fragment key={group._id}>
            <div>{group.title}</div>

            {group.bookmarks.map(bookmark => {
              return <div key={bookmark._id}>{bookmark.title}</div>
            })}
          </Fragment>
        )
      })}
    </>
  )
}

export default Groups
