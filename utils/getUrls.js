import cheerio from "cheerio";
import puppeteer from "puppeteer";

async function getUrls(paths, disallowed, allowed) {
  try {
    let counter = 20;
    let uniquePaths = new Set();
    let allowedPaths = [];

    while (paths.length > 0 && counter > 0) {
      let n = paths.length;
      for (let i = 0; i < n && counter > 0; i++) {
        counter--;
        let url = paths.shift();
        // console.log(url);
        const fullUrl = new URL(url);
        const base = fullUrl.hostname;
        const browser = await puppeteer.launch({ headless: true }); // 
        const page = await browser.newPage();
        await page.goto(url);
        const pageContent = await page.content();
        const $ = cheerio.load(pageContent);

        $("a").each((index, element) => {
          const href = $(element).attr("href");
          if (href) {
            // Check if the href is an absolute URL or a relative path
            if (href.startsWith("http") || href.startsWith("https")) {
              // absoluteUrl = href;
            } else if (href.startsWith("/")) {
              if (!uniquePaths.has(href)) {
                uniquePaths.add(href);
                if (isStringAllowed(allowed, disallowed, href)) {
                  let allowedUrl = "https://" + base + href;
                  allowedPaths.push(allowedUrl);
                  // console.log(allowedPaths);
                  paths.push(allowedUrl);
                }
              }
            }
          }
        });
        await browser.close();
      }
    }

    console.log(counter);

    return allowedPaths;
  } catch (error) {
    console.error(error);
  }
}

function isStringAllowed(allowed, disallowed, inputString) {
  // Implement your logic for checking if the inputString is allowed or not
  return true; // Placeholder, replace with actual logic
}

export { getUrls };
