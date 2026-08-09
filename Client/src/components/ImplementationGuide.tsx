import React from 'react';
import { 
  Shield, 
  Network, 
  Lock, 
  ShieldCheck, 
  Ghost, 
  Fingerprint, 
  Layers, 
  ChevronRight, 
  Activity,
  Github,
  Heart
} from 'lucide-react';

const DEFENSE_MODULES = [
  {
    id: 'gnn',
    icon: <Network className="w-5 h-5" />,
    title: "Federated GraphSAGE",
    desc: "Multi-bank collaboration using Graph Neural Networks to detect complex laundering rings without sharing sensitive PII data.",
    status: "OPTIMIZED",
    color: "cyan",
    version: "v4.2.0"
  },
  {
    id: 'pqc',
    icon: <Lock className="w-5 h-5" />,
    title: "Post-Quantum Crypto",
    desc: "Implementation of ML-KEM (Kyber) and ML-DSA (Dilithium) to ensure transaction data remains secure in the quantum era.",
    status: "ACTIVE",
    color: "amber",
    version: "v1.0.4"
  },
  {
    id: 'zkp',
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "ZKP Integrity",
    desc: "Zero-Knowledge Proofs (zk-SNARKs) verify transaction validity and sender legitimacy without revealing account balances.",
    status: "SYNCED",
    color: "emerald",
    version: "v2.1.0"
  },
  {
    id: 'deception',
    icon: <Ghost className="w-5 h-5" />,
    title: "Agentic Deception",
    desc: "Real-time AI agents deploy virtual shadow nodes (honeypots) to trap attackers and trace their command-and-control origins.",
    status: "READY",
    color: "red",
    version: "v3.8.2"
  },
  {
    id: 'entropy',
    icon: <Fingerprint className="w-5 h-5" />,
    title: "Behavioral Entropy",
    desc: "Analyzing device interaction patterns and keystroke dynamics to generate a unique entropy-based identity hash.",
    status: "SCANNING",
    color: "blue",
    version: "v2.4.1"
  },
  {
    id: 'multihop',
    icon: <Layers className="w-5 h-5" />,
    title: "Multi-Hop Tracing",
    desc: "Deep graph traversal that monitors funds as they pass through intermediate shell accounts across different banking jurisdictions.",
    status: "ENFORCED",
    color: "purple",
    version: "v5.0.0"
  }
];

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        <span className="font-bold text-lg text-white tracking-tighter">
          CHAKRAVYUH<span className="text-cyan-400">-SVAS</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
        <a href="#guide" className="hover:text-cyan-400 transition-colors">Services</a>
        <a
          href="#dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-sm font-bold hover:bg-cyan-500/10 transition-all active:scale-95"
        >
          Dashboard
        </a>
      </div>
    </div>
  </nav>
);

const DefenseServices = () => {
  return (
    <div className="min-h-screen bg-[#02040a] font-sans scroll-smooth">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="h-16" />

      <section id="guide" className="max-w-7xl mx-auto py-24 px-8 scroll-mt-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-white/5 pb-8">
          <div className="space-y-2">
             <div className="flex items-center gap-2 text-cyan-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-2">
               <Activity className="w-3 h-3 animate-pulse" /> Live Defense Protocols
             </div>
             <h2 className="text-4xl font-black text-white tracking-tighter flex items-center gap-4">
               <Shield className="w-10 h-10 text-cyan-500" /> 
               SYSTEM SERVICES
             </h2>
             <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
               Proprietary agentic protocols designed for real-time fraud neutralization across 
               decentralized and federated banking networks.
             </p>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <div className="bg-cyan-500/5 border border-cyan-500/20 px-4 py-2 rounded-lg text-cyan-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
               <Activity className="w-3 h-3" /> All Modules Nominal
            </div>
            <span className="text-[9px] text-slate-700 mt-2 font-mono">ENCRYPTION: AES-GCM-256</span>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEFENSE_MODULES.map((module) => (
            <div 
              key={module.id} 
              className="group relative bg-slate-900/30 border border-white/5 hover:border-cyan-500/40 p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] hover:-translate-y-1 overflow-hidden"
            >
              {/* Background Glow Effect */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/10 transition-colors" />

              {/* Status Badge */}
              <div className="absolute top-8 right-8 flex items-center gap-2 bg-black/40 px-2 py-1 rounded-md border border-white/5">
                 <div className={`w-1 h-1 rounded-full animate-pulse ${
                   module.color === 'red' ? 'bg-red-500 shadow-[0_0_5px_#ef4444]' : 'bg-emerald-500 shadow-[0_0_5px_#10b981]'
                 }`} />
                 <span className="text-[8px] font-black text-slate-400 tracking-tighter uppercase">{module.status}</span>
              </div>

              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110 ${
                module.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                module.color === 'amber' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                module.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                module.color === 'red' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                module.color === 'blue' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                'bg-purple-500/10 text-purple-400 border border-purple-500/20'
              }`}>
                {module.icon}
              </div>

              {/* Content */}
              <h3 className="text-white font-bold text-xl mb-3 flex items-center justify-between">
                {module.title}
                <ChevronRight className="w-5 h-5 text-slate-700 opacity-0 group-hover:opacity-100 group-hover:text-cyan-500 transition-all -translate-x-4 group-hover:translate-x-0" />
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 min-h-[60px]">
                {module.desc}
              </p>

              {/* Footer Metadata */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                <div className="flex gap-2">
                  <div className="px-2 py-1 bg-black/60 rounded border border-white/5 text-[9px] font-mono text-slate-500 uppercase tracking-tighter">
                    BUILD_{module.version}
                  </div>
                  <div className="px-2 py-1 bg-black/60 rounded border border-white/5 text-[9px] font-mono text-slate-500 uppercase tracking-tighter">
                    SEC_L3
                  </div>
                </div>
                <div className="text-[10px] font-bold text-cyan-500/40 group-hover:text-cyan-500 transition-colors cursor-pointer">
                  CONFIGURE
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <style>{`
        @font-face {
          font-family: 'JetBrains Mono';
          src: url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default DefenseServices;
