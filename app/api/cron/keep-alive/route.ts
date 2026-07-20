import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  // Verify authorization if CRON_SECRET is configured
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized cron execution." }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Supabase credentials missing." }, { status: 500 });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Perform a lightweight query to keep Supabase database active & unpaused
    const { data, error } = await supabase.from("jadwal").select("id").limit(1);

    if (error) {
      console.error("[Keep-Alive Cron Error]:", error);
      return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
    }

    // Also trigger Daily Reflection Agent if Python engine URL is available
    const engineUrl = process.env.RAG_BACKEND_URL;
    let reflectionTriggered = false;

    if (engineUrl) {
      try {
        const agentRes = await fetch(`${engineUrl.replace(/\/$/, "")}/agent/reflection`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        if (agentRes.ok) {
          reflectionTriggered = true;
        }
      } catch (e) {
        console.warn("[Cron Warning]: Could not trigger python reflection agent:", e);
      }
    }

    return NextResponse.json({
      status: "success",
      message: "Supabase pinged successfully! Database kept active.",
      db_response_rows: data?.length || 0,
      daily_reflection_agent_triggered: reflectionTriggered,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[Keep-Alive Cron Exception]:", err);
    return NextResponse.json({ error: err.message || "Failed keep-alive cron." }, { status: 500 });
  }
}
