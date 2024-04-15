import {createSlice, configureStore} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: null
    },
    reducers: {
        setUser(state, action) {
            state.userId = action.payload
        },
        logout(state) {
            state.userId = null
        }
    }
});

const noteSlice = createSlice({
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

const store = configureStore({
    reducer: { user: userSlice.reducer, note: noteSlice.reducer}
});

export const userActions = userSlice.actions;
export const noteActions = noteSlice.actions;
export default store;
