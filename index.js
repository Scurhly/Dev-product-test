import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({ ok: true });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on https://dev-product-test-production.up.railway.app:${PORT}`);
});

app.post("/create-product", async (req, res) => {
    const { amount, userId } = req.body;
  
    if (!Number.isInteger(amount) || amount < 1 || amount > 20000) {
      return res.status(400).json({ error: "Invalid amount" });
    }
  
 
    const PRODUCT_MAP = {
      1: 3480326033,
      5: 3480326507,
      10: 3480326513,
      50: 3480326517,
      100: 3480327484,
      1000: 3480327494,
      2000: 3480327507,
      5000: 3480327517,
    };
  
    const productId = PRODUCT_MAP[amount];
    if (!productId) {
      return res.status(400).json({ error: "Unsupported amount" });
    }
  
    res.json({ productId });
  });
  