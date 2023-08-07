import React from "react";
import Reply from "./Reply";
import { styled } from "styled-components";

/***************** STYLES ******************/
const RepliesStyles = styled.section`
  margin-left: 2.5rem;
  border-left: 1px solid gray;
  padding-left: 2.5rem;
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
