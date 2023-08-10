import React from "react";
import Reply from "./Reply";
import { styled } from "styled-components";

/***************** STYLES ******************/
const RepliesStyles = styled.section`
  border-left: 2px solid hsl(223, 19%, 93%);
  padding-left: 1rem;

  //DESKTOP
  @media only screen and (min-width: 800px) {
    margin-left: 2.5rem;
    padding-left: 2.5rem;
  }
`;
/***************** COMPONENT ******************/
const Replies = ({ replies }) => {
  return (
    <RepliesStyles>
      {replies.map((item) => (
        <Reply key={item.id} item={item} />
      ))}
    </RepliesStyles>
  );
};

export default Replies;
