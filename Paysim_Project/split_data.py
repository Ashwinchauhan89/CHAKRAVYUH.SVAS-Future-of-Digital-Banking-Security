import pandas as pd
import os

# 1. Dataset ko load karein
# Hum 'nrows' use kar rahe hain taaki agar laptop slow ho toh crash na kare
# Agar aapka laptop fast hai, toh 'nrows=200000' hata sakte hain
filename = "paysimdataset.csv"
print(f"Reading {filename}...")
df = pd.read_csv(filename, nrows=300000) 

# 2. Data ko mix (shuffle) karein
df = df.sample(frac=1).reset_index(drop=True)


'''
# Load karte waqt batayein ki kaunsa column chota rakhna hai
dtypes = {
    'amount': 'float32',
    'oldbalanceOrg': 'float32',
    'isFraud': 'int8' # Kyunki ye sirf 0 ya 1 hai
}
df = pd.read_csv("paysimdataset.csv", dtype=dtypes)
'''


# 3. Data ko 3 hisson mein divide karein
total_rows = len(df)
chunk = total_rows // 3

bank_a = df.iloc[:chunk]
bank_b = df.iloc[chunk : 2*chunk]
bank_c = df.iloc[2*chunk:]

# 4. Ab inhe folders ke andar save karein
print("Saving data to folders...")
bank_a.to_csv("Bank_A/bank_a_data.csv", index=False)
bank_b.to_csv("Bank_B/bank_b_data.csv", index=False)
bank_c.to_csv("Bank_C/bank_c_data.csv", index=False)

print("Success! Teeno folders mein data chala gaya hai.")                                
