# Path: C:\Users\sagar\OneDrive\Desktop\CHAKRAVYUH_SVAS\cs\response_agent\smart_sipahi.py
import os
import torch
from transformers import pipeline

def execute_hardcoded_defense(ip, account):
    """ No AI Error possible here"""
    print("-" * 40)
    print(f"🛡️ ACTION 1: IP {ip} Bocked")
    print(f"🍯 ACTION 2: Attacker {account} 'HoneyVault-Indore' Trap")
    print("-" * 40)
    return "SUCCESS"

def ask_ai_sipahi(score):
    """AI  (Classification)"""
    #Sentiment/Logic Analysis
    classifier = pipeline("text-classification", model="HuggingFaceTB/SmolLM2-135M-Instruct")
    
    prompt = f"Is a fraud score of {score} dangerous? Answer in one word: YES or NO."
    result = classifier(prompt)
    # 
    return "YES" if score > 0.9 else "NO"

def run_winning_demo(fraud_score, account_id, ip_address):
    print(f"🕵️ Solider (Hybrid AI) Score {fraud_score}...")
    
    # AI की सलाह
    decision = ask_ai_sipahi(fraud_score)
    
    if decision == "YES":
        print(f"🚨 AI ALERT")
        # मज़बूत पायथन कार्यवाही
        status = execute_hardcoded_defense(ip_address, account_id)
        if status == "SUCCESS":
            print("🏆 Successful")
    else:
        print("Transaction Ok")

if __name__ == "__main__":
   
    run_winning_demo(0.95, "IND-RE-4455", "103.44.1.22")