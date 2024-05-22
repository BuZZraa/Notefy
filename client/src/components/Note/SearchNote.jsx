import { useState } from "react";
import axios from "axios";
import Button from "../Form/Button";
import { ToastContainer } from "react-toastify";
import errorNotification from "../../utils/notification";
import { capitalize } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { notesActions } from "../../store/notesSlice";
import { useNavigate } from "react-router-dom";

function SearchNote() {
  const userId = useSelector((state) => state.user.userId);
  const noteId = useSelector((state) => state.note.noteId);
  const accessToken = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);

  function handleSelectProject(id) {
    dispatch(notesActions.setNoteId(id));
    navigate("/editNote?page=search");
  }

  function searchNote(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const sortBy = event.target.sortBy.value;
    if (title === "" && sortBy === "Select") {
      errorNotification("Enter title or select options to search notes.");
      return;
    }

    axios
      .post(
        "http://localhost:3000/searchNote", { title, sortBy, userId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response && response.data) {
          console.log(response.data.notes);
          setSearchResults(response.data.notes);
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

  let content;

  if (searchResults) {
    content =
      searchResults.length === 0 ? (
        <p className="text-white font-bold">No notes found.</p>
      ) : (
        <ul>
          {searchResults.map((note) => {
            let cssClasses =
              "w-full text-left px-2 py-2 rounded-md my-1 font-semibold hover:border-white hover:border-2 hover:text-white hover:bg-indigo-800";

            if (note._id === noteId) {
              cssClasses += " bg-indigo-600 text-white";
            } else {
              cssClasses += " text-black";
            }

            return (
              <li key={note.notes._id}>
                <button
                  className={`w-full py-2 px-4 rounded-md text-left my-1 font-semibold transition-colors duration-300 
                            ${
                              note._id === noteId
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-gray-700 hover:bg-indigo-800 hover:text-white"
                            }`}
                  onClick={() => handleSelectProject(note._id)}
                >
                  {capitalize(note.notes.title)}
                </button>
              </li>
            );
          })}
        </ul>
      );
  } else {
    content = <p className="text-gray-500">No notes found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <ToastContainer newestOnTop closeOnClick position="bottom-right" />
      <main className="flex-grow p-8">
        <form
          className="search-container p-4 bg-white rounded-md mb-4 shadow-xl"
          onSubmit={searchNote}
        >
          <h2 className="text-xl font-bold mb-4">Search Notes</h2>
          <div className="mt-4 flex items-center">
            <label htmlFor="sortSelect" className="mr-2">
              Sort by:
            </label>
            <select
              id="sortSelect"
              className="border border-gray-400 px-2 py-1 rounded-md"
              name="sortBy"
            >
              <option value="select" disabled>
                Select
              </option>
              <option value="addedDate">Added Date</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
          <div className="flex items-center mt-4">
            <input
              type="search"
              className="border border-gray-400 px-4 py-2 rounded-md flex-grow mr-2"
              placeholder="Search by title..."
              name="title"
            />
            <Button type="submit">Search</Button>
          </div>
        </form>
        <div className="search-results bg-indigo-300 p-4 rounded-md border border-gray-300">
          {content}
        </div>
      </main>
    </div>
  );
}

export default SearchNote;
