import React, { useState } from "react";

import Comments from "./Comments";
import "./comment.css";

const Comment = ({ comment }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  // console.log(comment);
  return (
    <div>
      {comment ? (
        <div className="comment-container">
          {comment.text}
          <p>
            {Array.isArray(comment.children) && comment.children.length > 0 && (
              <button onClick={handleClick}>
                {show ? "Hide comments" : "Show comment"}
              </button>
            )}
          </p>

          {show &&
            Array.isArray(comment.children) &&
            comment.children.length && (
              <Comments key={comment.id} comments={comment.children} />
            )}
        </div>
      ) : (
        <div> no data to display</div>
      )}
    </div>
  );
};

export default Comment;
