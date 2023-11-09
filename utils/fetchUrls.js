import axios from "axios";

// Load environment variables
const username = process.env.BRD_USERNAME;
const password = process.env.BRD_PASSWORD;
const port = process.env.BRD_PORT || 22225;

async function fetchUrlsAndStatusCodes(urlArray) {
  const session_id = (1000000 * Math.random()) | 0;
  const results = [];

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: process.env.BRD_HOST,
    port,
    rejectUnauthorized: false,
  };

  const promises = urlArray.map(async (url) => {
    try {
      const response = await axios.get(url, options);
      const statusCode = response.status;
      results.push({ url, statusCode });
    } catch (error) {
      // Handle errors more explicitly, e.g., based on the error status
      if (error.response) {
        results.push({ url, statusCode: error.response.status });
      } else {
        results.push({ url, statusCode: "Error" });
      }
    }
  });

  await Promise.all(promises);

  return results;
}

export { fetchUrlsAndStatusCodes };
