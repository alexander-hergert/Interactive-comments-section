import React, { useEffect } from "react";
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
  //DESKTOP
  @media only screen and (min-width: 800px) {
  }
`;

/***************** COMPONENT ******************/

const SwitchUserContainer = () => {
  return (
    <Styles>
      {users.map((user) => {
        return <SwitchUser key={user.username} user={user} />;
      })}
    </Styles>
  );
};

export default SwitchUserContainer;
