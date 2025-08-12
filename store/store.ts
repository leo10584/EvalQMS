import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import projectSlice from "./slices/projectSlice"
import qualitySlice from "./slices/qualitySlice"
import documentSlice from "./slices/documentSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    projects: projectSlice,
    quality: qualitySlice,
    documents: documentSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
