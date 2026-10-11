# GenAI Learning — JavaScript & Node.js

A hands-on learning repository for Generative AI concepts. Each folder is a
small, self-contained example built with the OpenAI SDK configured to talk to
Groq, plus Tavily for web search.

## Contents

| Folder | File | What it demonstrates |
| --- | --- | --- |
| `01-basic-llm-calls` | `assistant.js` | A basic one-shot LLM call. |
| `02-prompt-engineering` | `sentiment.js` | Prompt-based sentiment classification with decoding parameters (`temperature`, `top_p`, `max_output_tokens`). |
| `03-structured-output` | `instruction.js` | Requesting JSON output from the model through prompting. |
| `04-tool-calling` | `call.js` | A full tool-calling loop: the model requests a web-search tool, the Tavily search runs, and the result is sent back for a final answer. |

## Tech stack

- Node.js with ES modules
- OpenAI SDK (pointed at the Groq API via `baseURL`)
- Tavily for web search
- dotenv for environment variables

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with your own keys:

   ```
   GROQ_API_KEY=your_groq_key
   TAVILY_API_KEY=your_tavily_key
   ```

3. Run any example:

   ```bash
   node 01-basic-llm-calls/assistant.js
   ```

## Note

This is a learning project. `.env` is gitignored; do not commit real API keys.
The structured-output example is prompt-driven and does not yet enforce a schema.
The tool-calling example handles a single tool round.
