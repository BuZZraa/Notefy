import { useState } from "react";
import RootLayout from "./components/RootLayout.jsx";
import NewNote from "./components/Note/NewNote.jsx";
import NoteNotSelected from "./components/Note/NoteNotSelected.jsx";
import NotesSidebar from "./components/Note/NoteSidebar.jsx";
import SelectedNote from "./components/Note/SelectedNote.jsx";
import Register from "./components/Form/Register.jsx";
import Login from "./components/Form/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./components/PageNotFound.jsx";
import SecureRoute from "./utils/SecureRoute.jsx";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const noteId = useSelector(state => state.note.noteId);
  const [projectsState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectState((prevProjectsState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevProjectsState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevProjectsState,
        tasks: [...prevProjectsState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        tasks: projectsState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  let content = (
    <SelectedNote
    />
  );

  if (noteId === null) {
    content = (
      <NewNote />
    );
  } 
  
  else if (noteId === undefined) {
    content = <NoteNotSelected />;
  }
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <PageNotFound />,
      children: [
        { index: true, element: <Register /> },
        { path: "/login", element: <Login /> },
        {
          path: "/notefy",
          element: (
            <SecureRoute
              element={
                <main className="h-screen my-8 flex gap-8">
                  <ToastContainer position="bottom-right" closeOnClick />
                  <NotesSidebar
                  />
                  {content}
                </main>
              }    
            />           
          )
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;