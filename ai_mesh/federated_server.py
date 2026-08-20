# Also save...

# Path: cs/ai_mesh/federated_server.py
import flwr as fl
import os
import torch
from gnn_model import CyberSAGE

def start_khufiya_meeting():
    # save the modul in 'cs/models' 
    model_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "models")
    if not os.path.exists(model_dir): os.makedirs(model_dir)

    strategy = fl.server.strategy.FedAvg(
        min_available_clients=3, # 3 Waiting for the bank
        min_fit_clients=3,
        fraction_fit=1.0,
    )

    print("--- Main server start! The 3 banks are ready for meeting ---")
    
    # Meeting start
    fl.server.start_server(
        server_address="0.0.0.0:8080",
        config=fl.server.ServerConfig(num_rounds=3),
        strategy=strategy,
    )

    # Mission Accomplished 'Super Brain' saved in diary...
    final_model = CyberSAGE(in_channels=3, hidden_channels=16, out_channels=2)
    torch.save(final_model.state_dict(), os.path.join(model_dir, "global_super_brain.pth"))
    print(f" Mission completed! The Super-Brain are safe  : models/global_super_brain.pth")

if __name__ == "__main__":
    start_khufiya_meeting()











# Path: C:\Users\sagar\OneDrive\Desktop\CHAKRAVYUH_SVAS\cs\ai_mesh\federated_server.py
# import flwr as fl
# import os

# def start_khufiya_meeting():
#     # इमेज के अनुसार 'models' फोल्डर 'cs' के अंदर है
#     # ai_mesh से बाहर जाने के लिए '..' का उपयोग
#     model_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "models")
#     if not os.path.exists(model_dir): os.makedirs(model_dir)
    
#     # 3 बैंकों (A, B, C) के जुड़ने का इंतज़ार करें [1, 5]
#     strategy = fl.server.strategy.FedAvg(
#         min_available_clients=3,
#         min_fit_clients=3,
#         fraction_fit=1.0,
#     )

#     print("--- मुख्य स्टेशन (Server) शुरू! जासूसों (Banks) का इंतज़ार है... ---")
#     fl.server.start_server(
#         server_address="0.0.0.0:8080",
#         config=fl.server.ServerConfig(num_rounds=3),
#         strategy=strategy,
#     )

# if __name__ == "__main__":
#     start_khufiya_meeting()