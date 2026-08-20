# C:\Users\sagar\OneDrive\Desktop\CHAKRAVYUH_SVAS\cs\security\shield_test.py
import os
import sys


sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from zkp_auth import get_bank_proof, verify_bank_identity
from pqc_mesh import encrypt_weights_pqc

def start_winning_defense():
    print("-" * 40)
    print("🛡️ CYBERSHIELD : DEFENSE ACTIVE")
    print("-" * 40)

    # 1. ZKP Check
    bank_id = "BANK_A"
    print(f"🔑 [ZKP] बैंक {bank_id} know the proof...")
    signature, proof = get_bank_proof(bank_id, "Indore@2026")
    
    if verify_bank_identity(bank_id, signature, proof):
        print("✅ [ZKP] Proff successfully, The bank is real [2]")
    else:
        print("❌ [ZKP] Alert! Fake Bank busted...")

    # 2. PQC Check
    print(f"🔐 [PQC] The lesson of the super bank is being locked down...")
    ciphertext, _ = encrypt_weights_pqc(b"Global_Weights")
    print(f"✅ Kyber-768: {len(ciphertext)} The arnor of the bits is ready!")
    print("-" * 40)
    print("🏆 Mission Acomplished! The Project is secure now... ")

if __name__ == "__main__":
    start_winning_defense()