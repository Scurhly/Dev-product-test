import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import FormData from "form-data"; // Add this for multipart

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Test route
app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({ ok: true });
});

// Create Developer Product route
app.post("/create-product", async (req, res) => {
  try {
    const { amount, userId } = req.body;

    // Validate amount
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

    if (!PRODUCT_MAP[amount]) {
      return res.status(400).json({ error: "Unsupported amount" });
    }

    // Prepare multipart form
    const form = new FormData();
    form.append("name", amount.toString());
    form.append("description", `Developer product for ${amount} Robux`);
    form.append("price", amount.toString());
    form.append("isForSale", "true");

    // Call Roblox Developer Products API
    const response = await fetch(
      "https://apis.roblox.com/developer-products/v2/universes/9353795104/developer-products",
      {
        method: "POST",
        headers: {
          "x-api-key": process.env.ROBLOX_API_KEY, // store your key in .env
          ...form.getHeaders(),
        },
        body: form,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    // Return the product info to Roblox
    res.json({ productId: data.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

  

    
