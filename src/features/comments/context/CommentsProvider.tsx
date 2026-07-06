import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import seedData from "../../../data/seed-data.json";
import type { Comment, CommentsContextValue, Reply } from "../types/comment.types";
import {
  commentsReducer,
  initialDeleteTarget,
  initialState,
} from "../lib/commentsReducer";
import { loadComments, saveComments } from "../lib/storage";

const CommentsContext = createContext<CommentsContextValue | null>(null);

interface CommentsProviderProps {
  children: ReactNode;
}

export function CommentsProvider({ children }: CommentsProviderProps) {
  const [state, dispatch] = useReducer(commentsReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "INIT",
      comments: loadComments(seedData.comments as Comment[]),
      currentUser: seedData.currentUser,
    });
  }, []);

  useEffect(() => {
    saveComments(state.comments);
  }, [state.comments]);

  const value = useMemo<CommentsContextValue | null>(() => {
    if (!state.currentUser) {
      return null;
    }

    return {
      comments: state.comments,
      currentUser: state.currentUser,
      modalOpen: state.modalOpen,
      commentToDelete: state.commentToDelete,
      addComment: (comment: Comment) =>
        dispatch({ type: "ADD_COMMENT", comment }),
      addReply: (reply: Reply, commentId: number) =>
        dispatch({ type: "ADD_REPLY", reply, commentId }),
      deleteComment: () => {
        const { id, isReply } = state.commentToDelete;
        dispatch({ type: "DELETE_COMMENT", id, isReply });
        dispatch({ type: "SET_MODAL_OPEN", open: false });
        dispatch({
          type: "SET_COMMENT_TO_DELETE",
          payload: initialDeleteTarget,
        });
      },
      editComment: (id, content, isReply) =>
        dispatch({ type: "EDIT_COMMENT", id, content, isReply }),
      upVote: (id, isReply) =>
        dispatch({ type: "VOTE", id, isReply, direction: "up" }),
      downVote: (id, isReply) =>
        dispatch({ type: "VOTE", id, isReply, direction: "down" }),
      openDeleteModal: (id, isReply) => {
        dispatch({ type: "SET_COMMENT_TO_DELETE", payload: { id, isReply } });
        dispatch({ type: "SET_MODAL_OPEN", open: true });
      },
      closeModal: () => {
        dispatch({ type: "SET_MODAL_OPEN", open: false });
        dispatch({
          type: "SET_COMMENT_TO_DELETE",
          payload: initialDeleteTarget,
        });
      },
    };
  }, [state]);

  if (!value) {
    return null;
  }

  return (
    <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>
  );
}

export function useComments(): CommentsContextValue {
  const context = useContext(CommentsContext);

  if (!context) {
    throw new Error("useComments must be used within CommentsProvider");
  }

  return context;
}
