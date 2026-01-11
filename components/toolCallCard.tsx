"use client";

type ToolCallCardProps = {
  toolName: string;
  status: "pending" | "complete" | "error";
  onClick: () => void;
};

export function ToolCallCard({
  toolName,
  status,
  onClick,
}: ToolCallCardProps) {
  const bg =
    status === "pending"
      ? "bg-yellow-100 border-yellow-300"
      : status === "error"
      ? "bg-red-100 border-red-300"
      : "bg-green-100 border-green-300";

  return (
    <div
      onClick={onClick}
      className={`mt-2 cursor-pointer rounded-md border p-2 text-xs ${bg}`}
    >
      <div className="flex justify-between font-medium">
        <span>{toolName}</span>
        <span>{status}</span>
      </div>
    </div>
  );
}
