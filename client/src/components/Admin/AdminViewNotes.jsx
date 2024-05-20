import { useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import errorNotification from "../../utils/notification";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminViewNotes() {
  const userId = useSelector((state) => state.user.userId);
  const accessToken = useSelector((state) => state.user.token);
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const [notesData, setNotesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId === "") {
          errorNotification("User id not set to load notes.");
          return;
        }

        const response = await axios.post(
          "http://localhost:3000/getNotes",
          { userId, role },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response && response.data) {
          setNotesData(response.data.notes);
        }
      } catch (error) {
        errorNotification(error.message || "An error occurred.");
      }
    };

    fetchData();
  }, [userId, role, accessToken]);

  const deleteNote = async (noteId, noteUserId) => {
    try {
      await axios.delete(
        "http://localhost:3000/deleteNote",       
        {
          data: { userId: noteUserId, noteId },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotesData((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (error) {
      errorNotification(error.message || "An error occurred.");
    }
  };

  const filteredNotes = notesData.filter((note) =>
    note.notes.title?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow my-8 flex gap-8">
        <ToastContainer position="bottom-right" closeOnClick />
        <AdminSidebar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-semibold mb-8 text-center">
            Note Management
          </h1>
          <div className="mb-4">
            <input
              type="search"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="overflow-x-auto">
            <ToastContainer position="bottom-right" closeOnClick />
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-indigo-400 text-white">
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Added Date</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotes.length > 0 ? (
                  filteredNotes.map((note) => (
                    <tr key={note._id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{note.notes.title}</td>
                      <td className="border px-4 py-2">{note.notes.description}</td>
                      <td className="border px-4 py-2">{note.notes.addedDate}</td>
                      <td className="border px-4 py-2">{note.notes.dueDate}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                          onClick={() => navigate("/adminEditNote", { state: { note } })}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => deleteNote(note._id, note.userId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="border px-4 py-2 text-center font-bold">
                      No notes found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminViewNotes;
