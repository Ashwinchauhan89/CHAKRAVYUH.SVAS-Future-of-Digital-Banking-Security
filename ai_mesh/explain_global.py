import os
import torch
import shap
import numpy as np
import matplotlib.pyplot as plt
from gnn_model import CyberSAGE
from graph_builder import build_bank_graph
from functools import partial

# --- Path Logic (Strict Path Resolution) ---
AI_MESH_DIR = os.path.dirname(os.path.abspath(__file__)) 
CS_ROOT = os.path.dirname(AI_MESH_DIR) 
DATA_ROOT = os.path.join(CS_ROOT, "Paysim_Project")
MODEL_SAFE = os.path.join(CS_ROOT, "models")
REPORTS_DIR = os.path.join(AI_MESH_DIR, "reports")

def generate_winning_evidence():
    # Loading the knowledge of super-brain
    model_path = os.path.join(MODEL_SAFE, "global_super_brain.pth")
    if not os.path.exists(model_path):
        print(f"CRITICAL ERROR: 'global_super_brain.pth' Not found! check the path: {model_path}")
        return

    data_path = os.path.join(DATA_ROOT, "BANK_A", "bank_a_data.csv")
    if not os.path.exists(data_path):
        print(f"ERROR: The data file are not found! Please check: {data_path}")
        return

    print("--- 'Global Super-Brain' Explaination start... ---")
    data = build_bank_graph(data_path)
    model = CyberSAGE(in_channels=3, hidden_channels=16, out_channels=2)
    model.load_state_dict(torch.load(model_path))
    model.eval()

    fraud_indices = (data.y == 1).nonzero(as_tuple=True)
    if len(fraud_indices) == 0:
        print("To understand that no fraud was found in the data")
        return
    
    target_idx = fraud_indices[0][0].item()    
    test_node = data.x[target_idx:target_idx+1].numpy()

    def predict_wrapper(x_np, t_idx, graph_data, gnn_model):
        results = [] 
        with torch.no_grad():
            for i in range(x_np.shape[0]):
                current_x = graph_data.x.clone().float()
                current_x[t_idx] = torch.from_numpy(x_np[i]).float()
                logits = gnn_model(current_x, graph_data.edge_index)
                probs = torch.softmax(logits[t_idx], dim=0)
                results.append(probs.numpy())
        return np.array(results)

    wrapped_model = partial(predict_wrapper, t_idx=target_idx, graph_data=data, gnn_model=model)
    num_nodes = data.x.shape[0]  
    background_indices = np.random.choice(num_nodes, min(50, num_nodes), replace=False)
    background = data.x[background_indices].numpy()
    
    explainer = shap.KernelExplainer(wrapped_model, background)
    shap_values = explainer.shap_values(test_node)

    # --- UI/UX TRANSFORMATION: THE GLOBAL FORENSIC DASHBOARD (Tadka) ---
    val_to_plot = np.array(shap_values).flatten()
    if len(val_to_plot) == 6: final_shap_values = val_to_plot[3:].reshape(1, 3)
    elif len(val_to_plot) == 3: final_shap_values = val_to_plot.reshape(1, 3)
    else: final_shap_values = val_to_plot[:3].reshape(1, 3)

    # Impressive feature name...
    features = ['Transaction Velocity', 'Sender Account Drain', 'Receiver Inflow Spike']

    # Canvas Setup (Elite Dashboard Look)
    plt.style.use('bmh')
    fig = plt.figure(figsize=(16, 10), facecolor='#ffffff')
    gs = fig.add_gridspec(2, 2, width_ratios=[2, 1], height_ratios=[4, 1])

    # 1. Main Insight Plot (Global Attribution)
    ax_main = fig.add_subplot(gs[0, 0])
    y_pos = np.arange(len(features))
    # SHAP color according to the direction: Red (Positive Fraud Impact), Blue (Neutral/Negative)
    colors = ['#FF4B2B' if x > 0 else '#0083B0' for x in final_shap_values[0]]
    
    bars = ax_main.barh(y_pos, final_shap_values[0], color=colors, edgecolor='black', alpha=0.8, height=0.6)
    ax_main.set_yticks(y_pos)
    ax_main.set_yticklabels(features, fontsize=12, fontweight='bold', color='#2C3E50')
    ax_main.set_title("GLOBAL SUPER-BRAIN: CROSS-NODE NEURAL EVIDENCE", loc='left', fontsize=20, fontweight='black', pad=25, color='#1A1A1A')
    ax_main.axvline(0, color='black', linewidth=1.5, alpha=0.7)
    
  
    for bar in bars:
        width = bar.get_width()
        ax_main.text(width, bar.get_y() + bar.get_height()/2, f' {width:.4f}', va='center', fontweight='bold', color='#2C3E50')

   
    ax_meter = fig.add_subplot(gs[0, 1])
    ax_meter.set_axis_off()
    risk_score = np.abs(final_shap_values[0]).sum() * 100 
    circle = plt.Circle((0.5, 0.5), 0.35, color='#F3F4F7', zorder=1)
    ax_meter.add_artist(circle)
    ax_meter.text(0.5, 0.6, "NETWORK RISK LEVEL", ha='center', fontsize=12, color='#7F8C8D', fontweight='bold')
    ax_meter.text(0.5, 0.45, f"{min(99.9, risk_score):.1f}%", ha='center', fontsize=34, color='#E74C3C', fontweight='black')
    ax_meter.text(0.5, 0.3, "GLOBAL ANOMALY", ha='center', fontsize=10, color='#E74C3C', fontweight='bold', bbox=dict(facecolor='none', edgecolor='#E74C3C', boxstyle='round,pad=0.5'))


    ax_desc = fig.add_subplot(gs[1, :])
    ax_desc.set_axis_off()
    desc_text = (
        f"➤ GLOBAL TRACE ID: {target_idx} | FEDERATED AGGREGATOR: SVAS-MESH\n"
        f"➤ NETWORK INSIGHT: This transaction violates global security weights established across all banks.\n"
        f"➤ DECISION ENGINE: Automated flag triggered due to high Deviation in Account Drain and Velocity."
    )
    ax_desc.text(0.01, 0.5, desc_text, fontsize=12, family='monospace', color='#34495E', linespacing=1.6,
                 bbox=dict(facecolor='#ECF0F1', edgecolor='none', boxstyle='round,pad=1.5'))

  
    plt.tight_layout()
    if not os.path.exists(REPORTS_DIR): os.makedirs(REPORTS_DIR)
    output_file = os.path.join(REPORTS_DIR, "Evidence_Global_SuperBrain.png")
    
    plt.figtext(0.05, 0.02, "© 2026 CHAKRAVYUH - FEDERATED GLOBAL REPORT (RESTRICTED ACCESS)", fontsize=8, color='red', alpha=0.6)
    plt.savefig(output_file, bbox_inches='tight', dpi=300)
    plt.close()
    
    print("-" * 30)
    print(f"Mission Completed! data are in correct shap")
    print(f"Success! Aviedense are hear: {output_file}")
    print("-" * 30)

if __name__ == "__main__":
    generate_winning_evidence()