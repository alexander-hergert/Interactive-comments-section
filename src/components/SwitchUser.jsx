import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useGlobalContext } from "../context";

/***************** STYLES ******************/
const Styles = styled.div`
  cursor: pointer;

  &.selected-user {
    img {
      box-shadow: 0 0 20px hsl(238, 40%, 52%);
      border-radius: 50%;
    }
    p {
      font-weight: bold;
      color: hsl(238, 40%, 52%);
    }
  }

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

  useEffect(() => {
    const currentUserName = state.currentUser?.username;
    if (currentUserName === username) {
      ref.current.classList.add("selected-user");
    } else {
      ref.current.classList.remove("selected-user");
    }
  }, [state]);

  return (
    <Styles onClick={handleSwitchUser} ref={ref}>
      <img src={`${path}.png`} alt={`${username}-avatar`} />
      <p>{username}</p>
    </Styles>
  );
};

export default SwitchUser;
