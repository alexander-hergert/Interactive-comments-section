import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { nanoid } from "nanoid";
import { useGlobalContext } from "../context";

/***************** STYLES ******************/
const CreateStyles = styled.div`
  border-radius: 5px;
  background-color: white;
  padding: 1rem;
  margin: 1rem 0;

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
    padding: 0.75rem 1rem;
    justify-self: end;
  }

  button:hover {
    opacity: 70%;
  }

  //DESKTOP
  @media only screen and (min-width: 800px) {
    margin: 1rem auto;
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

const ReplyForm = ({ commentId, handleToggle, replyingTo }) => {
  const { state, dispatch } = useGlobalContext();
  const [textContent, setTextContent] = useState("");

  const fetchQuote = async () => {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    setTextContent(data.slip.advice);
  };

  useEffect(() => {
    fetchQuote();
  }, [state]);

  const handleReply = async (e) => {
    e.preventDefault();
    const inputText = e.target[0].value.trim();

    //Input validation
    if (!inputText || /^[\s\n]*$/.test(inputText)) {
      const quote = await fetchQuote();
      e.target[0].value = quote;
    } else {
      const sanitizedText = textContent.replace(/[\r\n]+/g, "\n");
      setTextContent(sanitizedText);
    }
    //creating the payload
    const newId = nanoid();
    const newContent = e.target[0].value;
    const newDate = new Date().getTime();
    const newScore = 0;
    const userName = state.currentUser.username;
    const imageSrc = state.currentUser.image.png;

    const newReply = {
      id: newId,
      content: newContent,
      createdAt: newDate,
      score: newScore,
      upvotedBy: [],
      downvotedBy: [],
      replyingTo: replyingTo,
      user: {
        image: {
          png: imageSrc,
          webp: "/assets/images/avatars/image-amyrobson.webp",
        },
        username: userName,
      },
    };
    const replyId = commentId;
    const newItem = newReply;

    const isReply = state.comments.some((comment) => {
      return comment.replies.some((reply) => reply.id === commentId);
    });

    if (isReply) {
      dispatch({ type: "REPLY ON REPLY", payload: { replyId, newItem } });
    } else {
      dispatch({ type: "REPLY ON COMMENT", payload: { commentId, newReply } });
    }
    handleToggle(false);
  };

  return (
    <CreateStyles>
      <form onSubmit={handleReply}>
        <img src={state?.currentUser?.image?.png} alt="avatar" />
        <textarea
          name="new comment"
          id="new comment"
          rows="5"
          placeholder="Add a comment... or just push the send button"
          aria-label="new comment"
        ></textarea>
        <button>Reply</button>
      </form>
    </CreateStyles>
  );
};

export default ReplyForm;
