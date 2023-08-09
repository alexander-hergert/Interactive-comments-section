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
    case "UPVOTE A COMMENT":
      const { upvoteId, currentUserNameUpvote } = action.payload;
      // Create a deep copy of the comments array and its nested replies
      //Example for a super complex deep copy :D
      const newUpvoteComments = state.comments.map((comment) => ({
        ...comment,
        upvotedBy: [...comment.upvotedBy], // Deep copy of upvotedBy array
        downvotedBy: [...comment.downvotedBy], // Deep copy of downvotedBy array
        replies: comment.replies.map((reply) => ({
          ...reply,
          upvotedBy: [...reply.upvotedBy],
          downvotedBy: [...reply.downvotedBy],
        })),
      }));

      newUpvoteComments.forEach((comment) => {
        if (upvoteId === comment.id) {
          //execute when comment.upvotedby has no entry of currentUserName
          const alreadyUpvoted = comment.upvotedBy.includes(
            currentUserNameUpvote
          );
          if (!alreadyUpvoted) {
            comment.score += 1;
            comment.upvotedBy.push(currentUserNameUpvote);
          }
        } else {
          comment.replies.forEach((reply) => {
            if (upvoteId === reply.id) {
              const alreadyUpvoted = reply.upvotedBy.includes(
                currentUserNameUpvote
              );
              if (!alreadyUpvoted) {
                reply.score += 1;
                reply.upvotedBy.push(currentUserNameUpvote);
              }
            }
          });
        }
      });

      return {
        ...state,
        comments: newUpvoteComments,
      };

    case "DOWNVOTE A COMMENT":
      const { downvoteId, currentUserNameDownvote } = action.payload;

      const newDownvoteComments = state.comments.map((comment) => ({
        ...comment,
        upvotedBy: [...comment.upvotedBy],
        downvotedBy: [...comment.downvotedBy],
        replies: comment.replies.map((reply) => ({
          ...reply,
          upvotedBy: [...reply.upvotedBy],
          downvotedBy: [...reply.downvotedBy],
        })),
      }));

      newDownvoteComments.forEach((comment) => {
        if (downvoteId === comment.id) {
          const alreadyDownvoted = comment.downvotedBy.includes(
            currentUserNameDownvote
          );
          if (!alreadyDownvoted) {
            comment.score -= 1;
            comment.downvotedBy.push(currentUserNameDownvote);
          }
        } else {
          comment.replies.forEach((reply) => {
            if (downvoteId === reply.id) {
              const alreadyDownvoted = reply.downvotedBy.includes(
                currentUserNameDownvote
              );
              if (!alreadyDownvoted) {
                reply.score -= 1;
                reply.downvotedBy.push(currentUserNameDownvote);
              }
            }
          });
        }
      });

      return {
        ...state,
        comments: newDownvoteComments,
      };
    default:
      throw new Error("Unsupported action type");
  }
};

export default reducer;
