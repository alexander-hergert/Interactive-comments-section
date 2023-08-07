import React from "react";
import { styled } from "styled-components";

/***************** STYLES ******************/
const ReplyStyles = styled.div`
  border: 1px solid black;
  margin-left: 1rem;
`;

/***************** COMPONENT ******************/

const Reply = ({ item }) => {
  const { id, content, createdAt, score, replyingTo, user } = item;
  return (
    <ReplyStyles>
      <p>{id}</p>
      <p>{content}</p>
      <p>{createdAt}</p>
      <p>{score}</p>
      <p>{replyingTo}</p>
      <p>{user.image.png}</p>
      <p>{user.username}</p>
    </ReplyStyles>
  );
};

export default Reply;
