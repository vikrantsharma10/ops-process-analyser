"use client";

import React, { useState, useEffect } from 'react';

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
    <div className="min-h-screen bg-[#0f0f0f] text-[#f0ede6] font-sans selection:bg-[#c8f135] selection:text-black antialiased">
      
      {/* Navigation Bar */}
      <nav className="border-b border-[#252525] bg-[#0f0f0f] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 font-mono text-xs tracking-wider">
            <span className="font-semibold text-[#f0ede6]">PIS / V1.0</span>
            <span className="text-[#7a7670]">
              <span className="text-[#b0ada6]">Module 01 —</span> Ops Process Analyser
            </span>
          </div>
          <button 
            onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#c8f135] hover:bg-[#8aaa24] text-black border-none px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer"
          >
            Run Diagnosis ↓
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 border-b border-[#252525]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="font-mono text-[11px] uppercase tracking-[2px] text-[#7a7670] mb-8">
            — Process Intelligence Suite – Module 01
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-[-2px] text-[#f0ede6] mb-10">
            Diagnose the process, <br />not the <em className="italic text-[#c8f135] not-italic">people.</em>
          </h1>
          
          <p className="text-lg md:text-xl text-[#b0ada6] max-w-[680px] font-light mb-12 leading-relaxed">
            Paste any business process and get an instant breakdown of <strong className="text-[#f0ede6] font-medium">what percentage is manual vs automated</strong>, a <strong className="text-[#f0ede6] font-medium">process health score out of 10</strong>, your top handoff risks, root causes, and three sequenced actions to fix it.
          </p>
          
          <div className="mb-20">
            <button 
              onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#c8f135] hover:bg-[#8aaa24] text-black border-none px-8 py-4 font-mono text-sm font-bold tracking-wide transition-colors duration-200 cursor-pointer"
            >
              Run Your Diagnosis ↓
            </button>
          </div>

          {/* Metric Row Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#252525] pt-8 gap-6">
            <div className="flex flex-col">
              <span className="font-mono text-2xl font-medium text-[#c8f135] mb-1">2</span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#7a7670]">Free Analyses</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-2xl font-medium text-[#c8f135] mb-1">150w</span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#7a7670]">Executive Summary</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-2xl font-medium text-[#c8f135] mb-1">&lt;60s</span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#7a7670]">Turnaround Time</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-2xl font-medium text-[#c8f135] mb-1">M01</span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#7a7670]">Process Analyser</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Workspace */}
      <section id="tool" className="py-24 bg-[#141414] border-b border-[#252525]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
            <div>
              <h2 className="font-serif text-4xl font-normal text-[#f0ede6] mb-2">Run Process Diagnosis</h2>
              <p className="text-[#7a7670] text-sm">Analyze workflow structures and isolate automation opportunities instantly.</p>
            </div>
            <div className="font-mono text-[11px] text-right md:self-start">
              <div className="text-[#b0ada6] tracking-wider">USAGE: {usageCount} / 2 FREE ANALYSES</div>
              <div className="flex gap-1.5 mt-2 justify-end">
                <div className={`w-4 h-1.5 border border-[#333] ${usageCount >= 1 ? 'bg-[#c8f135] border-[#c8f135]' : ''}`} />
                <div className={`w-4 h-1.5 border border-[#333] ${usageCount >= 2 ? 'bg-[#c8f135] border-[#c8f135]' : ''}`} />
              </div>
            </div>
          </div>

          {/* Core Text Input Frame */}
          <div className="mb-6">
            <textarea
              placeholder="e.g., When a merchant completes registration, the operations lead manually pulls data from the portal into a local spreadsheet, sending manual Slack updates..."
              value={processText}
              onChange={(e) => setProcessText(e.target.value)}
              disabled={loading}
              className="w-full h-60 bg-[#1a1a1a] border border-[#252525] focus:border-[#333] p-5 text-[#f0ede6] text-base font-sans resize-y outline-none transition-colors duration-200"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={runDiagnosis}
              disabled={loading || !processText.trim()}
              className="bg-transparent text-[#c8f135] border border-[#c8f135] hover:bg-[#c8f135] hover:text-black disabled:border-[#252525] disabled:text-[#7a7670] disabled:hover:bg-transparent px-7 py-3.5 font-mono text-sm font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Execute Analysis →'}
            </button>
          </div>

          {/* Production Progress Bar Monitor */}
          {loading && (
            <div className="mt-8">
              <div className="w-full h-[2px] bg-[#252525] overflow-hidden">
                <div 
                  className="h-full bg-[#c8f135] transition-all duration-500 cubic-bezier(0.1, 0.8, 0.2, 1)" 
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <div className="font-mono text-[11px] text-[#b0ada6] mt-3.5 uppercase tracking-wider flex items-center gap-2">
                <span className="text-[#c8f135] animate-pulse">●</span> {loadStatus}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
