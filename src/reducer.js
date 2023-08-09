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
    case "REPLY ON COMMENT":
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
    case "REPLY ON REPLY":
      const { replyId, newItem } = action.payload;
      // Create a deep copy of the comments array and its nested replies
      const newUpdatedComments = state.comments.map((comment) => ({
        ...comment,
        replies: comment.replies.map((reply) => ({ ...reply })),
      }));
      // Update the copy
      newUpdatedComments.forEach((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === replyId) {
            // This is where we compare the fixed comment.id (current comment's id) with
            // all the comments' ids again to find the index of the parent comment.
            const parentCommentIndex = newUpdatedComments.findIndex(
              //callback
              (c) => c.id === comment.id
            );
            if (parentCommentIndex !== -1) {
              // If we found a valid parent comment index, it means we've located the parent comment.
              // Push newItem (new reply) into the parent comment's replies array.
              newUpdatedComments[parentCommentIndex].replies.push(newItem);
            }
          }
        });
      });

      return {
        ...state,
        comments: newUpdatedComments,
      };

    default:
      throw new Error("Unsupported action type");
  }
};

export default reducer;
