import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { SerializableMessage } from "./types";
import { AgentEvent } from "../types";

type Session = {
  id: string;
  title: string;
  messages: SerializableMessage[];
  events: AgentEvent[];
  createdAt: number;
};

type SessionsState = {
  activeId: string | null;
  sessions: Record<string, Session>;
};

const initialState: SessionsState = {
  activeId: null,
  sessions: {},
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    createSession: (state) => {
      const id = nanoid();
      state.sessions[id] = {
        id,
        title: "New Chat",
        messages: [],
        events: [],
        createdAt: Date.now(),
      };
      state.activeId = id;
    },

    setActiveSession: (state, action: PayloadAction<string>) => {
      state.activeId = action.payload;
    },

    addMessage: (
      state,
      action: PayloadAction<{ sessionId: string; message: SerializableMessage }>
    ) => {
      const session = state.sessions[action.payload.sessionId];
      if (!session) return;

      session.messages.push(action.payload.message);

      if (
        session.title === "New Chat" &&
        action.payload.message.role === "user"
      ) {
        session.title = action.payload.message.content.slice(0, 32);
      }
    },

    addEvent: (
      state,
      action: PayloadAction<{ sessionId: string; event: AgentEvent }>
    ) => {
      const session = state.sessions[action.payload.sessionId];
      if (!session) return;

      session.events.push(action.payload.event);
    },
  },
});

export const {
  createSession,
  setActiveSession,
  addMessage,
  addEvent,
} = sessionsSlice.actions;

export default sessionsSlice.reducer;
