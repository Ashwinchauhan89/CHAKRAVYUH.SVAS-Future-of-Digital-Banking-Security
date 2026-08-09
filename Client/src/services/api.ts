import axios from "axios";

export const analyzeTransaction = async (amount: number) => {
  const res = await axios.post("http://127.0.0.1:8000/analyze_transaction", {
    amount,
  });
  return res.data;
};