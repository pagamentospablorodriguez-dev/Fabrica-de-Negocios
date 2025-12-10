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

    const randomSeed = Math.random().toString(36).substring(7);

    const prompt = `Gere EXATAMENTE 1 ideia de negócio ÚNICA, DIFERENTE e VIÁVEL baseada neste perfil:

PERFIL:
- Área: ${formData.areaInteresse}
- Tempo: ${formData.tempoDisponivel}
- Investimento: ${formData.investimento}
- Tipo: ${formData.tipoNegocio}
- Habilidades: ${formData.habilidades}
- Objetivo: ${formData.objetivoFinanceiro}

VARIAÇÃO: ${randomSeed}

⚠️ CRÍTICO: Gere uma ideia TOTALMENTE DIFERENTE de qualquer outra anterior. Seja criativo e inovador!

ESTRUTURA DA RESPOSTA (seja conciso mas detalhado):

1. NOME DA MARCA - Nome único e memorável

2. PROMESSA - Uma frase impactante com o principal benefício

3. ANÁLISE DE VIABILIDADE - Organize assim:
✅ 4 PONTOS FORTES (por que funciona?)
⚠️ 3 DESAFIOS + COMO RESOLVER CADA UM
💰 Potencial de lucro e margem esperada

4. COMO VIRALIZAR - 5 estratégias específicas com exemplos práticos

5. PÚBLICO-ALVO - Descreva a persona principal em detalhes (idade, profissão, dores, onde fica online)

6. ESTRATÉGIA DE MARKETING - Organize por FASES:
📱 FASE 1 (30 dias): Ações específicas por canal
📈 FASE 2 (31-90 dias): Estratégia de crescimento
🚀 FASE 3 (3-12 meses): Escala

7. ROADMAP DE LANÇAMENTO - Passo a passo realista dos primeiros 90 dias com tarefas específicas por semana

8. SCRIPTS DE ANÚNCIOS - 2 exemplos completos (não 3) com título, texto e CTA

9. CONTEÚDO ORGÂNICO - 3 ideias de posts (não 5) com tema, hook e estrutura

10. PROMPT PARA BOLT - Um prompt TÉCNICO e DETALHADO explicando design, funcionalidades, tecnologias e páginas

11. FORMAS DE MONETIZAÇÃO - 4 estratégias (não 5) com como implementar e receita estimada

12. PRIMEIROS PASSOS - Checklist prático de tarefas para começar hoje e esta semana

13. METAS FINANCEIRAS - Projeção para 3, 6 e 12 meses com receita esperada, custos e lucro

REGRAS:
✅ Seja ESPECÍFICO e PRÁTICO em tudo
✅ Use exemplos reais e números
✅ Ideias devem ser VIÁVEIS com o perfil do usuário
✅ Foco em resultados nos primeiros 90 dias
✅ Pense fora da caixa - EVITE ideias genéricas/batidas
✅ Cada resposta deve ser DIFERENTE da anterior

Responda APENAS com este JSON:
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
                        content: 'Você é um especialista em empreendedorismo. Responda APENAS com JSON válido, sem explicações extras. Seja direto, específico e inovador. Cada ideia deve ser ÚNICA e DIFERENTE das anteriores.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.95,
                max_tokens: 14000,
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
