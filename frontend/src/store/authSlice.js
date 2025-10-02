import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: null,
    otp: {
        phone: "",
        hash: ""
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            const { user } = action.payload;
            state.user = user;
            if (user == null) {
                state.isAuth = false;
            }
            else {
                state.isAuth = true;
            }
        },
        setOtp: (state, action) => {
            const { hash, phone } = action.payload;
            state.otp.hash = hash;
            state.otp.phone = phone;
        }
    }
});

export const { setAuth, setOtp } = authSlice.actions;

export default authSlice.reducer;