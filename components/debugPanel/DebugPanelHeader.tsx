import React from "react";
import type { AgentEvent } from "@/store/types";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  events: AgentEvent[];
}

export const DebugPanelHeader = ({ isOpen, onToggle, events }: Props) => {
  const counts = events.reduce<Record<string, number>>((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div
      className="flex items-center justify-between px-3 py-2 bg-muted border-t cursor-pointer"
      onClick={onToggle}
    >
      <div className="font-medium text-sm">Debug / Event Panel</div>

      <div className="flex gap-3 text-xs text-muted-foreground">
        {Object.entries(counts).map(([type, count]) => (
          <span key={type}>
            {type}: {count}
          </span>
        ))}
      </div>

      <span className="text-xs">{isOpen ? "▼" : "▲"}</span>
    </div>
  );
};
