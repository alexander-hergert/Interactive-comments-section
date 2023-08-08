export const reducer = (state, action) => {
  switch (action.type) {
    case "RENDER":
      return action.payload;
    case "NEW COMMENT":
      const newComment = action.payload;
      const newComments = [...state.comments, newComment];
      return {
        ...state,
        comments: newComments,
      };
    case "NEW REPLY":
      const { commentId, newReply } = action.payload;
      const updatedComments = state.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      });
      return {
        ...state,
        comments: updatedComments,
      };
    default:
      throw new Error("Unsupported action type");
  }
};

export default reducer;
