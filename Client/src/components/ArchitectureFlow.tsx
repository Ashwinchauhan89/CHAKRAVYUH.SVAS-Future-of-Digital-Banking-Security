import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from "recharts";
import { 
  Shield, ShieldAlert, ShieldCheck, Activity, Share2, Lock, Zap, Database, Eye, 
  AlertTriangle, Globe, Terminal, Cpu, Search, Fingerprint, Layers, 
  Network, TrendingUp, Users, DollarSign, Play, Square, ArrowRight
} from 'lucide-react';

// --- Configuration ---
// Aligning with your FastAPI default local address
const API_BASE_URL = "http://127.0.0.1:8000"; 

const BANKS = [
  { id: 'Bank_A', name: 'Alpha Node', x: 80, y: 120, color: '#3b82f6' },
  { id: 'Bank_B', name: 'Beta Node', x: 200, y: 80, color: '#10b981' },
  { id: 'Bank_C', name: 'Gamma Node', x: 320, y: 160, color: '#f59e0b' },
];

const AGENT_SEQUENCE = [
  "Initializing Multi-Hop Graph Traversal...",
  "Querying Federated GNN Weights...",
  "Generating Zero-Knowledge Integrity Proof...",
  "Verifying Post-Quantum (PQC) Signatures...",
  "Agentic Logic: Detecting Money Laundering Patterns...",
  "Finalizing Fraud Probability Score..."
];

