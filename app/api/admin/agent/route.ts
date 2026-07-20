import { NextRequest, NextResponse } from "next/server";

const PYTHON_RAG_API = process.env.RAG_BACKEND_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const { action, payload } = await req.json();

    let targetEndpoint = "";
    if (action === "reflection") {
      targetEndpoint = `${PYTHON_RAG_API.replace(/\/$/, "")}/agent/reflection`;
    } else if (action === "analytics") {
      targetEndpoint = `${PYTHON_RAG_API.replace(/\/$/, "")}/agent/analytics`;
    } else if (action === "ingest") {
      targetEndpoint = `${PYTHON_RAG_API.replace(/\/$/, "")}/webhook/ingest`;
    } else {
      return NextResponse.json({ error: "Invalid agent action." }, { status: 400 });
    }

    const backendRes = await fetch(targetEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload || {}),
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error: any) {
    console.error("[Admin Agent Action Error]:", error);
    return NextResponse.json({ error: error.message || "Failed to trigger agent." }, { status: 500 });
  }
}
