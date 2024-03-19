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

const store = configureStore({
    reducer: userSlice.reducer
});

export const userActions = userSlice.actions;
export default store;
