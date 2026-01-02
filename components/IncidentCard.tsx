
import React, { useState } from 'react';
import { Incident, Severity } from '../types';
import { getAutomatedRootCauseAnalysis } from '../services/gemini';

const IncidentCard: React.FC<{ incident: Incident }> = ({ incident }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{ rootCause: string; remediation: string } | null>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    const result = await getAutomatedRootCauseAnalysis(JSON.stringify(incident));
    setAnalysis(result);
    setAnalyzing(false);
  };

  const severityColor = {
    [Severity.LOW]: 'bg-slate-500',
    [Severity.MEDIUM]: 'bg-yellow-500',
    [Severity.HIGH]: 'bg-orange-500',
    [Severity.CRITICAL]: 'bg-red-500'
  }[incident.severity];

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-indigo-500 transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase text-white mb-2 inline-block ${severityColor}`}>
            {incident.severity}
          </span>
          <h4 className="font-semibold text-slate-100">{incident.title}</h4>
        </div>
        <span className="text-xs text-slate-400 mono">{incident.timestamp}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs text-slate-400 mb-4">
        <div>
          <span className="block opacity-60">Affected Entity</span>
          <span className="text-slate-200 font-medium">{incident.affectedArtist}</span>
        </div>
        <div>
          <span className="block opacity-60">Missed Detections</span>
          <span className="text-slate-200 font-medium">{incident.missedDetections} instances</span>
        </div>
      </div>

      {!analysis && !analyzing && (
        <button 
          onClick={handleAnalyze}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          AI Root Cause Analysis
        </button>
      )}

      {analyzing && (
        <div className="flex items-center justify-center py-2 space-x-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          <span className="text-xs text-indigo-400 font-medium">Gemini Thinking...</span>
        </div>
      )}

      {analysis && (
        <div className="mt-4 p-3 bg-slate-900 rounded border border-indigo-500/30 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="mb-2">
            <span className="text-[10px] uppercase font-bold text-indigo-400">Root Cause</span>
            <p className="text-xs text-slate-300 leading-relaxed">{analysis.rootCause}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400">Suggested Remediation</span>
            <p className="text-xs text-slate-300 leading-relaxed">{analysis.remediation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentCard;
