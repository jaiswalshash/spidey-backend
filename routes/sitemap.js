import express from "express";
import { sitemap } from "../controllers/generateSitemap.js";

const router = express.Router();

router.post("/getSitemap", sitemap);

export {router};