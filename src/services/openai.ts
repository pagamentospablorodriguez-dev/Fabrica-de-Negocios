import { FormData, IdeiaNegocios } from '../types';

const NETLIFY_FUNCTION_URL = '/.netlify/functions/gerar-ideias';

export async function gerarIdeiaNegocio(formData: FormData): Promise<IdeiaNegocios> {
  try {
    const response = await fetch(NETLIFY_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || `Erro desconhecido ao chamar o servidor (${response.status}).`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('Resposta vazia da API OpenAI. Verifique o prompt ou os logs do Netlify Function.');
    }

    let resultado;

    try {
      resultado = JSON.parse(content);
    } catch (e) {
      const jsonMatch = content.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error(`Formato de resposta inválido da API OpenAI: O modelo não retornou um JSON válido. Conteúdo recebido: ${content.substring(0, 100)}...`);
      }

      try {
        resultado = JSON.parse(jsonMatch[0]);
      } catch (e) {
        throw new Error(`Formato de resposta inválido: Erro ao parsear JSON. Detalhes: ${e.message}`);
      }
    }

    return resultado.ideia;

  } catch (error) {
    console.error('Erro ao gerar ideia:', error);
    throw error;
  }
}
