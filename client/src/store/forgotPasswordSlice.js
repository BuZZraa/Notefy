import { createSlice } from "@reduxjs/toolkit";

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        email: null,
    },
    reducers: {
        setVerificationInfo(state, action) {
            state.email = action.payload.email;
        },

        clearVerificationInfo(state) {
            state.email = null
        }
    }
})

export default forgotPasswordSlice;
export const forgotPasswordActions = forgotPasswordSlice.actions;