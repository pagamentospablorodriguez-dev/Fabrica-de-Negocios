exports.handler = async (event, context) => {
    const OPENAI_API_KEY = process.env.A_OPENAI_API_KEY;
    const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

    if (!OPENAI_API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro do Servidor: A chave da API OpenAI não foi encontrada. Verifique as variáveis de ambiente no Netlify.' })
        };
    }

    if (event.httpMethod !== 'POST' || !event.body) {
        return { statusCode: 400, body: 'Método não suportado ou corpo da requisição vazio.' };
    }

    let formData;
    try {
        formData = JSON.parse(event.body);
    } catch (e) {
        return { statusCode: 400, body: 'Formato JSON da requisição inválido.' };
    }

    const randomVariation = Math.floor(Math.random() * 1000);

    const prompt = `Você é um especialista em negócios. Com base nas informações abaixo, gere EXATAMENTE 1 ideia de negócio COMPLETA e PRONTA para lançar. Variação: ${randomVariation}

Área de Interesse: ${formData.areaInteresse}
Tempo Disponível: ${formData.tempoDisponivel}
Investimento Disponível: ${formData.investimento}
Tipo de Negócio: ${formData.tipoNegocio}
Habilidades: ${formData.habilidades}
Objetivo Financeiro: ${formData.objetivoFinanceiro}

Para esta ideia, forneça:
1. Nome da Marca (criativo e profissional)
2. Promessa (proposta de valor única)
3. Análise de Viabilidade (prós, contras, potencial)
4. Como Viralizar (estratégias específicas)
5. Público-Alvo (definição clara)
6. Estratégia de Marketing (plano prático)
7. Roadmap de Lançamento (cronograma 90 dias)
8. Script de Anúncios (2 exemplos prontos)
9. Script de Conteúdo Orgânico (3 ideias)
10. Prompt para Bolt (prompt técnico e detalhado)
11. Formas de Monetização (3+ formas)
12. Primeiros Passos (ações concretas hoje)
13. Metas Financeiras (projeção 3, 6, 12 meses)

Seja extremamente específico, prático e viável. Responda APENAS com um JSON válido:
{
  "ideia": {
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
                response_format: { type: "json_object" },
                messages: [
                    {
                        role: 'system',
                        content: 'Você é um especialista em geração de ideias de negócios lucrativas e escaláveis. Responda APENAS com o JSON solicitado, sem texto explicativo ou Markdown. Seja extremamente detalhado e específico em cada seção.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.9,
                max_tokens: 12000,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                statusCode: response.status,
                body: JSON.stringify({
                    error: `Erro da API OpenAI (${response.status}): Ocorreu um problema na chamada à API.`,
                    details: errorData
                })
            };
        }

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };

    } catch (error) {
        console.error('Erro na função Netlify:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro interno do servidor ao processar a requisição.' })
        };
    }
};
