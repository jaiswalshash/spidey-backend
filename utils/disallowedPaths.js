import axios from "axios";

async function getDisallowedPaths(url) {
  try {
    // Append "/robots.txt" to the provided URL
    const robotsTxtUrl = new URL("/robots.txt", url).toString();
    
    // Fetch the robots.txt file
    const { data } = await axios.get(robotsTxtUrl);

    // Parse robots.txt content and extract disallowed paths
    const disallowPaths = [];
    const lines = data.split("\n");
    for (const line of lines) {
      if (line.trim().startsWith("Disallow:")) {
        const path = line.trim().split("Disallow:")[1].trim();
        disallowPaths.push(path);
      }
    }

    return disallowPaths;
  } catch (error) {
    console.error("Error while fetching and parsing robots.txt:", error);
    return [];
  }
}

export {getDisallowedPaths}