import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
    name: "note",
    initialState: {
        noteId: undefined
    },
    reducers: {
        setNoteId(state, action) {
            state.noteId = action.payload
        }      
    }
});

export default notesSlice;
export const notesActions = notesSlice.actions;