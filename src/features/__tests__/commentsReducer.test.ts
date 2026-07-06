import { describe, expect, it } from "vitest";
import {
  commentsReducer,
  initialState,
  sortCommentsByScore,
} from "@/features/lib/commentsReducer";
import type { Comment } from "@/features/types/comment.types";

const currentUser = {
  username: "juliusomo",
  image: { png: "image-juliusomo.png", webp: "" },
};

const baseComment: Comment = {
  id: 1,
  content: "First",
  createdAt: "1 day ago",
  score: 3,
  vote: "no",
  user: {
    username: "amyrobson",
    image: { png: "image-amyrobson.png", webp: "" },
  },
  replies: [],
};

describe("commentsReducer", () => {
  it("initializes state from seed data", () => {
    const nextState = commentsReducer(initialState, {
      type: "INIT",
      comments: [baseComment],
      currentUser,
    });

    expect(nextState.comments).toHaveLength(1);
    expect(nextState.currentUser).toEqual(currentUser);
  });

  it("adds a top-level comment", () => {
    const initialized = commentsReducer(initialState, {
      type: "INIT",
      comments: [baseComment],
      currentUser,
    });

    const newComment: Comment = {
      ...baseComment,
      id: 2,
      content: "New comment",
      score: 0,
    };

    const nextState = commentsReducer(initialized, {
      type: "ADD_COMMENT",
      comment: newComment,
    });

    expect(nextState.comments).toHaveLength(2);
    expect(nextState.comments[1].content).toBe("New comment");
  });

  it("adds a reply without mutating other comments", () => {
    const initialized = commentsReducer(initialState, {
      type: "INIT",
      comments: [baseComment],
      currentUser,
    });

    const nextState = commentsReducer(initialized, {
      type: "ADD_REPLY",
      commentId: 1,
      reply: {
        id: 10,
        content: "Reply body",
        createdAt: new Date(),
        score: 0,
        vote: "no",
        replyingTo: "amyrobson",
        user: currentUser,
      },
    });

    expect(nextState.comments[0].replies).toHaveLength(1);
    expect(nextState.comments[0].replies[0].content).toBe("Reply body");
  });

  it("edits a reply immutably", () => {
    const withReply = commentsReducer(initialState, {
      type: "INIT",
      comments: [
        {
          ...baseComment,
          replies: [
            {
              id: 10,
              content: "Old reply",
              createdAt: "today",
              score: 1,
              vote: "no",
              replyingTo: "amyrobson",
              user: currentUser,
            },
          ],
        },
      ],
      currentUser,
    });

    const nextState = commentsReducer(withReply, {
      type: "EDIT_COMMENT",
      id: 10,
      content: "Updated reply",
      isReply: true,
    });

    expect(nextState.comments[0].replies[0].content).toBe("Updated reply");
    expect(withReply.comments[0].replies[0].content).toBe("Old reply");
  });

  it("deletes a top-level comment", () => {
    const initialized = commentsReducer(initialState, {
      type: "INIT",
      comments: [baseComment],
      currentUser,
    });

    const nextState = commentsReducer(initialized, {
      type: "DELETE_COMMENT",
      id: 1,
      isReply: false,
    });

    expect(nextState.comments).toHaveLength(0);
  });

  it("updates vote score for a comment", () => {
    const initialized = commentsReducer(initialState, {
      type: "INIT",
      comments: [baseComment],
      currentUser,
    });

    const nextState = commentsReducer(initialized, {
      type: "VOTE",
      id: 1,
      isReply: false,
      direction: "up",
    });

    expect(nextState.comments[0].score).toBe(4);
    expect(nextState.comments[0].vote).toBe("upVote");
  });
});

describe("sortCommentsByScore", () => {
  it("sorts comments from highest to lowest score", () => {
    const sorted = sortCommentsByScore([
      { ...baseComment, id: 1, score: 2 },
      { ...baseComment, id: 2, score: 8 },
      { ...baseComment, id: 3, score: 5 },
    ]);

    expect(sorted.map((comment) => comment.score)).toEqual([8, 5, 2]);
  });
});
