"use client";

import React, { useState, useEffect, useRef } from 'react';

// Component: Usage Pip Indicator
function Pip({ used, locked }: { used: boolean; locked: boolean }) {
  const baseStyle: React.CSSProperties = {
    width: '16px',
    height: '6px',
    border: '1px solid #333',
    transition: 'all 0.2s ease',
    backgroundColor: used ? '#c8f135' : locked ? '#221111' : 'transparent',
    borderColor: used ? '#c8f135' : locked ? '#441616' : '#252525'
  };

  return <div style={baseStyle} />;
}

// Component: Login Gate
function LoginGate() {
  return (
    <div style={{ marginTop: '24px', padding: '32px', border: '1px dashed #333', backgroundColor: '#141414', textAlign: 'center', width: '100%' }}>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#7a7670', marginBottom: '16px' }}>
        Maximum free tier diagnoses achieved. Authenticate to scale workflow auditing deep analysis.
      </p>
      <button style={{ backgroundColor: '#c8f135', color: '#000', border: 'none', padding: '10px 20px', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
        Sign In to Umbrella Suite
      </button>
    </div>
  );
}

// Component: Executive Summary Output Block
function ExecutiveSummary({ data }: { data: any }) {
  return (
    <div style={{ padding: '24px', border: '1px solid #252525', backgroundColor: '#141414', marginBottom: '24px', width: '100%' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textTransform: 'uppercase', color: '#c8f135', marginBottom: '8px', letterSpacing: '1px' }}>
        Diagnostic Readout // Executive Summary
      </div>
      <p style={{ color: '#b0ada6', fontSize: '14px', lineHeight: '1.6', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        Process diagnostic processing complete. System parameters matched operational anomalies inside layout pipeline layers.
      </p>
    </div>
  );
}

// Component: Full Granular Breakdown Section
function FullDiagnosis({ data }: { data: any }) {
  return (
    <div style={{ padding: '24px', border: '1px solid #252525', backgroundColor: '#141414', width: '100%' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textTransform: 'uppercase', color: '#7a7670', marginBottom: '8px', letterSpacing: '1px' }}>
        Granular Breakdown Metrics
      </div>
      <p style={{ color: '#b0ada6', fontSize: '14px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        Analysis maps complete. Sequenced mitigation roadmap logs assigned to active account storage layers.
      </p>
    </div>
  );
}

export default function App() {
  const [processText, setProcessText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadStatus, setLoadStatus] = useState('');
  const [usageCount, setUsageCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showGate, setShowGate] = useState(false);
  const [result, setResult] = useState<{ status: string } | null>(null);

  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUsage = localStorage.getItem('opa_usage');
    if (savedUsage) setUsageCount(parseInt(savedUsage, 10));
  }, []);

  const runDiagnosis = () => {
    if (!processText.trim() || processText.length < 30) {
      setError('Minimum 30 characters required for clinical rigor.');
      return;
    }
    
    setError(null);
    setResult(null);
    setLoading(true);
    setLoadProgress(15);
    setLoadStatus('Parsing execution points...');

    setTimeout(() => { setLoadProgress(45); setLoadStatus('Mapping handoff points...'); }, 600);
    setTimeout(() => { setLoadProgress(80); setLoadStatus('Isolating data silos...'); }, 1300);
    setTimeout(() => {
      setLoadProgress(100);
      setLoading(false);
      const nextCount = usageCount + 1;
      setUsageCount(nextCount);
      localStorage.setItem('opa_usage', String(nextCount));
      setResult({ status: 'success' });
      if (nextCount >= 2) {
        setShowGate(true);
      }
    }, 2200);
  };

  return (
    <div style={{ backgroundColor: '#0f0f0f', color: '#f0ede6', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      
      {/* Font Assets Links */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Global Style Override Rules to Strip Default Next.js Margins */}
      <style dangerouslySetInnerHTML={{__html: `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #0f0f0f; color: #f0ede6; }
      `}} />

      {/* Top Main Navigation Frame */}
      <nav style={{ borderBottom: '1px solid #1a1a1a', backgroundColor: '#0f0f0f', width: '100%' }}>
        <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 500, letterSpacing: '0.5px' }}>
            PISUMBRELLA <span style={{ color: '#444' }}>/</span> PROCESS INTELLIGENCE SUITE
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#7a7670', letterSpacing: '0.5px' }}>
            MODULE 01 / ACTIVE
          </div>
        </div>
      </nav>

      {/* Workspace Matrix Column Wrapper */}
      <div style={{ flex: 1, width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '100px 40px', display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
        
        {/* Column Left Side: Brand Text Block */}
        <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#7a7670', marginBottom: '24px', letterSpacing: '1px' }}>
              01 // DIAGNOSTIC UTILITY
            </div>
            <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '72px', fontWeight: 400, lineHeight: 1.0, letterSpacing: '-1.5px', marginBottom: '32px' }}>
              Process <span style={{ fontStyle: 'italic', color: '#c8f135' }}>Analyser</span>.
            </h1>
            <p style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '16px', color: '#7a7670', lineHeight: '1.6', fontWeight: 400, maxWidth: '480px' }}>
              Isolate operational friction, score system integrity, and map ownership boundaries through high-precision analytical logic.
            </p>
          </div>

          {/* Metric Box Component */}
          <div style={{ border: '1px solid #1f1f1f', backgroundColor: '#141414', padding: '24px 28px', maxWidth: '380px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px' }}>
              <span style={{ color: '#7a7670' }}>System Track Run Rate</span>
              <span style={{ color: '#c8f135', fontWeight: 500 }}>{usageCount}/10 Runs</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Pip used={usageCount >= 1} locked={false} />
              <Pip used={usageCount >= 2} locked={false} />
              <Pip used={false} locked={true} />
              <Pip used={false} locked={true} />
              <Pip used={false} locked={true} />
              <Pip used={false} locked={true} />
              <Pip used={false} locked={true} />
              <Pip used={false} locked={true} />
              <Pip used={false} locked={true} />
              <Pip used={false} locked={true} />
            </div>
          </div>
        </div>

        {/* Column Right Side: Terminal Form Workspace Section */}
        <div style={{ flex: '1 1 550px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Main Work Input Card */}
          <div style={{ border: '1px solid #1f1f1f', backgroundColor: '#141414', padding: '32px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '11px', color: '#7a7670', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>Raw Input Data Buffer</span>
              <span>{processText.length} Chars</span>
            </div>
            
            <textarea
              placeholder="Paste your operational process or plain text documentation here..."
              value={processText}
              onChange={(e) => setProcessText(e.target.value)}
              disabled={loading || showGate}
              style={{ width: '100%', height: '240px', backgroundColor: '#0f0f0f', border: '1px solid #222', padding: '20px', color: '#f0ede6', fontSize: '14px', resize: 'none', outline: 'none', fontFamily: "'JetBrains Mono', monospace", lineHeight: '1.6' }}
            />

            {error && <div style={{ color: '#c8f135', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', marginTop: '12px' }}>{error}</div>}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginTop: '32px' }}>
              <span style={{ fontSize: '12px', color: '#555', fontFamily: "'JetBrains Mono', monospace" }}>
                Awaiting execution string stream payload...
              </span>
              <button
                onClick={runDiagnosis}
                disabled={loading || showGate || !processText.trim()}
                style={{ backgroundColor: 'transparent', color: (loading || showGate || !processText.trim()) ? '#444' : '#f0ede6', border: '1px solid', borderColor: (loading || showGate || !processText.trim()) ? '#222' : '#444', padding: '12px 24px', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 500, cursor: (loading || showGate || !processText.trim()) ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease' }}
              >
                {loading ? 'Executing Engine Stream...' : 'Execute Process Analysis →'}
              </button>
            </div>

            {/* Loading Meter Indicator */}
            {loading && (
              <div style={{ marginTop: '24px' }}>
                <div style={{ width: '100%', height: '2px', backgroundColor: '#222', overflow: 'hidden' }}>
                  <div style={{ height: '100%', backgroundColor: '#c8f135', width: `${loadProgress}%`, transition: 'width 0.4s ease' }} />
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#7a7670', marginTop: '10px' }}>● {loadStatus}</div>
              </div>
            )}
          </div>

          {/* Diagnosis Stream Output Gate Blocks */}
          {showGate && <LoginGate />}

          {result ? (
            <div ref={outputRef} style={{ width: '100%' }}>
              <ExecutiveSummary data={result} />
              <FullDiagnosis data={result} />
            </div>
          ) : (
            !showGate && !loading && (
              <div style={{ border: '1px dashed #222', padding: '40px', color: '#555', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', lineHeight: '1.6' }}>
                  Output Terminal / Results Diagnosis <br />
                  &gt; Awaiting operational text data payload string inputs in order to run diagnosis execution framework.
                </div>
              </div>
            )
          )}

        </div>
      </div>

      {/* Brand Suite Footer Frame */}
      <footer style={{ borderTop: '1px solid #1a1a1a', padding: '40px 0', backgroundColor: '#0f0f0f', width: '100%' }}>
        <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#444', letterSpacing: '0.5px' }}>
            © 2026 UMBRELLA ENGINE. ALL RIGHTS RESERVED.
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#f0ede6', fontWeight: 500, letterSpacing: '0.5px' }}>
            AT UMBRELLA, THINGS ARE DONE DIFFERENTLY.
          </div>
        </div>
      </footer>

    </div>
  );
}
