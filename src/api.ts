import * as core from "@actions/core";
import axios, { AxiosRequestConfig } from "axios";

async function makeApiRequest() {
  try {
    // Input parameters from the GitHub Action workflow
    const apiUrl = core.getInput("url", { required: true });
    const headers = JSON.parse(core.getInput("headers"));
    const requestBody = core.getInput("body");
    const method = core.getInput("method") || "POST"; // Default to "POST" if not specified

    // Define the HTTP request configuration
    const config: AxiosRequestConfig = {
      url: apiUrl,
      method, // Use the specified method or "POST" by default
      headers,
      data: requestBody,
    };

    // Make the API request
    const response = await axios(config);

    // Output the API response data
    core.setOutput("response-status", response.status.toString());
    core.setOutput("response-data", JSON.stringify(response.data));

    core.info(`API request succeeded with status code ${response.status}`);
  } catch (error) {
    core.setFailed(`API request failed: ${error.message}`);
  }
}

makeApiRequest();
