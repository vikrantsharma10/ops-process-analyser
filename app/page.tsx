"use client";

import React, { useState, useEffect, useRef } from 'react';

// Component: Usage Pip Indicator (Updated with precise token hex values & sharp layout styles)
function Pip({ used, locked }: { used: boolean; locked: boolean }) {
  const baseStyle: React.CSSProperties = {
    width: '16px',
    height: '6px',
    border: '1px solid #333',
    transition: 'all 0.2s ease',
    backgroundColor: used ? '#c8f135' : locked ? '#252101' : 'transparent',
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

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f0ede6] font-mono-interface flex flex-col antialiased">
      
      {/* 1400px Strict Layout Brand Navigation Header */}
      <header className="w-full max-w-[1400px] mx-auto px-6 py-6 border-b border-[#252525] flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-sm tracking-wider uppercase bg-[#c8f135] text-[#0f0f0f] px-2 py-0.5">
            UMBRELLA
          </span>
          <span className="text-[#7a7670] text-xs">// PROCESS INTELLIGENCE SUITE</span>
        </div>
        <div className="text-xs text-[#b0ada6] uppercase tracking-widest flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-[#c8f135]"></span> 
          MODULE 01 / ACTIVE
        </div>
      </header>

      {/* Main Structural Wrapper Max-Width 1200px */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Core Hero Typography & Controls Shell */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div>
            <div className="text-xs font-bold text-[#c8f135] tracking-widest uppercase mb-4">
              01 // DIAGNOSTIC UTILITY
            </div>
            
            {/* High-contrast Display Headline mixing Instrument Serif Italic */}
            <h1 className="font-serif-display text-5xl md:text-6xl text-[#f0ede6] font-light tracking-tight mb-6">
              Process <em className="italic font-normal text-[#c8f135]">Analyser</em>.
            </h1>
            
            <p className="text-[#b0ada6] text-sm leading-relaxed max-w-sm">
              Isolate operational friction, score system integrity, and map ownership boundaries through high-precision analytical logic.
            </p>
          </div>

          {/* Technical Usage Track Counter Section */}
          <div className="p-4 bg-[#141414] border border-[#252525] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#7a7670] uppercase">System Track Run Rate</span>
              <span className="text-[#c8f135] font-bold">{usageCount}/10 RUNS</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <Pip key={i} used={i < usageCount} locked={false} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Execution Workspace Grid Layer */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="bg-[#141414] border border-[#252525] p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#252525] pb-3">
              <span className="text-xs font-bold text-[#f0ede6] uppercase tracking-wider">
                RAW INPUT DATA BUFFER
              </span>
              <span className="text-xs text-[#7a7670]">
                {processText.length} CHARS
              </span>
            </div>

            {/* Input Form Fields conforming to strict flat design */}
            <textarea
              value={processText}
              onChange={(e) => setProcessText(e.target.value)}
              placeholder="Paste raw process logs or documentation playbook here..."
              className="w-full h-64 bg-[#1a1a1a] border border-[#252525] p-4 text-sm text-[#f0ede6] focus:border-[#c8f135] focus:ring-0 resize-none transition-all duration-150"
            />

            {/* Sharp Action Button with high contrast active focus states */}
            <button
              onClick={() => {
                setLoading(true);
                setUsageCount(prev => Math.min(prev + 1, 10));
              }}
              disabled={loading || !processText.trim()}
              className="w-full py-4 bg-[#c8f135] text-[#0f0f0f] font-bold text-xs uppercase tracking-widest transition-all duration-200 hover:bg-[#b5db2e] disabled:bg-[#252525] disabled:text-[#7a7670]"
            >
              {loading ? "PROCESSING LOGIC ENGINE..." : "EXECUTE PROCESS ANALYSIS"}
            </button>
          </div>

          {/* Results Output Target Container Block */}
          <div ref={outputRef} className="bg-[#141414] border border-[#252525] p-6 min-h-[120px] flex flex-col justify-between">
            <div className="text-xs text-[#7a7670] uppercase tracking-wider mb-2">
              OUTPUT TERMINAL / RESULTS
            </div>
            {loading ? (
              <div className="text-sm text-[#c8f135] animate-pulse">
                &gt; Analyzing runtime structures...
              </div>
            ) : (
              <div className="text-sm text-[#b0ada6]">
                &gt; Awaiting data input payload execution buffer.
              </div>
            )}
          </div>
        </div>

      </main>

      {/* Structured Minimalist Sub-Footer */}
      <footer className="w-full max-w-[1400px] mx-auto px-6 py-6 border-t border-[#252525] flex justify-between items-center text-[10px] text-[#7a7670] tracking-widest uppercase">
        <div>© 2026 UMBRELLA ENGINE. ALL RIGHTS RESERVED.</div>
        <div>AT UMBRELLA, THINGS ARE DONE DIFFERENTLY.</div>
      </footer>
    </div>
  );
}
