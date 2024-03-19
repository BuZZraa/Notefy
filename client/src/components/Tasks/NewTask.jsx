import { useState } from "react";
import {ToastContainer} from "react-toastify";
import errorNotification from "../../utils/ErrorNotification.js"

function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    //To make empty task not be added.
    if (enteredTask.trim() === "") {
      errorNotification("Enter a task to be added.");
      return;
    }
    onAdd(enteredTask);
    setEnteredTask("");
  }

  return (
    <>
      <ToastContainer newestOnTop={true} position="bottom-right" />
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200 border-stone-500 border-2"
          onChange={handleChange}
          value={enteredTask}
        />
        <button
          className="text-stone-100 p-1 w-8 bg-blue-600 rounded-full hover:bg-blue-800"
          onClick={handleClick}
        >
          +
        </button>
      </div>
    </>
  );
}

export default NewTask;
