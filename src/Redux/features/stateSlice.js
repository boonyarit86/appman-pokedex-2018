import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModal: false
};

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModal = true;
        },
        closeModal: (state) => {
            state.isModal = false;
        }
    }
})

export const { openModal, closeModal } = stateSlice.actions;
export default stateSlice.reducer;