import React, { useEffect } from "react";
import { fetchData } from "./utility/utility";
import Comments from "./components/Comments";
import CreateNewComment from "./components/CreateNewComment";
import { styled } from "styled-components";
import { useGlobalContext } from "./context";

/***************** STYLES ******************/
const AppStyles = styled.main`
  padding: 4rem 2rem;
`;

/***************** COMPONENT ******************/

function App() {
  const { dispatch } = useGlobalContext();
  const url = "/data.json";

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
      <Comments />
      <CreateNewComment />
    </AppStyles>
  );
}

export default App;
