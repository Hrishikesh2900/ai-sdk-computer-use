Author: Hrishikesh.Patil

<p align="center"> <a href="https://ai-sdk-starter-groq.vercel.app"> <h2 align="center">AI SDK Computer Use Demo</h2> </a> </p> <p align="center"> An interactive AI agent demo built with <strong>Next.js</strong> and <strong>Vercel AI SDK</strong>, showcasing a computer-use style workflow inspired by <strong>Claude 3.7 Sonnet</strong>. </p> <p align="center"> <a href="#live-demo--video"><strong>Live Demo & Video</strong></a> · <a href="#features--deliverables-mapping"><strong>Features</strong></a> · <a href="#architecture-overview"><strong>Architecture</strong></a> · <a href="#running-locally"><strong>Running Locally</strong></a> </p>


=> Live Demo & Video

Live Deployed Application: (https://aisdkcomputeruse-tau.vercel.app/)

Demo Video (with voice narration): 

The demo video includes voice narration explaining the project flow, UI components, and how each feature satisfies the challenge deliverables.

📌 Project Overview

This project demonstrates a computer-use style AI agent interface, where an AI assistant:

-Chats with the user

-Emits structured tool calls

-Visualizes tool execution

-Interacts with a simulated desktop environment

-The goal is to showcase:

-Clear agent → tool → UI orchestration

-Strong frontend architecture

-Debuggability and observability of AI actions

⚠️ Note: Anthropic’s official computer-use tools are currently gated.
This project uses a mock execution layer to fully demonstrate the UI, event pipeline, and system design without relying on restricted APIs.

Features & Deliverables Mapping
1. AI Chat Interface

Streaming chat responses

Message history with clear role separation

Real-time updates using Vercel AI SDK

-Demonstrated in demo video
-Matches AI interaction requirement

2. Tool Call Visualization

Each AI tool call is rendered as an interactive UI card showing:

Tool type (screenshot, bash, browser action, typing)

Execution status (pending / complete / error)

Execution duration

Clicking a card reveals detailed output.

-Makes AI actions transparent
-Improves explainability & debugging

3. Two-Panel Responsive Layout

Left Panel

Chat interface

Inline tool call cards

Collapsible debug / event panel

Right Panel

Live VNC desktop viewer

Expanded tool call details on selection

Panels are:

Horizontally resizable

Optimized for desktop & tablet layouts

-Clean separation of concerns
-Strong UX focus

4. Event Pipeline & Debugging

Centralized event store using Redux

Strongly typed event definitions

Derived state for:

Timelines

Execution status

Tool counts

Collapsible debug panel for observability

-Demonstrates scalable state management
-Production-ready architecture

5. Performance Considerations

VNC viewer does not re-render on chat or event updates

Isolated component boundaries

Minimal unnecessary state updates

-Shows attention to performance & UX

=> Architecture Overview
User Input
   ↓
AI SDK (Streaming Response)
   ↓
Structured Tool Calls
   ↓
Redux Event Store
   ↓
UI Rendering (Chat / Tool Cards / VNC Viewer)

Mock vs Real Computer Use

Tool execution is mocked to simulate real computer-use behavior

Architecture allows swapping mock tools with real integrations without UI changes

## Deploy Your Own

You can deploy your own version to Vercel by clicking the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?project-name=AI+SDK+Computer+Use+Demo&repository-name=ai-sdk-computer-use&repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fai-sdk-computer-use&demo-title=AI+SDK+Computer+Use+Demo&demo-url=https%3A%2F%2Fai-sdk-computer-use.vercel.app%2F&demo-description=A+chatbot+application+built+with+Next.js+demonstrating+Anthropic+Claude+3.7+Sonnet%27s+computer+use+capabilities&env=ANTHROPIC_API_KEY,E2B_API_KEY)

## Running Locally

1. Clone the repository and install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. Install the [Vercel CLI](https://vercel.com/docs/cli):

   ```bash
   npm i -g vercel
   # or
   yarn global add vercel
   # or
   pnpm install -g vercel
   ```

   Once installed, link your local project to your Vercel project:

   ```bash
   vercel link
   ```

   After linking, pull your environment variables:

   ```bash
   vercel env pull
   ```

   This will create a `.env.local` file with all the necessary environment variables.

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view your new AI chatbot application.

## Authors

This repository is maintained by the [Vercel](https://vercel.com) team and community contributors.

Contributions are welcome! Feel free to open issues or submit pull requests to enhance functionality or fix bugs.
