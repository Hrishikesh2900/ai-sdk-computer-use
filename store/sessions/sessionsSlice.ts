import { UIMessage } from "ai";
import { AgentEvent } from "../types";

type Session = {
  id: string;
  messages: UIMessage[];
  events: AgentEvent[];
};

type SessionsState = {
  activeId: string;
  sessions: Record<string, Session>;
};
