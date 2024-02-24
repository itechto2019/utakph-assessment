import { configureStore } from "@reduxjs/toolkit";
import FormReducer from "./reducers/FormReducer";

const store = configureStore({
    reducer: {
        form: FormReducer
    }
})
export default store