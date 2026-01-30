
import { GoogleGenAI, Type } from "@google/genai";
import { Platform, ContentType, GenerationConfig, Persona } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateSocialContent = async (config: GenerationConfig) => {
  // Using Pro for higher-quality copywriting and reasoning
  const modelName = 'gemini-3-pro-preview';
  
  const personaPrompts = {
    [Persona.VISIONARY]: "Inspiring, forward-thinking, uses metaphors, bold claims, and focuses on the 'future'.",
    [Persona.ANALYST]: "Data-driven, logical, uses bullet points, cites 'trends', and focuses on 'efficiency'.",
    [Persona.MINIMALIST]: "Short, punchy sentences. High impact with few words. Extreme clarity.",
    [Persona.COMEDIAN]: "Witty, observational, slightly self-deprecating, and high relatability."
  };

  const systemPrompt = `You are a world-leading social media growth strategist. 
  Your goal is to create VIRAL content for ${config.platform} as a ${config.type}.
  
  Persona: ${config.persona}. 
  Style Guide: ${personaPrompts[config.persona]}

  CRITICAL INSTRUCTIONS:
  1. Start with a 'Pattern Interruption' hook.
  2. Use 'Bridge' sentences to maintain retention.
  3. End with a specific, low-friction CTA.
  
  For carousels, return a JSON object with 'slides' (array of strings) and a 'strategy' (short text explaining the logic).
  For posts, return a JSON object with 'body' (string) and 'strategy' (short text).`;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: config.prompt,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 4000 },
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          body: { type: Type.STRING },
          slides: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          strategy: { type: Type.STRING }
        },
        required: ["strategy"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};
