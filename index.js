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
  console.log(`Server running on http://dev-product-test-production-604d.up.railway.app:${PORT}`);
});

app.post("/create-product", async (req, res) => {
    const { amount, userId } = req.body;
  
    if (!Number.isInteger(amount) || amount < 1 || amount > 20000) {
      return res.status(400).json({ error: "Invalid amount" });
    }
  
 
    const r = await fetch(
        "https://apis.roblox.com/developer-products/v1/universes/9353795104/developer-products",
        {
          method: "POST",
          headers: {
            "x-api-key": process.env.ROBLOX_API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: `Donation ${price}`,
            priceInRobux: price
          })
        }
      );
    
      res.json(await r.json());
    });
    
    app.listen(3000);
