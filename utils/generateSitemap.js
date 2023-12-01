import { robotsPath } from "./robotsPath.js";
import { getUrls } from "./getUrls.js";

async function generateSitemap({ url }) {
  try {
    const listOfUrls = await robotsPath(url);
    const disallowedPaths = listOfUrls.disallowPaths;
    const allowed = listOfUrls.allowPaths;
    const paths = [];
    paths.push(url);
    // Convert the Set back to an array
    const sitemapUrls = await getUrls(paths, disallowedPaths, allowed);

    // const sitemap = filterAllowedURLs(sitemapUrls, disallowedPaths, allowed);
    // const tempAns = {
    //   sitemap,
    // };
    return sitemapUrls;
  } catch (error) {
    console.error("Error while generating sitemap:", error);
    return []; // Return an empty array in case of an error
  }
}

function filterAllowedURLs(urls, disallowedPaths, allowedPaths) {
  return urls.filter((url) => {
    // Check if the URL matches any disallowed path
    const isDisallowed = disallowedPaths.some((path) => url.includes(path));

    // Check if the URL matches any allowed path
    // const isAllowed = allowedPaths.some((path) => url.includes(path));

    // Allow the URL if it doesn't match any disallowed path and matches at least one allowed path
    return isDisallowed;
  });
}

export { generateSitemap };
