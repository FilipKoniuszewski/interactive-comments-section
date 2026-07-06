import { beforeEach, describe, expect, it } from "vitest";
import type { Comment } from "@/features/comments/types/comment.types";
import {
  clearStoredComments,
  loadComments,
  saveComments,
} from "@/features/comments/lib/storage";

const fallbackComments: Comment[] = [
  {
    id: 1,
    content: "Seed comment",
    createdAt: "today",
    score: 1,
    vote: "no",
    user: {
      username: "amyrobson",
      image: { png: "image-amyrobson.png", webp: "" },
    },
    replies: [],
  },
];

describe("storage", () => {
  beforeEach(() => {
    clearStoredComments();
  });

  it("stores fallback comments when localStorage is empty", () => {
    const comments = loadComments(fallbackComments);

    expect(comments).toEqual(fallbackComments);
    expect(localStorage.getItem("comments")).toBe(JSON.stringify(fallbackComments));
  });

  it("reads comments from localStorage when present", () => {
    const stored: Comment[] = [
      {
        ...fallbackComments[0],
        id: 99,
        content: "Persisted comment",
      },
    ];

    localStorage.setItem("comments", JSON.stringify(stored));

    expect(loadComments(fallbackComments)).toEqual(stored);
  });

  it("persists non-empty comment lists", () => {
    saveComments(fallbackComments);

    expect(JSON.parse(localStorage.getItem("comments")!)).toEqual(fallbackComments);
  });
});
