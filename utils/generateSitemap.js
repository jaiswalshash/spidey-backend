import cheerio from "cheerio";
import puppeteer from "puppeteer";
import { getDisallowedPaths } from "./disallowedPaths.js";

async function generateSitemap({ url }) {
  try {
    // Launching a headless browser
    const browser = await puppeteer.launch({ headless: "false" });

    // Open a new browser
    const page = await browser.newPage();

    await page.goto(url);

    // Get the HTML content of the page
    const pageContent = await page.content();

    // Load the HTML content into cheerio
    const $ = cheerio.load(pageContent);

    // Set to store unique URLs for the sitemap
    const uniqueSitemapUrls = new Set();

    const disallowedPaths = await getDisallowedPaths(url);

    console.log(disallowedPaths);

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

    console.log(sitemapUrls);

    console.log(disallowedPaths);

    const sitemap = filterAllowedURLs(sitemapUrls, disallowedPaths);
    // Close the browser
    await browser.close();

    const tempAns = {
      sitemap
    }  
    

    return tempAns;
  } catch (error) {
    // Handle any errors that occur during scraping

    console.error("Error while generating sitemap:", error);
    return []; // Return an empty array in case of an error
  }
}

function filterAllowedURLs(urls, disallowedPaths) {
  return urls.filter(url => {
    const isAllowed = !disallowedPaths.some(path => url.includes(path));
    return isAllowed;
  });
}



export { generateSitemap };
