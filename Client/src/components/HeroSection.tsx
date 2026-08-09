import { motion } from "framer-motion";
import { Shield, ArrowRight, Github, BookOpen } from "lucide-react";
import NetworkGraph from "./NetworkGraph";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0 gradient-mesh" />
    <div className="absolute inset-0 scanline pointer-events-none" />
    <div className="absolute inset-0">
      <NetworkGraph width={1920} height={1080} nodeCount={60} />
    </div>

    {/* Content */}
    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-cyan bg-neon-cyan/5 mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-glow" />
        <span className="text-sm font-mono text-neon-cyan">Bank Fraud Detection System</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-5xl md:text-7xl font-black tracking-tight mb-6"
      >
        <span className="text-foreground">CHAKRAVYUH</span>
        <span className="text-neon-cyan text-glow-cyan">-SVAS</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
      >
        Through Federated Graph Intelligence and Post-quantum Cryptography
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="text-xl md:text-2xl font-semibold text-foreground mb-10"
      >
        The Future of Digital Banking Security
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <a
          href="#dashboard"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-neon-cyan text-primary-foreground font-semibold hover:brightness-110 transition-all box-glow-cyan"
        >
          <Shield className="w-5 h-5" />
          Live Dashboard
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="#guide"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-glow-purple bg-neon-purple/10 text-neon-purple font-semibold hover:bg-neon-purple/20 transition-all"
        >
          <BookOpen className="w-5 h-5" />
          System Services
        </a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          { label: "Fraud Detection", value: "98.7%", sub: "Accuracy" },
          { label: "Latency", value: "<50ms", sub: "Edge Processing" },
          { label: "Privacy", value: "100%", sub: "Zero Data Sharing" },
          { label: "Quantum-Safe", value: "10L+", sub: "Dataset Learning" },
        ].map((stat) => (
          <div key={stat.label} className="card-cyber p-4">
            <div className="text-2xl font-bold text-neon-cyan text-glow-cyan">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.sub}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
