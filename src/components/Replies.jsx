import React from "react";
import Reply from "./Reply";
import { styled } from "styled-components";

/***************** STYLES ******************/
const RepliesStyles = styled.section`
  //margin-left: 2.5rem;
  border-left: 2px solid hsl(223, 19%, 93%);
  padding-left: 1rem;
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
