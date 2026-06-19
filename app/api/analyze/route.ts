// ─── POST /api/analyze ───────────────────────────────────────────────────────
// Body: { question: string }
// Returns: a fully computed Report (deterministic core + optional AI narrative).

import { NextResponse } from "next/server";
import { extractRequest } from "@/lib/ai/extract";
import { runPipeline } from "@/lib/phda/pipeline";
import { enrichNarrative } from "@/lib/ai/narrative";
import { reportToMarkdown } from "@/lib/phda/report";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: Request) {
  let question = "";
  try {
    const body = await req.json();
    question = (body?.question ?? "").toString().trim();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  if (!question) {
    return NextResponse.json(
      { error: "Provide a 'question' string." },
      { status: 400 }
    );
  }
  if (question.length > 2000) question = question.slice(0, 2000);

  try {
    const request = await extractRequest(question);
    let report = runPipeline(request);
    report = { ...report, question };
    report = await enrichNarrative(report);
    const markdown = reportToMarkdown(report);
    return NextResponse.json({ report, markdown });
  } catch (err) {
    console.error("analyze error", err);
    return NextResponse.json(
      { error: "Analysis failed.", detail: String(err) },
      { status: 500 }
    );
  }
}
