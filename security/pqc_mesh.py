# C:\Users\sagar\OneDrive\Desktop\CHAKRAVYUH_SVAS\cs\security\pqc_mesh.py
from pqcrypto.kem import ml_kem_768 as kyber

def encrypt_weights_pqc(weights_bytes):
    """Making a lock with the help of quantum computing [1]"""
    pk, sk = kyber.generate_keypair()
    ciphertext, shared_secret = kyber.encrypt(pk)
    return ciphertext, shared_secret

print("Kyber - The Magical locks are ready...")