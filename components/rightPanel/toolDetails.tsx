import { AgentEvent } from "@/store/types";

export function ToolDetails({ event }: { event: AgentEvent }) {
  switch (event.type) {
    case "screenshot":
      return (
        <div>
          <div className="font-medium mb-2">Screenshot</div>
          <div className="text-sm">{event.payload.note}</div>
          <img
            src="/mock-screenshot.png"
            className="mt-2 rounded border"
          />
        </div>
      );

    case "bash":
      return (
        <div>
          <div className="font-medium">Command</div>
          <pre className="bg-muted p-2 mt-1 rounded">
            {event.payload.command}
          </pre>
          <div className="font-medium mt-3">Output</div>
          <pre className="bg-muted p-2 mt-1 rounded">
            {event.payload.result}
          </pre>
        </div>
      );

    case "click":
      return (
        <div>
          Clicked at ({event.payload.x}, {event.payload.y})
          {event.payload.element && (
            <div>Element: {event.payload.element}</div>
          )}
        </div>
      );

    case "type":
      return (
        <div>
          Typed <b>{event.payload.text}</b>
          {event.payload.target && (
            <div>Target: {event.payload.target}</div>
          )}
        </div>
      );
  }
}
