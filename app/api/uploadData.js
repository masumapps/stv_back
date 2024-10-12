import axios from "axios";
import { Buffer } from "buffer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { path, content } = req.body;

  const message = "pushed";
  const owner = "masumapps";
  const repo = "push_test";
  const auth = process.env.GITHUB_TOKEN;  // Securely access the GitHub token from environment variables

  try {
    // Check if the file exists in the GitHub repo
    const getResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${auth}`,
      },
    });

    // Update the file if it exists
    const updateResponse = await axios.put(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        message,
        content: Buffer.from(JSON.stringify(content)).toString("base64"),
        sha: getResponse.data.sha,  // Use the SHA hash to update the file
      },
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${auth}`,
        },
      }
    );

    return res.status(200).json({ success: true, fileName: updateResponse.data.content.name });
  } catch (error) {
    // If the file doesn't exist, create a new one
    if (error.response && error.response.status === 404) {
      try {
        const createResponse = await axios.put(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          {
            message,
            content: Buffer.from(JSON.stringify(content)).toString("base64"),
          },
          {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${auth}`,
            },
          }
        );
        return res.status(200).json({ success: true, fileName: createResponse.data.content.name });
      } catch (createError) {
        return res.status(500).json({ message: "Error creating the file", error: createError.message });
      }
    }
    return res.status(500).json({ message: "Error updating the file", error: error.message });
  }
}