import React, { useState } from "react";
import { styled } from "styled-components";
import ReplyForm from "./ReplyForm";

/***************** STYLES ******************/
const ReplyStyles = styled.div`
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

const Reply = ({ item }) => {
  const [isReply, setIsReply] = useState(false);

  const handleToggle = () => {
    setIsReply(!isReply);
  };
  const { id, content, createdAt, score, replyingTo, user } = item;
  return (
    <>
      <ReplyStyles>
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
          <input
            type="image"
            src="/assets/images/icon-reply.svg"
            onClick={handleToggle}
          />
          <p>Reply</p>
        </div>
        <div className="text">
          <p>
            {replyingTo}
            {content}
          </p>
        </div>
      </ReplyStyles>
      {isReply && <ReplyForm commentId={id} handleToggle={handleToggle} />}
    </>
  );
};

export default Reply;
