import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as core from "@actions/core";

export interface BackoffOptions {
  retries: number;
  initialDelay: number;
  maxDelay: number;
}

export async function requestWithBackoff(
  config: AxiosRequestConfig,
  options: BackoffOptions
): Promise<AxiosResponse> {
  let attempt = 0;
  let delay = options.initialDelay;

  while (attempt < options.retries) {
    try {
      return await axios(config);
    } catch (error: any) {
      attempt++;
      if (attempt >= options.retries) {
        throw error;
      }

      const jitter = Math.random() * 1000;
      const backoffTime = Math.min(delay, options.maxDelay) + jitter;

      core.info(`Attempt ${attempt} failed. Retrying in ${backoffTime.toFixed(2)}ms...`);
      await new Promise(resolve => setTimeout(resolve, backoffTime));

      delay *= 2;
    }
  }

  throw new Error("Request failed after multiple retries.");
}
