import React, { useState } from "react";
import Replies from "./Replies";
import { styled } from "styled-components";
import { getPostingTime } from "../utility/utility";
import Create from "./CreateNewComment";

/***************** STYLES ******************/
const CommentStyles = styled.section`
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: white;
  border-radius: 5px;
  display: grid;
  grid-template:
    "name name"
    "text text"
    "vote action";
  .vote {
    grid-area: vote;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-color: hsl(223, 19%, 93%);
    border-radius: 5px;
    margin: 0.5rem;
    margin-left: 0;
    width: 6rem;
    color: hsl(238, 40%, 52%);
    font-weight: bold;
  }
  .name {
    grid-area: name;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 2rem;
    }
    p:first-of-type {
      font-weight: bold;
    }
    p:last-of-type {
      color: hsl(211, 10%, 45%);
    }
  }
  .action {
    grid-area: action;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    color: hsl(238, 40%, 52%);
    font-weight: bold;
  }
  .text {
    grid-area: text;
    p {
      color: hsl(211, 10%, 45%);
      line-height: 1.5;
    }
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
  const [isReply, setIsReply] = useState(false);

  const handleReply = () => {};

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
          <p>{getPostingTime(createdAt)}</p>
        </div>
        <div className="action">
          <input
            type="image"
            src="/assets/images/icon-reply.svg"
            onClick={handleReply}
          />
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
