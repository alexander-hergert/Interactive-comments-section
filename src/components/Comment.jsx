import React, { useState, useEffect } from "react";
import Replies from "./Replies";
import { styled } from "styled-components";
import { getPostingTime } from "../utility/utility";
import ReplyForm from "./ReplyForm";
import { useGlobalContext } from "../context";

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
  //use user values to check if the currentuser is the user
  const [isReply, setIsReply] = useState(false);
  const { state, dispatch } = useGlobalContext();
  const [isUser, setIsUser] = useState(true);

  //need an effect to setIsUser dependent on currentUser
  //useEffect = (() => {}, []); //dependency could be state)

  const handleToggle = () => {
    setIsReply(!isReply);
  };

  const handleUpvote = () => {
    const upvoteId = id;
    dispatch({
      type: "UPVOTE A COMMENT",
      payload: { upvoteId, currentUserName: state.currentUser.username },
    });
  };

  const handleDownvote = () => {
    const downvoteId = id;
    dispatch({
      type: "DOWNVOTE A COMMENT",
      payload: { downvoteId, currentUserName: state.currentUser.username },
    });
  };

  return (
    <>
      <CommentStyles>
        <div className="vote">
          <input
            type="image"
            src="/assets/images/icon-plus.svg"
            onClick={handleUpvote}
          />
          {score}
          <input
            type="image"
            src="/assets/images/icon-minus.svg"
            onClick={handleDownvote}
          />
        </div>
        <div className="name">
          <img src={user.image.png} alt="avatar" />
          <p>{user.username}</p>
          {isUser && <p>you</p>}
          <p>{getPostingTime(createdAt)}</p>
        </div>
        {isUser ? (
          <div className="action">
            <input type="image" src="/assets/images/icon-delete.svg" />
            <p>Delete</p>
            <input type="image" src="/assets/images/icon-edit.svg" />
            <p>Edit</p>
          </div>
        ) : (
          <div className="action">
            <input
              type="image"
              src="/assets/images/icon-reply.svg"
              onClick={handleToggle}
            />
            <p>Reply</p>
          </div>
        )}
        <div className="text">
          <p>{content}</p>
        </div>
      </CommentStyles>
      {isReply && <ReplyForm commentId={id} handleToggle={handleToggle} />}
      <Replies replies={replies} />
    </>
  );
};

export default Comment;
