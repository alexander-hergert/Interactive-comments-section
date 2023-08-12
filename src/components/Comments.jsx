import React, { useEffect, useRef } from "react";
import Comment from "./Comment";
import { styled } from "styled-components";
import { useGlobalContext } from "../context";

/***************** STYLES ******************/
const CommentsStyles = styled.section`
  background-color: hsl(228, 33%, 97%);
  transition: all 1s;

  @media only screen and (min-width: 800px) {
    width: 60%;
    margin: auto;
    min-width: 40rem;
  }
`;

/***************** COMPONENT ******************/

const Comments = ({ isDarkMode }) => {
  const { state } = useGlobalContext();

  const ref = useRef();

  useEffect(() => {
    if (isDarkMode) {
      ref.current.style.backgroundColor = "hsl(212, 24%, 26%)";
    } else {
      ref.current.style.backgroundColor = "hsl(228, 33%, 97%)";
    }
  }, [isDarkMode]);

  return (
    <CommentsStyles ref={ref}>
      {state?.comments?.map((item) => (
        <Comment key={item.id} item={item} />
      ))}
    </CommentsStyles>
  );
};

export default Comments;
