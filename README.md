<a href="https://ai-sdk-starter-groq.vercel.app">
  <h1 align="center">AI SDK Computer Use Demo</h1>
</a>

<p align="center">
  An open-source AI chatbot app template demonstrating Anthropic Claude 3.7 Sonnet's computer use capabilities, built with Next.js and the AI SDK by Vercel.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running Locally</strong></a> ·
  <a href="#authors"><strong>Authors</strong></a>
</p>
<br/>

## Features

  Two-Panel Layout
  Left Panel
  Streaming chat interface
  Inline tool call cards
  Collapsible debug/event panel
  Right Panel
  Live VNC viewer (E2B desktop)
  Expanded tool call details (on selection)
  Panels are horizontally resizable and optimized for desktop and tablet.

## Tool Call Visualization

  Tool calls are rendered as interactive UI elements with:
  Type, status (pending / complete / error), and duration
  Clickable cards that reveal detailed output
  
## Tool-specific rendering:

  Screenshots – inline card, expanded preview
  Bash commands – command and output
  Browser actions – action type and target
  Typing – text and destination

## Event Pipeline & Debugging

  Centralized event store using Redux
  Strongly typed events with discriminated unions
  Derived state for timelines, counts, and execution status
  Collapsible debug panel for observability

## Performance & UX
  VNC viewer does not re-render on chat or event updates
  Clean component boundaries
  Responsive mobile layout
  Mock vs Real Computer Use
  Anthropic’s official computer-use models are gated and not available on standard developer plans.

This project uses a mock execution layer to fully power the UI, event pipeline, and debugging experience.
The architecture allows swapping to live computer-use tools without UI changes.

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
