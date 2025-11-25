import { config } from "../config";
import axios from "axios";

/**
 * Universal AlaskaOS AI Provider
 * Supports:
 *  - Gemini (primary)
 *  - Ollama (fallback)
 *  - No-Op fallback for safety
 */

export async function generateBriefing(portName: string, weather: any) {
  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const prompt = `
Generate a structured JSON briefing for ${portName}, Alaska.
Use this weather data: ${JSON.stringify(weather).slice(0, 400)}...

Requirements:
- Output STRICT JSON only, NEVER text outside JSON
- Include fields:
  {
    "summary": "",
    "wildlife": "",
    "recommendation": "",
    "safety": ""
  }
- Keep sentences short and tourist-friendly
- No markdown, no formatting
`;

  // ----------------------------
  // OPTION 1: GEMINI (if key exists)
  // ----------------------------
  if (process.env.GOOGLE_GENERATIVE_AI_KEY) {
    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_KEY);

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const aiRes = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.25,
          responseMimeType: "application/json",
        },
      });

      return JSON.parse(aiRes.response.text());
    } catch (err) {
      console.error("Gemini AI failed:", err);
    }
  }

  // ----------------------------
  // OPTION 2: OLLAMA (local, free)
  // ----------------------------
  try {
    const ollamaRes = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "mistral",
        prompt: prompt,
        system: "Respond ONLY with JSON that matches the schema.",
      },
      { timeout: 5000 }
    );

    return JSON.parse(ollamaRes.data.response);
  } catch (err) {
    console.log("Ollama not available. Using fallback.");
  }

  // ----------------------------
  // OPTION 3: SAFE STATIC FALLBACK
  // ----------------------------
  return {
    summary: `Daily briefing unavailable for ${portName}.`,
    wildlife: "No wildlife update available.",
    recommendation: "Check local excursion operators on arrival.",
    safety: "Check weather conditions at your port today.",
  };
}
