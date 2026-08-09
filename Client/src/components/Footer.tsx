import { Shield, Github, Heart, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const team = [
  { name: "Ashwin Chauhan", role: "ML & Data Visualizer" },
  { name: "Sagar Panchal", role: "AI Architect" },
  { name: "Saniya Khan", role: "Backend Engineer & Research" },
  { name: "Vijay Songara", role: "Cybersecurity (PQC & ZKP)" },
];

const Footer = () => (
  <footer className="relative border-t border-border/50 bg-background/80 backdrop-blur-xl mt-24">
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Top Grid */}
      <div className="grid md:grid-cols-3 gap-10">

        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-neon-cyan" />
            <span className="font-bold text-lg text-foreground">
              CHAKRAVYUH<span className="text-neon-cyan">-SVAS</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A next-gen cybersecurity platform leveraging AI, federated learning, 
            and post-quantum cryptography to deliver real-time fraud prevention.
          </p>
    
        </div>



        {/* Navigation */}
        <div>
          <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            
            <li><a href="#about" className="hover:text-foreground transition">About</a></li>
            <li><a href="#services" className="hover:text-foreground transition">Services</a></li>
            <li><a href="#dashboard" className="hover:text-foreground transition">Dashboard</a></li>
            <li><a href="#contact" className="hover:text-foreground transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h4 className="text-foreground font-semibold mb-4">Connect</h4>
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-muted-foreground">team@chakravyuh.ai</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="p-2 rounded-lg border border-glow-cyan bg-neon-cyan/5 text-neon-cyan hover:bg-neon-cyan/10 transition"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg border border-glow-cyan bg-neon-cyan/5 text-neon-cyan hover:bg-neon-cyan/10 transition"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-border/40" />

      {/* Team Section */}
      <div className="mb-8">
        <h4 className="text-center text-foreground font-semibold mb-6">
          Built by Team Techno
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-4 rounded-xl border border-border/40 bg-background/40 hover:border-neon-cyan/40 hover:shadow-lg hover:shadow-neon-cyan/10 transition-all"
            >
              <p className="text-sm font-medium text-foreground">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} CHAKRAVYUH-SVAS. All rights reserved.
        </p>

        <p className="flex items-center gap-2">
          Crafted with <Heart className="w-4 h-4 text-neon-cyan" /> by Team Techno
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;