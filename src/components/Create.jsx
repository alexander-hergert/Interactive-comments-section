import React from "react";
import { styled } from "styled-components";

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
  }

  textarea {
    padding: 2rem;
    border-radius: 5px;
    grid-area: textarea;
  }

  button {
    padding: 1rem 2rem;
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

const Create = ({ currentUser }) => {
  return (
    <CreateStyles>
      <img src={currentUser.image?.png} alt="avatar" />
      <textarea
        name="new comment"
        id="new comment"
        cols="30"
        rows="10"
        placeholder="Add a comment..."
        aria-label="new comment"
      ></textarea>
      <button>SEND</button>
    </CreateStyles>
  );
};

export default Create;
