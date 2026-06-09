"use client";

import React, { useState, useEffect, useRef } from 'react';

// Component: Usage Pip Indicator
function Pip({ used, locked }: { used: boolean; locked: boolean }) {
  const baseStyle: React.CSSProperties = {
    width: '16px',
    height: '6px',
    border: '1px solid #333',
    transition: 'all 0.2s ease',
    backgroundColor: used ? '#c8f135' : locked ? '#251010' : 'transparent',
    borderColor: used ? '#c8f135' : locked ? '#401515' : '#333'
  };
  return <div style={baseStyle} />;
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
    
    // Inject custom Google Fonts directly into document head dynamically
    const link1 = document.createElement('link');
    link1.rel = 'preconnect';
    link1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous';
    document.head.appendChild(link2);

    const link3 = document.createElement('link');
    link3.rel = 'stylesheet';
    link3.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500;600&display=swap';
    document.head.appendChild(link3);
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
    <div style={{ backgroundColor: '#0f0f0f', color: '#f0ede6', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Navigation Layer */}
      <nav style={{ borderBottom: '1px solid #252525', backgroundColor: '#0f0f0f', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>
            <span style={{ fontWeight: 600, letterSpacing: '1px' }}>PIS / V1.0</span>
            <span style={{ color: '#7a7670' }}><span style={{ color: '#b0ada6' }}>Module 01 —</span> Ops Process Analyser</span>
          </div>
          <button 
            onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ backgroundColor: '#c8f135', color: '#000', border: 'none', padding: '8px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
          >
            Run Diagnosis ↓
          </button>
        </div>
      </nav>

      {/* Hero Block */}
      <section style={{ padding: '120px 0 80px 0', borderBottom: '1px solid #252525' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#7a7670', marginBottom: '32px' }}>
            — Process Intelligence Suite – Module 01
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '40px' }}>
            Diagnose the process, <br />not the <em style={{ fontStyle: 'italic', color: '#c8f135' }}>people.</em>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#b0ada6', maxWidth: '680px', marginBottom: '48px', fontWeight: 300, lineHeight: 1.6 }}>
            Paste any business process and get an instant breakdown of <strong style={{ color: '#f0ede6', fontWeight: 500 }}>what percentage is manual vs automated</strong>, a <strong style={{ color: '#f0ede6', fontWeight: 500 }}>process health score out of 10</strong>, your top handoff risks, root causes, and three sequenced actions to fix it.
          </p>
          <div style={{ marginBottom: '80px' }}>
            <button 
              onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ backgroundColor: '#c8f135', color: '#000', border: 'none', padding: '16px 32px', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
            >
              Run Your Diagnosis ↓
            </button>
          </div>
          
          {/* Stat Metric Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', borderTop: '1px solid #252525', paddingTop: '32px', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '24px', fontWeight: 500, color: '#c8f135', marginBottom: '4px' }}>2</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#7a7670' }}>Free Analyses</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '24px', fontWeight: 500, color: '#c8f135', marginBottom: '4px' }}>150w</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#7a7670' }}>Executive Summary</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '24px', fontWeight: 500, color: '#c8f135', marginBottom: '4px' }}>&lt;60s</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#7a7670' }}>Turnaround Time</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '24px', fontWeight: 500, color: '#c8f135', marginBottom: '4px' }}>M01</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#7a7670' }}>Process Analyser</div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section style={{ padding: '100px 0', borderBottom: '1px solid #252525' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#7a7670', marginBottom: '16px' }}>Methodology</div>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '36px', fontWeight: 400, marginBottom: '48px' }}>Three steps to <em style={{ fontStyle: 'italic', color: '#c8f135' }}>structural clarity</em>.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <div style={{ border: '1px solid #252525', padding: '24px', backgroundColor: '#141414' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#7a7670' }}>01 / INPUT</span>
              <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '24px', margin: '12px 0', fontWeight: 400 }}>Dump the Process</h3>
              <p style={{ color: '#b0ada6', fontSize: '14px' }}>Paste raw Slack playbooks, documentation fragments, or messy workflows directly into the analyser.</p>
            </div>
            <div style={{ border: '1px solid #252525', padding: '24px', backgroundColor: '#141414' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#7a7670' }}>02 / INTERPRET</span>
              <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '24px', margin: '12px 0', fontWeight: 400 }}>Isolate Friction</h3>
              <p style={{ color: '#b0ada6', fontSize: '14px' }}>The system processes data silos, counts hazardous handoffs, and traces real root causes.</p>
            </div>
            <div style={{ border: '1px solid #252525', padding: '24px', backgroundColor: '#141414' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#7a7670' }}>03 / EXECUTE</span>
              <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '24px', margin: '12px 0', fontWeight: 400 }}>Sequence Action</h3>
              <p style={{ color: '#b0ada6', fontSize: '14px' }}>Get an instant executive summary alongside a fully structured roadmap engineered for automation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace App Layout Section */}
      <section id="tool" style={{ padding: '100px 0', backgroundColor: '#141414', borderBottom: '1px solid #252525' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '36px', fontWeight: 400, marginBottom: '8px' }}>Run Process Diagnosis</h2>
              <p style={{ color: '#7a7670', fontSize: '14px' }}>Analyze workflow structures and isolate automation opportunities instantly.</p>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textAlign: 'right' }}>
              <div style={{ color: '#b0ada6', letterSpacing: '1px' }}>USAGE: {usageCount} / 2 FREE ANALYSES</div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px', justifyContent: 'flex-end' }}>
                <Pip used={usageCount >= 1} locked={false} />
                <Pip used={usageCount >= 2} locked={false} />
                <Pip used={false} locked={true} />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: '#7a7670', fontFamily: "'JetBrains Mono', monospace" }}>
              <span>Paste Business Process Description</span>
              <span>{processText.length} chars</span>
            </div>
            <textarea
              placeholder="e.g., When a new merchant signs up via the website, the sales ops lead manually copies their data into an Excel sheet..."
              value={processText}
              onChange={(e) => setProcessText(e.target.value)}
              disabled={loading || showGate}
              style={{ width: '100%', height: '240px', backgroundColor: '#1a1a1a', border: '1px solid #252525', padding: '20px', color: '#f0ede6', fontSize: '15px', resize: 'vertical', outline: 'none', fontFamily: 'inherit', lineHeight: '1.6' }}
            />
          </div>

          {error && <div style={{ color: '#c8f135', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', marginTop: '12px', marginBottom: '12px' }}>{error}</div>}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <span style={{ fontSize: '12px', color: '#7a7670', fontFamily: "'JetBrains Mono', monospace" }}>Minimum 30 characters required for clinical rigor.</span>
            <button
              onClick={runDiagnosis}
              disabled={loading || showGate || !processText.trim()}
              style={{ backgroundColor: 'transparent', color: (loading || showGate || !processText.trim()) ? '#7a7670' : '#c8f135', border: '1px solid', borderColor: (loading || showGate || !processText.trim()) ? '#252525' : '#c8f135', padding: '14px 28px', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 500, cursor: (loading || showGate || !processText.trim()) ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease' }}
            >
              {loading ? 'Analyzing...' : 'Execute Analysis →'}
            </button>
          </div>

          {loading && (
            <div style={{ marginTop: '24px' }}>
              <div style={{ width: '100%', height: '2px', backgroundColor: '#252525', overflow: 'hidden' }}>
                <div style={{ height: '100%', backgroundColor: '#c8f135', width: `${loadProgress}%`, transition: 'width 0.4s ease' }} />
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#b0ada6', marginTop: '10px' }}>● {loadStatus}</div>
                </div>
              )}
              
              {showGate && (
                <div style={{ marginTop: '24px', padding: '32px', border: '1px dashed #444', backgroundColor: '#1a1a1a', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#b0ada6', marginBottom: '16px' }}>
                    Maximum free tier diagnoses achieved. Authenticate to scale workflow auditing deep analysis.
                  </p>
                  <button style={{ backgroundColor: '#c8f135', color: '#000', border: 'none', padding: '10px 20px', fontFamily: 'monospace', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                    Sign In to Umbrella Suite
                  </button>
                </div>
              )}

              {result && (
                <div ref={outputRef} style={{ marginTop: '40px', borderTop: '1px solid #252525', paddingTop: '40px' }}>
                  <div style={{ padding: '24px', border: '1px solid #252525', backgroundColor: '#141414', marginBottom: '24px' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '11px', textTransform: 'uppercase', color: '#c8f135', marginBottom: '8px' }}>
                      Diagnostic Readout // Executive Summary
                    </div>
                    <p style={{ color: '#b0ada6', fontSize: '14px', lineHeight: '1.6' }}>
                      Process diagnostic processing complete. System parameters matched operational anomalies inside layout pipeline layers.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Footer Layout Frame Component */}
          <footer style={{ borderTop: '1px solid #252525', padding: '40px 0', backgroundColor: '#0f0f0f' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 600 }}>UMBRELLA <span style={{ color: '#7a7670' }}>/</span> PIS</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#7a7670' }}>© 2026 UMBRELLA. ALL RIGHTS RESERVED.</div>
            </div>
          </footer>
        </div>
      );
    }
