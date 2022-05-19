import React, { Fragment } from 'react'

import Comment from './Comment'

const Comments = ({ comments }) => {
  return (
    <Fragment>
      {
        comments ? comments.map(comment => {
          return (
            <Fragment>
              <Comment key={comment.id} comment={comment} />
            </Fragment>
          )
        }) : (
          <div> no comments </div>
        )
      }
    </Fragment>
  )
}

export default Comments