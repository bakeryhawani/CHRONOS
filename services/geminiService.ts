
import { GoogleGenAI, Type } from "@google/genai";
import { TemporalInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTemporalInsight = async (time: string, date: string): Promise<TemporalInsight> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide an interesting historical fact, scientific curiosity, or philosophical thought related to the current date (${date}) or this specific time of day (${time}). Be concise and engaging.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fact: { type: Type.STRING, description: "The core fact or thought." },
            category: { type: Type.STRING, enum: ["History", "Science", "Philosophy", "Culture"], description: "The category of the insight." },
            relevance: { type: Type.STRING, description: "Why this is relevant right now." }
          },
          required: ["fact", "category", "relevance"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as TemporalInsight;
  } catch (error) {
    console.error("Failed to fetch temporal insight:", error);
    return {
      fact: "Every second that passes is a new opportunity in the tapestry of history.",
      category: "Philosophy",
      relevance: "The continuous flow of time."
    };
  }
};
