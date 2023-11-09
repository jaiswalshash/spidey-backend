import cheerio from "cheerio";
import puppeteer from "puppeteer";
import { fetchUrlsAndStatusCodes } from "./fetchUrls.js";

async function getBrokenLinks({ url }) {
  try {
    // Launching a headless browser
    const browser = await puppeteer.launch({ headless: "new" });

    // Open a new browser
    const page = await browser.newPage();

    await page.goto(url);
 
    // Get the HTML content of the page
    const pageContent = await page.content();

    // Load the HTML content into cheerio
    const $ = cheerio.load(pageContent);

    // Set to store unique URLs for the sitemap
    const uniqueSitemapUrls = new Set();

    // Find all anchor tags and extract their href attributes
    $("a").each((index, element) => {
      const href = $(element).attr("href");
      if (href) {
        // Check if the href is an absolute URL or a relative path
        if (href.startsWith("http") || href.startsWith("https")) {
          uniqueSitemapUrls.add(href);
        } else {
          // Construct absolute URL using the base URL
          const baseUrl = new URL(url);
          const absoluteUrl = new URL(href, baseUrl).toString();
          uniqueSitemapUrls.add(absoluteUrl);
        }
      }
    });

    // Convert the Set back to an array
    const sitemapUrls = Array.from(uniqueSitemapUrls);

    // status codes for each inPage url
    const temp = await fetchUrlsAndStatusCodes(sitemapUrls);
    // Close the browser
    await browser.close();

    const tempAns = {
      temp
    }

    return tempAns;
  } catch (error) {
    // Handle any errors that occur during scraping

    console.error("Error while generating sitemap:", error);
    return []; // Return an empty array in case of an error
  }
}


export { getBrokenLinks };
