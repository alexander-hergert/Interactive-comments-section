const reducer = (state, action) => {
  switch (action.type) {
    case "RENDER":
      return action.payload;
    case "NEW COMMENT":
      const newComment = action.payload;
      const newComments = [...state.comments, newComment];
      const newState = {
        ...state,
        comments: newComments,
      };
      return newState;
    default:
      throw new Error("Unsupported action type");
  }
};

export default reducer;
