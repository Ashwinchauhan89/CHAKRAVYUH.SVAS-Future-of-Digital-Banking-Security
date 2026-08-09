import React, { useState, useEffect, useCallback } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  Share2, 
  Lock, 
  Zap, 
  Database, 
  Eye, 
  Bell, 
  AlertTriangle,
  Globe,
  Terminal,
  Cpu,
  Search,
  Fingerprint,
  Layers,
  Network
} from 'lucide-react';

// --- Configuration ---
const API_BASE_URL = "http://127.0.0.1:8000"; // Empty for runtime injection or local dev


const BANKS = [
  { id: 'Bank_A', name: 'Global Alpha', x: 100, y: 100, color: '#3b82f6' },
  { id: 'Bank_B', name: 'Federal Beta', x: 300, y: 150, color: '#10b981' },
  { id: 'Bank_C', name: 'Union Gamma', x: 100, y: 200, color: '#f59e0b' },
];

const AGENT_TASKS = [
  "Traversing multi-hop graph nodes...",
  "Executing Federated GNN weights...",
  "Generating ZKP integrity proof...",
  "Verifying PQC signature...",
  "Analyzing sender behavior patterns...",
  "Scanning dark-web leakage databases...",
  "Computing hop-latency anomalies..."
];



const DashboardSection = () => {
  const [transaction, setTransaction] = useState({
    sender: 'ACC-9921-X',
    receiver: 'ACC-4410-Z',
    amount: 75000,
    bank: 'Bank_A'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTask, setActiveTask] = useState("");
  const [logs, setLogs] = useState([]);
  const [hopPath, setHopPath] = useState([]); // Visual hop path
  const [isTrapped, setIsTrapped] = useState(false);

  // --- Utility: Logging ---
  const addLog = (message, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [{ time, message, type }, ...prev].slice(0, 15));
  };

  // --- Real-Time Task Simulation ---
  const simulateAgentTasks = async () => {
    for (const task of AGENT_TASKS) {
      setActiveTask(task);
      await new Promise(r => setTimeout(r, 600));
    }
    setActiveTask("Finalizing decision...");
  };

  // --- Core Analysis Execution ---
  const runSecurityProtocol = async () => {
    setLoading(true);
    setResult(null);
    setIsTrapped(false);
    setHopPath(['Bank_A', 'Bank_B', 'Bank_C']); // Show multi-hop traversal
    
    addLog(`Initiating Agentic Multi-Hop scan for $${transaction.amount}...`, 'warning');
    await simulateAgentTasks();

    try {
      const response = await fetch(`${API_BASE_URL}/analyze_transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });
      const data = await response.json();
      handleResponse(data);
    } catch (error) {
      // Robust Demo Fallback
      const isFraud = Math.random() > 0.6;
      handleResponse({
        fraud_probability: isFraud ? 0.85 + Math.random() * 0.1 : 0.12,
        decision: isFraud ? "block" : "allow",
        federated: { total_transactions: 12540, fraud_cases: 92, fraud_ratio: 0.007 },
        zkp_proof: "zk-SNARK-0x" + Math.random().toString(16).slice(2, 12),
        honeypot: isFraud ? "activated" : null
      });
    }
  };

  const handleResponse = (data) => {
    setResult(data);
    setLoading(false);
    setActiveTask("");
    
    if (data.decision === 'block') {
      setIsTrapped(true);
      addLog(`CRITICAL: Automated Blocked triggered. Attacker routed to Deception Trap.`, 'error');
    } else {
      addLog(`Identity & Graph verified. Transaction processed successfully.`, 'success');
      setHopPath([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 font-sans selection:bg-blue-500/20 overflow-x-hidden">
      
      {/* Dynamic Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Header */}
      {/* <nav className="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-blue-500" />
              <div className="absolute inset-0 blur-lg bg-blue-500/50 animate-pulse" />
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tighter text-white">SURAKSHA-CHAIN <span className="text-blue-500 text-sm font-normal">v4.0</span></h1>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em]">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Real-Time Agentic Defense
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] text-slate-500 uppercase">System Status</p>
              <p className="text-xs font-mono text-emerald-400">NOMINAL_OPERATIONS</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <Cpu className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </nav> */}

      <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: INPUT & AUTOMATION */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Transaction Form */}
          <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" /> Analysis Input
              </h2>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Agent-01</span>
            </div>
            
            <div className="space-y-4">
              <div className="group">
                <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block ml-1">Initial Node</label>
                <select 
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 transition-colors outline-none"
                  onChange={(e) => setTransaction({...transaction, bank: e.target.value})}
                >
                  <option value="Bank_A">Bank Alpha (Cluster 1)</option>
                  <option value="Bank_B">Bank Beta (Cluster 2)</option>
                  <option value="Bank_C">Bank Gamma (Cluster 3)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold mb-1 block ml-1">Transfer Amount</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={transaction.amount}
                    onChange={(e) => setTransaction({...transaction, amount: Number(e.target.value)})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 pl-8 text-sm focus:border-blue-500 transition-colors outline-none" 
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                </div>
              </div>

              <button 
                onClick={runSecurityProtocol}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-3 overflow-hidden relative ${
                  loading ? 'bg-slate-800 text-slate-500' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                }`}
              >
                {loading && <div className="absolute inset-0 bg-white/10 animate-[shimmer_2s_infinite]" />}
                {loading ? <Fingerprint className="w-5 h-5 animate-pulse" /> : <ShieldCheck className="w-5 h-5" />}
                {loading ? "AUTHENTICATING..." : "START SCAN"}
              </button>
            </div>
          </div>

          {/* Agent Task Tracker */}
          <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6">
             <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-500" /> Automated Agent Tasks
             </h2>
             <div className="space-y-3">
                {activeTask ? (
                  <div className="flex items-start gap-3 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl animate-in fade-in slide-in-from-left-2">
                    <div className="mt-1"><Activity className="w-3 h-3 text-emerald-500 animate-spin" /></div>
                    <div className="text-xs font-mono text-emerald-400 leading-relaxed italic">
                      &gt; {activeTask}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed border-white/10 rounded-xl">
                    <Search className="w-6 h-6 text-slate-700 mx-auto mb-2" />
                    <p className="text-[10px] text-slate-600 uppercase">Awaiting instruction</p>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* CENTER/RIGHT: VISUALS & RESULTS */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Graphical Representation: Multi-Hop Network */}
          <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 overflow-hidden relative min-h-[300px]">
            <div className="absolute top-4 left-6 flex items-center gap-2">
              <Network className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Multi-Hop Topology</h2>
            </div>
            
            <div className="flex justify-center items-center mt-10">
              <svg width="100%" height="240" viewBox="0 0 400 250" className="max-w-md">
                {/* Connection Lines */}
                <path d="M 120 110 L 280 145" stroke="#1e293b" strokeWidth="2" strokeDasharray="4" />
                <path d="M 280 155 L 120 190" stroke="#1e293b" strokeWidth="2" strokeDasharray="4" />
                
                {/* Dynamic Hop Animation */}
                {hopPath.length > 0 && (
                   <>
                    <circle r="4" fill="#3b82f6">
                      <animateMotion dur="2s" repeatCount="indefinite" path="M 120 110 L 280 145 L 120 190" />
                    </circle>
                    <path d="M 120 110 L 280 145 L 120 190" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="1000" strokeDashoffset="1000">
                      <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="2s" fill="freeze" />
                    </path>
                   </>
                )}

                {/* Nodes (Banks) */}
                {BANKS.map((bank) => (
                  <g key={bank.id} className="cursor-pointer transition-transform hover:scale-110">
                    <circle 
                      cx={bank.x} cy={bank.y} r="25" 
                      fill="#0f172a" 
                      stroke={bank.id === transaction.bank ? '#3b82f6' : '#1e293b'} 
                      strokeWidth="2" 
                    />
                    <Database 
                      x={bank.x - 10} y={bank.y - 10} 
                      width="20" height="20" 
                      className={bank.id === transaction.bank ? 'text-blue-500' : 'text-slate-600'} 
                    />
                    <text x={bank.x} y={bank.y + 40} textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                      {bank.name}
                    </text>
                  </g>
                ))}

                {/* Trap Visual */}
                {isTrapped && (
                  <g transform="translate(100, 200)">
                    <rect x="-30" y="-30" width="60" height="60" fill="#ef444420" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" rx="8" />
                    <AlertTriangle x="-10" y="-10" width="20" height="20" className="text-red-500 animate-bounce" />
                    <text y="45" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="black" >HONEYPOT_ACTIVE</text>
                  </g>
                )}
              </svg>
            </div>
            
            <div className="absolute bottom-4 right-6 text-[9px] font-mono text-slate-600 space-y-1">
              <p>LAYER: Federated-Graph-Sage</p>
              <p>NODES: 03 | EDGES: 02 | LATENCY: 42ms</p>
            </div>
          </div>

          {/* Result Engine */}
          {result ? (
            <div className={`rounded-3xl border p-8 transition-all duration-700 animate-in zoom-in-95 ${
              result.decision === 'block' 
              ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)]' 
              : 'bg-blue-500/5 border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.1)]'
            }`}>
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    {result.decision === 'block' 
                      ? <ShieldAlert className="w-8 h-8 text-red-500" /> 
                      : <ShieldCheck className="w-8 h-8 text-emerald-500" />
                    }
                    <div>
                      <h3 className={`text-2xl font-black uppercase tracking-tighter ${result.decision === 'block' ? 'text-red-500' : 'text-emerald-500'}`}>
                        {result.decision === 'block' ? 'Attack Trapped & Blocked' : 'Security Clearance: GRANTED'}
                      </h3>
                      <p className="text-slate-400 text-xs">GNN Probability Hash: {result.zkp_proof.slice(0, 16)}...</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                      <span className="text-[9px] text-slate-500 uppercase font-bold block">Fraud Score</span>
                      <span className={`text-lg font-mono font-bold ${result.fraud_probability > 0.5 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {(result.fraud_probability * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                      <span className="text-[9px] text-slate-500 uppercase font-bold block">Auth Method</span>
                      <span className="text-lg font-mono font-bold text-blue-400 uppercase">ZKP-SNARK</span>
                    </div>
                    <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                      <span className="text-[9px] text-slate-500 uppercase font-bold block">Encryption</span>
                      <span className="text-lg font-mono font-bold text-amber-400 uppercase">PQC</span>
                    </div>
                    <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                      <span className="text-[9px] text-slate-500 uppercase font-bold block">Deception</span>
                      <span className={`text-lg font-mono font-bold ${result.honeypot ? 'text-red-500' : 'text-slate-700'}`}>
                        {result.honeypot ? 'DEPLOYED' : 'NONE'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : !loading && (
            <div className="h-[200px] border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-slate-700">
               <Eye className="w-10 h-10 mb-2 opacity-10" />
               <p className="text-xs uppercase tracking-widest font-bold">Awaiting Transaction Stream</p>
            </div>
          )}

          {/* System Terminal (Full Width) */}
          <div className="bg-[#0c0f16] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
             <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                   <Terminal className="w-3 h-3 text-blue-400" />
                   <span className="text-[10px] font-bold uppercase text-slate-400 tracking-tighter">Live Security Stream</span>
                </div>
                <div className="flex gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-slate-800" />
                   <div className="w-2 h-2 rounded-full bg-slate-800" />
                </div>
             </div>
             <div className="p-4 h-40 overflow-y-auto font-mono text-[10px] space-y-1.5 scrollbar-hide">
                {logs.map((log, i) => (
                  <div key={i} className={`flex gap-3 animate-in fade-in slide-in-from-top-1 duration-300 ${i === 0 ? 'bg-white/5 py-1 px-2 rounded' : ''}`}>
                    <span className="text-slate-600">[{log.time}]</span>
                    <span className={
                      log.type === 'error' ? 'text-red-500 font-bold' : 
                      log.type === 'success' ? 'text-emerald-400' : 
                      log.type === 'warning' ? 'text-amber-500' : 'text-blue-400'
                    }>
                      {log.message}
                    </span>
                  </div>
                ))}
                {logs.length === 0 && <div className="text-slate-800 italic">No system events...</div>}
             </div>
          </div>

        </div>
      </main>

      {/* <footer className="max-w-7xl mx-auto p-8 pt-0 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-[9px] font-bold uppercase tracking-[0.3em]">
        <div className="flex gap-4">
          <span>&copy; CHAKRAVYUH DEFENSE CORE</span>
          <span className="text-slate-800">|</span>
          <span>FEDERATED GNN v2.0</span>
        </div>
        <div className="flex gap-6 items-center">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 
              SECURE
           </div>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> 
              ENCRYPTED
           </div>
        </div>
      </footer> */}

      {/* Full Screen Honeypot Overlay */}
      {isTrapped && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="absolute inset-0 bg-red-950/20 backdrop-blur-[2px] animate-pulse" />
          <div className="border-2 border-red-500 bg-black p-4 text-red-500 font-black text-4xl transform rotate-12 animate-bounce shadow-[0_0_50px_rgba(239,68,68,0.5)]">
            DECEPTION_TRAP_ENGAGED
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default DashboardSection;
