import React from "react";
import Comment from "./Comment";
import { styled } from "styled-components";
import { useGlobalContext } from "../context";

/***************** STYLES ******************/
const CommentsStyles = styled.section`
  background-color: hsl(228, 33%, 97%);

  @media only screen and (min-width: 800px) {
    width: 70%;
    margin: auto;
    min-width: 40rem;
  }
`;

/***************** COMPONENT ******************/

const Comments = () => {
  const { state } = useGlobalContext();

  return (
    <CommentsStyles>
      {state?.comments?.map((item) => (
        <Comment key={item.id} item={item} />
      ))}
    </CommentsStyles>
  );
};

export default Comments;
