Project B: The Production Web Interface (Front-End)

Objective: Deploy a production-grade web application for Saint John's Church integrated with the RAG Engine.
1. Core Specifications

    Framework: Next.js (App Router) deployed on Vercel.

    Styling: TailwindCSS with a "Gritty Industrial" aesthetic (Saint John’s Workshop style).

    Feature Set: Interactive AI Chat Widget, Document Explorer, and Church Information Portal.

2. Technical Requirements

    AI Integration: Create a persistent chat component utilizing Server-Sent Events (SSE) or Fetch API for streaming responses from the Back-end Engine.

    State Management: Lightweight client-side context for session-based chat history.

    Backend Connectivity: Secure integration with the FastAPI RAG engine via environment variables (ENGINE_API_URL).

    Deployment: CI/CD pipeline on Vercel with optimized build caching.

3. UI/UX Focus

    Responsiveness (Mobile-first design for parishioners).

    Accessibility (High contrast and clear typography for liturgical texts).

    Latency handling (Implement skeletons/loading states during RAG retrieval).

Instruksi Operasional (Operational Notes):

    For Antigravity (Ricing/Environment): Ensure both workspaces are isolated. Use different port mappings for local testing (e.g., FastAPI on 8000, Next.js on 3000).

    For Gemini CLI (Execution): Use the Back-end plan to generate scripts for upsert_data.py and agent_logic.py. Use the Front-end plan for React components and API hooks.