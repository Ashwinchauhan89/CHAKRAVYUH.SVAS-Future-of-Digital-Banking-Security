import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  fraud: boolean;
}

interface Edge {
  from: number;
  to: number;
}

const NetworkGraph = ({ width = 600, height = 400, nodeCount = 40 }: { width?: number; height?: number; nodeCount?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: 3 + Math.random() * 4,
      fraud: Math.random() < 0.15,
    }));

    const edges: Edge[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const connections = 1 + Math.floor(Math.random() * 3);
      for (let j = 0; j < connections; j++) {
        const target = Math.floor(Math.random() * nodeCount);
        if (target !== i) edges.push({ from: i, to: target });
      }
    }

    nodesRef.current = nodes;
    edgesRef.current = edges;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw edges
      for (const edge of edgesRef.current) {
        const a = nodesRef.current[edge.from];
        const b = nodesRef.current[edge.to];
        const isFraudEdge = a.fraud || b.fraud;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = isFraudEdge
          ? `rgba(255, 60, 60, 0.25)`
          : `rgba(0, 255, 209, 0.08)`;
        ctx.lineWidth = isFraudEdge ? 1.5 : 0.5;
        ctx.stroke();
      }

      // Update & draw nodes
      for (const node of nodesRef.current) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        if (node.fraud) {
          ctx.fillStyle = "rgba(255, 60, 60, 0.9)";
          ctx.shadowColor = "rgba(255, 60, 60, 0.6)";
          ctx.shadowBlur = 15;
        } else {
          ctx.fillStyle = "rgba(0, 255, 209, 0.7)";
          ctx.shadowColor = "rgba(0, 255, 209, 0.4)";
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameRef.current);
  }, [width, height, nodeCount]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 w-full h-full opacity-75"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default NetworkGraph;
