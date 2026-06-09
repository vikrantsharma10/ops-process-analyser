"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

// Subcomponents matching core application UI layers
function Pip({ used, locked }: { used: boolean; locked: boolean }) {
  return <div className={`pip ${used ? 'used' : locked ? 'locked' : ''}`} />;
}

function LoadingState({ progress, status }: { progress: number; status: string }) {
  return (
    <div style={{ marginTop: '24px' }}>
      <div className="loading-bar">
        <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="loading-status" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
        <span className="dot-anim">●</span>
        {status}
      </div>
    </div>
  );
}

export default function App() {
  const [processText, setProcessText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadStatus, setLoadStatus] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [usageCount, setUsageCount] = useState(0);

  // Safely grab localStorage metrics once mounted inside user's client sandbox
  useEffect(() => {
    const savedUsage = localStorage.getItem('opa_usage');
    if (savedUsage) setUsageCount(parseInt(savedUsage, 10));
  }, []);

  const runDiagnosis = async () => {
    if (!processText.trim() || processText.trim().length < 30) {
      setError('Please paste a more detailed process description.');
      return;
    }

    setError(null);
    setLoading(true);
    setLoadProgress(15);
    setLoadStatus('Parsing process structure...');

    try {
      // Mock processing stages to reflect analysis generation
      setTimeout(() => { setLoadProgress(45); setLoadStatus('Mapping handoff points...'); }, 600);
      setTimeout(() => { setLoadProgress(75); setLoadStatus('Identifying root causes...'); }, 1200);

      // Replace this structural block with your actual app/api call once hooked up
      setTimeout(() => {
        setResult({
          healthScore: 4.2,
          manualPct: 80,
          automatedPct: 20,
          handoffCount: 5,
          executiveSummary: "Process flow reveals deep manual operational friction.",
          handoffRisks: ["Data leakage risk due to cross-functional manual handoffs."],
          rootCauses: ["Lack of clear functional ownership mapping definitions."],
          actions: ["Automate pipeline step handoffs systematically."]
        });
        setLoading(false);
        const nextCount = usageCount + 1;
        setUsageCount(nextCount);
        localStorage.setItem('opa_usage', String(nextCount));
      }, 2000);

    } catch (err) {
      setLoading(false);
      setError('An error occurred during process diagnostics.');
    }
  };

  return (
    <div>
      {/* Navbar View Context Container */}
      <nav>
        <div className="nav-inner">
          <div className="nav-left">
            <div className="nav-logo">PIS / V1.0</div>
            <div className="nav-module"><span>Module 01 —</span> Ops Process Analyser</div>
          </div>
          <button className="nav-cta" onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}>
            Run Diagnosis ↓
          </button>
        </div>
      </nav>

      {/* Primary Hero Section Wrapper */}
      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow">Process Intelligence Suite – Module 01</div>
          <h1 className="hero-headline">Diagnose the process, <br />not the <em>people.</em></h1>
          <p className="hero-sub">
            Paste any business process and get an instant breakdown of <strong>what percentage is manual vs automated</strong>, a <strong>process health score out of 10</strong>, your top handoff risks, root causes, and three sequenced actions to fix it.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}>
              Run Your Diagnosis ↓
            </button>
          </div>
          <div className="hero-stat-row">
            <div className="hero-stat">
              <div className="hero-stat-num">2</div>
              <div className="hero-stat-label">Free Analyses</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">150w</div>
              <div className="hero-stat-label">Executive Summary</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">&lt;60s</div>
              <div className="hero-stat-label">Turnaround Time</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">M01</div>
              <div className="hero-stat-label">Process Analyser</div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Diagnostic Tool Workspace Block */}
      <section id="tool">
        <div className="container">
          <div className="tool-header">
            <div className="tool-header-left">
              <h2 className="tool-title">Run Process Diagnosis</h2>
              <p className="tool-sub">Analyze workflow structures and isolate automation opportunities instantly.</p>
            </div>
            <div className="usage-counter">
              <div>USAGE: {usageCount} / 2 FREE ANALYSES</div>
              <div className="usage-pips" style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                <Pip used={usageCount >= 1} locked={false} />
                <Pip used={usageCount >= 2} locked={false} />
                <Pip used={false} locked={true} />
              </div>
            </div>
          </div>

          <div className="input-area">
            <textarea
              placeholder="Paste workflow layout definitions..."
              value={processText}
              onChange={(e) => setProcessText(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && <div style={{ color: 'var(--accent)', marginTop: '12px', fontSize: '12px' }}>{error}</div>}

          <div className="tool-actions">
            <button className="btn-run" onClick={runDiagnosis} disabled={loading || !processText.trim()}>
              {loading ? 'Analyzing...' : 'Execute Analysis →'}
            </button>
          </div>

          {loading && <LoadingState progress={loadProgress} status={loadStatus} />}
        </div>
      </section>
    </div>
  );
}
