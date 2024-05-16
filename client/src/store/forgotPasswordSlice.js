import { createSlice } from "@reduxjs/toolkit";

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

export default forgotPasswordSlice;
export const forgotPasswordActions = forgotPasswordSlice.actions;