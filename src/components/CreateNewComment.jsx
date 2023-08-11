import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { nanoid } from "nanoid";
import { useGlobalContext } from "../context";

/***************** STYLES ******************/
const CreateStyles = styled.div`
  border-radius: 5px;
  background-color: white;
  padding: 1rem;
  margin-top: 1rem;

  form {
    display: grid;
    grid-template-areas:
      "textarea textarea"
      "image button";
    align-items: center;
  }

  img {
    grid-area: image;
    width: 2rem;
    justify-self: start;
  }

  textarea {
    padding: 1rem;
    border-radius: 5px;
    grid-area: textarea;
    width: 100%;
    resize: none;
    margin-bottom: 1rem;
    border-color: hsl(223, 19%, 93%);
  }

  textarea:focus {
    border: 1px solid hsl(238, 40%, 52%);
    outline: none;
  }

  button {
    width: 6rem;
    background-color: hsl(238, 40%, 52%);
    color: white;
    border: none;
    border-radius: 5px;
    grid-area: button;
    padding: 0.75rem 1rem;
    justify-self: end;
  }

  button:hover {
    opacity: 70%;
  }

  //DESKTOP
  @media only screen and (min-width: 800px) {
    width: 60%;
    margin: auto;
    min-width: 40rem;
    form {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      gap: 1rem;
      height: 5rem;
    }
    textarea {
      height: 5rem;
    }
  }
`;

/***************** COMPONENT ******************/

const CreateNewComment = () => {
  const { state, dispatch } = useGlobalContext();
  const [textContent, setTextContent] = useState("");

  const handleOnChange = (e) => {
    setTextContent(e.target.value);
  };

  useEffect(() => {
    const fetchQuote = async () => {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setTextContent(data.slip.advice);
    };
    fetchQuote();
  }, [state]);

  const handleCreateComment = async (e) => {
    e.preventDefault();

    if (!e.target[0].value) {
      e.target[0].value = textContent;
    }
    setTextContent(e.target[0].value);
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
      upvotedBy: [],
      downvotedBy: [],
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
    e.target[0].value = "";
    setTextContent("");
  };

  return (
    <CreateStyles>
      <form onSubmit={handleCreateComment}>
        <img src={state?.currentUser?.image?.png} alt="avatar" />
        <textarea
          name="new comment"
          id="new comment"
          rows="5"
          placeholder="Add a comment... or just push the send button"
          aria-label="new comment"
          onChange={handleOnChange}
        ></textarea>
        <button>SEND</button>
      </form>
    </CreateStyles>
  );
};

export default CreateNewComment;
