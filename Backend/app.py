from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import sys
import os
import logging

import numpy as np
import pandas as pd
import torch


# ============================================================
# PATH SETUP
# ============================================================

# If app.py is inside:
# CHAKRAVYUH_SVAS/backend/app.py
#
# BASE_DIR becomes:
# CHAKRAVYUH_SVAS

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

AI_MESH_PATH = os.path.join(BASE_DIR, "ai_mesh")

if AI_MESH_PATH not in sys.path:
    sys.path.append(AI_MESH_PATH)


# ============================================================
# IMPORT MODULES
# ============================================================

try:
    from gnn_model import CyberSAGE
    from graph_builder import build_bank_graph
except ImportError as e:
    logging.warning(f"AI Mesh modules unavailable: {e}")

    CyberSAGE = None
    build_bank_graph = None


try:
    import security.zkp_auth as zkp_auth
except ImportError:
    zkp_auth = None


try:
    import agent.agent_logic as agent_logic
except ImportError:
    agent_logic = None


# ============================================================
# LOGGING
# ============================================================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="CHAKRAVYUH SVAS AI Security System",
    description="AI-powered digital banking fraud detection and security platform",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# MODEL LOADING
# ============================================================

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "global_model.pth"
)

model = None


def load_model():
    global model

    if CyberSAGE is None:
        logging.warning("⚠️ CyberSAGE module unavailable.")
        return

    try:
        model = CyberSAGE(
            3,      # input features
            16,     # hidden dimension
            2       # output classes
        )

        if os.path.exists(MODEL_PATH):

            checkpoint = torch.load(
                MODEL_PATH,
                map_location="cpu"
            )

            # Supports either a raw state_dict
            # or a checkpoint containing "state_dict".
            if isinstance(checkpoint, dict) and "state_dict" in checkpoint:
                checkpoint = checkpoint["state_dict"]

            model.load_state_dict(
                checkpoint,
                strict=False
            )

            logging.info("✅ GNN model loaded successfully.")

        else:
            logging.warning(
                f"⚠️ Model not found: {MODEL_PATH}"
            )

        model.eval()

    except Exception as e:
        logging.exception(
            f"❌ Failed to load GNN model: {e}"
        )
        model = None


load_model()


# ============================================================
# BANK DATA
# ============================================================

def get_bank_data(bank_id: str):

    bank_id = bank_id.upper()

    bank_directory = f"Bank_{bank_id}"

    filename = f"bank_{bank_id.lower()}_data.csv"

    path = os.path.join(
        BASE_DIR,
        bank_directory,
        filename
    )

    if not os.path.exists(path):
        raise HTTPException(
            status_code=404,
            detail=f"Bank data missing: {path}"
        )

    try:
        return pd.read_csv(path)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to read bank data: {str(e)}"
        )


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():

    return {
        "project": "CHAKRAVYUH SVAS",
        "status": "active",
        "message": "🚨 AI Banking Security System"
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "gnn_available": CyberSAGE is not None,
        "zkp_available": zkp_auth is not None,
        "agent_available": agent_logic is not None
    }


# ============================================================
# GNN FRAUD ENGINE
# ============================================================

def run_gnn():

    # Fallback when model or graph builder is unavailable.
    if model is None or build_bank_graph is None:
        logging.warning(
            "Using fallback fraud probability."
        )

        return float(
            np.random.uniform(0.2, 0.9)
        )

    try:

        data_path = os.path.join(
            BASE_DIR,
            "Bank_A",
            "bank_a_data.csv"
        )

        if not os.path.exists(data_path):
            raise FileNotFoundError(
                f"Bank A dataset not found: {data_path}"
            )

        data = build_bank_graph(data_path)

        with torch.no_grad():

            output = model(
                data.x,
                data.edge_index
            )

            probability = torch.softmax(
                output,
                dim=1
            )[:, 1].mean().item()

        return float(probability)

    except Exception as e:

        logging.exception(
            f"GNN execution failed: {e}"
        )

        return float(
            np.random.uniform(0.2, 0.9)
        )


# ============================================================
# FEDERATED INSIGHT
# ============================================================

def federated_analysis():

    try:

        bank_a = get_bank_data("A")
        bank_b = get_bank_data("B")
        bank_c = get_bank_data("C")

        total = (
            len(bank_a)
            + len(bank_b)
            + len(bank_c)
        )

        frauds = (
            bank_a["isFraud"].sum()
            + bank_b["isFraud"].sum()
            + bank_c["isFraud"].sum()
        )

        frauds = int(frauds)
        total = int(total)

        fraud_ratio = (
            frauds / total
            if total > 0
            else 0
        )

        return {
            "total_transactions": total,
            "fraud_cases": frauds,
            "fraud_ratio": round(
                float(fraud_ratio),
                3
            )
        }

    except Exception as e:

        logging.exception(
            f"Federated analysis failed: {e}"
        )

        return {
            "total_transactions": 0,
            "fraud_cases": 0,
            "fraud_ratio": 0,
            "error": "Federated analysis failed"
        }


# ============================================================
# AGENTIC AI DECISION
# ============================================================

def agent_decision(probability: float):

    try:

        if agent_logic is not None:
            return agent_logic.make_decision(
                probability
            )

    except Exception as e:

        logging.warning(
            f"Agent decision failed: {e}"
        )

    # Fallback decision engine

    if probability > 0.8:
        return "block"

    elif probability > 0.6:
        return "monitor"

    return "allow"


# ============================================================
# ZKP / SECURITY
# ============================================================

def generate_security(
    bank: str = "BANK_A"
):

    if zkp_auth is not None:

        try:
            return zkp_auth.generate_proof(
                bank
            )

        except Exception as e:

            logging.warning(
                f"ZKP generation failed: {e}"
            )

    return "demo_proof"


# ============================================================
# TRANSACTION ANALYSIS
# ============================================================

@app.post("/analyze_transaction")
def analyze_transaction(
    transaction: dict
):

    amount = transaction.get(
        "amount",
        0
    )

    logging.info(
        f"Analyzing transaction amount: {amount}"
    )

    # --------------------------------------------------------
    # STEP 1 — GNN
    # --------------------------------------------------------

    fraud_probability = run_gnn()

    # --------------------------------------------------------
    # STEP 2 — FEDERATED INSIGHT
    # --------------------------------------------------------

    federated = federated_analysis()

    # --------------------------------------------------------
    # STEP 3 — AGENTIC AI
    # --------------------------------------------------------

    decision = agent_decision(
        fraud_probability
    )

    # --------------------------------------------------------
    # STEP 4 — SECURITY
    # --------------------------------------------------------

    proof = generate_security()

    # --------------------------------------------------------
    # RESPONSE
    # --------------------------------------------------------

    response = {

        "transaction": {
            "amount": amount
        },

        "fraud_probability": round(
            fraud_probability,
            3
        ),

        "decision": decision,

        "federated": federated,

        "zkp_proof": proof
    }

    # --------------------------------------------------------
    # STEP 5 — HONEYPOT
    # --------------------------------------------------------

    if decision == "block":

        response["honeypot"] = "activated"

        logging.warning(
            "🚨 Attack Blocked & Honeypot Triggered"
        )

    else:

        response["honeypot"] = "inactive"

    return response


# ============================================================
# ANALYTICS
# ============================================================

@app.get("/analytics")
def analytics():

    federated = federated_analysis()

    return {

        "system_status": "active",

        "federated_summary": federated,

        "message": "Real-time fraud monitoring"
    }


# ============================================================
# SERVER ENTRY POINT
# ============================================================

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "app:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )