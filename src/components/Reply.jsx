import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import ReplyForm from "./ReplyForm";
import { useGlobalContext } from "../context";
import Modal from "./Modal";

/***************** STYLES ******************/
const ReplyStyles = styled.div`
  margin-bottom: 1rem;
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
    margin-left: -0.75rem;
    width: 6rem;
    color: hsl(238, 40%, 52%);
    font-weight: bold;

    input:hover {
      filter: invert(100%);
    }
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

    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    div:hover {
      opacity: 70%;
    }

    .delete {
      color: hsl(358, 79%, 66%);
    }
  }
  .text {
    grid-area: text;
    p {
      color: hsl(211, 10%, 45%);
      line-height: 1.5;
    }
    button {
      background-color: hsl(238, 40%, 52%);
      color: white;
      border: none;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      float: right;
    }
    button:hover {
      opacity: 70%;
    }
  }

  textarea {
    width: 100%;
    border-radius: 10px;
    padding: 1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    resize: none;
  }

  textarea:focus {
    border: 1px solid hsl(238, 40%, 52%);
    outline: none;
  }

  .you {
    background-color: hsl(238, 40%, 52%);
    color: white;
    border-radius: 5px;
    padding: 0.25rem 0.5rem;
  }

  .replying-to {
    color: hsl(238, 40%, 52%);
    font-weight: bold;
  }

  //DESKTOP
  @media only screen and (min-width: 800px) {
    grid-template:
      "vote name name action"
      "vote text text text";
    .vote {
      flex-direction: column;
      width: 2.5rem;
      margin-right: 1rem;
      height: 7rem;
    }
  }
`;

/***************** COMPONENT ******************/

const Reply = ({ item }) => {
  const { id, content, createdAt, score, replyingTo, user } = item;
  const [isReply, setIsReply] = useState(false);
  const { state, dispatch } = useGlobalContext();
  const [isUser, setIsUser] = useState(null); //true/false
  const [isEdit, setIsEdit] = useState(false);
  const [textContent, setTextContent] = useState(content);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    //check if currentUser is owner of comment
    if (state.currentUser.username === user.username) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, []);

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

  const handleOnChange = (e) => {
    setTextContent(e.target.value);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
    //create payload
    const editId = id;
    const newText = textContent;
    if (isEdit) {
      dispatch({
        type: "ON EDIT",
        payload: { editId, newText },
      });
    }
  };

  const handleDelete = () => {
    setIsDelete(!isDelete);
  };

  return (
    <>
      {isDelete && <Modal setIsDelete={setIsDelete} id={id} />}
      <ReplyStyles>
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
          {isUser && <p className="you">you</p>}
          <p>{createdAt}</p>
        </div>
        {isUser ? (
          <div className="action">
            <div onClick={handleDelete}>
              <input type="image" src="/assets/images/icon-delete.svg" />
              <p className="delete">Delete</p>
            </div>
            <div onClick={handleEdit}>
              <input type="image" src="/assets/images/icon-edit.svg" />
              <p>Edit</p>
            </div>
          </div>
        ) : (
          <div className="action">
            <div onClick={handleToggle}>
              <input type="image" src="/assets/images/icon-reply.svg" />
              <p>Reply</p>
            </div>
          </div>
        )}
        <div className="text">
          {!isEdit && (
            <p>
              <span className="replying-to">{`@${replyingTo} `}</span>
              {`${content}`}
            </p>
          )}
          {isEdit && (
            <>
              <textarea
                rows="5"
                defaultValue={content}
                onChange={handleOnChange}
              ></textarea>
              <button onClick={handleEdit}>UPDATE</button>
            </>
          )}
        </div>
      </ReplyStyles>
      {isReply && <ReplyForm commentId={id} handleToggle={handleToggle} />}
    </>
  );
};

export default Reply;
