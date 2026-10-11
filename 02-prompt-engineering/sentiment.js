import { configDotenv } from "dotenv";
import OpenAI from "openai";
configDotenv()
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const response = await client.responses.create({
    temperature:1,
    top_p:0.2,
    max_output_tokens:1000,
    model: "openai/gpt-oss-20b",
    instructions:"Classify the review as positive, neutral or negative. Output must be a single word. with 5-10 lines of explantion",
    input: `Review: These headphones arrived quickly and look great, but the left earcup stopped working after a week
    Review: These headphones arrived quickly and look great, but the left earcup stopped working after a week.
Sentiment:`
});
console.log(response.output_text);