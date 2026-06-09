"use client";

import React, { useState, useEffect } from "react";

const BOOK_A_CALL_URL = "https://coveredbyumbrella.com/#book";

function Pip(props: { used: boolean; locked: boolean }) {
  return (
    <div style={{
      width: "20px",
      height: "6px",
      borderRadius: "2px",
      border: props.used ? "1px solid #0B0B0B" : props.locked ? "1px solid #D0D0D0" : "1px solid #C5C0BA",
      backgroundColor: props.used ? "#0B0B0B" : props.locked ? "#F0EDE8" : "transparent",
    }} />
  );
}

function LoginGate() {
  return (
    <div style={{ padding: "32px", border: "1px solid #E6E1DA", backgroundColor: "#F5F2EC", borderRadius: "8px", textAlign: "center" }}>
      <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "#7a7670", marginBottom: "20px", lineHeight: "1.6" }}>
        You have used your free diagnostic runs. Sign in to keep going.
      </p>
      <button style={{ backgroundColor: "#0B0B0B", color: "#FAF8F3", border: "none", padding: "12px 28px", fontFamily: "DM Sans, sans-serif", fontSize: "14px", fontWeight: 500, cursor: "pointer", borderRadius: "6px" }}>
        Sign in to Umbrella
      </button>
    </div>
  );
}

function ResultBlock(props: { label: string; accent: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "24px 28px", border: "1px solid #E6E1DA", backgroundColor: "#FAF8F3", borderRadius: "8px" }}>
      <div style={{ display: "inline-flex", padding: "4px 10px", borderRadius: "20px", backgroundColor: props.accent, color: "#0B0B0B", fontFamily: "DM Sans, sans-serif", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", marginBottom: "14px" }}>
        {props.label}
      </div>
      <div style={{ color: "#3a3835", fontSize: "14px", lineHeight: "1.7", fontFamily: "DM Sans, sans-serif" }}>
        {props.children}
      </div>
    </div>
  );
}

