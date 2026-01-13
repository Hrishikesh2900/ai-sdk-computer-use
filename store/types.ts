export type AgentEventStatus = "pending" | "complete" | "error";

export type AgentEventType =
  | "screenshot"
  | "bash"
  | "click"
  | "type";

export type AgentEventBase = {
  id: string;
  timestamp: number;
  duration?: number;
  status: AgentEventStatus;
};

export type ScreenshotEvent = AgentEventBase & {
  type: "screenshot";
  payload: { note: string };
};

export type BashEvent = AgentEventBase & {
  type: "bash";
  payload: { command: string; result: string };
};

export type ClickEvent = AgentEventBase & {
  type: "click";
  payload: { x: number; y: number; element?: string };
};

export type TypeEvent = AgentEventBase & {
  type: "type";
  payload: { text: string; target?: string };
};

export type AgentEvent =
  | ScreenshotEvent
  | BashEvent
  | ClickEvent
  | TypeEvent;
