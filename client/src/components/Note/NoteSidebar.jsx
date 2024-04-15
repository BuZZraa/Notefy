import { useEffect, useState } from "react";
import Button from "../Form/Button.jsx"
import { capitalize } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import errorNotification from "../../utils/notification.js";
import { noteActions } from "../../store/userStore.js";

function ProjectSidebar() {
    const userId = useSelector(state => state.user.userId);
    const noteId = useSelector(state => state.note.noteId);
    const [notes, setNotes] = useState([{ notes: { _id: 'dummy_id', title: 'Dummy Note' } }]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/getnotes", {
                    headers: {
                        "Authorization": `Bearer ${userId}` 
                    }
                });

                if(response && response.data) {
                    setNotes(response.data.notes);
                }

            } catch (error) {
                errorNotification(error);
            }
        };
    
        fetchData();
    });

    function handleSelectProject(id) {
        dispatch(noteActions.setNoteId(id));
      }

    function addNote() {
        dispatch(noteActions.setNoteId(null));
    }
 
    return(
        <aside className="w-1/3 px-8 py-16 bg-indigo-200 md:w-72 rounded-md">

            <h1 className="text-3xl mb-8 text-stone-800 font-bold">Welcome, User</h1>
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-800">Your Notes</h2>
            <div>
                <Button onClick={addNote}>
                    + Add Note
                </Button>
            </div>
            <ul className="mt-8">
                {   notes && notes.length >= 1 && (
                    notes.map((note) =>  {
                    let cssClasses = "w-full text-left px-2 py-2 rounded-md my-1 font-semibold hover:border-white hover:border-2 hover:text-white hover:bg-indigo-800";                 

                    if(note._id === noteId) {
                        cssClasses += " bg-indigo-600 text-white"
                    } 

                    else {
                        cssClasses += " text-black";
                    }

                    return(<li key={note.notes._id}>
                        <button 
                          className={cssClasses}
                          onClick={() => handleSelectProject(note._id)}
                        >
                          {capitalize(note.notes.title)}
                        </button>
                    </li>);
                }))                
                }
            </ul>
        </aside>
    )
}

export default ProjectSidebar