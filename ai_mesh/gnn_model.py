import torch
import torch.nn.functional as F
from torch_geometric.nn import SAGEConv # GraphSAGE layer[4]

class CyberSAGE(torch.nn.Module):
    def __init__(self, in_channels, hidden_channels, out_channels):
        super(CyberSAGE, self).__init__()
        # layer 1: talk to nabour...
        self.conv1 = SAGEConv(in_channels, hidden_channels)
        # लेयर 2: आखिरी फैसला लेना
        self.conv2 = SAGEConv(hidden_channels, out_channels)

    def forward(self, x, edge_index):
        # 1. listning the nabour...
        x = self.conv1(x, edge_index)
        x = F.relu(x) # खुशी का फिल्टर
        x = F.dropout(x, p=0.5, training=self.training) # कुछ भूलने की शक्ति
        
        # 2. File decision (Fraud or Safe?)
        x = self.conv2(x, edge_index)
        return F.log_softmax(x, dim=1)
    
    print("जाला तैयार है!")