export default function App() {
  const [processText, setProcessText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadStatus, setLoadStatus] = useState("");
  const [usageCount, setUsageCount] = useState(0);
  const [error, setError] = useState("");
  const [showGate, setShowGate] = useState(false);
  const [result, setResult] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("opa_usage");
    if (saved) setUsageCount(parseInt(saved, 10));
  }, []);

  function runDiagnosis() {
    if (processText.length < 30) {
      setError("Minimum 30 characters needed.");
      return;
    }
    setError("");
    setResult(false);
    setLoading(true);
    setLoadProgress(15);
    setLoadStatus("Parsing execution points...");
    setTimeout(() => { setLoadProgress(45); setLoadStatus("Mapping handoff points..."); }, 600);
    setTimeout(() => { setLoadProgress(80); setLoadStatus("Isolating data silos..."); }, 1300);
    setTimeout(() => {
      setLoading(false);
      const next = usageCount + 1;
      setUsageCount(next);
      localStorage.setItem("opa_usage", String(next));
      setResult(true);
      if (next >= 2) setShowGate(true);
    }, 2200);
  }

  const disabled = loading || showGate || processText.length < 1;

  return (
    <div className="dot-pattern" style={{ backgroundColor: "#FAF8F3", color: "#0B0B0B", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      <nav style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "#FAF8F3", borderBottom: "1px solid #E6E1DA" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "18px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="https://coveredbyumbrella.com" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "#0B0B0B" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B0B0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7" />
            </svg>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "18px" }}>Umbrella</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "#7a7670" }}>Process Intelligence Suite</span>
            <a href={BOOK_A_CALL_URL} style={{ backgroundColor: "#0B0B0B", color: "#FAF8F3", padding: "10px 20px", borderRadius: "6px", fontFamily: "DM Sans, sans-serif", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}>
              Book a strategy call
            </a>
          </div>
        </div>
      </nav>

      <div style={{ flex: 1, maxWidth: "1200px", margin: "0 auto", padding: "64px 40px 80px", width: "100%", display: "flex", flexDirection: "column", gap: "48px" }}>

        <div style={{ display: "flex", gap: "64px", flexWrap: "wrap", alignItems: "flex-start" }}>

          <div style={{ flex: "1 1 360px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "inline-flex", width: "fit-content", padding: "5px 12px", borderRadius: "20px", backgroundColor: "#BEE9F7", color: "#0B0B0B", fontFamily: "DM Sans, sans-serif", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>
              AI-OPS Diagnostic Tool
            </div>
            <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(44px, 5.5vw, 68px)", fontWeight: 400, lineHeight: 1.05, color: "#0B0B0B", margin: 0 }}>
              Process <span style={{ fontStyle: "italic", fontWeight: 700 }}>Analyser</span>.
            </h1>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "16px", color: "#7a7670", lineHeight: "1.7", maxWidth: "420px", margin: 0 }}>
              Isolate operational friction, score system integrity, and map ownership boundaries. Paste your process documentation; get a clinical breakdown back.
            </p>
            <div style={{ border: "1px solid #E6E1DA", backgroundColor: "#FAF8F3", borderRadius: "8px", padding: "18px 22px", maxWidth: "320px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "DM Sans, sans-serif", fontSize: "12px", fontWeight: 500, marginBottom: "12px", color: "#7a7670" }}>
                <span>Diagnostic Runs</span>
                <span style={{ color: "#0B0B0B", fontWeight: 600 }}>{usageCount}/10</span>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                {Array.from({ length: 10 }, (_, i) => (
                  <Pip key={i} used={i < usageCount} locked={i >= 2 && i >= usageCount} />
                ))}
              </div>
            </div>
            <a href="https://coveredbyumbrella.com" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", fontWeight: 500, color: "#7a7670", textDecoration: "none" }}>
              ← Back to Umbrella
            </a>
          </div>

          <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {showGate && <LoginGate />}
           <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  <ResultBlock label="Executive Summary" accent="#DDF7A8">
    Diagnostic complete. Operational anomalies identified within the process pipeline. Key friction points mapped across handoff boundaries and data flow layers.
  </ResultBlock>
  <ResultBlock label="Granular Breakdown" accent="#D8BEF7">
    Full analysis sequenced. Mitigation roadmap assigned. Sign in to view ownership maps, bottleneck scores, and recommended next steps.
  </ResultBlock>
</div>
            {loading && (
              <div style={{ border: "1px solid #E6E1DA", borderRadius: "8px", padding: "28px", backgroundColor: "#FAF8F3" }}>
                <div style={{ width: "100%", height: "3px", backgroundColor: "#E6E1DA", borderRadius: "2px", overflow: "hidden", marginBottom: "14px" }}>
                  <div style={{ height: "100%", backgroundColor: "#0B0B0B", width: loadProgress + "%", transition: "width 0.4s ease" }} />
                </div>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#7a7670" }}>{loadStatus}</div>
              </div>
            )}
          </div>

        </div>

        <div style={{ border: "1px solid #E6E1DA", backgroundColor: "#FAF8F3", borderRadius: "12px", padding: "28px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", fontWeight: 600, color: "#0B0B0B" }}>Paste your process documentation</span>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "#7a7670" }}>{processText.length} chars</span>
          </div>
          <textarea
            placeholder="Describe your operational process in detail — team handoffs, tools used, approval chains, where bottlenecks appear, what gets dropped, and where ownership gets blurry. The more context you give, the sharper the diagnosis."
            value={processText}
            onChange={(e) => setProcessText(e.target.value)}
            disabled={loading || showGate}
            style={{ width: "100%", height: "320px", backgroundColor: "#F5F2EC", border: "1px solid #E6E1DA", borderRadius: "8px", padding: "20px 22px", color: "#0B0B0B", fontSize: "15px", resize: "vertical", outline: "none", fontFamily: "DM Sans, sans-serif", lineHeight: "1.7" }}
          />
          {error && (
            <div style={{ color: "#c0392b", fontFamily: "DM Sans, sans-serif", fontSize: "12px", marginTop: "10px" }}>{error}</div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "#C5C0BA" }}>Minimum 30 characters to run a diagnosis</span>
            <button
              onClick={runDiagnosis}
              disabled={disabled}
              style={{ backgroundColor: disabled ? "#D0D0D0" : "#0B0B0B", color: disabled ? "#7a7670" : "#FAF8F3", border: "none", padding: "13px 32px", fontFamily: "DM Sans, sans-serif", fontSize: "14px", fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer", borderRadius: "6px" }}
            >
              {loading ? "Analysing..." : "Run Diagnosis"}
            </button>
          </div>
        </div>

      </div>

      <footer style={{ borderTop: "1px solid #E6E1DA", backgroundColor: "#FAF8F3", padding: "32px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "#C5C0BA" }}>2026 Umbrella. All rights reserved.</span>
          <a href={BOOK_A_CALL_URL} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", fontWeight: 500, color: "#0B0B0B", textDecoration: "none" }}>Book a strategy call</a>
          <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "13px", fontStyle: "italic", color: "#7a7670" }}>At Umbrella, things are done differently.</span>
        </div>
      </footer>

    </div>
  );
}
