import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useGlobalContext } from "../context";

/***************** STYLES ******************/
const Styles = styled.div`
  cursor: pointer;

  @media only screen and (min-width: 800px) {
  }
`;

/***************** COMPONENT ******************/

const SwitchUser = ({ user }) => {
  const { username, path } = user;
  const { state, dispatch } = useGlobalContext();
  const ref = useRef();

  const handleSwitchUser = () => {
    //payload
    const newUser = {
      image: {
        png: `${path}.png`,
        webp: `${path}.webp`,
      },
      username: username,
    };
    dispatch({ type: "SWITCH USER", payload: newUser });
  };

  useEffect(() => {}, [state]);

  return (
    <Styles onClick={handleSwitchUser} ref={ref}>
      <img src={`${path}.png`} alt={`${username}-avatar`} />
      <p>{username}</p>
    </Styles>
  );
};

export default SwitchUser;
