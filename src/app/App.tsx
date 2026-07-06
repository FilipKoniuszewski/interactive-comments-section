import { CommentsProvider } from "@/features/comments/context/CommentsProvider";
import { CommentsSection } from "@/features/comments/components/CommentsSection";
import { DeleteModal } from "@/features/comments/components/DeleteModal";
import "@/styles/global.scss";

export function App() {
  return (
    <CommentsProvider>
      <main className="app">
        <DeleteModal />
        <CommentsSection />
      </main>
    </CommentsProvider>
  );
}
