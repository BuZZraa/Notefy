import NotesSidebar from "./Note/NotesSidebar.jsx";
import SelectedNote from "./Note/SelectedNote.jsx";
import NewNote from "./Note/NewNote.jsx";
import NoteNotSelected from "./Note/NoteNotSelected.jsx";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function Home() {
  const noteId = useSelector((state) => state.note.noteId);
  let content = <SelectedNote />;

  if (noteId === null) {
    content = <NewNote />;
  } else if (noteId === undefined) {
    content = <NoteNotSelected />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ToastContainer position="bottom-right" closeOnClick />
      <NotesSidebar />
      {content}
    </main>
  );
}

export default Home;
