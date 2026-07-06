import { CommentsProvider } from "@/features/context/CommentsProvider";
import { CommentsSection } from "@/features/components/CommentsSection";
import { DeleteModal } from "@/features/components/DeleteModal";
import "@/styles/global.scss";

export function App() {
  return (
    <CommentsProvider>
      <main className="app">
        <h1 className="visually-hidden">Interactive comments section</h1>
        <DeleteModal />
        <CommentsSection />
      </main>
    </CommentsProvider>
  );
}
