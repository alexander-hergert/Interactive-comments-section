import React from "react";
import { styled } from "styled-components";
import { useGlobalContext } from "../context";

/***************** STYLES ******************/
const Styles = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 2rem;
  text-align: center;
  div {
    cursor: pointer;
  }

  //DESKTOP
  @media only screen and (min-width: 800px) {
  }
`;

/***************** COMPONENT ******************/

const SwitchUser = () => {
  const { state, dispatch } = useGlobalContext();

  const handleSwitchUser = (path, username) => {
    //payload
    const newUser = {
      currentUser: {
        image: {
          png: `${path}.png`,
          webp: `${path}.webp`,
        },
        username: username,
      },
    };
    dispatch({ type: "SWITCH USER", payload: newUser });
  };

  return (
    <Styles>
      <div
        onClick={() =>
          handleSwitchUser(
            "/assets/images/avatars/image-amyrobson",
            "amyrobson"
          )
        }
      >
        <img
          src="/assets/images/avatars/image-amyrobson.png"
          alt="amyrobson-avatar"
        />
        <p>amyrobson</p>
      </div>
      <div
        onClick={() =>
          handleSwitchUser(
            "/assets/images/avatars/image-juliusomo",
            "juliusomo"
          )
        }
      >
        <img
          src="/assets/images/avatars/image-juliusomo.png"
          alt="juliusomo-avatar"
        />
        <p>juliusomo</p>
      </div>
      <div
        onClick={() =>
          handleSwitchUser(
            "/assets/images/avatars/image-maxblagun",
            "maxblagun"
          )
        }
      >
        <img
          src="/assets/images/avatars/image-maxblagun.png"
          alt="maxblagun-avatar"
        />
        <p>maxblagun</p>
      </div>
      <div
        onClick={() =>
          handleSwitchUser(
            "/assets/images/avatars/image-ramsesmiron",
            "ramsesmiron"
          )
        }
      >
        <img
          src="/assets/images/avatars/image-ramsesmiron.png"
          alt="ramsesmiron-avatar"
        />
        <p>ramsesmiron</p>
      </div>
    </Styles>
  );
};

export default SwitchUser;
