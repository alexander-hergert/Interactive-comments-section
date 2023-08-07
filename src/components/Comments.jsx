import React from "react";
import Comment from "./Comment";

const Comments = ({ comments }) => {
  return (
    <section>
      {comments.map((item) => (
        <Comment key={item.id} item={item} />
      ))}
    </section>
  );
};

export default Comments;
