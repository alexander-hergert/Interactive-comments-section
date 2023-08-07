import React, { useEffect, useState } from "react";
import { fetchData } from "../utility/utility";
import Comment from "./Comment";

const Comments = () => {
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
    <section>
      {comments.map((item) => (
        <Comment key={item.id} item={item}/>
      ))}
    </section>
  );
};

export default Comments;
