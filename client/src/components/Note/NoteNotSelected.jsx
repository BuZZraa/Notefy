import noNotesImage from "../../assets/no-notes.png"
import Button from "../Button";
function NoteNotSelected({onStartAddProject}) {
    return(
        <div className="mt-24 text-center w-2/3">
            <img src={noNotesImage} alt="An empty task list" className="w-16 h-16 object-contain mx-auto"/>
            <h2 className="text-xl font-bold my-4">Select a Note to view</h2>
            <p className="mb-4">Click on a note from the list to see its details and contents.</p>
            <p className="mt-8">
                <Button onClick={onStartAddProject}>Create new note</Button>
            </p>
        </div>
    )
}

export default NoteNotSelected;