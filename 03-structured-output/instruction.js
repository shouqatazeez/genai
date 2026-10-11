import { configDotenv } from "dotenv";
import OpenAI from "openai";

configDotenv();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const response = await client.responses.create({
  model: "openai/gpt-oss-20b",
  instructions: `Classify the review as positive, neutral, or negative.
Return valid JSON with one key named "sentiment".`,
  input: `Review: These headphones arrived quickly and look great, but the left earcup stopped working after a week.`,
});

console.log(response.output_text);
