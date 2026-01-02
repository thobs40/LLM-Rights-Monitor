
import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { MOCK_METRICS, COLORS } from './constants';
import { Severity, IncidentStatus, Incident } from './types';
import TelemetryFlow from './components/TelemetryFlow';
import IncidentCard from './components/IncidentCard';
import AlertRules from './components/AlertRules';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'incidents' | 'alerts' | 'telemetry'>('overview');
  
  // Filtering states for Incidents
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<Severity | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | 'ALL'>('ALL');

  const incidents: Incident[] = useMemo(() => [
    {
      id: 'inc-001',
      title: 'Sudden Drop in Detection Accuracy',
      severity: Severity.CRITICAL,
      status: IncidentStatus.OPEN,
      timestamp: '2023-10-27 14:32:11',
      affectedArtist: 'Global Visual Artists Collective',
      missedDetections: 45
    },
    {
      id: 'inc-002',
      title: 'Vertex AI Latency Spike >3s',
      severity: Severity.HIGH,
      status: IncidentStatus.INVESTIGATING,
      timestamp: '2023-10-27 12:05:01',
      affectedArtist: 'System-wide',
      missedDetections: 0
    },
    {
      id: 'inc-003',
      title: 'Unauthorized API Key Usage Attempt',
      severity: Severity.MEDIUM,
      status: IncidentStatus.RESOLVED,
      timestamp: '2023-10-26 23:58:45',
      affectedArtist: 'N/A',
      missedDetections: 0
    },
    {
      id: 'inc-004',
      title: 'Prompt Injection Pattern Detected',
      severity: Severity.HIGH,
      status: IncidentStatus.OPEN,
      timestamp: '2023-10-26 18:20:00',
      affectedArtist: 'Creative Commons Library',
      missedDetections: 12
    }
  ], []);

  const filteredIncidents = useMemo(() => {
    return incidents.filter(inc => {
      const matchesSearch = inc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           inc.affectedArtist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeverity = severityFilter === 'ALL' || inc.severity === severityFilter;
      const matchesStatus = statusFilter === 'ALL' || inc.status === statusFilter;
      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [incidents, searchQuery, severityFilter, statusFilter]);

  const stats = [
    { label: 'Avg Latency', value: '432ms', change: '-12%', trend: 'down' },
    { label: 'Detection Accuracy', value: '98.4%', change: '+0.5%', trend: 'up' },
    { label: 'Revenue Recovered', value: '$12,450', change: '+24%', trend: 'up' },
    { label: 'Daily Token Usage', value: '1.2M', change: '+5%', trend: 'up' }
  ];

  const clearFilters = () => {
    setSearchQuery('');
    setSeverityFilter('ALL');
    setStatusFilter('ALL');
  };

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 flex flex-col p-6 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="text-white w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h1 className="font-bold text-lg tracking-tight text-white">RightsMonitor</h1>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { id: 'overview', label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
            { id: 'incidents', label: 'Incidents', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
            { id: 'alerts', label: 'Data Quality', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
            { id: 'telemetry', label: 'Telemetry Flow', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                activeTab === item.id ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Cost Optimization</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xl font-bold text-white">$42.10</p>
              <p className="text-[10px] text-emerald-400">Burn rate: low</p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-slate-900 relative">
        <header className="h-16 border-b border-slate-800 px-8 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold capitalize text-white">
            {activeTab === 'alerts' ? 'Data Quality Rules' : activeTab}
          </h2>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs text-slate-400 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              GCP Region: us-central1
            </span>
            <div className="h-8 w-8 rounded-full bg-slate-700 border border-slate-600" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-grid">
          {activeTab === 'overview' && (
            <>
              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(s => (
                  <div key={s.label} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:shadow-2xl transition-all">
                    <p className="text-sm text-slate-400 mb-1">{s.label}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-bold text-white">{s.value}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {s.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Latency Chart Container */}
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 min-h-[400px] flex flex-col min-w-0">
                  <h3 className="text-lg font-semibold mb-6 flex items-center justify-between shrink-0 text-white">
                    Performance: Latency & Tokens
                    <span className="text-xs font-normal text-slate-400">Real-time / 24h</span>
                  </h3>
                  <div className="flex-1 min-h-[300px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                      <AreaChart data={MOCK_METRICS}>
                        <defs>
                          <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="latency" stroke={COLORS.primary} fillOpacity={1} fill="url(#colorLatency)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Infringements Chart Container */}
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 min-h-[400px] flex flex-col min-w-0">
                  <h3 className="text-lg font-semibold mb-6 flex items-center justify-between shrink-0 text-white">
                    Infringements Detected
                    <span className="text-xs font-normal text-slate-400">Total: 452</span>
                  </h3>
                  <div className="flex-1 min-h-[300px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                      <BarChart data={MOCK_METRICS}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                           contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                        />
                        <Bar dataKey="infringements" fill={COLORS.secondary} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'incidents' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Filter Controls */}
              <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700 sticky top-0 z-20 shadow-xl space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input 
                      type="text" 
                      placeholder="Search by artist or incident title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-200"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    <select 
                      value={severityFilter}
                      onChange={(e) => setSeverityFilter(e.target.value as any)}
                      className="bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none text-slate-300"
                    >
                      <option value="ALL">All Severities</option>
                      {Object.values(Severity).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none text-slate-300"
                    >
                      <option value="ALL">All Statuses</option>
                      {Object.values(IncidentStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {(searchQuery || severityFilter !== 'ALL' || statusFilter !== 'ALL') && (
                      <button 
                        onClick={clearFilters}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-bold px-2 whitespace-nowrap"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  Results 
                  <span className="ml-2 text-sm font-normal text-slate-500">({filteredIncidents.length})</span>
                </h3>
              </div>
              
              <div className="space-y-4">
                {filteredIncidents.length > 0 ? (
                  filteredIncidents.map(inc => (
                    <IncidentCard key={inc.id} incident={inc} />
                  ))
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center bg-slate-800/30 rounded-2xl border border-dashed border-slate-700">
                    <svg className="w-12 h-12 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-slate-400 font-medium">No incidents match your current filters</p>
                    <button 
                      onClick={clearFilters}
                      className="mt-4 text-indigo-400 text-sm font-semibold hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="max-w-4xl mx-auto">
              <AlertRules />
            </div>
          )}

          {activeTab === 'telemetry' && (
            <div className="max-w-6xl mx-auto py-12 text-white">
               <TelemetryFlow />
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-indigo-400 mb-2">Vertex AI Integration</h4>
                    <p className="text-sm text-slate-400">Direct streaming of Gemini logs via Cloud Logging export to Datadog for real-time prompt analysis.</p>
                  </div>
                  <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-blue-400 mb-2">Cloud SQL Store</h4>
                    <p className="text-sm text-slate-400">Historical indexing of infringements and fingerprint signatures for copyright matching.</p>
                  </div>
                  <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-emerald-400 mb-2">Security Shield</h4>
                    <p className="text-sm text-slate-400">Automated alerting on unauthorized prompt injection patterns or anomalous access tokens.</p>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
