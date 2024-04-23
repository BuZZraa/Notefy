import {createSlice, combineReducers, configureStore} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: null,
        token: null,
        sessionExpired: false
    },
    reducers: {
        setUser(state, action) {
            state.userId = action.payload
        },
        setToken(state, action) {
            state.token = action.payload
        },
        logout(state) {
            state.userId = null
            state.token = null
        },
        setSessionExpired(state, action) {
            state.sessionExpired = action.payload;
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

const rootReducer = combineReducers({
    user: userSlice.reducer,
    note: noteSlice.reducer,
    forgotPassword: forgotPasswordSlice.reducer,
  });
  
  const persistConfig = {
    key: "root",
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = configureStore({
    reducer: persistedReducer,
  });

  const persistor = persistStore(store);

export const userActions = userSlice.actions;
export const noteActions = noteSlice.actions;
export const forgotPasswordActions = forgotPasswordSlice.actions;
export {persistor}
export default store;