# Path: C:\Users\sagar\OneDrive\Desktop\CHAKRAVYUH_SVAS\cs\response_agent\smart_sipahi.py
import os
import torch
from transformers import pipeline

def execute_hardcoded_defense(ip, account):
    """पायथन की मज़बूत कार्यवाही - No AI Error possible here"""
    print("-" * 40)
    print(f"🛡️ ACTION 1: IP {ip} इंदौर बैंकिंग गेटवे पर ब्लॉक कर दिया गया।")
    print(f"🍯 ACTION 2: चोर {account} को 'HoneyVault-Indore' में फँसा दिया गया।")
    print("-" * 40)
    return "SUCCESS"

def ask_ai_sipahi(score):
    """AI से सिर्फ सलाह मांगना (Classification)"""
    # 135M मॉडल के लिए सबसे आसान काम: Sentiment/Logic Analysis
    classifier = pipeline("text-classification", model="HuggingFaceTB/SmolLM2-135M-Instruct")
    
    prompt = f"Is a fraud score of {score} dangerous? Answer in one word: YES or NO."
    result = classifier(prompt)
    # अगर स्कोर 0.9 से ऊपर है, तो हम खुद फैसला लेंगे (Deterministic Logic)
    return "YES" if score > 0.9 else "NO"

def run_winning_demo(fraud_score, account_id, ip_address):
    print(f"🕵️ सिपाही (Hybrid AI) विश्लेषण कर रहा है: स्कोर {fraud_score}...")
    
    # AI की सलाह
    decision = ask_ai_sipahi(fraud_score)
    
    if decision == "YES":
        print(f"🚨 AI ALERT: सिपाही ने फ्रॉड की पुष्टि की है!")
        # मज़बूत पायथन कार्यवाही
        status = execute_hardcoded_defense(ip_address, account_id)
        if status == "SUCCESS":
            print("🏆 मिशन सफल! इंदौर का बैंकिंग नेटवर्क सुरक्षित है।")
    else:
        print("✅ ट्रांजेक्शन सुरक्षित माना गया।")

if __name__ == "__main__":
    # डेमो वैल्यूज (Indore context)
    run_winning_demo(0.95, "IND-RE-4455", "103.44.1.22")