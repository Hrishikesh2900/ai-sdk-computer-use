import { AgentEventStatus, AgentEventType } from "@/store/types";

type ToolCallCardProps = {
  toolName: AgentEventType;
  status: AgentEventStatus;
  duration?: number;
  onClick: () => void;
};

export function ToolCallCard({
  toolName,
  status,
  duration,
  onClick,
}: ToolCallCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded border p-3 text-sm
                 hover:bg-muted transition flex justify-between items-center"
    >
      <div>
        <div className="font-medium capitalize">{toolName}</div>
        <div className="text-xs text-muted-foreground">
          {status}
        </div>
      </div>

      {duration !== undefined && (
        <div className="text-xs text-muted-foreground">
          {duration} ms
        </div>
      )}
    </div>
  );
}
