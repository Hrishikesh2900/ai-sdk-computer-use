import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AgentEvent, AgentEventStatus } from "../types";

type AgentEventsState = {
  events: AgentEvent[];
};

const initialState: AgentEventsState = {
  events: [],
};

const agentEventsSlice = createSlice({
  name: "agentEvents",
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<AgentEvent>) {
      state.events.push(action.payload);
    },
    updateEventStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: AgentEvent["status"];
      }>
    ) => {
      const event = state.events.find(e => e.id === action.payload.id);
      if (!event) return;

      event.status = action.payload.status;
    },

    clearEvents(state) {
      state.events = [];
    },
  },
});

export const { addEvent, updateEventStatus, clearEvents } =
  agentEventsSlice.actions;

export default agentEventsSlice.reducer;
