import React from "react";
import { styled } from "styled-components";
import { nanoid } from "nanoid";
import { useGlobalContext } from "../context";

/***************** STYLES ******************/
const CreateStyles = styled.div`
  border-radius: 5px;
  background-color: white;
  padding: 2rem;
  margin: 3rem 0;
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

const ReplyForm = ({ commentId }) => {
  const { state, dispatch } = useGlobalContext();
  const handleReply = (e) => {
    e.preventDefault();
    //creating the payload
    const newId = nanoid();
    const newContent = e.target[0].value;
    const newDate = new Date().getTime();
    const newScore = 0;
    const replyingTo = "Alex"; //need to find out how to get the right comment id and name
    const userName = state.currentUser.username;
    const imageSrc = state.currentUser.image.png;

    const newReply = {
      id: newId,
      content: newContent,
      createdAt: newDate,
      score: newScore,
      replyingTo: replyingTo,
      user: {
        image: {
          png: imageSrc,
          webp: "/assets/images/avatars/image-amyrobson.webp",
        },
        username: userName,
      },
    };

    dispatch({ type: "NEW REPLY", payload: { commentId, newReply } });
  };

  return (
    <CreateStyles>
      <form onSubmit={handleReply}>
        <img src={state?.currentUser?.image?.png} alt="avatar" />
        <textarea
          name="new comment"
          id="new comment"
          cols="30"
          rows="10"
          placeholder="Add a comment..."
          aria-label="new comment"
        ></textarea>
        <button>Reply</button>
      </form>
    </CreateStyles>
  );
};

export default ReplyForm;
