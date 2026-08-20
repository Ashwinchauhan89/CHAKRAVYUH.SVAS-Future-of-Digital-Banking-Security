from fastapi import FastAPI
import pandas as pd

app = FastAPI()

# Data Load karne ka function
def get_bank_data(bank_name: str):
    file_map = {
        "A": "Bank_A/bank_a_data.csv",
        "B": "Bank_B/bank_b_data.csv",
        "C": "Bank_C/bank_c_data.csv"
    }
    return pd.read_csv(file_map[bank_name])

@app.get("/")
def home():
    return {"message": "PaySim Distributed Bank System Active"}

@app.get("/bank/{bank_id}")
def read_bank(bank_id: str):
    bank_id = bank_id.upper()
    if bank_id in ["A", "B", "C"]:
        data = get_bank_data(bank_id)
        # Sirf pehle 5 records dikhayenge test ke liye
        return data.head().to_dict(orient="records")
    return {"error": "Bank not found !"}


