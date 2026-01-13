import { anthropic } from "@ai-sdk/anthropic";
import { streamText, UIMessage } from "ai";
import { prunedMessages } from "@/lib/utils";

// Allow streaming responses up to 30 seconds
export const maxDuration = 300;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  try {
    const result = streamText({
      // Model that WORKS on $5 plan
      model: anthropic("claude-3-haiku-20240307"),
      system:
        "You are a helpful assistant. " +
        "When a task requires computer interaction (clicking, typing, screenshots, running commands), " +
        "describe the actions step by step instead of executing them.",

      messages: prunedMessages(messages),

      // IMPORTANT: NO TOOLS HERE
      // Computer-use models are gated and not available on basic plans
    });

    const response = result.toDataStreamResponse({
      getErrorMessage(error) {
        console.error("Anthropic stream error:", error);

        if (typeof error === "string") return error;
        if (error instanceof Error) return error.message;

        if (
          error &&
          typeof error === "object" &&
          "message" in error &&
          typeof (error as { message: unknown }).message === "string"
        ) {
          return (error as { message: string }).message;
        }

        return "AI request failed. Please try again.";
      },
    });

    return response;
  } catch (error) {
    console.error("Chat API error:", error);

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
