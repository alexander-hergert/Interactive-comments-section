import React from "react";
import Reply from "./Reply";

const Replies = ({ replies }) => {
  return <div>{replies.map((item) => <Reply key={item.id} item={item}/>)}</div>;
};

export default Replies;
