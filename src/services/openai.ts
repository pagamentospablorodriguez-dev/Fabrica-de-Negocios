// src/services/openai.ts

import { FormData, IdeiaNegocios } from '../types';

// Agora chamamos o endpoint da nossa função Netlify, não a API da OpenAI
const NETLIFY_FUNCTION_URL = '/.netlify/functions/gerar-ideias'; 

export async function gerarIdeiasNegocio(formData: FormData): Promise<IdeiaNegocios[]> {
  // NÃO HÁ CHAVE DA API AQUI. A função Netlify cuida disso.

  try {
    const response = await fetch(NETLIFY_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Envia o formulário (formData) para a função Netlify processar
      body: JSON.stringify(formData), 
    });

    if (!response.ok) {
      // Se a função Netlify ou a API OpenAI retornar um erro
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || `Erro desconhecido ao chamar o servidor (${response.status}).`;
      throw new Error(errorMessage);
    }

    // A 'data' é a resposta COMPLETA da OpenAI, encapsulada pela função Netlify
    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('Resposta vazia da API OpenAI. Verifique o prompt ou os logs do Netlify Function.');
    }

    let resultado;
    
    // Tenta parsear a string content diretamente (melhor com response_format)
    try {
        resultado = JSON.parse(content);
    } catch (e) {
        // Se falhar o parse direto, tenta o método anterior (em caso de Markdown ou texto extra)
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        
        if (!jsonMatch) {
            // Se ainda assim não encontrar, dispara o erro original
            throw new Error(`Formato de resposta inválido da API OpenAI: O modelo não retornou um JSON válido. Conteúdo recebido: ${content.substring(0, 100)}...`);
        }
        
        // Tenta parsear o que foi extraído pela regex
        try {
             resultado = JSON.parse(jsonMatch[0]);
        } catch (e) {
             throw new Error(`Formato de resposta inválido: Erro ao parsear JSON. Detalhes: ${e.message}`);
        }
    }
    
    // Retorna a lista de ideias
    return resultado.ideias;
    
  } catch (error) {
    console.error('Erro ao gerar ideias:', error);
    throw error;
  }
}
