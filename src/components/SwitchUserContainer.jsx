import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useGlobalContext } from "../context";
import { users } from "../users";
import SwitchUser from "./SwitchUser";

/***************** STYLES ******************/
const Styles = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 2rem;
  text-align: center;
  color: white;
  //DESKTOP
  @media only screen and (min-width: 800px) {
  }
`;

/***************** COMPONENT ******************/

const SwitchUserContainer = ({ isDarkMode }) => {
  const ref = useRef();

  useEffect(() => {
    if (isDarkMode) {
      ref.current.style.color = "white";
    } else {
      ref.current.style.color = "black";
    }
  }, [isDarkMode]);
  return (
    <Styles ref={ref}>
      {users.map((user) => {
        return (
          <SwitchUser key={user.username} user={user} isDarkMode={isDarkMode} />
        );
      })}
    </Styles>
  );
};

export default SwitchUserContainer;
