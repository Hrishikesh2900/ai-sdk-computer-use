import React, { memo } from "react";
import type { AgentEvent } from "@/store/types";

interface Props {
  event: AgentEvent;
  onSelect?: (event: AgentEvent) => void;
}

const statusColor: Record<AgentEvent["status"], string> = {
  pending: "text-yellow-500",
  complete: "text-green-600",
  error: "text-red-600",
};

const EventRow = memo(({ event, onSelect }: Props) => {
  const time = new Date(event.timestamp).toLocaleTimeString();

  return (
    <div
      className="flex items-center justify-between px-2 py-1 text-xs border-b hover:bg-muted cursor-pointer"
      onClick={() => onSelect?.(event)}
    >
      <span className="text-muted-foreground w-20">{time}</span>
      <span className="font-medium">{event.type}</span>
      <span className={statusColor[event.status]}>{event.status}</span>
    </div>
  );
});

EventRow.displayName = "EventRow";
export default EventRow;
