import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { 
  Shield, Brain, Lock, Network, Eye, Zap, 
  ChevronRight, Cpu, Github, Heart, Mail, 
  ExternalLink, Globe, Twitter, Linkedin,
  ShieldCheck, Ghost, Fingerprint, Layers, Activity,
  Database, MapPin, Wifi, Server
} from 'lucide-react';

// --- Data Definitions ---
const features = [
  {
    icon: Network,
    title: "Graph Neural Networks",
    description: "Detect multi-hop fraud patterns using GraphSAGE. Traditional AI analyzes a single transaction, while GNN evaluates the entire network.",
    color: "cyan",
    stat: "Network Analysis"
  },
  {
    icon: Brain,
    title: "Federated Learning",
    description: "Banks can collaborate without sharing raw data. Using the Flower framework, each bank trains on its local dataset securely.",
    color: "purple",
    stat: "Flower Framework"
  },
  {
    icon: Lock,
    title: "Post-Quantum Cryptography",
    description: "Quantum-resistant encryption using Kyber (ML-KEM) and Dilithium (ML-DSA). Future-proof security designed for the next era.",
    color: "green",
    stat: "ML-KEM / ML-DSA"
  },
  {
    icon: Eye,
    title: "Zero-Knowledge Proofs",
    description: "No need to reveal sensitive credentials. ZKP allows verification of identity without exposing the actual data structure.",
    color: "amber",
    stat: "Identity Privacy"
  },
  {
    icon: Shield,
    title: "Agentic AI Response",
    description: "When fraud probability exceeds 0.9, the system autonomously blocks transactions in real time for proactive protection.",
    color: "cyan",
    stat: "Autonomous P > 0.9"
  },
  {
    icon: Zap,
    title: "Edge-Powered Processing",
    description: "Near-zero latency fraud detection using edge computing. Local inference runs directly on each distributed bank node.",
    color: "purple",
    stat: "Edge Inference"
  },
];

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

const colorConfig = {
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.15)]",
    accent: "bg-cyan-400",
  },
  purple: {
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
    accent: "bg-purple-400",
  },
  green: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "shadow-[0_0_20px_rgba(52,211,153,0.15)]",
    accent: "bg-emerald-400",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    glow: "shadow-[0_0_20px_rgba(251,191,36,0.15)]",
    accent: "bg-amber-400",
  }
};

// --- Sub-Components ---
const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        <span className="font-bold text-lg text-white tracking-tighter uppercase">
          CHAKRAVYUH<span className="text-cyan-400">-SVAS</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
        <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
        <a
          href="#dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-sm font-bold hover:bg-cyan-400 hover:text-black transition-all active:scale-95"
        >
          Dashboard
        </a>
      </div>
    </div>
  </nav>
);

const FeatureCard = ({ feature, index }) => {
  const config = colorConfig[feature.color];
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group h-full p-[1px] rounded-2xl overflow-hidden transition-all duration-500"
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 border ${config.border} group-hover:border-white/10 transition-colors`} />
      
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 z-10"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 40%)`
          )
        }}
      />

      <div className="relative h-full bg-slate-950/90 backdrop-blur-2xl rounded-2xl p-8 flex flex-col z-20">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl ${config.bg} ${config.glow} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
            <feature.icon className={`w-6 h-6 ${config.text}`} />
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-slate-900 border border-slate-800 ${config.text}`}>
            {feature.stat}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors">
          {feature.title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
          {feature.description}
        </p>

        <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-white transition-all cursor-pointer">
          <span className="mr-2">Protocol Insight</span>
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>

        <motion.div 
          className={`absolute bottom-0 left-0 h-[2px] ${config.accent}`}
          initial={{ width: "0%" }}
          animate={isHovered ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function App() {
  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden scroll-smooth">
      <Navbar />

      <main className="relative z-10 pt-24">
        
        {/* About Section (Core Technologies) */}
        <section id="about" className="py-24 px-6 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-24">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-2 mb-8 shadow-2xl"
              >
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Security Architecture 4.5</span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8"
              >
                Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Technologies</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 text-lg max-w-2xl leading-relaxed"
              >
                A fusion of cutting-edge technologies that makes digital banking truly secure, leveraging agentic intelligence and quantum-resistant protocols.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Services Section (System Core Modules) */}
        

      </main>

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
}
