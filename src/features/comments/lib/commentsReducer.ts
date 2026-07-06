import type { Comment, CommentsAction, CommentsState, DeleteTarget } from "../types/comment.types";

export const initialDeleteTarget: DeleteTarget = { id: 0, isReply: false };

export const initialState: CommentsState = {
  comments: [],
  currentUser: null,
  modalOpen: false,
  commentToDelete: initialDeleteTarget,
};

export function commentsReducer(
  state: CommentsState,
  action: CommentsAction
): CommentsState {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        comments: action.comments,
        currentUser: action.currentUser,
      };

    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.comment],
      };

    case "ADD_REPLY":
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.commentId
            ? { ...comment, replies: [...comment.replies, action.reply] }
            : comment
        ),
      };

    case "DELETE_COMMENT": {
      const { id, isReply } = action;

      if (isReply) {
        return {
          ...state,
          comments: state.comments.map((comment) => ({
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== id),
          })),
        };
      }

      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== id),
      };
    }

    case "EDIT_COMMENT": {
      const { id, content, isReply } = action;

      if (isReply) {
        return {
          ...state,
          comments: state.comments.map((comment) => ({
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === id ? { ...reply, content } : reply
            ),
          })),
        };
      }

      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === id ? { ...comment, content } : comment
        ),
      };
    }

    case "VOTE": {
      const { id, isReply, direction } = action;
      const delta = direction === "up" ? 1 : -1;
      const vote = direction === "up" ? "upVote" : "downVote";

      if (isReply) {
        return {
          ...state,
          comments: state.comments.map((comment) => ({
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === id
                ? { ...reply, score: reply.score + delta, vote }
                : reply
            ),
          })),
        };
      }

      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === id
            ? { ...comment, score: comment.score + delta, vote }
            : comment
        ),
      };
    }

    case "SET_MODAL_OPEN":
      return { ...state, modalOpen: action.open };

    case "SET_COMMENT_TO_DELETE":
      return { ...state, commentToDelete: action.payload };

    default:
      return state;
  }
}

export function sortCommentsByScore(comments: Comment[]): Comment[] {
  return [...comments].sort((a, b) => b.score - a.score);
}
