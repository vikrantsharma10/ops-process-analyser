"use client";

import React, { useState, useEffect } from 'react';

function Pip({ used }: { used: boolean }) {
  return <div className={`pip ${used ? 'used' : ''}`} />;
}

export default function App() {
  const [processText, setProcessText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadStatus, setLoadStatus] = useState('');
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    const savedUsage = localStorage.getItem('opa_usage');
    if (savedUsage) setUsageCount(parseInt(savedUsage, 10));
  }, []);

  const runDiagnosis = () => {
    if (!processText.trim()) return;
    setLoading(true);
    setLoadProgress(20);
    setLoadStatus('Parsing process structure...');

    setTimeout(() => { setLoadProgress(60); setLoadStatus('Mapping handoff points...'); }, 800);
    setTimeout(() => {
      setLoadProgress(100);
      setLoading(false);
      const nextCount = usageCount + 1;
      setUsageCount(nextCount);
      localStorage.setItem('opa_usage', String(nextCount));
    }, 2000);
  };

  return (
    <div>
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

      <section id="tool">
        <div className="container">
          <div className="tool-header">
            <div>
              <h2 className="tool-title">Run Process Diagnosis</h2>
              <p className="tool-sub">Analyze workflow structures and isolate automation opportunities instantly.</p>
            </div>
            <div className="usage-counter">
              <div>USAGE: {usageCount} / 2 FREE ANALYSES</div>
              <div className="pip-box">
                <Pip used={usageCount >= 1} />
                <Pip used={usageCount >= 2} />
              </div>
            </div>
          </div>

          <div className="input-area">
            <textarea
              placeholder="Paste process descriptions here..."
              value={processText}
              onChange={(e) => setProcessText(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="tool-actions">
            <button className="btn-run" onClick={runDiagnosis} disabled={loading || !processText.trim()}>
              {loading ? 'Analyzing...' : 'Execute Analysis →'}
            </button>
          </div>

          {loading && (
            <div>
              <div className="loading-bar">
                <div className="loading-bar-fill" style={{ width: `${loadProgress}%` }} />
              </div>
              <div className="loading-status">● {loadStatus}</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
