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
      <div>
        <input type="image" src="/assets/images/icon-plus.svg" />
        {score}
        <input type="image" src="/assets/images/icon-minus.svg" />
      </div>
      <div>
        <img src={user.image.png} alt="avatar" />
        <p>{user.username}</p>
        <p>{createdAt}</p>
      </div>
      <div>
        <p>{replyingTo}</p>
        <p>{content}</p>
      </div>
    </ReplyStyles>
  );
};

export default Reply;
