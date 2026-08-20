import os
import torch
import sys
import numpy as np
import shap
import matplotlib.pyplot as plt
from functools import partial

# --- Path Logic ---
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "ai_mesh"))
from gnn_model import CyberSAGE
from graph_builder import build_bank_graph

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
CS_ROOT = os.path.dirname(CURRENT_DIR)
GLOBAL_MODEL_PATH = os.path.join(CS_ROOT, "models", "global_super_brain.pth")
REPORTS_DIR = os.path.join(CS_ROOT, "ai_mesh", "reports")

# Ensure reports directory exists
os.makedirs(REPORTS_DIR, exist_ok=True)

def predict_wrapper(x_samples, t_idx, graph_data, gnn_model):
    """SHAP calls this to see how changing features changes the Fraud prediction"""
    gnn_model.eval()
    results = [] 
    with torch.no_grad():
        for i in range(x_samples.shape[0]):
            # Create a copy of the graph and inject the SHAP sample into the target node
            current_x = graph_data.x.clone().float()
            current_x[t_idx] = torch.from_numpy(x_samples[i]).float()
            
            # Forward pass
            logits = gnn_model(current_x, graph_data.edge_index)
            probs = torch.softmax(logits[t_idx], dim=0)
            
            # We return the probability of class 1 (Fraud)
            results.append(probs[1].item()) 
    return np.array(results)

def generate_agent_evidence(transaction_id=None, bank_id="A"):
    """(SHAP Explainer)"""
    
    if not os.path.exists(GLOBAL_MODEL_PATH):
        print(f"❌ Error: '{GLOBAL_MODEL_PATH}' Not found!")
        return None

    # 1. Load Data & Model
    data_path = os.path.join(CS_ROOT, "Paysim_Project", f"BANK_{bank_id.upper()}", f"bank_{bank_id.lower()}_data.csv")
    data = build_bank_graph(data_path)
    
    # Model architecture must match the saved super_brain
    model = CyberSAGE(in_channels=data.num_features, hidden_channels=16, out_channels=2)
    model.load_state_dict(torch.load(GLOBAL_MODEL_PATH))
    model.eval()

    # 2. Select a Fraud Node to Explain
    fraud_indices = (data.y == 1).nonzero(as_tuple=True)[0]
    if len(fraud_indices) > 0:
        target_idx = fraud_indices[0].item()
        print(f"🔍 Analyzing Fraud at index: {target_idx}")
    else:
        print("✅ No fraud found to analyze.")
        return None
    
    test_node_features = data.x[target_idx:target_idx+1].numpy()

    # 3. SHAP Setup
    # Using a small background set for speed
    bg_size = min(50, data.x.shape[0])
    background = data.x[np.random.choice(data.x.shape[0], bg_size, replace=False)].numpy()
    
    wrapped_model = partial(predict_wrapper, t_idx=target_idx, graph_data=data, gnn_model=model)
    
    explainer = shap.KernelExplainer(wrapped_model, background)
    shap_values = explainer.shap_values(test_node_features)

    # 4. Visualization
    features = ["Amount", "Transaction_Type", "Old_Balance"] # Ensure these match your CSV order
    
    plt.figure(figsize=(10, 6))
    # SHAP summary plot for a single instance
    shap.summary_plot(shap_values, test_node_features, feature_names=features, plot_type="bar", show=False)
    
    output_file = os.path.join(REPORTS_DIR, f"Soldier_Evidence_{bank_id}_{target_idx}.png")
    plt.title(f"Fraud Evidence: Node {target_idx}")
    plt.savefig(output_file, bbox_inches='tight')
    plt.close()
    
    print(f"Soilder Trap Attacker {output_file}")
    return output_file

if __name__ == "__main__":
    generate_agent_evidence()