"use client";

import { PreviewMessage } from "@/components/message";
import { getDesktopURL } from "@/lib/e2b/utils";
import { useScrollToBottom } from "@/lib/use-scroll-to-bottom";
import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DeployButton, ProjectInfo } from "@/components/project-info";
import { AISDKLogo } from "@/components/icons";
import { PromptSuggestions } from "@/components/prompt-suggestions";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ToolCallCard } from "@/components/toolCallCard";
import DebugPanel from "@/components/debugPanel/DebugPanel";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addEvent } from "@/store/agentEvents/agentEventsSlice";
import { generateMockAgentEvents } from "@/lib/mock/generateMockAgentEvents";

export default function Chat() {
  const dispatch = useAppDispatch();

  const agentEvents = useAppSelector(
    (state) => state.agentEvents.events
  );

  const [visibleEventIds, setVisibleEventIds] = useState<string[]>([]);

  const [desktopContainerRef, desktopEndRef] = useScrollToBottom();
  const [mobileContainerRef, mobileEndRef] = useScrollToBottom();

  const [isInitializing, setIsInitializing] = useState(true);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [sandboxId, setSandboxId] = useState<string | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    stop: stopGeneration,
  } = useChat({
    api: "/api/chat",
    id: sandboxId ?? undefined,
    body: { sandboxId },
    maxSteps: 30,
    onError: () => {
      toast.error("There was an error", {
        description: "Please try again later.",
      });
    },
  });

  const isLoading = status !== "ready";

  const refreshDesktop = async () => {
    try {
      setIsInitializing(true);
      const { streamUrl, id } = await getDesktopURL(sandboxId || undefined);
      setStreamUrl(streamUrl);
      setSandboxId(id);
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsInitializing(true);
      const { streamUrl, id } = await getDesktopURL(sandboxId ?? undefined);
      setStreamUrl(streamUrl);
      setSandboxId(id);
      setIsInitializing(false);
    };
    init();
  }, []);

  const showEventTemporarily = (eventId: string) => {
    setVisibleEventIds((prev) => [...prev, eventId]);

    setTimeout(() => {
      setVisibleEventIds((prev) =>
        prev.filter((id) => id !== eventId)
      );
    }, 2000);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);

    const events = generateMockAgentEvents(input);
    events.forEach((event) => {
      dispatch(addEvent(event));
      showEventTemporarily(event.id);
    });
  };

  return (
    <div className="flex h-dvh relative">
      {/* Desktop */}
      <div className="w-full hidden xl:block">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* LEFT */}
          <ResizablePanel defaultSize={30} minSize={25} className="flex flex-col">
            <div className="bg-white py-4 px-4 flex justify-between">
              <AISDKLogo />
              <DeployButton />
            </div>

            <div
              className="flex-1 space-y-6 py-4 overflow-y-auto px-4"
              ref={desktopContainerRef}
            >
              {messages.length === 0 && (
                <PromptSuggestions
                  disabled={isInitializing}
                  submitPrompt={(prompt) => {
                    handleSubmit({
                      preventDefault: () => {},
                      target: { value: prompt },
                    } as unknown as React.FormEvent);

                    const events = generateMockAgentEvents(prompt);
                    events.forEach((event) => {
                      dispatch(addEvent(event));
                      showEventTemporarily(event.id);
                    });
                  }}
                />
              )}

              {messages.map((message, i) => (
                <PreviewMessage
                  key={message.id}
                  message={message}
                  isLoading={isLoading}
                  status={status}
                  isLatestMessage={i === messages.length - 1}
                />
              ))}

              {/* TEMP TOOL UI */}
              {agentEvents
                .filter((e) => visibleEventIds.includes(e.id))
                .map((event) => (
                  <ToolCallCard
                    key={event.id}
                    toolName={event.type}
                    status={event.status}
                    onClick={() =>
                      console.log("Selected event:", event)
                    }
                  />
                ))}

              <div ref={desktopEndRef} />
            </div>

            <form onSubmit={onSubmit} className="p-4 bg-white">
              <Input
                handleInputChange={handleInputChange}
                input={input}
                isInitializing={isInitializing}
                isLoading={isLoading}
                status={status}
                stop={stopGeneration}
              />
            </form>

            <DebugPanel />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* RIGHT */}
          <ResizablePanel defaultSize={70} minSize={40} className="bg-black">
            {streamUrl && (
              <>
                <iframe src={streamUrl} className="w-full h-full" />
                <Button
                  onClick={refreshDesktop}
                  className="absolute top-2 right-2"
                >
                  New desktop
                </Button>
              </>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Mobile */}
      <div className="w-full xl:hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-4" ref={mobileContainerRef}>
          {messages.map((message, i) => (
            <PreviewMessage
              key={message.id}
              message={message}
              isLoading={isLoading}
              status={status}
              isLatestMessage={i === messages.length - 1}
            />
          ))}

          {agentEvents
            .filter((e) => visibleEventIds.includes(e.id))
            .map((event) => (
              <ToolCallCard
                key={event.id}
                toolName={event.type}
                status={event.status}
                onClick={() =>
                  console.log("Selected event:", event)
                }
              />
            ))}

          <div ref={mobileEndRef} />
        </div>

        <form onSubmit={onSubmit} className="p-4 bg-white">
          <Input
            handleInputChange={handleInputChange}
            input={input}
            isInitializing={isInitializing}
            isLoading={isLoading}
            status={status}
            stop={stopGeneration}
          />
        </form>
      </div>
    </div>
  );
}
