import React from "react";

const Create = ({ currentUser }) => {
  return (
    <div>
      <img src={currentUser.image?.png} alt="avatar" />
      <form action="">
        <textarea
          name="newComment"
          id="newComment"
          cols="30"
          rows="10"
          placeholder="Add a Comment..."
        ></textarea>
        <button>SEND</button>
      </form>
    </div>
  );
};

export default Create;
