import Button from "../Button.jsx"
import { capitalize } from "lodash";
function ProjectSidebar({onStartAddProject, projects, onSelectProject, selectedProjectId}) {
    return(
        <aside className="w-1/3 px-8 py-16 bg-indigo-200 md:w-72 rounded-r-xl shadow-xl">
            <h1 className="text-3xl mb-8 text-stone-800 font-bold">Welcome, User</h1>
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-800">Your Notes</h2>
            <div>
                <Button onClick={onStartAddProject}>
                    + Add Note
                </Button>
            </div>
            <ul className="mt-8">
                {projects.map((project) =>  {
                    let cssClasses = "w-full text-left px-2 py-2 rounded-md my-1 font-semibold hover:border-white hover:border-2 hover:text-white hover:bg-indigo-800";

                    if(project.id === selectedProjectId) {
                        cssClasses += " bg-indigo-600 text-white"
                    } 

                    else {
                        cssClasses += " text-black";
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