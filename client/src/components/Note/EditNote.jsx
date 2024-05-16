import { ToastContainer } from "react-toastify";
import NoteInput from "./NoteInput";
import SpeechToTextConverter from "../../utils/SpeechToTextConverter";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import errorNotification from "../../utils/notification";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notesActions } from "../../store/notesSlice";
import { useSearchParams } from "react-router-dom";

function EditNote() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const userId = useSelector((state) => state.user.userId);
  const noteId = useSelector((state) => state.note.noteId);
  const accessToken = useSelector((state) => state.user.token);
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const cancelButtonRef = useRef();
  const saveButtonRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentNote, setCurrentNote] = useState({
    notes: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/getCurrentNote", { noteId, userId },
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
  }, []);

  function editNote(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    formData.noteId = noteId;
    formData.userId = userId;
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
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
          dispatch(notesActions.setNoteId(undefined));
          if (page === "search") {
            navigate("/searchNote");
          } else {
            navigate("/");
          }
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

  function cancelAction() {
    dispatch(notesActions.setNoteId(undefined));
    navigate("/");

    if (page === "search") {
      navigate("/searchNote");
    }
  }

  function handleCommand(command) {
    const lowerCommand = command.toLowerCase();
    if (lowerCommand.includes("add title")) {
      const titleToAdd = command.replace("add title", "").trim();
      title.current.value = titleToAdd;
    } else if (lowerCommand.includes("remove title")) {
      title.current.value = "";
    } else if (lowerCommand.includes("add description")) {
      const descriptionToAdd = command.replace("add description", "").trim();
      description.current.value = descriptionToAdd;
    } else if (lowerCommand.includes("remove description")) {
      description.current.value = "";
    } else if (lowerCommand.includes("cancel")) {
      cancelButtonRef.current.click();
    } else if (lowerCommand.includes("done")) {
      saveButtonRef.current.click();
    }
  }

  return (
    <>
      <ToastContainer newestOnTop position="bottom-right" />
      <form onSubmit={editNote}>
        <div className="mx-auto w-[35rem] bg-yellow-100 border-2 border-yellow-800 p-8 rounded-md mb-16">
          <h1 className="text-4xl font-bold text-center">Edit Note</h1>
          <div>
            <NoteInput
              type="hidden"
              name="addedDate"
              value={new Date().toISOString().slice(0, 10)}
            />
            <NoteInput
              type="text"
              label="Title"
              name="title"
              defaultValue={currentNote.notes.title}
              ref={title}
            />
            <NoteInput
              label="Description"
              textarea
              name="description"
              defaultValue={currentNote.notes.description}
              ref={description}
            />
            <NoteInput
              type="date"
              label="Due Date"
              name="dueDate"
              defaultValue={currentNote.notes.dueDate}
              ref={dueDate}
            />
          </div>
          <menu className="flex items-center justify-center gap-4 my-4">
            <li>
              <button
                type="button"
                className="px-6 py-2 rounded-md bg-red-600 text-stone-100 hover:bg-red-700"
                onClick={cancelAction}
                ref={cancelButtonRef}
              >
                Cancel
              </button>
            </li>
            <SpeechToTextConverter
              type="button"
              className="px-6 py-2 rounded-md bg-blue-600 text-stone-100 hover:bg-blue-700"
              onCommand={handleCommand}
            />
            <li>
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-green-600 text-stone-100 hover:bg-green-700"
                ref={saveButtonRef}
              >
                Save
              </button>
            </li>
          </menu>
        </div>
      </form>
    </>
  );
}

export default EditNote;
