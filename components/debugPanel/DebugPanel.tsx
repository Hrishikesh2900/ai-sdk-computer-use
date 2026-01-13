import React, { useCallback, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import type { AgentEvent } from "@/store/types";
import EventRow from "./EventRow";
import { DebugPanelHeader } from "./DebugPanelHeader";

const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  //Select only what you need
  const events = useAppSelector((state) => state.agentEvents.events);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback((event: AgentEvent) => {
    // dispatch(selectEvent(event))
    console.log("Selected event:", event);
  }, []);

  return (
    <div
      className={`transition-all duration-200 border-t bg-background ${
        isOpen ? "h-64" : "h-10"
      }`}
    >
      <DebugPanelHeader
        isOpen={isOpen}
        onToggle={toggle}
        events={events}
      />

      {isOpen && (
        <div className="h-[calc(100%-40px)] overflow-y-auto">
          {events.map((event) => (
            <EventRow
              key={event.id}
              event={event}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
