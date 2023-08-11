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

  &.selected-user-dark {
    img {
      box-shadow: 0 0 20px hsl(358, 79%, 66%);
      border-radius: 50%;
    }
    p {
      font-weight: bold;
      color: hsl(358, 79%, 66%);
    }
  }

  @media only screen and (min-width: 800px) {
  }
`;

/***************** COMPONENT ******************/

const SwitchUser = ({ user, isDarkMode }) => {
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
      if (isDarkMode) {
        ref.current.classList.add("selected-user-dark");
      } else {
        ref.current.classList.add("selected-user");
      }
    } else {
      ref.current.classList.remove("selected-user-dark");
      ref.current.classList.remove("selected-user");
    }
  }, [state]);

  useEffect(() => {
    const currentUserName = state.currentUser?.username;
    if (isDarkMode && currentUserName === username) {
      ref.current.classList.add("selected-user-dark");
    } else {
      ref.current.classList.remove("selected-user-dark");
    }
  }, [isDarkMode]);

  return (
    <Styles onClick={handleSwitchUser} ref={ref}>
      <img src={`${path}.png`} alt={`${username}-avatar`} />
      <p>{username}</p>
    </Styles>
  );
};

export default SwitchUser;
