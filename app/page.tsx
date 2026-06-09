"use client";

import React, { useState, useEffect, useRef } from 'react';

// Component: Precision-engineered Usage Pip Indicator 
function Pip({ used, locked }: { used: boolean; locked: boolean }) {
  return (
    <div 
      className="w-4 h-1.5 border transition-all duration-200"
      style={{
        backgroundColor: used ? '#c8f135' : locked ? '#251010' : 'transparent',
        borderColor: used ? '#c8f135' : locked ? '#401515' : '#252525'
      }}
    />
  );
}

export default function App() {
  const [processText, setProcessText] = useState('');
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  const outputRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f0ede6] font-mono-system flex flex-col justify-between antialiased selection:bg-[#c8f135]">
      
      {/* Navigation Header Line */}
      <nav className="w-full border-b border-[#252525] bg-[#0f0f0f]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-5 md:px-12 flex items-center justify-between">
        <div className="text-sm font-bold tracking-tight text-[#f0ede6] flex items-center gap-2">
          <span className="bg-[#f0ede6] text-[#0f0f0f] text-[10px] font-mono-system font-medium px-1.5 py-0.5 tracking-normal">PIS</span>
          Umbrella <span className="text-[#7a7670] font-normal">/ Process Intelligence Suite</span>
        </div>
        <div className="text-[10px] text-[#7a7670] uppercase tracking-widest hidden sm:block">
          Module 01 / Active
        </div>
      </nav>

      {/* Main Responsive Utility Workspace Shell */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:px-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Layout Workspace Column: Eyebrow, Context & Diagnostic Readout */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
          <div className="space-y-4">
            <div className="text-xs font-medium text-[#7a7670] uppercase tracking-widest">
              01 // DIAGNOSTIC UTILITY
            </div>
            <h1 className="font-display-serif text-5xl md:text-6xl font-light tracking-tight text-[#f0ede6] leading-[1.05]">
              Process <em className="italic font-normal text-[#c8f135] not-styled bg-[#c8f135]/10 px-2 py-0.5">Analyser</em>.
            </h1>
            <p className="text-[#b0ada6] text-sm leading-relaxed max-w-md">
              Isolate operational friction, score system integrity, and map ownership boundaries through high-precision analytical logic.
            </p>
          </div>

          {/* System Run Tracker Box Component */}
          <div className="border border-[#252525] bg-[#141414] p-5 max-w-sm space-y-3">
            <div className="flex justify-between items-center text-[11px] tracking-wider text-[#7a7670] uppercase">
              <span>System Track Run Rate</span>
              <span className="text-[#c8f135] font-bold">{usageCount}/10 Runs</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <Pip key={i} used={i < usageCount} locked={false} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Layout Workspace Column: Form Input Workspace Block & Terminal Output */}
        <div className="lg:col-span-7 space-y-6 w-full">
          
          {/* Data Entry Container Block */}
          <div className="border border-[#252525] bg-[#141414] p-6 md:p-8 space-y-5">
            <div className="flex justify-between items-center border-b border-[#252525] pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f0ede6]">
                Raw Input Data Buffer
              </span>
              <span className="text-xs font-mono text-[#7a7670]">
                {processText.length} Chars
              </span>
            </div>

            <textarea
              value={processText}
              onChange={(e) => setProcessText(e.target.value)}
              placeholder="Paste your operational process or plain text documentation playbooks here..."
              className="w-full h-64 p-4 text-sm leading-relaxed border border-[#252525] bg-[#0f0f0f] text-[#f0ede6] placeholder:text-[#7a7670] resize-none focus:border-[#c8f135]"
            />

            <button
              onClick={() => {
                setLoading(true);
                setUsageCount(prev => Math.min(prev + 1, 10));
                setTimeout(() => setLoading(false), 2000); // UI simulation framework reset
              }}
              disabled={loading || !processText.trim()}
              className="w-full py-4 text-xs font-bold uppercase tracking-widest transition-all duration-200 bg-[#c8f135] text-[#0f0f0f] hover:opacity-90 disabled:bg-[#252525] disabled:text-[#7a7670] disabled:cursor-not-allowed"
            >
              {loading ? "Executing Logic Engine..." : "Execute Process Analysis →"}
            </button>
          </div>

          {/* Results Analytics Terminal Window Component */}
          <div 
            ref={outputRef} 
            className="border border-[#252525] bg-[#141414] p-6 md:p-8 min-h-[160px] flex flex-col justify-between transition-all duration-200"
          >
            <div className="text-[11px] font-bold text-[#7a7670] uppercase tracking-wider mb-4">
              Output Terminal / Results Diagnosis
            </div>
            
            <div className="flex-1 font-mono text-sm leading-relaxed">
              {loading ? (
                <span className="text-[#c8f135] animate-pulse flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-[#c8f135]"></span>
                  &gt; Parsing data stream patterns and classifying step metrics...
                </span>
              ) : (
                <span className="text-[#b0ada6]">
                  &gt; Awaiting operational text data payload string inputs in order to run diagnosis execution framework.
                </span>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Structural Minimalist Site Brand Footer Block */}
      <footer className="w-full border-t border-[#252525] bg-[#0f0f0f] px-6 py-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#7a7670] tracking-wider uppercase">
        <div>
          © 2026 Umbrella Engine. All Rights Reserved.
        </div>
        <div className="font-bold tracking-widest text-[#f0ede6]">
          At Umbrella, things are done differently.
        </div>
      </footer>

    </div>
  );
}
