import React, { Fragment } from "react";

import Comment from "./Comment";

const Comments = ({ comments }) => {
  const filteredComments =
    comments &&
    comments.filter((comment) => comment.type === "comment" && comment.text);

  return (
    <Fragment>
      {filteredComments ? (
        filteredComments.map((comment) => {
          return (
            <Fragment>
              <Comment key={comment.id} comment={comment} />
            </Fragment>
          );
        })
      ) : (
        <div> no comments </div>
      )}
    </Fragment>
  );
};

export default Comments;
