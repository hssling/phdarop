"use client";

import type { Report } from "@/lib/phda/types";

function Kpis({ report }: { report: Report }) {
  const k: { v: string; l: string }[] = [];
  const a = report.raw.allocation;
  const m = report.raw.mcda;
  const at = report.raw.attribution;
  const gi = report.raw.indices;
  if (a) {
    k.push({ v: `+${a.valueOfAnalyticsPct.toFixed(1)}%`, l: "Eq-wtd DALYs averted vs status quo" });
    k.push({ v: `${a.allocationInefficiencyIndex}`, l: "Allocation Inefficiency Index" });
  }
  if (m)
    k.push({
      v: m.meanInterMethodSpearman.toFixed(2),
      l: "MCDA method agreement (Spearman)",
    });
  if (at)
    k.push({
      v: `${(at.jointPaf * 100).toFixed(0)}%`,
      l: "Joint attributable fraction",
    });
  if (gi) k.push({ v: gi.bindingGap, l: "Binding gap" });
  if (!k.length) return null;
  return (
    <div className="kpis">
      {k.map((x, i) => (
        <div className="kpi" key={i}>
          <div className="v">{x.v}</div>
          <div className="l">{x.l}</div>
        </div>
      ))}
    </div>
  );
}

export default function ReportView({
  report,
  markdown,
}: {
  report: Report;
  markdown: string;
}) {
  function download() {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="report">
      <div className="badge-row">
        <span className="badge">{report.request.analysisType}</span>
        <span className="badge alt">{report.request.domain}</span>
        <span className="badge">parsed: {report.request.source}</span>
        {report.aiNarrative ? (
          <span className="badge alt">AI narrative</span>
        ) : (
          <span className="badge">deterministic</span>
        )}
        <span className="badge warn">computed · reproducible</span>
      </div>

      <h2 className="title">{report.headline}</h2>
      <div className="muted" style={{ fontSize: "0.85rem" }}>
        {report.generatedAt} · id {report.id}
      </div>

      <Kpis report={report} />

      <div className="exec">{report.executiveSummary}</div>

      {report.sections.map((s, i) => (
        <div className="section" key={i}>
          <h3>{s.heading}</h3>
          {s.body && <p>{renderInline(s.body)}</p>}
          {s.table && (
            <table className="data">
              <thead>
                <tr>
                  {s.table.columns.map((c, j) => (
                    <th key={j}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.table.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}

      {report.recommendations.length > 0 && (
        <div className="section">
          <h3>Policy recommendations</h3>
          {report.recommendations.map((rec, i) => (
            <div className="rec" key={i}>
              <h4>
                {i + 1}. {rec.decision}
              </h4>
              <ul>
                <li>
                  <strong>Evidence:</strong> {rec.evidence}
                </li>
                <li>
                  <strong>Cost:</strong> {rec.cost}
                </li>
                <li>
                  <strong>Benefit:</strong> {rec.benefit}
                </li>
                <li>
                  <strong>Risks:</strong> {rec.risks}
                </li>
                <li>
                  <strong>Monitoring:</strong> {rec.monitoring}
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="section">
        <h3>Methods used</h3>
        <ul className="muted">
          {report.methodsUsed.map((mm, i) => (
            <li key={i}>{mm}</li>
          ))}
        </ul>
      </div>

      <div className="limits">
        <strong>Limitations &amp; uncertainty</strong>
        <ul>
          {report.limitations.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>

      <div className="row">
        <button className="primary" onClick={download}>
          ⬇ Download report (Markdown)
        </button>
      </div>
    </section>
  );
}

/** Minimal inline markdown: **bold**. */
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i}>{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}
