import { CONFIG } from "../config";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || "");

export async function generateBriefing(portName: string, weather: any) {
  try {
    const model = genAI.getGenerativeModel({ model: CONFIG.GEMINI_MODEL || "gemini-1.5-flash" });
    
    const prompt = `Write a daily travel briefing for ${portName}, Alaska. 
    Current Weather: ${weather?.current?.tempF}F, ${weather?.current?.condition}.
    Include:
    1. A customized greeting based on the weather.
    2. A wildlife sighting probability tip.
    3. A clothing recommendation.
    Keep it under 100 words.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("AI Generation failed:", error);
    return "Enjoy your day in beautiful " + portName + "!";
  }
}
