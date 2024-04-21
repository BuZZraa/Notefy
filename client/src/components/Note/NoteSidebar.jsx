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
    const [notes, setNotes] = useState([{ notes: { _id: 'loading...', title: 'loading...' } }]);
    const [user, setUser] = useState("User")
    const dispatch = useDispatch();

    useEffect(() => 
    async () => {
        try {
            if(userId === "") {
                errorNotification("User id not set to retrieve notes.")
                return;
            }

            const response = await axios.get("http://localhost:3000/getUser", {
                headers: {
                    "Authorization": `Bearer ${userId}` 
                }
            });

            if(response && response.data) {
                setUser(response.data.user.firstName)
            }

        } catch (error) {
            errorNotification(error);
        }
    }, [userId])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(userId === "") {
                    errorNotification("User id not set to retrieve notes.")
                    return;
                }

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
        <aside className="w-1/3 px-6 py-8 bg-indigo-200 md:w-72 rounded-md border border-gray-300 shadow-md">
            <h1 className="text-2xl mb-6 text-gray-800 font-semibold">Welcome, {user}</h1>
            <div className="mb-4">
                <Button onClick={addNote}>
                    Add Note
                </Button>
            </div>
            <h2 className="mb-4 font-semibold text-sm text-gray-700">Your Notes</h2>
            <ul>
                {notes.map((note) => (
                    <li key={note.notes._id}>
                        <button 
                          className={`w-full py-2 px-4 rounded-md text-left my-1 font-semibold transition-colors duration-300 
                            ${note._id === noteId ? 'bg-indigo-600 text-white' 
                            : 
                            'bg-white text-gray-700 hover:bg-indigo-800 hover:text-white'}`}
                          onClick={() => handleSelectProject(note._id)}
                        >
                            {capitalize(note.notes.title)}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default ProjectSidebar;
