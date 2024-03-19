import Tasks from "../Tasks/Tasks.jsx";
import { capitalize } from "lodash";
function SelectedProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  tasks,
}) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-[35rem] mt-16 border-2 border-stone-800 p-5 h-fit rounded-md">
      <div className="pb-4 mb-4 border-b-2 border-stone-400">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-2">
            {capitalize(project.title)}
          </h1>
          <button
            className= "bg-red-700 px-4 py-2 rounded-md text-white hover:bg-red-800"
            onClick={onDelete}
          >
            Delete Note
          </button>
        </div>
        <p className="mb-4 text-stone-500">{formattedDate}</p>
        <p className="whitespace-pre-wrap">
          {project.description}
        </p>
      </div>
      <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
    </div>
  );
}

export default SelectedProject;