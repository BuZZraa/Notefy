import NoteInput from "../Note/NoteInput"
import AdminSidebar from "./AdminSidebar"
import { ToastContainer } from "react-toastify"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import errorNotification from "../../utils/notification";
import axios from "axios";
import { useSelector } from "react-redux";

function AdminEditNote() {
  const location = useLocation();
  const noteData = location.state?.note;
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.user.token)

  const [notesData, setNotesData] = useState({
    title: noteData.notes.title || "",
    description: noteData.notes.description || "",
    dueDate: noteData.notes.dueDate || "",
  });

  function editNote(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    formData.userId = noteData.userId;
    formData.noteId = noteData._id;
    formData.addedDate = noteData.notes.addedDate;
    const title = event.target.title.value;
    const description = event.target.description.value;
    const dueDate = event.target.dueDate.value;
    if (title.trim() === "" || description.trim() === "" || dueDate.trim() === "") {
      errorNotification("Enter value for all input fields.");
      return;
    }

    axios
      .put("http://localhost:3000/updateNote", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.message === "Success") {
            navigate("/notes");
        }
      })
      .catch((error) => {
        if (error.response) {
          let errorMessage = error.response.data.message;
          errorNotification(errorMessage);
        } else {
          errorNotification(error.message);
        }
      });
  }

  function handleCancel() {
    navigate("/notes");
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <AdminSidebar />
      <form onSubmit={editNote}>
      <ToastContainer position="bottom-right" closeOnClick />
        <div className="mx-auto w-[35rem] bg-yellow-100 border-2 border-yellow-800 p-8 rounded-md mb-16">
          <h1 className="text-4xl font-bold text-center">Edit Note</h1>
          <div>
            <NoteInput
              type="text"
              label="Title"
              name="title"
              defaultValue={notesData.title}
            />
            <NoteInput
              label="Description"
              textarea
              name="description"
              defaultValue={notesData.description}
            />
            <NoteInput
              type="date"
              label="Due Date"
              name="dueDate"
              defaultValue={notesData.dueDate}
            />
          </div>
          <menu className="flex items-center justify-center gap-4 my-4">                
            <li>
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-blue-600 text-stone-100 hover:bg-blue-700"
              >
                Save
              </button>
            </li>
            <li>
              <button
                type="button"
                className="px-6 py-2 rounded-md bg-red-600 text-stone-100 hover:bg-red-700"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </li>   
          </menu>
        </div>
      </form>
    </main>
  )
}

export default AdminEditNote
