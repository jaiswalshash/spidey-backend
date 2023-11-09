import express from "express";
import cors from "cors";
import { generateSitemap } from "./utils/generateSitemap.js";
import { getBrokenLinks } from "./utils/brokenLinks.js";

const app = express();
const port = 5000;

// Configure CORS to allow requests from localhost:3000
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());

// Your API route
app.post("/api/getSitemap", async (req, res) => {
  const data = req.body;
  const jData = await generateSitemap(data);
  res.json({ 
    message: "Data received successfully", 
    statusCode: 201, 
    jData 
  });
});

app.post("/api/brokenLinks", async (req, res) => {
  const url = req.body;
  const brokenLinks = await getBrokenLinks(url);
  res.json({
    statusCode: 201,
    message: "Data received successfully",
    brokenLinks,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
