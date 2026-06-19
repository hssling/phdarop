"use client";

import { useState } from "react";
import type { Report } from "@/lib/phda/types";
import ReportView from "@/components/ReportView";

const EXAMPLES = [
  "Where should my state spend its TB budget across districts to avert the most deaths?",
  "Which injury-prevention projects should we prioritize first?",
  "How much of our maternal mortality is avoidable, and what is it attributable to?",
  "Diagnose the biggest gaps in our health system's allocation and equity.",
  "Optimize a 40 million budget with 25 staff across districts, prioritizing equity.",
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    report: Report;
    markdown: string;
  } | null>(null);

  async function analyze(q?: string) {
    const text = (q ?? question).trim();
    if (!text) return;
    setQuestion(text);
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Analysis failed.");
      setResult({ report: data.report, markdown: data.markdown });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="hero">
        <h1>
          Ask a public-health question.
          <br />
          Get a <span className="grad">computed, policy-grade</span> answer.
        </h1>
        <p>
          PHDAROP turns a plain-language prompt into a reproducible decision
          analysis — prioritization, resource optimization, attributable
          burden, and gap diagnostics — using deterministic operations-research
          and decision-science engines. Every number is computed, not guessed.
        </p>
      </section>

      <div className="card prompt-card">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. Where should we allocate our district TB budget to avert the most deaths, prioritizing poorer areas?"
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") analyze();
          }}
        />
        <div className="row">
          <button
            className="primary"
            onClick={() => analyze()}
            disabled={loading || !question.trim()}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Analyzing…
              </>
            ) : (
              "Run analysis"
            )}
          </button>
          <span className="muted" style={{ fontSize: "0.82rem" }}>
            ⌘/Ctrl + Enter
          </span>
          {result && (
            <button
              className="ghost"
              onClick={() => {
                setResult(null);
                setQuestion("");
              }}
            >
              Clear
            </button>
          )}
        </div>
        <div className="examples">
          {EXAMPLES.map((ex, i) => (
            <button key={i} className="chip" onClick={() => analyze(ex)}>
              {ex}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="error">⚠ {error}</div>}

      {result && (
        <ReportView report={result.report} markdown={result.markdown} />
      )}
    </>
  );
}
