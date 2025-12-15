const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

app.post("/create-product", async (req, res) => {
  const { amount, userId } = req.body;

  if (!Number.isInteger(amount) || amount < 1 || amount > 20000) {
    return res.status(400).json({ error: "Invalid amount" });
  }

 
  const PRODUCT_MAP = {
    1: 111111,
    5: 222222,
    10: 333333,
    50: 444444,
    100: 555555
  };

  const productId = PRODUCT_MAP[amount];
  if (!productId) {
    return res.status(400).json({ error: "Unsupported amount" });
  }

  res.json({ productId });
});
