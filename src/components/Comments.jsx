import React from "react";
import Comment from "./Comment";
import { styled } from "styled-components";
import { useGlobalContext } from "../context";

/***************** STYLES ******************/
const CommentsStyles = styled.section`
  background-color: hsl(228, 33%, 97%);
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
