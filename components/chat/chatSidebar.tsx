"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createSession, setActiveSession } from "@/store/sessions/sessionsSlice";
import { Button } from "@/components/ui/button";

export default function ChatSidebar({
  onClose,
}: {
  onClose?: () => void;
}) {
  const dispatch = useAppDispatch();
  const { sessions, activeId } = useAppSelector((s) => s.sessions);

  const sessionList = Object.values(sessions).sort(
    (a, b) => b.createdAt - a.createdAt
  );

  return (
    <div className="flex flex-col h-full border-r bg-white">
      {/* Mobile / Tablet Header */}
      {onClose && (
        <div className="flex items-center justify-between px-4 py-3 border-b xl:hidden">
          <span className="font-medium">Chats</span>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-black text-lg"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
      )}

      {/* New Chat */}
      <div className="p-4 border-b">
        <Button
          className="w-full"
          onClick={() => {
            dispatch(createSession());
            onClose?.(); // 👈 close sidebar on mobile
          }}
        >
          + New Chat
        </Button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        {sessionList.map((session) => (
          <button
            key={session.id}
            onClick={() => {
              dispatch(setActiveSession(session.id));
              onClose?.(); // 👈 close sidebar on mobile
            }}
            className={`w-full text-left px-4 py-3 truncate transition-colors
              hover:bg-muted
              ${
                session.id === activeId
                  ? "bg-muted font-medium"
                  : "text-muted-foreground"
              }`}
          >
            {session.title}
          </button>
        ))}
      </div>
    </div>
  );
}
