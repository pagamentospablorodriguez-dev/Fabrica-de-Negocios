import { FormData, IdeiaNegocios } from '../types';

const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function gerarIdeiasNegocio(formData: FormData): Promise<IdeiaNegocios[]> {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'sua_chave_api_openai_aqui') {
    throw new Error('Chave da API OpenAI não configurada. Por favor, configure OPENAI_API_KEY no arquivo .env');
  }

  const prompt = `Você é um especialista em negócios e empreendedorismo. Com base nas informações abaixo, gere EXATAMENTE 10 ideias de negócios COMPLETAS e PRONTAS para lançar:

Área de Interesse: ${formData.areaInteresse}
Tempo Disponível: ${formData.tempoDisponivel}
Investimento Disponível: ${formData.investimento}
Tipo de Negócio: ${formData.tipoNegocio}
Habilidades: ${formData.habilidades}
Objetivo Financeiro: ${formData.objetivoFinanceiro}

Para cada ideia, forneça:
1. Nome da Marca (criativo e profissional)
2. Promessa (proposta de valor única e impactante)
3. Análise de Viabilidade (detalhada com prós e contras)
4. Como Viralizar (estratégias específicas e práticas)
5. Público-Alvo (definição clara e segmentada)
6. Estratégia de Marketing (plano completo com canais e táticas)
7. Roadmap de Lançamento (cronograma passo a passo dos primeiros 90 dias)
8. Script de Anúncios (3 exemplos completos para Facebook/Instagram Ads)
9. Script de Conteúdo Orgânico (5 ideias de posts/vídeos para redes sociais)
10. Prompt para Bolt (prompt completo e detalhado para criar o projeto no Bolt - seja específico sobre funcionalidades, design, cores, tecnologias)
11. Formas de Monetização (pelo menos 5 formas diferentes e práticas)
12. Primeiros Passos (lista de ações para começar HOJE)
13. Metas Financeiras (projeção realista de ganhos nos primeiros 3, 6 e 12 meses)

IMPORTANTE:
- Seja EXTREMAMENTE específico e prático
- Todas as ideias devem ser VIÁVEIS e LUCRATIVAS
- Foque em negócios que podem gerar resultado RÁPIDO
- As estratégias devem ser aplicáveis IMEDIATAMENTE
- Os prompts para o Bolt devem ser completos o suficiente para gerar um projeto funcional

Responda APENAS com um JSON válido no seguinte formato:
{
  "ideias": [
    {
      "nomeMarca": "...",
      "promessa": "...",
      "analiseViabilidade": "...",
      "comoViralizar": "...",
      "publicoAlvo": "...",
      "estrategiaMarketing": "...",
      "roadmapLancamento": "...",
      "scriptAnuncios": "...",
      "scriptConteudoOrganico": "...",
      "promptBolt": "...",
      "formasMonetizacao": "...",
      "primeirosPassos": "...",
      "metasFinanceiras": "..."
    }
  ]
}`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Você é um especialista em geração de ideias de negócios lucrativas. Sempre responda em português do Brasil com informações práticas e acionáveis.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 16000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Erro da API OpenAI: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('Resposta vazia da API OpenAI');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Formato de resposta inválido da API OpenAI');
    }

    const resultado = JSON.parse(jsonMatch[0]);
    return resultado.ideias;
  } catch (error) {
    console.error('Erro ao gerar ideias:', error);
    throw error;
  }
}
