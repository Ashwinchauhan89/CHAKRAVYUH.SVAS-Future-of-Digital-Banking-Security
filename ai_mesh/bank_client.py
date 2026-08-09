# Path: C:\Users\sagar\OneDrive\Desktop\CHAKRAVYUH_SVAS\cs\ai_mesh\bank_client.py
import flwr as fl
import torch
import numpy as np
import sys
import os
from gnn_model import CyberSAGE
from graph_builder import build_bank_graph
import security.zkp_auth

class BankAgent(fl.client.NumPyClient):
    def __init__(self, bank_id):
        self.bank_id = bank_id.upper()
        
        # tHE FILE CAN BE PRESENT IN.../cs/ai_mesh/bank_client.py
        AI_MESH_DIR = os.path.dirname(os.path.abspath(__file__)) 
        CS_ROOT = os.path.dirname(AI_MESH_DIR) # cs/ folder
        
        # Right path: cs/Paysim_Project/BANK_A/bank_a_data.csv [8, 9]
        self.data_path = os.path.join(CS_ROOT, "Paysim_Project", f"BANK_{self.bank_id}", f"bank_{bank_id.lower()}_data.csv")
        
        if not os.path.exists(self.data_path):
            print(f"CRITICAL ERROR: File not found! Check Them: {self.data_path}")
            sys.exit(1)

        print(f"--- Bank {self.bank_id} Structure are ready ---")
        self.data = build_bank_graph(self.data_path)
        self.model = CyberSAGE(in_channels=3, hidden_channels=16, out_channels=2)

    def get_parameters(self, config):
        return [val.cpu().numpy() for _, val in self.model.state_dict().items()]

    def fit(self, parameters, config):
        # Gaining a knowledge for brain (Weights) [1, 10]
        params_dict = zip(self.model.state_dict().keys(), parameters)
        state_dict = {k: torch.tensor(v) for k, v in params_dict}
        self.model.load_state_dict(state_dict, strict=True)
        
        # Local training (5 rounds) [11, 7]
        optimizer = torch.optim.Adam(self.model.parameters(), lr=0.01)
        self.model.train()
        for _ in range(5):
            optimizer.zero_grad()
            out = self.model(self.data.x, self.data.edge_index)
            loss = torch.nn.functional.nll_loss(out, self.data.y)
            loss.backward()
            optimizer.step()

        # Differential Privacy (DP): the noice in update (Privacy) [12, 13]
        new_params = self.get_parameters(config={})
        noisy_params = [p + np.random.normal(0, 0.001, p.shape) for p in new_params]
        
        print(f"✅ बैंक {self.bank_id}: Update are sharing to the server")
        return noisy_params, len(self.data.x), {}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("चलाने का तरीका: python bank_client.py a")
        sys.exit(1)

    bid = sys.argv[1] 
    fl.client.start_numpy_client(server_address="127.0.0.1:8080", client=BankAgent(bid))