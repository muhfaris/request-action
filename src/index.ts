import * as core from "@actions/core";
import { AxiosRequestConfig } from "axios";
import { requestWithBackoff, BackoffOptions } from "./backoff";

async function makeApiRequest() {
  try {
    // Input parameters from the GitHub Action workflow
    const apiUrl = core.getInput("url", { required: true });
    const headers = JSON.parse(core.getInput("headers"));
    const requestBody = core.getInput("body");
    const method = core.getInput("method") || "POST"; // Default to "POST" if not specified

    // Backoff options
    const retries = parseInt(core.getInput("retries") || "3", 10);
    const initialDelay = parseInt(core.getInput("initialDelay") || "1000", 10);
    const maxDelay = parseInt(core.getInput("maxDelay") || "5000", 10);

    // Define the HTTP request configuration
    const config: AxiosRequestConfig = {
      url: apiUrl,
      method, // Use the specified method or "POST" by default
      headers,
      data: requestBody,
    };

    const backoffOptions: BackoffOptions = {
      retries,
      initialDelay,
      maxDelay,
    };

    // Make the API request with backoff
    const response = await requestWithBackoff(config, backoffOptions);

    // Output the API response data
    core.setOutput("response-status", response.status.toString());
    core.setOutput("response-data", JSON.stringify(response.data));

    core.info(`API request succeeded with status code ${response.status}`);
  } catch (err: any) {
    core.setFailed(`API request failed: ${err.message}`);
  }
}

makeApiRequest();
