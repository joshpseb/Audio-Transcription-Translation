
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';

// Ensure API_KEY is available in the environment. For local development,
// you might use a .env file and a library like dotenv.
// For this context, we assume process.env.API_KEY is set.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY for Gemini is not set in environment variables.");
  // In a real app, you might want to throw an error or handle this more gracefully.
  // For this exercise, we'll proceed, but API calls will fail if key is missing.
}
const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" });

export async function transcribeAudio(
  base64Audio: string,
  mimeType: string,
  sourceLanguageName: string
): Promise<string> {
  if (!apiKey) throw new Error("Gemini API Key is not configured.");

  const audioPart = {
    inlineData: {
      mimeType: mimeType,
      data: base64Audio,
    },
  };

  const textPart = {
    text: `The following audio is in ${sourceLanguageName}. Please transcribe it accurately. Output only the transcribed text in ${sourceLanguageName}. Do not include any introductory phrases like "Here is the transcription:". Just provide the raw text. If the audio is silent or unintelligible, return an empty string or a note like "[silent audio]".`,
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: { parts: [audioPart, textPart] },
      // config: { thinkingConfig: { thinkingBudget: 0 } } // Might speed up, but could reduce quality. Test.
    });
    
    // Using response.text directly as per guidelines
    const transcription = response.text;
    return transcription.trim();

  } catch (error) {
    console.error("Error transcribing audio with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API transcription failed: ${error.message}`);
    }
    throw new Error("Gemini API transcription failed with an unknown error.");
  }
}

export async function translateText(
  textToTranslate: string,
  sourceLanguageName: string,
  targetLanguageName: string = "English"
): Promise<string> {
  if (!apiKey) throw new Error("Gemini API Key is not configured.");
  if (!textToTranslate.trim()) {
    return "No text provided for translation.";
  }

  const prompt = `Translate the following ${sourceLanguageName} text to ${targetLanguageName}: "${textToTranslate}". Provide only the ${targetLanguageName} translation. Do not include any introductory phrases or the original text.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      // config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    
    const translation = response.text;
    return translation.trim();

  } catch (error) {
    console.error("Error translating text with Gemini:", error);
     if (error instanceof Error) {
        throw new Error(`Gemini API translation failed: ${error.message}`);
    }
    throw new Error("Gemini API translation failed with an unknown error.");
  }
}
