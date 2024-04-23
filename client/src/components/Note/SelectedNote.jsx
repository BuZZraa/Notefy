import { useDispatch, useSelector } from "react-redux";
import { capitalize } from "lodash";
import { useEffect, useState } from "react";
import errorNotification from "../../utils/notification.js";
import axios from "axios";
import { noteActions } from "../../store/userStore.js";
import { useNavigate } from "react-router-dom";

function SelectedProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const noteId = useSelector((state) => state.note.noteId);
  const accessToken = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userId);
  const [currentNote, setCurrentNote] = useState({
    notes: {
      title: "loading...",
      description: "loading...",
      dueDate: "2024-01-01",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (noteId === "") {
          errorNotification("Note id not provided in the request.");
          return;
        }

        const response = await axios.post(
          "http://localhost:3000/getCurrentNote",
          { noteId, userId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response && response.data) {
          setCurrentNote(response.data.notes);
        }
      } catch (error) {
        errorNotification(error);
      }
    };

    fetchData();
  });

  function editNote() {
    navigate("/editNote");
  }

  function deleteNote() {
    try {
      axios.post(
        "http://localhost:3000/deleteNote", { noteId, userId},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(noteActions.setNoteId(undefined));
    } catch (error) {
      errorNotification(error);
    }
  }

  const formattedDate = new Date(
    currentNote?.notes?.dueDate
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className=" w-[35rem] mt-16 border-2 border-yellow-800 p-5 h-fit rounded-xl bg-yellow-100 shadow-md">
      {currentNote && currentNote.notes && (
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold mb-2">
              {capitalize(currentNote.notes.title)}
            </h1>
          </div>
          <p className="mb-4 text-stone-500">{formattedDate}</p>
          <p className="whitespace-pre-wrap">{currentNote.notes.description}</p>
        </div>
      )}
      <div className="mt-4">
        <button
          className="bg-blue-700 px-4 py-2 rounded-md text-white hover:bg-blue-800 mr-2"
          onClick={editNote}
        >
          Edit Note
        </button>
        <button
          className="bg-red-700 px-4 py-2 rounded-md text-white hover:bg-red-800"
          onClick={deleteNote}
        >
          Delete Note
        </button>
      </div>
    </div>
  );
}

export default SelectedProject;
