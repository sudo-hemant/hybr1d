import React, { Fragment, useState } from "react";

import Comments from "./Comments";

import "./comment.css";

const Comment = ({ comment }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <Fragment>
      {comment ? (
        <div className="comment-container">
          {/* {comment.text} */}
          <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>

          <div className="button-container">
            {Array.isArray(comment.children) && comment.children.length > 0 && (
              <button onClick={handleClick} className="expand-comment-button">
                {show ? "Hide reply" : "Show reply"}
              </button>
            )}
          </div>

          <hr />

          {show &&
            Array.isArray(comment.children) &&
            comment.children.length && (
              <Comments key={comment.id} comments={comment.children} />
            )}
        </div>
      ) : (
        <div> no data to display</div>
      )}
    </Fragment>
  );
};

export default Comment;
