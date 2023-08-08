import React, { useEffect, useState, useReducer } from "react";
import { fetchData } from "./utility/utility";
import Comments from "./components/Comments";
import Create from "./components/Create";
import { styled } from "styled-components";
import reducer from "./reducer";

/***************** STYLES ******************/
const AppStyles = styled.main`
  padding: 4rem 2rem;
`;

/***************** COMPONENT ******************/

function App() {
  const [state, dispatch] = useReducer(reducer, {});
  const url = "/src/data.json";

  useEffect(() => {
    const fetchDataAsync = async (url) => {
      try {
        const data = await fetchData(url);
        dispatch({ type: "RENDER", payload: data });
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchDataAsync(url);
  }, []);

  return (
    <AppStyles>
      <Comments state={state} />
      <Create state={state} dispatch={dispatch} />
    </AppStyles>
  );
}

export default App;
