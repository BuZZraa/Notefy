import NoteInput from "./NoteInput.jsx";
import Modal from "../Modal.jsx";
import { useRef } from "react";
import SpeechToTextConverter from "../SpeechToTextConverter.jsx";
function NewNote({onAdd, onCancel}) {
    const modal = useRef();
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    const cancelButtonRef = useRef();

    function handleCommand (command) {
        const lowerCommand = command.toLowerCase();
        if (lowerCommand.includes('add title')) {
          const titleToAdd = command.replace('add title', '').trim();
          title.current.value = titleToAdd;
        } else if (lowerCommand.includes('add description')) {
          const descriptionToAdd = command.replace('add description', '').trim();
          description.current.value = descriptionToAdd;
        } else if (lowerCommand.includes('cancel')) {
            // Trigger cancel button click
            cancelButtonRef.current.click();
        } 

      };

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if(enteredTitle.trim() === "" || enteredDescription.trim() === "" || enteredDueDate.trim() === "") {
            modal.current.open();
            //To makes sure onAdd function is not called.
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        });
    }

    return(
        <>
            
            <Modal ref ={modal} buttonCaption="Okay" onClose={modal}>
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">Oops ... looks like you forgot to enter a value.</p>
                <p className="text-stone-600 mb-4">Please make sure you provide a value for every input field.</p>
            </Modal>
            <div className="w-[35rem] mt-16 border-solid border-2 border-stone-400 h-fit p-8 rounded-md">
                <h1 className="text-4xl font-bold text-center">Add Note</h1>
                <div>
                    <NoteInput type="text" label="Title" ref={title} />
                    <NoteInput label="Description" ref={description} textarea />
                    <NoteInput type="date" label="Due Date" ref={dueDate} />
                </div>
                <menu className="flex items-center justify-center gap-4 my-4">
                    <li>
                        <button 
                            className="px-6 py-2 rounded-md bg-red-600 text-stone-100 hover:bg-red-700"
                            ref={cancelButtonRef}
                            onClick={onCancel}>
                            Cancel
                        </button>
                    </li>
                    <SpeechToTextConverter onCommand={handleCommand} className="px-6 py-2 rounded-md bg-blue-600 text-stone-100 hover:bg-blue-700"/>
                    <li>
                        <button                           
                            className="px-6 py-2 rounded-md bg-green-600 text-stone-100 hover:bg-green-700"
                            onClick={handleSave}>
                            Save
                        </button>
                    </li>
                </menu>
            </div>
        </>   
    );
}

export default NewNote;