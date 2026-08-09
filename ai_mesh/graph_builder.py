import pandas as pd
import torch
from torch_geometric.data import Data

def build_bank_graph(csv_path):
    # 1. Read Data
    df = pd.read_csv(csv_path)
    
    # 2. Extract unique accounts from BOTH Origin and Destination
    # We need a unique ID for every person/account in the network
    all_accounts = pd.concat([df['nameOrig'], df['nameDest']]).unique()
    mapping = {name: i for i, name in enumerate(all_accounts)}
    
    # 3. Create Edges (Transactions)
    # Map account names to their new integer IDs
    source = df['nameOrig'].map(mapping).values
    target = df['nameDest'].map(mapping).values
    
    # PyG expects a tensor of shape [2, num_edges]
    # पुराना: edge_index = torch.tensor([source, target], dtype=torch.long)
    edge_index = torch.stack([torch.tensor(source), torch.tensor(target)]).long()    
    # 4. Node Features (x)
    # Initialize a zero matrix: [Total Nodes, Number of Features]
    num_nodes = len(all_accounts)
    x = torch.zeros((num_nodes, 3), dtype=torch.float)
    
    # Map features (amount, balance) to the 'origin' nodes
    # Note: In a real model, you'd aggregate these if an account has multiple transactions
    feat_values = df[['amount', 'oldbalanceOrg', 'newbalanceOrig']].values
    source_ids = df['nameOrig'].map(mapping).values
    
    # Vectorized assignment is faster than a loop
    # पुराना: x[source_ids] = torch.tensor(feat_values, dtype=torch.float)
    # .copy() लगाने से NumPy array writable बन जाता है और वॉर्निंग चली जाती है

    # .copy() के बाद values को सीधा tensor में बदलें
    # .clone().detach() लगाने से PyTorch अपनी साफ़ मेमोरी इस्तेमाल करेगा
    x[source_ids] = torch.tensor(feat_values.copy(), dtype=torch.float).clone().detach()   
    y = torch.zeros(num_nodes, dtype=torch.long)
    fraud_mask = df['isFraud'] == 1
    fraud_source_ids = df[fraud_mask]['nameOrig'].map(mapping).values
    y[fraud_source_ids] = 1

    return Data(x=x, edge_index=edge_index, y=y)
print("जाला तैयार है!")