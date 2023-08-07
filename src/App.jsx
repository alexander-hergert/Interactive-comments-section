import React, { useEffect, useState } from "react";
import { fetchData } from "./utility/utility";
import Comments from "./components/Comments";
import Create from "./components/Create";
import { styled } from "styled-components";

/***************** STYLES ******************/
const AppStyles = styled.main`
  padding: 4rem 2rem;
`;

/***************** COMPONENT ******************/

function App() {
  const url = "/src/data.json";
  const [currentUser, setCurrentUser] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async (url) => {
      try {
        const data = await fetchData(url);
        setCurrentUser(data.currentUser);
        setComments(data.comments);
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchDataAsync(url);
  }, []);
  return (
    <AppStyles>
      <Comments comments={comments} />
      <Create currentUser={currentUser} />
    </AppStyles>
  );
}

export default App;
