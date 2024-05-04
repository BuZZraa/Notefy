import React from "react";

function UserManualPage() {
  return (
    <>
      <div className="mt-8 p-5 border-2 border-yellow-800 rounded-xl bg-yellow-100 text-yellow-800 shadow-xl mx-auto">
        <div className="pb-5">
          <h1 className="text-3xl font-bold mb-4">
            1. Commands for Adding and Editing Notes
          </h1>
          <p className="mb-4 text-sm">
            Use these commands to add details to your note
          </p>
          <ul className="leading-8 text-sm">
            <li>
              <strong>Add Title:</strong> "add title" followed by the title text
              to add a title to your note.
            </li>
            <li>
              <strong>Remove Title:</strong> "remove title" to clear the title
              field.
            </li>
            <li>
              <strong>Add Description:</strong> "add description" followed by
              the description text to add a description to your note.
            </li>
            <li>
              <strong>Remove Description:</strong> "remove description" to clear
              the description field.
            </li>
            <li>
              <strong>Add Date:</strong> "add date" followed by the date in the
              format "YYYYMMDD" to add a due date to your note.
            </li>
            <li>
              <strong>Cancel:</strong> "cancel" to cancel creating a new note.
            </li>
            <li>
              <strong>Save:</strong> "save" to save the note.
            </li>
          </ul>
        </div>

        <div className="pt-5">
          <h1 className="text-3xl font-bold mb-4">
            2. Commands for Selected Note
          </h1>
          <p className="mb-4 text-sm">
            Use these commands to interact with the selected note
          </p>
          <ul className="leading-8 text-sm">
            <li>
              <strong>Title:</strong> "title" to hear the title of the selected
              note.
            </li>
            <li>
              <strong>Description:</strong> "description" to hear the
              description of the selected note.
            </li>
            <li>
              <strong>Date:</strong> "date" to hear the due date of the selected
              note.
            </li>
            <li>
              <strong>Edit:</strong> "edit" to edit the selected note.
            </li>
            <li>
              <strong>Delete:</strong> "delete" to delete the selected note.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserManualPage;
