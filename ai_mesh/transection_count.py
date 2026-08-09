import os
from graph_builder import build_bank_graph

# 1. Bringing out the right path od cs folder
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__)) # यह ai_mesh फोल्डर है
CS_ROOT = os.path.dirname(CURRENT_DIR) # यह cs फोल्डर है

# 2. Knowing the exact location of CSV file
csv_path = os.path.join(CS_ROOT, "Paysim_Project", "BANK_A", "bank_a_data.csv")

print(f"📂 फाइल यहाँ ढूँढी जा रही है: {csv_path}")

try:
    # 3. Creating a graph...
    data = build_bank_graph(csv_path)

    print("-" * 40)
    print(f"✅ Total Transactions (Nodes) Analyzed: {data.num_nodes}")
    print(f"🔗 Total Connections (Edges): {data.num_edges}")
    print("-" * 40)
    
except FileNotFoundError:
    print("❌ Error: Still file is not found! check it out 'Paysim_Project' folder it can be present in (cs) or not")