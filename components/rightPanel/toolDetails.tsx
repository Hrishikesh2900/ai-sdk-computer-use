import { AgentEvent } from "@/store/types";

export function ToolDetails({ event }: { event: AgentEvent }) {
  switch (event.type) {
    case "screenshot":
      return <img src="/mock-screenshot.png" />;
    case "bash":
      return <pre>{event.payload.command}</pre>;
    case "click":
      return <div>Clicked {event.payload.element}</div>;
    case "type":
      return <div>Typed: {event.payload.text}</div>;
  }
}
