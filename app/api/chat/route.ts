import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const PYTHON_RAG_API = process.env.RAG_BACKEND_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [], mode = "short" } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const backendUrl = `${PYTHON_RAG_API.replace(/\/$/, "")}/chat`;

    const backendRes = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history, mode }),
    });

    if (!backendRes.ok || !backendRes.body) {
      const errorText = await backendRes.text().catch(() => "Unknown error");
      console.error("[RAG Proxy Error]:", errorText);
      return NextResponse.json(
        { error: `RAG Backend service unavailable (${backendRes.status})` },
        { status: 502 }
      );
    }

    // Pipe SSE stream directly to client
    return new Response(backendRes.body as ReadableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("[RAG API Route Exception]:", error);
    return NextResponse.json(
      { error: "Internal Server Error during AI processing." },
      { status: 500 }
    );
  }
}
