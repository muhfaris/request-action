# GitHub Action API Request

This GitHub Action allows you to make HTTP API requests as part of your workflow. You can use it to interact with external services and capture the response data for further use in your workflow. This README provides instructions on how to set up and use this action in your GitHub Actions workflow.

## Usage

To use this GitHub Action in your workflow, you need to define the following inputs:

- `url` (Required): The URL of the API you want to make a request to.
- `headers`: A JSON-formatted string containing the headers to include in the request.
- `body`: The request body data (if applicable).
- `method`: The HTTP method to use for the request (default is "POST" if not specified).

and you can manipulate the outputs:

- `response-status`: The HTTP status code of the API response.
- `response-data`: The JSON-formatted response data from the API.

Here's an example of how to use this action in your GitHub Actions workflow:

```yaml
name: Make API Request

on:
  push:
    branches:
      - main

jobs:
  make-api-request:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Make API Request
        id: api-request
        uses: your-github-username/api-request-action@v1
        with:
          url: ${{ secrets.API_URL }}
          headers: ${{ secrets.API_HEADERS }}
          body: |
            {
              "key": "value"
            }
          method: POST

      - name: Show API Response Status
        run: |
          echo "Response Status: ${{ steps.api-request.outputs.response-status }}"

      - name: Show API Response Data
        run: |
          echo "Response Data: ${{ steps.api-request.outputs.response-data }}"
```

## Feedback and Issues

If you encounter any issues with this GitHub Action or have suggestions for improvement, please [open an issue](https://github.com/your-github-username/api-request-action/issues) on the GitHub repository for this action. We welcome your feedback and contributions.
