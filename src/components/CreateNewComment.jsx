import React from "react";
import { styled } from "styled-components";
import { nanoid } from "nanoid";
import { useGlobalContext } from "../context";

/***************** STYLES ******************/
const CreateStyles = styled.div`
  border-radius: 5px;
  background-color: white;
  padding: 2rem;
  margin-top: 3rem;
  display: grid;
  grid-template:
    "textarea textarea"
    "image button";

  img {
    grid-area: image;
    width: 2rem;
  }

  textarea {
    padding: 2rem;
    border-radius: 5px;
    grid-area: textarea;
  }

  button {
    width: 6rem;
    background-color: hsl(238, 40%, 52%);
    color: white;
    border: none;
    border-radius: 5px;
    grid-area: button;
  }

  //DESKTOP
  @media only screen and (min-width: 800px) {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
  }
`;

/***************** COMPONENT ******************/

const CreateNewComment = () => {
  const { state, dispatch } = useGlobalContext();
  const handleCreateComment = (e) => {
    e.preventDefault();
    //creating the payload
    const userName = state.currentUser.username;
    const imageSrc = state.currentUser.image.png;
    const newId = nanoid();
    const newDate = new Date().getTime();
    const newCommentText = e.target[0].value;
    const newComment = {
      id: newId,
      content: newCommentText,
      createdAt: newDate,
      score: 0,
      user: {
        image: {
          png: imageSrc,
          webp: "/assets/images/avatars/image-amyrobson.webp",
        },
        username: userName,
      },
      replies: [],
    };
    dispatch({ type: "NEW COMMENT", payload: newComment });
  };

  return (
    <CreateStyles>
      <form onSubmit={handleCreateComment}>
        <img src={state?.currentUser?.image?.png} alt="avatar" />
        <textarea
          name="new comment"
          id="new comment"
          cols="30"
          rows="10"
          placeholder="Add a comment..."
          aria-label="new comment"
        ></textarea>
        <button>SEND</button>
      </form>
    </CreateStyles>
  );
};

export default CreateNewComment;
