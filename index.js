import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import FormData from "form-data";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Create Developer Product route
app.post("/create-product", async (req, res) => {
  try {
    const { amount, userId } = req.body;

    // Validate amount
    if (typeof amount !== "number" || amount < 1 || amount > 20000) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Prepare multipart form data
    const form = new FormData();
    form.append("name", `${amount} Robux Product`);
    form.append("description", `Developer product for ${amount} Robux`);
    form.append("price", amount.toString());
    form.append("isForSale", "true");

    // Call Roblox Developer Products API
    const response = await fetch(
      "https://apis.roblox.com/developer-products/v2/universes/9353795104/developer-products",
      {
        method: "POST",
        headers: {
          "x-api-key": process.env.ROBLOX_API_KEY,
          ...form.getHeaders(),
        },
        body: form,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Roblox API error:", data);
      return res.status(response.status).json({ error: data });
    }

    // Return the new productId to Roblox
    res.json({ productId: data.id });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
