'use client';

import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface AnalysisResult {
  layer1: string;
  layer2: string;
  healthScore: number | null;
  manualPct: number | null;
  automatedPct: number | null;
  isDiagnosis: boolean;
}

function parseResponse(text: string): AnalysisResult {
  const DIVIDER =
    'Full diagnosis below. Read if you want to challenge the summary or brief your team.';

  const dividerIndex = text.indexOf(DIVIDER);
  let layer1: string, layer2: string;

  if (dividerIndex !== -1) {
    layer1 = text.substring(0, dividerIndex).trim();
    layer2 = text.substring(dividerIndex + DIVIDER.length).trim();
  } else {
    layer1 = text.trim();
    layer2 = '';
  }

  const healthMatch = layer1.match(/Overall health:\s*(\d+(?:\.\d+)?)\s*\/\s*10/i);
  const healthScore = healthMatch ? parseFloat(healthMatch[1]) : null;

  const manualMatch = layer1.match(/(\d+)%\s*manual/i);
  const manualPct = manualMatch ? parseInt(manualMatch[1]) : null;

  const autoMatch = layer1.match(/(\d+)%\s*auto(?:mated)?/i);
  const automatedPct = autoMatch ? parseInt(autoMatch[1]) : null;

  return { layer1, layer2, healthScore, manualPct, automatedPct, isDiagnosis: dividerIndex !== -1 };
}

// ── Text helpers ─────────────────────────────────────────────────────────────

function normalizeLayer1(text: string): string {
  return text
    .replace(/(Fix these three things:)\s*(\d)/i, '$1\n$2')
    .replace(/(\d\.[^\n]+?[.!?])\s+(\d\.)/g, '$1\n$2');
}

function Layer1Text({ text }: { text: string }) {
  const lines = normalizeLayer1(text).split('\n');
  return (
    <div className="exec-text">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="exec-spacer" />;
        if (/^\d+\./.test(trimmed)) {
          return <div key={i} className="fix-item">{trimmed}</div>;
        }
        return <div key={i}>{trimmed}</div>;
      })}
    </div>
  );
}

function DiagText({ text }: { text: string }) {
  const lines = text.split('\n');
  const result: React.ReactNode[] = [];
  let tableLines: string[] = [];
  let textLines: string[] = [];
  let key = 0;

  const flushText = () => {
    if (textLines.length === 0) return;
    result.push(
      <div key={key++} className="diag-text">{textLines.join('\n')}</div>
    );
    textLines = [];
  };

  const flushTable = () => {
    if (tableLines.length === 0) return;
    const isSeparator = (l: string) => /^\s*\|[\s\-:|]+\|\s*$/.test(l);
    const dataLines = tableLines.filter(l => !isSeparator(l));
    if (dataLines.length < 2) {
      textLines.push(...tableLines);
      tableLines = [];
      return;
    }
    const parseRow = (line: string) =>
      line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
    const [headerLine, ...bodyLines] = dataLines;
    const headers = parseRow(headerLine);
    const rows = bodyLines.map(parseRow);
    result.push(
      <table key={key++} className="diag-table">
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    );
    tableLines = [];
  };

  for (const line of lines) {
    const isTableLine = /^\s*\|/.test(line) && /\|\s*$/.test(line);
    if (isTableLine) {
      flushText();
      tableLines.push(line);
    } else {
      flushTable();
      textLines.push(line);
    }
  }
  flushText();
  flushTable();

  return <>{result}</>;
}

// ── Copy button ───────────────────────────────────────────────────────────────

function CopyButton({ text, eventType }: { text: string; eventType: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      void supabase.from('events').insert({ event_type: eventType, user_id: null });
    } catch (_) {}
  };

  return (
    <button className="copy-btn" onClick={handleCopy} title="Copy to clipboard">
      {copied ? (
        <span className="copy-confirm">Copied</span>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="8" height="9" rx="1" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M4 3V2.5C4 1.67 4.67 1 5.5 1H11.5C12.33 1 13 1.67 13 2.5V9.5C13 10.33 12.33 11 11.5 11H11" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
      )}
    </button>
  );
}

// ── Panel footnote ────────────────────────────────────────────────────────────

