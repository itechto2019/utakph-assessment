import { createSlice } from "@reduxjs/toolkit";

const FormReducer = createSlice({
    name: 'form',
    initialState: {
        data: null
    },
    reducers: {
        setFormData: (state, { payload }) => {
            state.data = payload
        }
    }
})
export default FormReducer.reducer