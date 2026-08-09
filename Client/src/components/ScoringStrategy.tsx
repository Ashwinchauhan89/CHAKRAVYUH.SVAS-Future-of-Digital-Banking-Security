import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { 
  Shield, 
  Brain, 
  Lock, 
  Network, 
  Zap, 
  Cpu, 
  Workflow, 
  Server, 
  Globe, 
  Database as DbIcon, 
  ArrowRight,
  ShieldCheck,
  Radio
} from 'lucide-react';

const ARCHITECTURE_LAYERS = [
  {
    title: "Edge Node Layer",
    tech: "FastAPI / PyTorch",
    desc: "Distributed bank nodes perform local graph embedding and initial risk scoring at the edge to preserve data sovereignty.",
    icon: <Server className="w-6 h-6" />,
    color: "cyan"
  },
  {
    title: "Secure Comm Layer",
    tech: "ML-KEM / ML-DSA",
    desc: "Post-Quantum encrypted tunnels (Kyber-1024) facilitate secure weight exchanges between nodes and the global server.",
    icon: <Lock className="w-6 h-6" />,
    color: "green"
  },
  {
    title: "Federation Engine",
    tech: "Flower / ZKP",
    desc: "Aggregates local model updates using Secure Aggregation. ZKP verifies update integrity without seeing private data.",
    icon: <Workflow className="w-6 h-6" />,
    color: "purple"
  },
  {
    title: "Intelligence Hub",
    tech: "GraphSAGE / GNN",
    desc: "Global model weights are refined to identify sophisticated cross-institutional money laundering and fraud patterns.",
    icon: <Brain className="w-6 h-6" />,
    color: "amber"
  },
  {
    title: "Autonomous Action",
    tech: "Agentic AI",
    desc: "Real-time enforcement triggers blocks or honeypot redirects based on high-probability fraud signals (P > 0.9).",
    icon: <Shield className="w-6 h-6" />,
    color: "red"
  }
];

const colorConfig = {
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
  purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
  green: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  amber: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  red: { text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" }
};

const ArchitectureSection = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row items-center gap-12">
        
        {/* Step-by-Step Flow List */}
        <div className="flex-1 space-y-4">
          {ARCHITECTURE_LAYERS.map((layer, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="flex items-center gap-6 bg-slate-900/40 border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all cursor-default">
                <div className={`p-4 rounded-xl bg-slate-950 border border-white/10 ${colorConfig[layer.color].text} group-hover:scale-110 transition-transform shadow-xl`}>
                  {layer.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-white font-bold text-lg mb-1">{layer.title}</h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border border-white/5 ${colorConfig[layer.color].text} uppercase tracking-tighter`}>
                      {layer.tech}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{layer.desc}</p>
                </div>
              </div>
              
              {/* Vertical connector line */}
              {index < ARCHITECTURE_LAYERS.length - 1 && (
                <div className="absolute left-11 -bottom-4 w-px h-4 bg-gradient-to-b from-cyan-500/50 to-transparent z-0" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Visual Diagram Representation */}
        <div className="flex-1 bg-slate-950/50 border border-white/10 rounded-[2.5rem] p-12 relative overflow-hidden hidden lg:block">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]" />
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full" />
           
           <div className="relative z-10 flex flex-col items-center gap-8">
              {/* Input Layer */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-4 w-full shadow-lg shadow-cyan-500/5"
              >
                 <div className="p-3 bg-black/40 rounded-xl border border-white/10">
                   <Globe className="w-8 h-8 text-cyan-400" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Layer 01: Input</p>
                    <p className="text-sm font-black text-white tracking-tight uppercase">Cross-Border Pipeline</p>
                 </div>
              </motion.div>

              <ArrowRight className="w-6 h-6 text-slate-800 rotate-90 animate-pulse" />

              {/* Processing Layer */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-[40px] bg-emerald-500/5 border border-emerald-500/20 w-full flex flex-col items-center gap-5 relative group"
              >
                 <div className="flex gap-4">
                    <DbIcon className="w-6 h-6 text-emerald-500 animate-pulse" />
                    <ShieldCheck className="w-6 h-6 text-emerald-500 opacity-50" />
                    <Radio className="w-6 h-6 text-emerald-500 opacity-20" />
                 </div>
                 <div className="text-center">
                   <p className="text-xs text-white font-bold mb-1">Secure Aggregator</p>
                   <p className="text-[10px] text-slate-500 italic max-w-[200px]">Privacy-Preserving Federated Weight Sync (FL-Server)</p>
                 </div>
                 <div className="absolute -right-6 top-1/2 -translate-y-1/2 rotate-90 text-[8px] text-slate-700 font-mono tracking-[0.5em] whitespace-nowrap uppercase">
                   PQC_Encrypted_Tunnel
                 </div>
              </motion.div>

              <ArrowRight className="w-6 h-6 text-slate-800 rotate-90 animate-pulse" />

              {/* Action Layer */}
              <motion.div 
                whileHover={{ y: 5 }}
                className="p-6 rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center gap-4 w-full justify-end text-right shadow-lg shadow-red-500/5"
              >
                 <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Layer 05: Response</p>
                    <p className="text-sm font-black text-white tracking-tight uppercase">Autonomous Enforcement</p>
                 </div>
                 <div className="p-3 bg-black/40 rounded-xl border border-white/10">
                   <Zap className="w-8 h-8 text-red-500 animate-pulse" />
                 </div>
              </motion.div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#02040a] py-24 px-8 text-slate-200 selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-2xl"
          >
            <Cpu className="w-3.5 h-3.5" /> Core Security Stack
          </motion.div>
          <h2 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">Architecture</span>
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
            A distributed, privacy-first pipeline that facilitates secure intelligence transfer across global banking nodes 
            without ever exposing raw PII data.
          </p>
        </div>
        
        <ArchitectureSection />
      </div>

      <style>{`
        @font-face {
          font-family: 'JetBrains Mono';
          src: url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .scroll-smooth { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
