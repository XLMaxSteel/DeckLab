
import { GoogleGenAI, Type } from "@google/genai";
import { Card, Language } from '../types';
import { ALL_CARDS } from '../constants';

// Initialize Gemini
// NOTE: In a real production app, you would likely proxy this through a backend 
// to avoid exposing the key, or use a secure client-side mechanism if available.
// For this demo, we assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDeck = async (
  prompt: string, 
  lang: Language = 'en',
  includeIds: string[] = [],
  excludeIds: string[] = []
): Promise<string[]> => {
  try {
    const cardNames = ALL_CARDS.map(c => c.name).join(', ');
    
    // Resolve names for included/excluded cards
    const includedNames = includeIds.map(id => ALL_CARDS.find(c => c.id === id)?.name).filter(Boolean).join(', ');
    const excludedNames = excludeIds.map(id => ALL_CARDS.find(c => c.id === id)?.name).filter(Boolean).join(', ');

    const fullPrompt = `
      You are a Clash Royale expert deck builder.
      Your task is to create a competitive deck based on constraints.
      
      Available Cards List: 
      [${cardNames}].
      
      MANDATORY CONSTRAINTS:
      ${includedNames ? `1. YOU MUST INCLUDE THESE CARDS: [${includedNames}]. They are non-negotiable.` : ''}
      ${excludedNames ? `2. YOU MUST EXCLUDE THESE CARDS: [${excludedNames}]. Do NOT use them.` : ''}
      3. The deck MUST contain EXACTLY 8 cards total.
      4. Maximum 2 Evolution cards (Cards ending in 'Evo').
      5. Maximum 1 Champion card.
      6. MUTUALLY EXCLUSIVE VARIANTS: You CANNOT have both the normal version and the Evolution version of the same card.
         - If a card is in the EXCLUDE list, its variant is ALSO excluded.
         - If a card is in the INCLUDE list, do not add its normal/evo variant.
      7. No duplicate cards.
      
      User Context/Playstyle: "${prompt || 'Balanced competitive deck'}"
      Language Context: The user speaks ${lang === 'pt' ? 'Portuguese' : 'English'}.
      
      Task: Fill the remaining slots (8 - included cards) with cards that have perfect synergy with the mandatory cards.
      
      Return ONLY the list of 8 card names.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            deck: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "The list of 8 card names",
            }
          },
          required: ["deck"]
        }
      }
    });

    const json = JSON.parse(response.text || '{}');
    return json.deck || [];
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};

export const analyzeDeck = async (deck: Card[], lang: Language = 'en'): Promise<string> => {
  try {
    const deckList = deck.map(c => c.name).join(', ');
    const prompt = `
      Analyze this Clash Royale deck: ${deckList}.
      
      Provide a concise analysis in markdown format covering:
      1. **Win Condition**: What is the main way to win?
      2. **Defense**: How does it defend against air/ground swarms/tanks?
      3. **Weaknesses**: What specific cards or archetypes counter this?
      4. **Rating**: Give it a score out of 10.
      
      IMPORTANT: Respond in ${lang === 'pt' ? 'Portuguese (Brazil)' : 'English'}.
      Keep it brief and helpful for a player.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not analyze deck.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return lang === 'pt' ? "Falha ao analisar o deck." : "Failed to analyze deck.";
  }
};
