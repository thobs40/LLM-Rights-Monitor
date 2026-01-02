
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DATA_QUALITY_RULES } from '../constants';

const AlertRules: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const lastUpdated = new Date().toLocaleTimeString();

  // Generate unique mock historical data for each rule
  const historicalData = useMemo(() => {
    return DATA_QUALITY_RULES.reduce((acc, rule) => {
      acc[rule.id] = Array.from({ length: 12 }).map((_, i) => ({
        time: `${i * 2}h ago`,
        value: rule.currentValue * (0.8 + Math.random() * 0.4),
      }));
      return acc;
    }, {} as Record<string, any[]>);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes stripe-move {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
        .animate-stripes {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
          );
          background-size: 40px 40px;
          animation: stripe-move 2s linear infinite;
        }
        .glow-rose { box-shadow: 0 0 15px rgba(244, 63, 94, 0.4); }
        .glow-amber { box-shadow: 0 0 10px rgba(245, 158, 11, 0.3); }
      `}</style>

      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold">Data Quality Monitoring</h3>
          <p className="text-sm text-slate-400">Rules engine for input integrity and anomaly detection.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">Last Update: {lastUpdated}</p>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold transition-colors flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Re-run Validation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {DATA_QUALITY_RULES.map((rule) => {
          const isBreached = rule.status !== 'Healthy';
          const isCritical = rule.status === 'Critical';
          const isWarning = rule.status === 'Warning';
          const isExpanded = expandedId === rule.id;
          
          const progress = rule.unit === '%' 
            ? Math.min(rule.currentValue * 10, 100) 
            : Math.min(rule.currentValue * 100, 100);

          return (
            <div 
              key={rule.id} 
              className={`bg-slate-800 border rounded-xl transition-all flex flex-col relative overflow-hidden ${
                isCritical ? 'border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.1)]' : 
                isWarning ? 'border-amber-500/50' : 'border-slate-700'
              }`}
            >
              {/* Breach Background Glow */}
              {isBreached && (
                <div className={`absolute inset-0 opacity-[0.03] pointer-events-none animate-pulse ${
                  isCritical ? 'bg-rose-500' : 'bg-amber-500'
                }`} />
              )}

              {/* Main Card Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-6">
                  <div 
                    className="flex items-center gap-3 cursor-pointer group/header"
                    onClick={() => toggleExpand(rule.id)}
                  >
                    <div className={`p-2 rounded-lg relative ${
                      isCritical ? 'bg-rose-500/10' : 
                      isWarning ? 'bg-amber-500/10' : 'bg-emerald-500/10'
                    }`}>
                      {isBreached && (
                        <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping ${
                          isCritical ? 'bg-rose-500' : 'bg-amber-500'
                        }`} />
                      )}
                      <svg className={`w-5 h-5 ${
                        isCritical ? 'text-rose-500' : 
                        isWarning ? 'text-amber-500' : 'text-emerald-500'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="relative group">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-100 border-b border-dotted border-slate-500 leading-tight group-hover/header:text-indigo-400 transition-colors">
                          {rule.name}
                        </h4>
                        <svg className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      
                      {/* Tooltip Content (Legacy fallback for hover) */}
                      {!isExpanded && (
                        <div className="invisible group-hover:visible absolute z-50 bottom-full left-0 mb-3 w-64 p-3 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl text-xs text-slate-300 leading-relaxed transition-opacity pointer-events-none">
                          <p className="font-semibold text-white mb-1">Description</p>
                          {rule.description}
                          <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-slate-900 border-r border-b border-slate-700 transform rotate-45"></div>
                        </div>
                      )}

                      <span className="text-[10px] uppercase font-bold text-slate-500 block mt-0.5">
                        {rule.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isCritical ? 'text-rose-400 bg-rose-400/10' : 
                      isWarning ? 'text-amber-400 bg-amber-400/10' : 'text-emerald-400 bg-emerald-400/10'
                    }`}>
                      {rule.status}
                    </span>
                    {isExpanded && (
                       <span className="text-[10px] text-slate-500 mono">ID: {rule.id}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500">Threshold: {rule.threshold}</span>
                    <span className={`font-bold transition-all ${
                      isCritical ? 'text-rose-400 animate-pulse' : 
                      isWarning ? 'text-amber-400' : 'text-slate-300'
                    }`}>
                      Current: {rule.currentValue}{rule.unit}
                    </span>
                  </div>
                  
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700/50">
                    <div 
                      className={`h-full transition-all duration-1000 relative ${
                        isCritical ? 'bg-rose-500 animate-stripes glow-rose' : 
                        isWarning ? 'bg-amber-500 animate-pulse glow-amber' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    >
                      {isWarning && (
                        <div className="absolute inset-0 bg-white/10 animate-[pulse_2s_infinite]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expansion Panel */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-700/50 bg-slate-900/30 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                    {/* Historical Trend Chart */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                          <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                          Metric History (24h)
                        </h5>
                        <span className="text-[10px] text-slate-500 font-mono">Aggregation: 2h Mean</span>
                      </div>
                      <div className="h-32 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={historicalData[rule.id]}>
                            <defs>
                              <linearGradient id={`colorValue-${rule.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={isCritical ? '#f43f5e' : isWarning ? '#f59e0b' : '#10b981'} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={isCritical ? '#f43f5e' : isWarning ? '#f59e0b' : '#10b981'} stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '4px', fontSize: '10px' }}
                              itemStyle={{ color: '#fff' }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="value" 
                              stroke={isCritical ? '#f43f5e' : isWarning ? '#f59e0b' : '#10b981'} 
                              fillOpacity={1} 
                              fill={`url(#colorValue-${rule.id})`} 
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Audit Logs / Trigger Events */}
                    <div className="space-y-4">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Recent Trigger Events
                      </h5>
                      <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                        {[
                          { time: '10m ago', val: rule.currentValue, type: rule.status },
                          { time: '4h ago', val: rule.currentValue * 0.9, type: 'Healthy' },
                          { time: '18h ago', val: rule.currentValue * 1.2, type: 'Warning' }
                        ].map((event, i) => (
                          <div key={i} className="flex justify-between items-center p-2 rounded bg-slate-800/80 border border-slate-700/50 text-[10px] font-mono">
                            <span className="text-slate-400">{event.time}</span>
                            <span className="text-slate-200">Value: {event.val.toFixed(2)}{rule.unit}</span>
                            <span className={event.type === 'Healthy' ? 'text-emerald-400' : 'text-rose-400'}>{event.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-indigo-900/10 border border-indigo-500/20">
                    <h6 className="text-[10px] font-bold text-indigo-400 uppercase mb-2">Detailed Context</h6>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      {rule.description}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button className="flex-1 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-[10px] font-bold uppercase tracking-wider transition-colors border border-slate-600">
                      Edit Thresholds
                    </button>
                    <button className="flex-1 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-[10px] font-bold uppercase tracking-wider transition-colors border border-slate-600">
                      Mute Alert
                    </button>
                    <button className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded text-[10px] font-bold uppercase tracking-wider transition-colors border border-indigo-500">
                      Full Diagnosis
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertRules;
