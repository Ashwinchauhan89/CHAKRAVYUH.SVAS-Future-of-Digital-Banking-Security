# ai_mesh/train_local.py
import torch
from gnn_model import CyberSAGE
from graph_builder import build_bank_graph

def train_one_bank(bank_id):
    # 1. जाला Building as trap...
    data = build_bank_graph(f"data/bank_{bank_id}/data.csv")
    # 2. Wakeup the (Model)
    model = CyberSAGE(in_channels=3, hidden_channels=16, out_channels=2)
    optimizer = torch.optim.Adam(model.parameters(), lr=0.01)
    
    # 3. (Training)
    for epoch in range(50):
        model.train()
        optimizer.zero_grad()
        out = model(data.x, data.edge_index)
        loss = torch.nn.functional.nll_loss(out[data.train_mask], data.y[data.train_mask])
        loss.backward()
        optimizer.step()
        print(f"Bank {bank_id} - Epoch {epoch}: Loss {loss.item()}")

    # 4. Model store in a secret case...
    torch.save(model.state_dict(), f"models/bank_{bank_id}_local.pth")