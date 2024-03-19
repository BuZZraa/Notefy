import { useState } from "react";
import RootLayout from "./components/RootLayout.jsx";
import NewNote from "./components/Note/NewNote.jsx";
import NoteNotSelected from "./components/Note/NoteNotSelected.jsx";
import NotesSidebar from "./components/Note/NoteSidebar.jsx";
import SelectedNote from "./components/Note/SelectedNote.jsx";
import Register from "./components/Form/Register.jsx";
import Login from "./components/Form/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./components/PageNotFound.jsx"
import SecureRoute from "./utils/SecureRoute.jsx"
import { ToastContainer } from "react-toastify";

function App() {
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

  function handleSelectProject(id) {
    setProjectState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((prevProjectsState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: [...prevProjectsState.projects, newProject],
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: projectsState.projects.filter(
          (project) => project.id !== prevProjectsState.selectedProjectId
        ),
        tasks: prevProjectsState.tasks.filter(
          (task) => task.projectId !== prevProjectsState.selectedProjectId
        ),
      };
    });
  }
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  const selectedProjectTasks = projectsState.tasks.filter(
    (task) => task.projectId === projectsState.selectedProjectId
  );

  let content = (
    <SelectedNote
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={selectedProjectTasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewNote onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoteNotSelected onStartAddProject={handleStartAddProject} />;
  }
  const router = createBrowserRouter([
      {
        path: "/", 
        element: <RootLayout />, 
        errorElement: <PageNotFound />,
        children: [
          { index: true, element: <Register /> },
          { path: "/login", element: <Login /> },
          { path: "/notefy", element: 
              <SecureRoute element={
                <main className="h-screen my-8 flex gap-8">
                  <ToastContainer position="bottom-right" closeOnClick />
                  <NotesSidebar
                    onStartAddProject={handleStartAddProject}
                    projects={projectsState.projects}
                    onSelectProject={handleSelectProject}
                    selectedProjectId={projectsState.selectedProjectId}
                  />
                  {content}
                </main>}
               />
          }
        ]
      }
  ]);

  return <RouterProvider router={router} />;
}

export default App;