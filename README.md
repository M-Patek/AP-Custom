# Antigravity Claude Proxy (Customized)

> **Note**: This project is a highly customized version based on the original work at [antigravity-claude-proxy](https://github.com/badrisnarayanan/antigravity-claude-proxy). It includes enhanced startup logic, specific model mappings for Gemini 3/Claude 4.5, and improved native module handling.

## 📖 Project Overview

**Antigravity Claude Proxy** is a specialized Node.js proxy server designed to bridge **Claude Code CLI** with **Antigravity's Cloud Code API**.

It allows you to use powerful models like `claude-sonnet-4-5-thinking` and the `gemini-3` series directly within your terminal via Claude Code, leveraging Google's infrastructure while maintaining full compatibility with Anthropic's API format.

### 🚀 Key Features

* **Model Interoperability**: Translates requests seamlessly between Anthropic Messages API and Google Generative AI format.
* **Multi-Account Load Balancing**:
    * Supports adding multiple Google accounts.
    * Automatically rotates accounts to manage rate limits.
    * **Sticky Sessions**: Keeps multi-turn conversations on the same account to utilize prompt caching effectively.
* **Smart Fallback System**:
    * Automatically switches models (e.g., `gemini-3-pro-high` → `claude-opus-4-5-thinking`) if the primary model's quota is exhausted.
* **Thinking & Streaming Support**:
    * Full support for "Thinking" models with signature verification.
    * Handles **Cross-Model Thinking Signatures**, allowing Gemini to "pick up" a thought process started by a Claude model (and vice-versa).
* **Robust Architecture**:
    * Custom `index.js` launcher with multiple startup strategies.
    * Automatic `better-sqlite3` rebuilding for Node.js version mismatches.
    * Headless OAuth flow for server environments.

## 🛠️ Prerequisites

* **Node.js**: Version 18.0.0 or higher.
* **Claude Code CLI**: Installed and configured.
* **Google Account**: Access to Google Cloud Code / Antigravity services.

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd antigravity-claude-proxy
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## ⚙️ Configuration & Accounts

Before running the server, you need to authenticate with at least one Google account.

### 1. Add an Account
Interactive mode (opens browser):
```bash
npm run accounts:add
```

Headless mode (for remote servers/SSH):
```bash
npm run accounts:add -- --no-browser
```

### 2. Manage Accounts
* **List accounts**: `npm run accounts:list`
* **Verify tokens**: `npm run accounts:verify`
* **Remove account**: `npm run accounts:remove`

## 🏃 Usage

### Start the Proxy Server

Standard start (runs on port 8080):
```bash
npm start
```

### Start with Fallback Enabled
Enable automatic model switching when rate limits are hit:
```bash
npm start -- --fallback
```

### Connect Claude Code
Once the server is running (default `http://localhost:8080`), configure Claude Code to use this proxy as its API endpoint.

*(Note: Refer to Claude Code documentation on how to override the API base URL).*

## 🧪 Testing

This project includes a comprehensive test suite to ensure API compatibility and stability.

```bash
# Run all tests
npm test

# Run specific test categories
npm run test:signatures    # Test thinking block signatures
npm run test:streaming     # Test SSE streaming response
npm run test:multiturn     # Test multi-turn conversations & tools
npm run test:oauth         # Test OAuth flows
npm run test:crossmodel    # Test switching between Gemini/Claude
```

## 📂 Project Structure

* `src/index.js`: **Custom Entry Point**. Smart launcher that detects the correct Express export method.
* `src/server.js`: Main Express server handling API routes (`/v1/messages`).
* `src/cloudcode/`: Logic for communicating with Google's API (SSE parsing, session management).
* `src/account-manager/`: Logic for account rotation, rate-limiting, and storage.
* `src/format/`: Converters for JSON schemas and Thinking Signatures.
* `src/constants.js`: Configuration for endpoints, models, and fallbacks.

## ⚠️ Disclaimer

This tool is for educational and research purposes. It allows interoperability between different AI formats. Please ensure you comply with the Terms of Service of the respective API providers (Google and Anthropic).

---
*Based on the work by Badri Narayanan.*
