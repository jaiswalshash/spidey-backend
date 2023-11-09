import { generateSitemap } from "../utils/generateSitemap.js";

const sitemap = async (req, res) => {
  const data = req.body;
  const jData = await generateSitemap(data);
  res.json({
    message: "Data received successfully",
    statusCode: 201,
    jData,
  });
};

export { sitemap };
