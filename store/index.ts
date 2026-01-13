import { configureStore } from "@reduxjs/toolkit"
import uiReducer from "./ui/slice"
import agentEventsReducer from "./agentEvents/agentEventsSlice"

export const store = configureStore({
  reducer: {
    agentEvents: agentEventsReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
