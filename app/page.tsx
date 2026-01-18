"use client";

import { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { PreviewMessage } from "@/components/message";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { DeployButton } from "@/components/project-info";
import { AISDKLogo } from "@/components/icons";
import { PromptSuggestions } from "@/components/prompt-suggestions";
import { ToolCallCard } from "@/components/toolCallCard";
import { ToolDetails } from "@/components/rightPanel/toolDetails";
import DebugPanel from "@/components/debugPanel/DebugPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getDesktopURL } from "@/lib/e2b/utils";
import { useScrollToBottom } from "@/lib/use-scroll-to-bottom";
import { generateMockAgentEvents } from "@/lib/mock/generateMockAgentEvents";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createSession,
  addMessage,
  addEvent,
} from "@/store/sessions/sessionsSlice";
import { selectEvent } from "@/store/ui/slice";
import { selectSessionEvents } from "@/store/sessions/agentEventSelectors";
import { selectActiveSession } from "@/store/agentEvents/selectors";
import ChatSidebar from "@/components/chat/chatSidebar";

export default function Page() {
  const dispatch = useAppDispatch();

  /* ---------------- SESSION ---------------- */
  const activeSessionId = useAppSelector((s) => s.sessions.activeId);
  const activeSession = useAppSelector(selectActiveSession);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  useEffect(() => {
    if (!activeSessionId) {
      dispatch(createSession());
    }
  }, [activeSessionId, dispatch]);

  /* ---------------- EVENTS ---------------- */
  const agentEvents = useAppSelector((state) =>
    selectSessionEvents(state, activeSessionId)
  );

  const selectedEventId = useAppSelector((s) => s.ui.selectedEventId);
  const selectedEvent = agentEvents.find((e) => e.id === selectedEventId);

  /* ---------------- CHAT ---------------- */
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    stop,
    append,
  } = useChat({
    id: activeSessionId ?? undefined,
    api: "/api/chat",
    initialMessages:
      activeSession?.messages.map((m) => ({
        ...m,
        createdAt: new Date(m.createdAt),
      })) ?? [],
    maxSteps: 30,
    onFinish: (message) => {
      dispatch(
        addMessage({
          sessionId: activeSessionId!,
          message: {
            ...message,
            createdAt: message.createdAt
              ? message.createdAt.getTime()
              : Date.now(),
          },
        })
      );
    },
    onError: () => {
      toast.error("There was an error", {
        description: "Please try again later.",
      });
    },
  });

  const isLoading = status !== "ready";

  /* ---------------- DESKTOP STREAM ---------------- */
  const [isInitializing, setIsInitializing] = useState(true);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [sandboxId, setSandboxId] = useState<string | null>(null);

  const refreshDesktop = async () => {
    try {
      setIsInitializing(true);
      const { streamUrl, id } = await getDesktopURL(sandboxId ?? undefined);
      setStreamUrl(streamUrl);
      setSandboxId(id);
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    refreshDesktop();
  }, []);

  /* ---------------- SCROLL ---------------- */
  const [desktopContainerRef, desktopEndRef] = useScrollToBottom();
  const [mobileContainerRef, mobileEndRef] = useScrollToBottom();

  /* ---------------- MOBILE ---------------- */
  const [showDesktopMobile, setShowDesktopMobile] = useState(false);

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);

    const events = generateMockAgentEvents(input);
    events.forEach((event) =>
      dispatch(
        addEvent({
          sessionId: activeSessionId!,
          event,
        })
      )
    );
  };

  /* ========================================================= */

  return (
    <div className="flex h-dvh relative">
      {/* ===================== DESKTOP ===================== */}
      <div className="w-full hidden xl:block">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* LEFT */}
            <ChatSidebar />
          <ResizablePanel defaultSize={30} minSize={25} className="flex flex-col">
            {/* Header */}
            <div className="bg-white py-4 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AISDKLogo />
              </div>
              <DeployButton />
            </div>

            {/* Chat */}
            <div
              ref={desktopContainerRef}
              className="flex-1 space-y-6 py-4 overflow-y-auto px-4"
            >
              {messages.map((message, i) => (
                <PreviewMessage
                  key={message.id}
                  message={message}
                  isLoading={isLoading}
                  status={status}
                  isLatestMessage={i === messages.length - 1}
                />
              ))}

              {agentEvents.map((event) => (
                <ToolCallCard
                  key={event.id}
                  toolName={event.type}
                  status={event.status}
                  duration={event.duration}
                  onClick={() => dispatch(selectEvent(event.id))}
                />
              ))}

              <div ref={desktopEndRef} />
            </div>

            {messages.length === 0 && (
              <PromptSuggestions
                disabled={isInitializing}
                submitPrompt={(prompt) => {
                  append({ role: "user", content: prompt });

                  generateMockAgentEvents(prompt).forEach((event) =>
                    dispatch(
                      addEvent({
                        sessionId: activeSessionId!,
                        event,
                      })
                    )
                  );
                }}
              />
            )}

            <form onSubmit={onSubmit} className="p-4 bg-white">
              <Input
                handleInputChange={handleInputChange}
                input={input}
                isInitializing={isInitializing}
                isLoading={isLoading}
                status={status}
                stop={stop}
              />
            </form>

            <DebugPanel />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* RIGHT */}
          <ResizablePanel defaultSize={70} minSize={40} className="relative bg-black flex">
            <div className={`relative ${selectedEvent ? "flex-1" : "w-full"}`}>
              {streamUrl ? (
                <>
                  <iframe src={streamUrl} className="w-full h-full" />
                  <Button
                    onClick={refreshDesktop}
                    className="absolute top-2 right-2 z-10"
                  >
                    New desktop
                  </Button>
                </>
              ) : (
                <div className="text-white flex items-center justify-center h-full">
                  Initializing desktop…
                </div>
              )}
            </div>

            {selectedEvent && (
              <div className="w-[360px] border-l bg-white p-4 overflow-y-auto relative">
                <button
                  onClick={() => dispatch(selectEvent(null))}
                  className="absolute top-2 right-2"
                >
                  ✕
                </button>
                <ToolDetails event={selectedEvent} />
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* ===================== MOBILE ===================== */}
      <div className="w-full xl:hidden flex flex-col h-dvh">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
          <button
            onClick={() => setShowSidebarMobile(true)}
            className="xl:hidden p-2 rounded hover:bg-muted"
          >
            ☰
          </button>
          <AISDKLogo />
          <button
            onClick={() => setShowDesktopMobile(true)}
            className="rounded-md bg-black text-white px-3 py-1.5 text-sm"
          >
            Open Desktop
          </button>
        </div>

        <div ref={mobileContainerRef} className="flex-1 overflow-y-auto px-4">
          {messages.map((message, i) => (
            <PreviewMessage
              key={message.id}
              message={message}
              isLatestMessage={i === messages.length - 1}
              isLoading={isLoading}
              status={status}
            />
          ))}

          {agentEvents.map((event) => (
            <ToolCallCard
              key={event.id}
              toolName={event.type}
              status={event.status}
              duration={event.duration}
              onClick={() => dispatch(selectEvent(event.id))}
            />
          ))}

          <div ref={mobileEndRef} />
        </div>
        {messages.length === 0 && (
          <div className="px-4 pb-2 space-y-3 border-t bg-white">
            <PromptSuggestions
              disabled={isInitializing}
              submitPrompt={(prompt) => {
                  append({ role: "user", content: prompt });
                  generateMockAgentEvents(prompt).forEach((event) =>
                    dispatch(
                      addEvent({
                        sessionId: activeSessionId!,
                        event,
                      })
                    )
                  );
                }}
            />
          </div>
        )}
        <form onSubmit={onSubmit} className="p-4 bg-white">
          <Input
            handleInputChange={handleInputChange}
            input={input}
            isInitializing={isInitializing}
            isLoading={isLoading}
            status={status}
            stop={stop}
          />
        </form>
      </div>

      {/* MOBILE DESKTOP MODAL */}
      {showDesktopMobile && streamUrl && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col xl:hidden">
          <div className="flex items-center justify-between p-2 text-white">
            <span className="text-sm">Desktop</span>
            <button
              onClick={() => setShowDesktopMobile(false)}
              className="bg-white text-black px-3 py-1 rounded text-sm"
            >
              Close
            </button>
          </div>
          <iframe src={streamUrl} className="flex-1 w-full" />
        </div>
      )}
      {showSidebarMobile && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowSidebarMobile(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[280px] bg-white">
            <ChatSidebar onClose={() => setShowSidebarMobile(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
