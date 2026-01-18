import { RootState } from "..";

export const selectEvents = (s: RootState) =>
  [...s.agentEvents.events].sort((a, b) => a.timestamp - b.timestamp);

export const selectEventCounts = (s: RootState) =>
  s.agentEvents.events.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

export type AgentRuntimeStatus = "idle" | "executing";

export const selectAgentStatus = (s: RootState): AgentRuntimeStatus => {
  if (s.agentEvents.events.some((e) => e.status === "pending")) {
    return "executing";
  }
  return "idle";
};

export const selectActiveSession = (state: RootState) => {
  const activeId = state.sessions.activeId;
  if (!activeId) return null;

  return state.sessions.sessions[activeId] ?? null;
};

