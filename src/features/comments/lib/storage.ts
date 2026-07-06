import type { Comment } from "../types/comment.types";

const STORAGE_KEY = "comments";

export function loadComments(fallbackComments: Comment[]): Comment[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackComments));
    return fallbackComments;
  }

  return JSON.parse(stored) as Comment[];
}

export function saveComments(comments: Comment[]): void {
  if (comments.length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }
}

export function clearStoredComments(): void {
  localStorage.removeItem(STORAGE_KEY);
}
