import axios from 'axios';
import { OutfitRating, RatingAnalysis } from '../types';

// This service integrates with AI services to rate outfits
// For production, you would use services like:
// - OpenAI GPT-4 Vision API
// - Google Cloud Vision API
// - Anthropic Claude Vision API

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'YOUR_API_KEY_HERE';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const outfitRatingService = {
  /**
   * Rate an outfit using AI vision analysis
   */
  async rateOutfit(imageUri: string): Promise<OutfitRating> {
    try {
      // For demo purposes, we'll simulate the API call
      // In production, you would send the image to an AI service

      // Convert image to base64 if needed
      // const base64Image = await convertImageToBase64(imageUri);

      // Example OpenAI GPT-4 Vision API call (commented out for demo)
      /*
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Você é um especialista em moda streetwear. Analise este outfit e forneça:
                  1. Uma nota de 0 a 10
                  2. Pontos fortes do visual (3-5 itens)
                  3. Pontos de melhoria (2-3 itens)
                  4. Dicas práticas para aprimorar (3-5 dicas)
                  5. Avaliação de harmonia de cores (0-10)
                  6. Avaliação de coerência de estilo (0-10)
                  7. Avaliação de proporções e caimento (0-10)
                  8. Avaliação de adequação (0-10)

                  Responda em JSON no formato:
                  {
                    "score": number,
                    "overall": "string",
                    "strengths": ["string"],
                    "improvements": ["string"],
                    "tips": ["string"],
                    "colorHarmony": number,
                    "styleCoherence": number,
                    "fitAndProportion": number,
                    "appropriateness": number
                  }`
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Image}`,
                  },
                },
              ],
            },
          ],
          max_tokens: 1000,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const analysis = JSON.parse(response.data.choices[0].message.content);
      */

      // Demo response - Replace with actual AI response
      const analysis: RatingAnalysis = {
        overall: 'Visual equilibrado com bom contraste de cores e estilo streetwear autêntico.',
        strengths: [
          'Boa combinação de cores neutras com detalhes em destaque',
          'Proporções bem equilibradas entre parte superior e inferior',
          'Acessórios complementam o visual sem sobrecarregar',
          'Estilo coerente com a vibe streetwear moderna',
        ],
        improvements: [
          'Adicionar uma camada extra (jaqueta ou moletom) poderia criar mais dimensão',
          'Considerar tênis de cor diferente para criar um ponto focal',
        ],
        tips: [
          'Experimente adicionar um boné ou gorro para completar o look',
          'Tente usar meias coloridas para adicionar um toque de personalidade',
          'Considere usar uma mochila ou bolsa que contraste com as cores principais',
          'Abuse de texturas diferentes (moletom + jeans + couro) para criar interesse visual',
        ],
        colorHarmony: 8.5,
        styleCoherence: 8.0,
        fitAndProportion: 7.5,
        appropriateness: 9.0,
      };

      const score = (
        analysis.colorHarmony +
        analysis.styleCoherence +
        analysis.fitAndProportion +
        analysis.appropriateness
      ) / 4;

      return {
        score: Math.round(score * 10) / 10,
        analysis,
        ratedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error rating outfit:', error);
      throw new Error('Não foi possível avaliar o outfit');
    }
  },

  /**
   * Get outfit suggestions based on user preferences and context
   */
  async getSuggestions(
    userStyle: string[],
    temperature: number,
    occasion?: string
  ): Promise<string[]> {
    // In production, this would call an AI service to generate personalized suggestions
    const suggestions: string[] = [];

    // Temperature-based suggestions
    if (temperature < 15) {
      suggestions.push(
        'Combine um moletom oversized com jeans skinny e tênis chunky',
        'Jaqueta bomber com camiseta básica, cargo pants e tênis retro'
      );
    } else if (temperature < 25) {
      suggestions.push(
        'Camiseta oversized com calça cargo e tênis de cano alto',
        'Camisa de flanela aberta com camiseta branca básica e jeans'
      );
    } else {
      suggestions.push(
        'Camiseta básica com shorts de alfaiataria e tênis minimalista',
        'Regata com shorts cargo e sandálias slide'
      );
    }

    // Occasion-based suggestions
    if (occasion?.toLowerCase().includes('casual')) {
      suggestions.push('Conjunto de moletom (hoodie + jogger) com tênis');
    } else if (occasion?.toLowerCase().includes('festa')) {
      suggestions.push('Jaqueta jeans com camiseta preta e calça sarja');
    }

    return suggestions;
  },

  /**
   * Analyze color palette from outfit image
   */
  async analyzeColorPalette(imageUri: string): Promise<string[]> {
    // In production, use image processing to extract dominant colors
    // For demo, return example colors
    return ['#000000', '#FFFFFF', '#FF6B6B', '#4ECDC4'];
  },
};
