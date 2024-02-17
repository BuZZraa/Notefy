import Button from "../Button.jsx"
import { capitalize } from "lodash";
function ProjectSidebar({onStartAddProject, projects, onSelectProject, selectedProjectId}) {
    return(
        <aside className="w-1/3 px-8 py-16 bg-yellow-300 md:w-72 rounded-r-xl border-2 border-solid border-stone-400">
            <h1 className="text-3xl mb-8 text-stone-800 font-bold">Welcome, User</h1>
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-600">Your Notes</h2>
            <div>
                <Button onClick={onStartAddProject}>
                    + Add Note
                </Button>
            </div>
            <ul className="mt-8">
                {projects.map((project) =>  {
                    let cssClasses = "w-full text-left px-2 py-2 rounded-md my-1 font-semibold hover:text-stone-200 hover:bg-yellow-800";

                    if(project.id === selectedProjectId) {
                        cssClasses += " border-4 border-solid border-yellow-800 text-yellow-900"
                    } 

                    else {
                        cssClasses += " text-stone-800";
                    }

                    return(<li key={project.id}>
                        <button 
                          className={cssClasses}
                          onClick={() => onSelectProject(project.id)}>
                          {capitalize(project.title)}
                        </button>
                    </li>);
                })}
            </ul>
        </aside>
    )
}

export default ProjectSidebar