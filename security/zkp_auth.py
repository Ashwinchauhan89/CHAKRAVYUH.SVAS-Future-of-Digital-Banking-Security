# C:\Users\sagar\OneDrive\Desktop\CHAKRAVYUH_SVAS\cs\security\zkp_auth.py
from noknow.core import ZK

def get_bank_proof(bank_id, password):
    """Building an avidence of brain"""
    client_zk = ZK.new(curve_name="secp256k1", hash_alg="sha3_256")
    signature = client_zk.create_signature(password)
    proof = client_zk.sign(password, bank_id)
    return signature, proof

def verify_bank_identity(bank_id, signature, proof):
    """THe server check's the bank identity"""
    server_zk = ZK.new(curve_name="secp256k1", hash_alg="sha3_256")
    return server_zk.verify(proof, signature, data=bank_id)