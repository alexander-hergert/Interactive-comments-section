import React, { useEffect, useState } from "react";
import { fetchData, readLocalData } from "./utility/utility";
import Comments from "./components/Comments";
import CreateNewComment from "./components/CreateNewComment";
import { styled } from "styled-components";
import { useGlobalContext } from "./context";
import SwitchUserContainer from "./components/SwitchUserContainer";
import DarkMode from "./components/DarkMode";

/***************** STYLES ******************/
const AppStyles = styled.main`
  padding: 4rem 2rem;
`;

/***************** COMPONENT ******************/

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { dispatch } = useGlobalContext();
  const url = "/data.json";

  useEffect(() => {
    const localData = readLocalData();
    if (localData) {
      dispatch({ type: "RENDER", payload: localData });
    } else {
      const fetchDataAsync = async (url) => {
        try {
          const data = await fetchData(url);
          dispatch({ type: "RENDER", payload: data });
        } catch (error) {
          console.log("Error fetching data:", error.message);
        }
      };
      fetchDataAsync(url);
    }
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.backgroundColor = "black";
    if (isDarkMode) {
      body.style.backgroundColor = "hsl(212, 24%, 26%)";
    } else {
      body.style.backgroundColor = "hsl(228, 33%, 97%)";
    }
  }, [isDarkMode]);

  return (
    <AppStyles>
      <main>
        <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <SwitchUserContainer isDarkMode={isDarkMode} />
        <Comments isDarkMode={isDarkMode} />
        <CreateNewComment />
      </main>
    </AppStyles>
  );
}

export default App;