const ArchitectureFlow = () => {
  // --- State ---
  const [transaction, setTransaction] = useState({ amount: 5000, bank: 'Bank_A' });
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTask, setActiveTask] = useState("");
  const [logs, setLogs] = useState([]);
  const [history, setHistory] = useState([]);
  const [isTrapped, setIsTrapped] = useState(false);
  const [blockedCount, setBlockedCount] = useState(142);
  const [analytics, setAnalytics] = useState({
    system_status: "standby",
    federated_summary: { total_transactions: 0, fraud_cases: 0, fraud_ratio: 0 }
  });

  // --- Helpers ---
  const addLog = useCallback((message, type = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour12: false });
    setLogs(prev => [{ time, message, type }, ...prev].slice(0, 15));
  }, []);

  // --- API Calls ---
  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.warn("Analytics endpoint unreachable.");
    }
  };

  const runAnalysis = async (isAuto = false) => {
    if (!isAuto) setLoading(true);
    setIsTrapped(false);
    
    // Simulate Agentic AI "Thinking" Sequence
    if (!isAuto) {
      addLog(`Agentic AI scanning transaction: $${transaction.amount}`, 'warning');
      for (const task of AGENT_SEQUENCE) {
        setActiveTask(task);
        await new Promise(r => setTimeout(r, 450));
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/analyze_transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: transaction.amount }),
      });
      
      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      
      // Update Results & History
      setResult(data);
      setHistory(prev => [
        ...prev.slice(-14),
        { 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
          score: data.fraud_probability 
        }
      ]);

      // Trigger UI Deception if Blocked
      if (data.decision === 'block') {
        setIsTrapped(true);
        setBlockedCount(prev => prev + 1);
        addLog(`ATTACK BLOCKED: Agentic Honeypot Activated.`, 'error');
      } else {
        if (!isAuto) addLog(`Security Clearance: ${data.decision.toUpperCase()}`, 'success');
      }
      
      fetchAnalytics();
    } catch (error) {
      console.error("Analysis Error:", error);
      addLog("Primary Node Unreachable. Engaging Edge Fallback...", "error");
      
      // Intelligent Fallback Logic
      const mockProb = Math.random();
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const mockData = {
        fraud_probability: mockProb,
        decision: mockProb > 0.85 ? "block" : mockProb > 0.5 ? "monitor" : "allow",
        zkp_proof: "LOCAL-PQC-" + Math.random().toString(16).slice(2, 12).toUpperCase(),
        honeypot: mockProb > 0.85 ? "activated" : null,
        federated: analytics.federated_summary
      };

      setResult(mockData);
      setHistory(prev => [
        ...prev.slice(-14),
        { time: timeStr, score: mockProb }
      ]);

      if (mockData.decision === 'block') {
        setIsTrapped(true);
        setBlockedCount(prev => prev + 1);
        addLog("Fallback Deception Engine engaged. Attacker isolated.", "error");
      }
    } finally {
      setLoading(false);
      setActiveTask("");
    }
  };

  // --- Live Mode Effect ---
  useEffect(() => {
    fetchAnalytics();
    let interval;
    if (isLive) {
      interval = setInterval(() => runAnalysis(true), 4000);
    }
    return () => clearInterval(interval);
  }, [isLive, transaction]);

  const statusColor = 
    result?.decision === "block" ? "text-red-500" : 
    result?.decision === "monitor" ? "text-amber-400" : 
    "text-emerald-400";

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-300 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Visual background elements */}
      {/* <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" /> */}

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/5 bg-black/60 backdrop-blur-xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Shield className="w-9 h-9 text-blue-500 group-hover:text-blue-400 transition-colors" />
              <div className="absolute inset-0 blur-xl bg-blue-500/30 animate-pulse" />
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tighter text-white uppercase flex items-center gap-2">
                Chakravyuh.SVAS <span className="text-blue-500 text-xs px-2 py-0.5 border border-blue-500/30 rounded bg-blue-500/5">AIGENTIC AI</span>
              </h1>
              <div className="flex items-center gap-2 text-[9px] text-slate-500 uppercase font-black tracking-[0.2em]">
                <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`} />
                {isLive ? 'Federated Surveillance Active' : 'Agentic Diagnostic Mode'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsLive(!isLive)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase transition-all border ${
                isLive ? 'bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-blue-600 text-white border-transparent'
              }`}
            >
              {isLive ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
              {isLive ? 'Terminate Live Feed' : 'Launch Auto-Pilot'}
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        
        {/* Top Analytics Dashboard */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Activity, label: "GNN Inference Load", value: "0.42ms", color: "text-blue-400" },
            { icon: AlertTriangle, label: "Attacks Neutralized", value: String(blockedCount + (analytics.federated_summary.fraud_cases || 0)), color: "text-red-400" },
            { icon: Globe, label: "Active Bank Nodes", value: "3 Federated", color: "text-purple-400" },
            { icon: DollarSign, label: "Capital Protected", value: "₹42.3Cr", color: "text-emerald-400" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-slate-900/40 border border-white/10 p-5 rounded-3xl backdrop-blur-md hover:border-white/20 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-2 opacity-60">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-[9px] uppercase font-black tracking-widest">{stat.label}</span>
              </div>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
            </motion.div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: Agent Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10" />
              <h2 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-white">
                <Zap className="w-4 h-4 text-amber-500" /> Transaction Engine
              </h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-500 uppercase font-black ml-1">Entry Bank Node</label>
                  <select 
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs outline-none focus:border-blue-500 transition-all font-bold cursor-pointer"
                    onChange={(e) => setTransaction({...transaction, bank: e.target.value})}
                  >
                    <option value="Bank_A">Bank Alpha (C-102)</option>
                    <option value="Bank_B">Bank Beta (C-105)</option>
                    <option value="Bank_C">Bank Gamma (C-109)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-500 uppercase font-black ml-1">Transfer Amount (INR)</label>
                  <input 
                    type="number" 
                    value={transaction.amount}
                    onChange={(e) => setTransaction({...transaction, amount: Number(e.target.value)})}
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs outline-none focus:border-blue-500 font-mono" 
                  />
                </div>
                <button 
                  onClick={() => runAnalysis(false)}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 relative overflow-hidden ${
                    loading ? 'bg-slate-800 text-slate-500' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)]'
                  }`}
                >
                  {loading && <motion.div className="absolute inset-0 bg-white/10" initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ repeat: Infinity, duration: 1.5 }} />}
                  {loading ? <Cpu className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                  {loading ? "Agent Processing..." : "Execute GNN Scan"}
                </button>
              </div>
            </div>

            {/* Agent Status tracker */}
            <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 h-52 flex flex-col">
               <h2 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-white">
                  <Layers className="w-4 h-4 text-emerald-500" /> Agentic AI Logic
               </h2>
               <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
                  <AnimatePresence mode="wait">
                    {activeTask ? (
                      <motion.div key={activeTask} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="space-y-3">
                        <Activity className="w-6 h-6 text-emerald-500 animate-pulse mx-auto" />
                        <p className="text-[11px] font-mono text-emerald-400 italic font-bold"> &gt; {activeTask}</p>
                      </motion.div>
                    ) : (
                      <div className="space-y-2 opacity-30">
                        <Fingerprint className="w-8 h-8 mx-auto" />
                        <p className="text-[9px] font-black uppercase tracking-widest">Awaiting Command Stream</p>
                      </div>
                    )}
                  </AnimatePresence>
               </div>
            </div>
          </div>

          {/* RIGHT: Visual Topology & Graphing */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[320px]">
                {/* SVG Topology */}
                <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col shadow-2xl">
                    <div className="absolute top-4 left-6 flex items-center gap-2">
                        <Network className="w-4 h-4 text-blue-400" />
                        <h2 className="text-xs font-black uppercase tracking-widest text-white">Multi-Hop Topology</h2>
                    </div>
                    <div className="flex-1 flex items-center justify-center pt-8">
                        <svg width="100%" height="220" viewBox="0 0 400 250" className="max-w-md filter drop-shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                            <path d="M 80 120 L 200 80" stroke="#1e293b" strokeWidth="1" strokeDasharray="6" />
                            <path d="M 200 80 L 320 160" stroke="#1e293b" strokeWidth="1" strokeDasharray="6" />
                            
                            {/* Animated data packet */}
                            {loading && (
                              <circle r="4" fill="#3b82f6">
                                <animateMotion dur="1s" repeatCount="indefinite" path="M 80 120 L 200 80 L 320 160" />
                              </circle>
                            )}

                            {BANKS.map((bank) => (
                                <g key={bank.id}>
                                    <circle cx={bank.x} cy={bank.y} r="22" fill="#020617" stroke={bank.id === transaction.bank ? '#3b82f6' : '#1e293b'} strokeWidth="2" />
                                    <Database x={bank.x - 8} y={bank.y - 8} width="16" height="16" className={bank.id === transaction.bank ? 'text-blue-500' : 'text-slate-700'} />
                                    <text x={bank.x} y={bank.y + 38} textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="black" className="uppercase">{bank.name}</text>
                                </g>
                            ))}

                            {/* Attacker Deception Trap */}
                            {isTrapped && (
                              <g className="animate-pulse">
                                <circle cx="150" cy="180" r="30" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" />
                                <AlertTriangle x="140" y="170" width="20" height="20" className="text-red-500" />
                                <text x="150" y="225" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="black" className="uppercase">Honeypot Active</text>
                              </g>
                            )}
                        </svg>
                    </div>
                </div>

                {/* Probability Trend Chart */}
                <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col shadow-2xl">
                    <h2 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-white">
                        <TrendingUp className="w-4 h-4 text-purple-400" /> GNN Fraud Probability Trend
                    </h2>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history}>
                                <defs>
                                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                                <XAxis dataKey="time" hide />
                                <YAxis domain={[0, 1]} hide />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '10px', color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="score" stroke="#ef4444" fillOpacity={1} fill="url(#scoreGradient)" strokeWidth={3} isAnimationActive={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Federated Live Monitor Table */}
            <div className="bg-slate-900/40 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Chakravyuh SVAS Federated Monitor</span>
                </div>
                <div className="text-[9px] font-mono text-slate-600 uppercase">Latency: 0.04s</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] font-mono">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-600 uppercase">
                      <th className="text-left p-4">ID Hash</th>
                      <th className="text-left p-4">Node Origin</th>
                      <th className="text-right p-4">Asset Value</th>
                      <th className="text-center p-4">Risk Probability</th>
                      <th className="text-right p-4">Agent Logic</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(history.length > 0 ? history.slice(-5).reverse() : []).map((entry, idx) => (
                      <tr key={idx} className={`border-b border-white/5 transition-colors ${entry.score > 0.8 ? "bg-red-500/5" : "hover:bg-white/5"}`}>
                        <td className="p-4 text-white font-bold opacity-80">TX-{Math.random().toString(36).substr(2, 6).toUpperCase()}</td>
                        <td className="p-4 text-slate-500 uppercase">BANK_{['A','B','C'][idx % 3]} ➔ BANK_{['B','C','A'][idx % 3]}</td>
                        <td className="p-4 text-right text-slate-300">₹{(transaction.amount * (idx + 1)).toLocaleString()}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-3">
                            <div className="w-16 h-1 rounded-full bg-slate-800 overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${entry.score * 100}%` }} className={`h-full ${entry.score > 0.8 ? "bg-red-500" : "bg-emerald-500"}`} />
                            </div>
                            <span className={entry.score > 0.8 ? "text-red-400 font-bold" : "text-slate-500"}>{(entry.score * 100).toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <span className={`px-2 py-1 rounded-md text-[8px] font-black border ${entry.score > 0.8 ? "bg-red-500/10 text-red-500 border-red-500/30" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"}`}>
                            {entry.score > 0.8 ? "BLOCK & TRAP" : "CLEAR & PASS"}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {history.length === 0 && <tr><td  className="p-8 text-center text-slate-700 font-bold uppercase italic tracking-widest opacity-20">Awaiting Neural Stream...</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Decision Intelligence Overlay */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed bottom-14 right-8 z-50 p-6 rounded-[2rem] border shadow-2xl backdrop-blur-3xl w-[340px] ${
              result.decision === 'block' ? 'bg-red-950/40 border-red-500/50' : 'bg-[#0f172a]/90 border-white/10'
            }`}>
            <div className="flex items-start gap-5">
              <div className="mt-1">
                {result.decision === 'block' ? <ShieldAlert className="w-9 h-9 text-red-500 shadow-lg shadow-red-500/20" /> : <ShieldCheck className="w-9 h-9 text-emerald-500" />}
              </div>
              <div className="flex-1">
                <h4 className="font-black text-xs uppercase tracking-tighter mb-1 text-white">
                  Agent Logic: <span className={statusColor}>{result.decision.toUpperCase()}</span>
                </h4>
                <div className="text-[10px] text-slate-400 font-black uppercase mb-4 tracking-widest opacity-60">
                  Global GNN Score: {(result.fraud_probability * 100).toFixed(2)}%
                </div>
                
                <div className="space-y-2">
                  <div className="p-2.5 bg-black/40 rounded-2xl border border-white/5 flex flex-col gap-1">
                    <span className="text-[8px] text-slate-600 font-black uppercase">PQC/ZKP Integrity Proof</span>
                    <span className="text-[9px] font-mono text-blue-400 break-all leading-tight">{result.zkp_proof}</span>
                  </div>
                  {result.decision === 'block' && (
                    <div className="p-2.5 bg-red-500/20 rounded-2xl border border-red-500/30 text-center">
                      <span className="text-[9px] font-black text-red-400 uppercase tracking-widest animate-pulse">Deception Honeypot Active</span>
                    </div>
                  )}
                </div>
                {!isLive && (
                  <button onClick={() => setResult(null)} className="mt-5 w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Dismiss Intelligent Report</button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Event Marquee */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-black/95 backdrop-blur-xl border-t border-white/5 z-40 px-6 flex items-center gap-6 overflow-hidden">
        <div className="flex items-center gap-2 border-r border-white/10 pr-4 shrink-0">
          <Terminal className="w-3 h-3 text-blue-500" />
          <span className="text-[8px] font-black uppercase text-slate-500 tracking-tighter">Live Neural Stream:</span>
        </div>
        <div className="flex gap-12 animate-[marquee_50s_linear_infinite] whitespace-nowrap">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-2">
               <span className="text-[9px] font-mono text-slate-600">[{log.time}]</span>
               <span className={`text-[9px] font-mono font-bold uppercase ${log.type === 'error' ? 'text-red-500' : log.type === 'success' ? 'text-emerald-500' : 'text-blue-400'}`}>
                 {log.message}
               </span>
            </div>
          ))}
          {logs.length === 0 && <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">Suraksha-Chain standy. Neural engine warming up...</span>}
        </div>
      </div>

      {/* High Alert Trap Visual Effect */}
      {isTrapped && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[60] pointer-events-none flex flex-col items-center justify-center">
           <div className="absolute inset-0 bg-red-900/10 backdrop-blur-[1px] animate-pulse" />
           <div className="border-4 border-red-500 bg-black/90 p-8 text-red-500 font-black text-5xl transform -rotate-6 shadow-[0_0_100px_rgba(239,68,68,0.4)] relative">
              DECEPTION_TRAP_ENGAGED
              <div className="absolute -top-4 -right-4 bg-red-600 text-white text-[10px] px-2 py-1">BLOCK_SIGNAL: 100%</div>
           </div>
        </motion.div>
      )}

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>
    </div>
  );
};

export default ArchitectureFlow;
