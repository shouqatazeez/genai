import { configDotenv } from "dotenv";
import OpenAI from "openai";
import { tavily } from "@tavily/core";



configDotenv();

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const tools = [
  {
    type: "function",
    function: {
      name: "WebSearch",
      description:
        "Search the web for product launch dates and current information",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The search query to look up on the web",
          },
        },
        required: ["query"],
      },
    },
  },
];


const messages = [
  {
    role: "system",
    content: "You are my helpful assistant.",
  },
  {
    role: "user",
    content: `When was iPhone 17 launched?`,
  },
];

const response = await client.chat.completions.create({
  temperature: 0,
  model: "openai/gpt-oss-20b",
  messages,
  tools,
  tool_choice: "auto",
});

const assistantMessage = response.choices[0].message;
const toolCalls = assistantMessage.tool_calls;

if (!toolCalls) {
  
  console.log(`Assistant: ${assistantMessage.content}`);
} else {
  
  messages.push(assistantMessage);

  
  for (const tool of toolCalls) {
    const functionName = tool.function.name;
    const functionParams = tool.function.arguments;

    if (functionName === "WebSearch") {
      const toolResult = await webSearch(JSON.parse(functionParams));

      messages.push({
        role: "tool",
        tool_call_id: tool.id,
        content: JSON.stringify(toolResult),
      });
    }
  }

  const finalResponse = await client.chat.completions.create({
    temperature: 0,
    model: "openai/gpt-oss-20b",
    messages,
    tools,
  });

  console.log(`Assistant: ${finalResponse.choices[0].message.content}`);
}



async function webSearch({ query }) {
  const response = await tvly.search(query);
  return response;
}



  

