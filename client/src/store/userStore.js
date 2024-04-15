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

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        code: null,
        email: null,
    },
    reducers: {
        setVerificationInfo(state, action) {
            state.code = action.payload.code;
            state.email = action.payload.email;
        },

        clearVerificationInfo(state) {
            state.code = null,
            state.email = null
        }
    }
})

const store = configureStore({
    reducer: { 
        user: userSlice.reducer, 
        note: noteSlice.reducer,
        forgotPassword: forgotPasswordSlice.reducer
    }
});

export const userActions = userSlice.actions;
export const noteActions = noteSlice.actions;
export const forgotPasswordActions = forgotPasswordSlice.actions;
export default store;