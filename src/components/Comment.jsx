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
      <p>{id}</p>
      <p>{content}</p>
      <p>{createdAt}</p>
      <p>{score}</p>
      <p>{replyingTo}</p>
      <p>{user.image.png}</p>
      <p>{user.username}</p>
      <Replies replies={replies} />
    </CommentStyles>
  );
};

export default Comment;
