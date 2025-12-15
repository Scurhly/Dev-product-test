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
          "x-api-key": XZnaTgt1tUanbRbrOzBcH+C5vmcliIeqOiWN3HxVqD3RmRwyZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNkluTnBaeTB5TURJeExUQTNMVEV6VkRFNE9qVXhPalE1V2lJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaGRXUWlPaUpTYjJKc2IzaEpiblJsY201aGJDSXNJbWx6Y3lJNklrTnNiM1ZrUVhWMGFHVnVkR2xqWVhScGIyNVRaWEoyYVdObElpd2lZbUZ6WlVGd2FVdGxlU0k2SWxoYWJtRlVaM1F4ZEZWaGJtSlNZbkpQZWtKalNDdEROWFp0WTJ4cFNXVnhUMmxYVGpOSWVGWnhSRE5TYlZKM2VTSXNJbTkzYm1WeVNXUWlPaUkyTlRJNE9URTFOVFVpTENKbGVIQWlPakUzTmpVMk9URXdNVEVzSW1saGRDSTZNVGMyTlRZNE56UXhNU3dpYm1KbUlqb3hOelkxTmpnM05ERXhmUS5UWFJvY25jb3RkX2ZodzhnWThpWWgyUWRxMll4NDNiQ1BBNGpGR2VvUkhSVmxRWG92VV9BOUlfbEpmSm4wNVFPUTlFRWFwOU43WWdQREgyVFgwcVk5cDV0SUsyRXNlTmdsd2lRb3kzQkUyYldoTTd1RE9qVWFoWmxQeDRUSEFTR0lnNEFKdUNjeS1CVUM3V0FKVVUta3pLVmFfbHMzd0Y3Y3ZaNFFuYnA3Z2F5eXZZcGdHWmRTRnliTjQxbmlOM2ZMX0tTSDNwYkgzMlNTZXIyMDQwbDFiMjdYVG5uTGZJd3NxVERkTXZWaWctR0F1MXU1OFFsNHJLenNkSWg0OXNKajBiSVgwRG5pelp1QlZzakV6TzFzOTloS3VreDJlTkh6RndMeEtjMllXbE1YbDRNVWtNMHVoVlpxaE52RDdYRVlmZ1djM2R2WW1QcTYzNnM4THJwWmc=,
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

