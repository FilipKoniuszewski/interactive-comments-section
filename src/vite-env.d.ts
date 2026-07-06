/// <reference types="vite/client" />

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "javascript-time-ago/locale/en.json" {
  const locale: object;
  export default locale;
}

declare module "*seed-data.json" {
  import type { Comment, User } from "@/features/types/comment.types";

  const data: {
    currentUser: User;
    comments: Comment[];
  };

  export default data;
}
