import { configureStore } from "@reduxjs/toolkit"
import agentEventsReducer from "./agentEvents/agentEventsSlice"

export const store = configureStore({
  reducer: {
    agentEvents: agentEventsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
