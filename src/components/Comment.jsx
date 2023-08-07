import React from "react";
import Replies from "./Replies";
import { styled } from "styled-components";

/***************** STYLES ******************/
const CommentStyles = styled.section`
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: white;
  border-radius: 5px;
  div {
    border: 1px solid black;
  }
  display: grid;
  grid-template:
    "name name"
    "text text"
    "vote action";
  .vote {
    grid-area: vote;
    display: flex;
  }
  .name {
    grid-area: name;
    display: flex;
  }
  .action {
    grid-area: action;
    display: flex;
  }
  .text {
    grid-area: text;
  }

  //DESKTOP
  @media only screen and (min-width: 800px) {
    grid-template:
      "vote name name action"
      "vote text text text";
    .vote {
      flex-direction: column;
    }
  }
`;

/***************** COMPONENT ******************/

const Comment = ({ item }) => {
  const { id, content, createdAt, score, replyingTo, user, replies } = item;
  return (
    <>
      <CommentStyles>
        <div className="vote">
          <input type="image" src="/assets/images/icon-plus.svg" />
          {score}
          <input type="image" src="/assets/images/icon-minus.svg" />
        </div>
        <div className="name">
          <img src={user.image.png} alt="avatar" />
          <p>{user.username}</p>
          <p>{createdAt}</p>
        </div>
        <div className="action">
          <input type="image" src="/assets/images/icon-reply.svg" />
          <p>Reply</p>
        </div>
        <div className="text">
          <p>{content}</p>
        </div>
      </CommentStyles>
      <Replies replies={replies} />
    </>
  );
};

export default Comment;
