
import React from 'react';
import { TELEMETRY_NODES } from '../constants';

const TelemetryFlow: React.FC = () => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Live Telemetry Pipeline
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
        {TELEMETRY_NODES.map((node, idx) => (
          <React.Fragment key={node.id}>
            <div className={`z-10 px-4 py-3 rounded-lg border border-slate-600 shadow-xl ${node.color} flex flex-col items-center min-w-[160px]`}>
              <span className="text-xs uppercase font-bold opacity-80 mb-1">{node.type}</span>
              <span className="text-sm font-medium">{node.label}</span>
            </div>
            {idx < TELEMETRY_NODES.length - 1 && (
              <div className="flex-1 h-0.5 bg-gradient-to-r from-slate-600 to-slate-400 hidden md:block relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 animate-[move_2s_linear_infinite]" 
                     style={{
                        width: '20px',
                        animation: 'telemetryMove 1.5s linear infinite'
                     }} 
                />
              </div>
            )}
            {idx < TELEMETRY_NODES.length - 1 && (
              <div className="h-8 w-0.5 bg-slate-600 md:hidden" />
            )}
          </React.Fragment>
        ))}
        <style>{`
          @keyframes telemetryMove {
            0% { left: -20px; }
            100% { left: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default TelemetryFlow;
