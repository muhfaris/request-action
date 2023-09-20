# GitHub Action API Request

This GitHub Action allows you to make HTTP API requests as part of your workflow. You can use it to interact with external services and capture the response data for further use in your workflow. This README provides instructions on how to set up and use this action in your GitHub Actions workflow.

## Usage

To use this GitHub Action in your workflow, you need to define the following inputs:

- `url` (Required): The URL of the API you want to make a request to.
- `headers`: A JSON-formatted string containing the headers to include in the request.
- `body`: The request body data (if applicable).
- `method`: The HTTP method to use for the request (default is "POST" if not specified).

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
        run: echo "Response Status: ${{ steps.api-request.outputs.response-status }}"

      - name: Show API Response Data
        run: echo "Response Data: ${{ steps.api-request.outputs.response-data }}"
```

In this example, we're triggering the workflow on pushes to the "main" branch. The `API_URL` and `API_HEADERS` secrets should be defined in your GitHub repository's settings to securely store sensitive information.

## Inputs

### `url` (Required)

The URL of the API endpoint you want to make a request to. This input is required.

### `headers`

A JSON-formatted string containing the headers to include in the request. These headers can be used to specify things like authentication tokens or custom content types. If not provided, the request will be sent without additional headers.

### `body`

The request body data, if applicable. This input allows you to send data to the API. It should be provided as a JSON-formatted string or any valid HTTP request body content.

### `method`

The HTTP method to use for the request (e.g., "GET," "POST," "PUT," "DELETE"). If not specified, it defaults to "POST."

## Outputs

### `response-status`

The HTTP status code of the API response.

### `response-data`

The JSON-formatted response data from the API.

## Example

Here's an example workflow that demonstrates how to use this action:

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
        run: echo "Response Status: ${{ steps.api-request.outputs.response-status }}"

      - name: Show API Response Data
        run: echo "Response Data: ${{ steps.api-request.outputs.response-data }}"
```

In this workflow, we trigger the action on a push to the "main" branch, make an API request, and then display the response status and data in the workflow log.

## Feedback and Issues

If you encounter any issues with this GitHub Action or have suggestions for improvement, please [open an issue](https://github.com/your-github-username/api-request-action/issues) on the GitHub repository for this action. We welcome your feedback and contributions.
