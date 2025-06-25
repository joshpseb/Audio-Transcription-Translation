
export interface LanguageOption {
  value: string; // Typically a BCP-47 tag or a simple identifier
  label: string; // User-friendly display name
  geminiName: string; // Name to use in Gemini prompts (e.g., "Malayalam", "French")
}
