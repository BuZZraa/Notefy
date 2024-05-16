import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "user",
    initialState: {
        userId: null,
        name: null,
        token: null,
        role: null,
        sessionExpired: false
    },
    reducers: {
        setUserId(state, action) {
            state.userId = action.payload
        },
        setUserName(state, action) {
            state.name = action.payload
        },
        setToken(state, action) {
            state.token = action.payload
        },
        logout(state) {
            state.userId = null
            state.token = null
            state.role = null
            state.name = null
            state.sessionExpired = true
        },
        setRole(state, action) {
            state.role = action.payload
        },
        setSessionExpired(state, action) {
            state.sessionExpired = action.payload;
        }
    }
});

export default usersSlice;
export const usersActions = usersSlice.actions;