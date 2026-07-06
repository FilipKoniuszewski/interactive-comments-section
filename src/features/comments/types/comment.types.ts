export type VoteState = "upVote" | "downVote" | "no";

export interface UserImage {
  png: string;
  webp: string;
}

export interface User {
  username: string;
  image: UserImage;
}

export interface Reply {
  id: number;
  content: string;
  createdAt: string | Date;
  score: number;
  vote: VoteState;
  replyingTo: string;
  user: User;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string | Date;
  score: number;
  vote: VoteState;
  user: User;
  replies: Reply[];
}

export interface DeleteTarget {
  id: number;
  isReply: boolean;
}

export interface CommentsState {
  comments: Comment[];
  currentUser: User | null;
  modalOpen: boolean;
  commentToDelete: DeleteTarget;
}

export type CommentsAction =
  | { type: "INIT"; comments: Comment[]; currentUser: User }
  | { type: "ADD_COMMENT"; comment: Comment }
  | { type: "ADD_REPLY"; reply: Reply; commentId: number }
  | { type: "DELETE_COMMENT"; id: number; isReply: boolean }
  | { type: "EDIT_COMMENT"; id: number; content: string; isReply: boolean }
  | { type: "VOTE"; id: number; isReply: boolean; direction: "up" | "down" }
  | { type: "SET_MODAL_OPEN"; open: boolean }
  | { type: "SET_COMMENT_TO_DELETE"; payload: DeleteTarget };

export interface CommentsContextValue {
  comments: Comment[];
  currentUser: User;
  modalOpen: boolean;
  commentToDelete: DeleteTarget;
  addComment: (comment: Comment) => void;
  addReply: (reply: Reply, commentId: number) => void;
  deleteComment: () => void;
  editComment: (id: number, content: string, isReply: boolean) => void;
  upVote: (id: number, isReply: boolean) => void;
  downVote: (id: number, isReply: boolean) => void;
  openDeleteModal: (id: number, isReply: boolean) => void;
  closeModal: () => void;
}
