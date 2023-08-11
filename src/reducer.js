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
              (c) => c.id === comment.id //Iterate parent id with current fix id
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
          //Handle comment
          //execute when comment.upvotedby has no entry of currentUserName
          //logic to upvote like on youtube
          const alreadyUpvoted = comment.upvotedBy.includes(
            currentUserNameUpvote
          );
          const alreadyDownvoted = comment.downvotedBy.includes(
            currentUserNameUpvote
          );
          if (!alreadyUpvoted && !alreadyDownvoted) {
            comment.score += 1;
            comment.upvotedBy.push(currentUserNameUpvote);
          } else if (alreadyUpvoted && !alreadyDownvoted) {
            comment.score -= 1;
            comment.upvotedBy = comment.upvotedBy.filter(
              (username) => username !== currentUserNameUpvote
            );
          } else if (!alreadyUpvoted && alreadyDownvoted) {
            comment.score += 2;
            comment.upvotedBy.push(currentUserNameUpvote);
            comment.downvotedBy = comment.downvotedBy.filter(
              (username) => username !== currentUserNameUpvote
            );
          }
        } else {
          //Handle reply
          comment.replies.forEach((reply) => {
            if (upvoteId === reply.id) {
              const alreadyUpvoted = reply.upvotedBy.includes(
                currentUserNameUpvote
              );
              const alreadyDownvoted = reply.downvotedBy.includes(
                currentUserNameUpvote
              );
              if (!alreadyUpvoted && !alreadyDownvoted) {
                reply.score += 1;
                reply.upvotedBy.push(currentUserNameUpvote);
              } else if (alreadyUpvoted && !alreadyDownvoted) {
                reply.score -= 1;
                reply.upvotedBy = reply.upvotedBy.filter(
                  (username) => username !== currentUserNameUpvote
                );
              } else if (!alreadyUpvoted && alreadyDownvoted) {
                reply.score += 2;
                reply.upvotedBy.push(currentUserNameUpvote);
                reply.downvotedBy = reply.downvotedBy.filter(
                  (username) => username !== currentUserNameUpvote
                );
              }
            }
          });
        }
      });
      //sort comments by highest score
      newUpvoteComments.sort((a, b) => b.score - a.score);

      return {
        ...state,
        comments: newUpvoteComments,
      };

    case "DOWNVOTE A COMMENT":
      const { downvoteId, currentUserNameDownvote } = action.payload;
      //deep copy
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
      //Iterating to find id of comment or reply
      newDownvoteComments.forEach((comment) => {
        if (downvoteId === comment.id) {
          const alreadyUpvoted = comment.upvotedBy.includes(
            currentUserNameDownvote
          );
          const alreadyDownvoted = comment.downvotedBy.includes(
            currentUserNameDownvote
          ); //Handle comment
          if (!alreadyUpvoted && !alreadyDownvoted) {
            comment.score -= 1;
            comment.downvotedBy.push(currentUserNameDownvote);
          } else if (!alreadyUpvoted && alreadyDownvoted) {
            comment.score += 1;
            comment.downvotedBy = comment.downvotedBy.filter(
              (username) => username !== currentUserNameDownvote
            );
          } else if (alreadyUpvoted && !alreadyDownvoted) {
            comment.score -= 2;
            comment.downvotedBy.push(currentUserNameDownvote);
            comment.upvotedBy = comment.upvotedBy.filter(
              (username) => username !== currentUserNameDownvote
            );
          }
        } else {
          //Handle reply
          comment.replies.forEach((reply) => {
            if (downvoteId === reply.id) {
              const alreadyUpvoted = reply.upvotedBy.includes(
                currentUserNameDownvote
              );
              const alreadyDownvoted = reply.downvotedBy.includes(
                currentUserNameDownvote
              );
              if (!alreadyUpvoted && !alreadyDownvoted) {
                reply.score -= 1;
                reply.downvotedBy.push(currentUserNameDownvote);
              } else if (!alreadyUpvoted && alreadyDownvoted) {
                reply.score += 1;
                reply.downvotedBy = reply.downvotedBy.filter(
                  (username) => username !== currentUserNameDownvote
                );
              } else if (alreadyUpvoted && !alreadyDownvoted) {
                reply.score -= 2;
                reply.downvotedBy.push(currentUserNameDownvote);
                reply.upvotedBy = reply.upvotedBy.filter(
                  (username) => username !== currentUserNameDownvote
                );
              }
            }
          });
        }
      });

      newDownvoteComments.sort((a, b) => b.score - a.score);

      return {
        ...state,
        comments: newDownvoteComments,
      };
    case "ON EDIT":
      const { editId, newText } = action.payload;
      //Deep copy
      const newEditComments = state.comments.map((comment) => ({
        ...comment,
        upvotedBy: [...comment.upvotedBy],
        downvotedBy: [...comment.downvotedBy],
        replies: comment.replies.map((reply) => ({
          ...reply,
          upvotedBy: [...reply.upvotedBy],
          downvotedBy: [...reply.downvotedBy],
        })),
      }));
      //logic for edit
      newEditComments.forEach((comment) => {
        if (editId === comment.id) {
          comment.content = newText;
        } else {
          comment.replies.forEach((reply) => {
            if (editId === reply.id) {
              reply.content = newText;
            }
          });
        }
      });
      return {
        ...state,
        comments: newEditComments,
      };
    case "ON DELETE":
      const { deleteId } = action.payload;
      //logic for delete
      const newDeleteComments = state.comments
        .map((comment) => ({
          ...comment,
          replies: comment.replies.filter((reply) => deleteId !== reply.id),
        }))
        .filter((comment) => deleteId !== comment.id);
      return {
        ...state,
        comments: newDeleteComments,
      };
    case "SWITCH USER":
      const newUser = action.payload;

      console.log({
        ...state,
        currentUser: newUser,
      });

      return {
        ...state,
        currentUser: newUser,
      };

    default:
      throw new Error("Unsupported action type");
  }
};

export default reducer;
