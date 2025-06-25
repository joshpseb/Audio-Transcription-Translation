
import type { LanguageOption } from './types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { value: "ml-IN", label: "Malayalam", geminiName: "Malayalam" },
  { value: "fr-FR", label: "French", geminiName: "French" },
  { value: "es-ES", label: "Spanish", geminiName: "Spanish" },
  { value: "de-DE", label: "German", geminiName: "German" },
  { value: "hi-IN", label: "Hindi", geminiName: "Hindi" },
  { value: "ja-JP", label: "Japanese", geminiName: "Japanese" },
  { value: "ar-SA", label: "Arabic", geminiName: "Arabic" },
  { value: "ru-RU", label: "Russian", geminiName: "Russian" },
  { value: "pt-BR", label: "Portuguese (Brazil)", geminiName: "Portuguese" },
  { value: "it-IT", label: "Italian", geminiName: "Italian" },
  { value: "ko-KR", label: "Korean", geminiName: "Korean" },
  { value: "zh-CN", label: "Chinese (Simplified)", geminiName: "Chinese" },
  { value: "en-US", label: "English (US)", geminiName: "English" }, // Also good for testing transcription
];

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
