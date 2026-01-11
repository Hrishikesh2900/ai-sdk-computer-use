import {
  AgentEvent,
  ScreenshotEvent,
  BashEvent,
  ClickEvent,
  TypeEvent,
} from "@/store/types";

export function generateMockAgentEvents(prompt: string): AgentEvent[] {
  const lower = prompt.toLowerCase();
  const now = Date.now();

  const base = {
    timestamp: now,
    duration: Math.floor(Math.random() * 800) + 200,
    status: "complete" as const,
  };

  if (lower.includes("screenshot")) {
    const event: ScreenshotEvent = {
      id: crypto.randomUUID(),
      type: "screenshot",
      payload: { note: "Screenshot captured" },
      ...base,
    };
    return [event];
  }

  if (lower.includes("create") && lower.includes("file")) {
    const bash: BashEvent = {
      id: crypto.randomUUID(),
      type: "bash",
      payload: {
        command: "touch demo.txt",
        result: "demo.txt created",
      },
      ...base,
    };

    const type: TypeEvent = {
      id: crypto.randomUUID(),
      type: "type",
      payload: {
        text: "Hello world!",
        target: "demo.txt",
      },
      ...base,
    };

    return [bash, type];
  }

  if (lower.includes("click")) {
    const event: ClickEvent = {
      id: crypto.randomUUID(),
      type: "click",
      payload: {
        x: 420,
        y: 300,
        element: "Login Button",
      },
      ...base,
    };

    return [event];
  }

  if (lower.includes("type")) {
    const event: TypeEvent = {
      id: crypto.randomUUID(),
      type: "type",
      payload: {
        text: "username@example.com",
        target: "email input",
      },
      ...base,
    };

    return [event];
  }

  return [];
}
