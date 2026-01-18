import { RootState } from "..";
import { AgentEvent } from "../types";

export const selectSessionEvents = (
  state: RootState,
  sessionId: string | null
): AgentEvent[] => {
  if (!sessionId) return [];
  return (
    state.sessions.sessions[sessionId]?.events ?? []
  ).slice().sort((a, b) => a.timestamp - b.timestamp);
};

export type AgentRuntimeStatus = "idle" | "executing";

export const selectSessionAgentStatus = (
  state: RootState,
  sessionId: string | null
): AgentRuntimeStatus => {
  if (!sessionId) return "idle";

  const events =
    state.sessions.sessions[sessionId]?.events ?? [];

  return events.some((e) => e.status === "pending")
    ? "executing"
    : "idle";
};
