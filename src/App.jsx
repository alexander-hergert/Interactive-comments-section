import React, { useEffect, useState } from "react";
import { fetchData } from "./utility/utility";
import Comments from "./components/Comments";
import Create from "./components/Create";

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
    <main>
      <Comments comments={comments} />
      <Create currentUser={currentUser}/>
    </main>
  );
}

export default App;
