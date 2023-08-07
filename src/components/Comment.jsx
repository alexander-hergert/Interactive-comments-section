import React from "react";
import Replies from "./Replies";
import { styled } from "styled-components";

/***************** STYLES ******************/
const CommentStyles = styled.div`
  border: 1px solid black;
`;

/***************** COMPONENT ******************/

const Comment = ({ item }) => {
  const { id, content, createdAt, score, replyingTo, user, replies } = item;
  return (
    <CommentStyles>
      <div>
        <input type="image" src="/assets/images/icon-plus.svg" />
        {score}
        <input type="image" src="/assets/images/icon-minus.svg" />
      </div>
      <div>
        <div>
          <img src={user.image.png} alt="avatar" />
          <p>{user.username}</p>
          <p>{createdAt}</p>
        </div>
        <div>
          <input type="image" src="/assets/images/icon-reply.svg" />
          <p>Reply</p>
        </div>
      </div>

      <p>{content}</p>
      <Replies replies={replies} />
    </CommentStyles>
  );
};

export default Comment;