function PanelFootnote() {
  return (
    <div className="panel-footnote">
      Ops Process Analyser — Built by{' '}
      <a
        href="https://www.linkedin.com/in/vikrantsharma10/"
        target="_blank"
        rel="noopener noreferrer"
        className="panel-footnote-link"
      >
        Vikrant Sharma
      </a>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function LoadingState({ progress, status }: { progress: number; status: string }) {
  return (
    <div>
      <div className="loading-bar">
        <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="loading-status">
        <span className="dot-anim">●</span>
        {status}
      </div>
    </div>
  );
}

function ExecutiveSummary({ data }: { data: AnalysisResult }) {
  return (
    <div className="result-panel">
      <div className="result-panel-header">
        <div className="result-panel-label">Layer 1 — Executive Summary</div>
        <div className="result-panel-header-right">
          <div className="result-panel-tag">~150 words</div>
          <CopyButton text={data.layer1} eventType="copy_layer1" />
        </div>
      </div>
      <div className="result-panel-body">
        {data.healthScore !== null && (
          <div className="score-row">
            <div className="score-num">{data.healthScore}</div>
            <div className="score-denom">/10</div>
            <div className="score-meta">
              <div className="score-label">Process Health Score</div>
              <div className="score-bar-track">
                <div
                  className="score-bar-fill"
                  style={{ width: `${data.healthScore * 10}%` }}
                />
              </div>
            </div>
          </div>
        )}
        {(data.manualPct !== null || data.automatedPct !== null) && (
          <div className="breakdown-row">
            {data.manualPct !== null && (
              <div className="breakdown-item">
                <div className="breakdown-pct accent">{data.manualPct}%</div>
                <div className="breakdown-label">Manual</div>
              </div>
            )}
            {data.automatedPct !== null && (
              <div className="breakdown-item">
                <div className="breakdown-pct">{data.automatedPct}%</div>
                <div className="breakdown-label">Automated</div>
              </div>
            )}
          </div>
        )}
        <Layer1Text text={data.layer1} />
        <PanelFootnote />
      </div>
    </div>
  );
}

function FullDiagnosis({ data }: { data: AnalysisResult }) {
  return (
    <div className="result-panel">
      <div className="result-panel-header">
        <div className="result-panel-label">Layer 2 — Full Diagnosis</div>
        <div className="result-panel-header-right">
          <div className="result-panel-tag">For your team</div>
          <CopyButton text={data.layer2} eventType="copy_layer2" />
        </div>
      </div>
      <div className="result-panel-body">
        {data.isDiagnosis ? (
          <DiagText text={data.layer2} />
        ) : (
          <div className="exec-text" style={{ opacity: 0.5 }}>
            Add the requested details to your process description above and run again to get the
            full team diagnosis.
          </div>
        )}
        <PanelFootnote />
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [processText, setProcessText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadStatus, setLoadStatus] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const animateProgress = useCallback(
    (stages: { pct: number; label: string; delay: number }[]) => {
      let i = 0;
      const tick = () => {
        if (i < stages.length) {
          setLoadProgress(stages[i].pct);
          setLoadStatus(stages[i].label);
          i++;
          setTimeout(tick, stages[i - 1].delay);
        }
      };
      tick();
    },
    []
  );

  const runDiagnosis = useCallback(async () => {
    if (!processText.trim() || processText.trim().length < 30) {
      setError('Please provide a more detailed process description (at least 30 characters).');
      return;
    }

    setError(null);
    setResult(null);
    setLoading(true);
    setLoadProgress(0);

    animateProgress([
      { pct: 15, label: 'Parsing process structure...', delay: 600 },
      { pct: 35, label: 'Mapping handoff points...', delay: 700 },
      { pct: 55, label: 'Calculating automation ratio...', delay: 600 },
      { pct: 72, label: 'Identifying root causes...', delay: 700 },
      { pct: 88, label: 'Generating diagnosis...', delay: 500 },
    ]);

    try {
      const response = await fetch('/api/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: processText, userId: null }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed. Please try again.');
      }

      const parsed = parseResponse(data.output);

      setLoadProgress(100);
      setLoadStatus('Diagnosis complete.');

      setTimeout(() => {
        setLoading(false);
        setResult(parsed);

        setTimeout(() => {
          if (outputRef.current) {
            const top =
              outputRef.current.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 200);
      }, 600);
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
    }
  }, [processText, animateProgress]);

  const charCount = processText.length;

  return (
    <>
      {/* ── Nav ── */}
      <nav>
        <div className="nav-inner">
          <div className="nav-left">
            <div className="nav-logo">PIS / V1.0</div>
            <div className="nav-module">
              <span>Module 01 —</span> Ops Process Analyser
            </div>
          </div>
          <button
            className="nav-cta"
            onClick={() =>
              document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Run Diagnosis ↓
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-eyebrow">Process Intelligence Suite — Module 01</div>
          <h1 className="hero-headline">
            Diagnose the process,
            <br />
            not the <em>people.</em>
          </h1>
          <p className="hero-sub">
            Paste any business process and get an instant breakdown of{' '}
            <strong>what percentage is manual vs automated</strong>, a{' '}
            <strong>process health score out of 10</strong>, your top handoff risks, root
            causes, and three sequenced actions to fix it.
          </p>
          <div className="hero-actions">
            <a
              className="btn-primary"
              href="#tool"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Run Your Diagnosis ↓
            </a>
          </div>
          <div className="hero-stat-row">
            <div className="hero-stat">
              <div className="hero-stat-num">2</div>
              <div className="hero-stat-label">Output Layers</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">150w</div>
              <div className="hero-stat-label">Executive punch</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">&lt;60s</div>
              <div className="hero-stat-label">Time to diagnosis</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">M01</div>
              <div className="hero-stat-label">PIS Suite</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section" id="how">
        <div className="container">
          <div className="section-label">How it works</div>
          <h2 className="section-title">
            Three steps.
            <br />
            <em>One clear picture.</em>
          </h2>
          <div className="steps-grid">
            <div className="step">
              <span className="step-num">STEP 01 /</span>
              <h3 className="step-title">Paste your process</h3>
              <p className="step-body">
                Describe any operational flow in plain language. An approval chain, an
                onboarding sequence, a finance reconciliation loop. No templates. No structured
                input required. Write it how you'd explain it to a colleague.
              </p>
              <div className="step-connector">→</div>
            </div>
            <div className="step">
              <span className="step-num">STEP 02 /</span>
              <h3 className="step-title">AI maps the structure</h3>
              <p className="step-body">
                The engine identifies every handoff, classifies each step as manual or automated,
                locates failure points, and calculates an objective health score — all without a
                consultant in the room.
              </p>
              <div className="step-connector">→</div>
            </div>
            <div className="step">
              <span className="step-num">STEP 03 /</span>
              <h3 className="step-title">Act on the diagnosis</h3>
              <p className="step-body">
                You receive two outputs: a 150-word executive summary ready to copy into a board
                deck, and a full team-level diagnosis with ranked root causes and three sequenced
                actions — ordered by impact and effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="section" id="output">
        <div className="container">
          <div className="section-label">What you get</div>
          <h2 className="section-title">
            Two layers.
            <br />
            <em>One truth.</em>
          </h2>
          <div className="output-grid">
            <div className="output-panel">
              <div className="output-layer">Layer 01 — Executive</div>
              <h3 className="output-title">The 150-word punch.</h3>
              <p className="output-desc">
                A crisp, board-ready paragraph your exec can drop directly into a memo, Slack
                update, or quarterly review. No filtering required.
              </p>
              <ul className="output-features">
                <li>Process health score with context</li>
                <li>Manual vs automated breakdown</li>
                <li>Single highest-risk handoff, named</li>
                <li>One-line recommended direction</li>
              </ul>
            </div>
            <div className="output-panel">
              <div className="output-layer">Layer 02 — Team Diagnosis</div>
              <h3 className="output-title">
                The full picture, for the people doing the work.
              </h3>
              <p className="output-desc">
                A structured breakdown your ops lead, process owner, or delivery team can action
                immediately — without back-and-forth with leadership.
              </p>
              <ul className="output-features">
                <li>Top handoff risks, named and ranked</li>
                <li>Root cause analysis (not symptom list)</li>
                <li>3 sequenced actions — by priority</li>
                <li>Effort vs. impact framing built in</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tool ── */}
      <section id="tool">
        <div className="container">
          <div className="tool-header">
            <div className="tool-header-left">
              <div className="section-label" style={{ marginBottom: 16 }}>
                Module 01 — Run Diagnosis
              </div>
              <h2 className="tool-title">
                Your process.
                <br />
                <em>Diagnosed.</em>
              </h2>
              <p className="tool-sub">
                Paste any process below — approval flows, onboarding steps, operational
                sequences. Include role names, tools, and where it typically breaks for the
                sharpest output.
              </p>
            </div>
          </div>

          <div className="input-area">
            <div className="input-label">
              <span>Process Description</span>
              <span className="char-count">{charCount} chars</span>
            </div>
            <textarea
              value={processText}
              onChange={(e) => setProcessText(e.target.value)}
              placeholder={
                `Describe your process in plain language. Include:\n` +
                `• Step-by-step flow (who does what, in what order, using which tools)\n` +
                `• Where it most commonly breaks down\n` +
                `• Teams and external partners involved\n` +
                `• Your company type, team size, and geography\n\n` +
                `The more detail you provide, the sharper the diagnosis.`
              }
              disabled={loading}
            />
          </div>

          {error && <div className="inline-error">⚠ {error}</div>}

          <div className="tool-actions">
            <div className="tool-hint">
              TIP — Include role names, systems, and decision points for a sharper diagnosis
            </div>
            <button
              className="btn-run"
              onClick={runDiagnosis}
              disabled={loading || !processText.trim()}
            >
              {loading ? (
                <>
                  <span className="dot-anim">◉</span>
                  Running...
                </>
              ) : (
                <>Run Diagnosis →</>
              )}
            </button>
          </div>

          {loading && <LoadingState progress={loadProgress} status={loadStatus} />}

          {!loading && result && (
            <div ref={outputRef} className="output-section visible">
              <ExecutiveSummary data={result} />
              <FullDiagnosis data={result} />
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <span>PIS</span> / V1.0 — Process Intelligence Suite
            </div>
            <div className="footer-copy">Module 01 — Ops Process Analyser</div>
          </div>
          <div className="footer-credit">
            Built by{' '}
            <a
              href="https://www.linkedin.com/in/vikrantsharma10/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-credit-link"
            >
              Vikrant Sharma
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
