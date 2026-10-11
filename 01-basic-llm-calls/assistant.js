import { configDotenv } from "dotenv";
import OpenAI from "openai";
configDotenv()
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const response = await client.responses.create({
    model: "openai/gpt-oss-20b",
    instructions:"You are a my helpful assistant You need to expain in simple 2-3 bullet points",
    input: "Explain the importance of fast language models",
});
console.log(response.output_text);