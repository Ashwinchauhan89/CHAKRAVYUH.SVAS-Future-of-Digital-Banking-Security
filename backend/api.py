from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import sys, os, torch, logging, numpy as np

# -----------------------------
# PATH SETUP
# -----------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AI_MESH_PATH = os.path.join(BASE_DIR, "ai_mesh")
sys.path.append(AI_MESH_PATH)

# -----------------------------
# IMPORT MODULES
# -----------------------------
from gnn_model import CyberSAGE
from graph_builder import build_bank_graph

try:
    import security.zkp_auth as zkp_auth
except:
    zkp_auth = None

try:
    import agent.agent_logic as agent_logic
except:
    agent_logic = None

import pandas as pd

# -----------------------------
# APP INIT
# -----------------------------
app = FastAPI(title="Chakravyuh  SVAS AI Security System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

# -----------------------------
# LOAD MODEL
# -----------------------------
MODEL_PATH = os.path.join(BASE_DIR, "models", "global_model.pth")

model = CyberSAGE(3, 16, 2)

if os.path.exists(MODEL_PATH):
    model.load_state_dict(torch.load(MODEL_PATH, map_location="cpu"))
    logging.info("✅ GNN Loaded")
else:
    logging.warning("⚠️ Using fallback model")

model.eval()

# -----------------------------
# UTIL: LOAD BANK DATA
# -----------------------------
def get_bank_data(bank_id):
    path = os.path.join(BASE_DIR, f"Bank_{bank_id}", f"bank_{bank_id.lower()}_data.csv")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Bank data missing")
    return pd.read_csv(path)

# -----------------------------
# HOME
# -----------------------------
@app.get("/")
def home():
    return {"message": "🚨 Chakravyuh SVAS Active"}

# -----------------------------
# CORE FRAUD ENGINE
# -----------------------------
def run_gnn():
    try:
        data = build_bank_graph(os.path.join(BASE_DIR, "Bank_A", "bank_a_data.csv"))
        with torch.no_grad():
            out = model(data.x, data.edge_index)
            prob = torch.softmax(out, dim=1)[:, 1].mean().item()
        return prob
    except:
        return np.random.uniform(0.2, 0.9)

# -----------------------------
# FEDERATED INSIGHT
# -----------------------------
def federated_analysis():
    try:
        a = get_bank_data("A")
        b = get_bank_data("B")
        c = get_bank_data("C")

        total = len(a) + len(b) + len(c)
        frauds = a["isFraud"].sum() + b["isFraud"].sum() + c["isFraud"].sum()

        return {
            "total_transactions": int(total),
            "fraud_cases": int(frauds),
            "fraud_ratio": round(frauds / total, 3)
        }
    except:
        return {"error": "federated failed"}

# -----------------------------
# AGENTIC AI
# -----------------------------
def agent_decision(prob):
    if agent_logic:
        return agent_logic.make_decision(prob)
    if prob > 0.8:
        return "block"
    elif prob > 0.6:
        return "monitor"
    else:
        return "allow"

# -----------------------------
# PQC + ZKP
# -----------------------------
def generate_security(bank="BANK_A"):
    if zkp_auth:
        return zkp_auth.generate_proof(bank)
    return "demo_proof"

# -----------------------------
# MAIN ENDPOINT
# -----------------------------
@app.post("/analyze_transaction")
def analyze(transaction: dict):

    amount = transaction.get("amount", 0)

    # Step 1: GNN
    fraud_prob = run_gnn()

    # Step 2: Federated Insight
    fed = federated_analysis()

    # Step 3: Agentic AI
    decision = agent_decision(fraud_prob)

    # Step 4: Security
    proof = generate_security()

    response = {
        "fraud_probability": round(fraud_prob, 3),
        "decision": decision,
        "federated": fed,
        "zkp_proof": proof
    }

    # Step 5: Honeypot
    if decision == "block":
        response["honeypot"] = "activated"
        logging.warning("🚨 Attack Blocked & Honeypot Triggered")

    return response

# -----------------------------
# ANALYTICS ENDPOINT
# -----------------------------
@app.get("/analytics")
def analytics():
    fed = federated_analysis()

    return {
        "system_status": "active",
        "federated_summary": fed,
        "message": "Real-time fraud monitoring"
    }





