// netlify/functions/gerar-ideias.js

exports.handler = async (event, context) => {
    const OPENAI_API_KEY = process.env.A_OPENAI_API_KEY;
    const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

    if (!OPENAI_API_KEY ) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro do Servidor: A chave da API OpenAI não foi encontrada. Verifique as variáveis de ambiente no Netlify.' })
        };
    }

    if (event.httpMethod !== 'POST' || !event.body ) {
        return { statusCode: 400, body: 'Método não suportado ou corpo da requisição vazio.' };
    }

    let formData;
    try {
        formData = JSON.parse(event.body);
    } catch (e) {
        return { statusCode: 400, body: 'Formato JSON da requisição inválido.' };
    }

    // --- INÍCIO DA ALTERAÇÃO ---

    // Extrai as ideias anteriores do corpo da requisição para evitar repetições.
    const ideiasAnteriores = formData.ideiasAnteriores || [];
    const contextoIdeias = ideiasAnteriores.length > 0
        ? `\nIMPORTANTE: As seguintes ideias já foram geradas para este usuário: "${ideiasAnteriores.join('", "')}". Sua tarefa é gerar uma ideia COMPLETAMENTE NOVA, que não seja uma simples variação das anteriores. Pense em um ângulo, nicho ou modelo de negócio totalmente diferente.`
        : '';

    // Adiciona uma variação aleatória para garantir mais originalidade.
    const randomVariation = Math.floor(Math.random() * 1000);

    const prompt = `Você é um especialista em negócios e inovação, focado em criar ideias práticas e lucrativas que podem ser iniciadas rapidamente. O lema é "começar hoje, aplicar hoje, ter resultado hoje".

Com base nas informações abaixo, gere EXATAMENTE 1 ideia de negócio COMPLETA e PRONTA para lançar.
Variação aleatória para inspiração: ${randomVariation}.${contextoIdeias}

**Dados do Usuário:**
- Área de Interesse: ${formData.areaInteresse}
- Tempo Disponível: ${formData.tempoDisponivel}
- Investimento Disponível: ${formData.investimento}
- Tipo de Negócio: ${formData.tipoNegocio}
- Habilidades: ${formData.habilidades}
- Objetivo Financeiro: ${formData.objetivoFinanceiro}

**Estrutura da Resposta (JSON):**
Para esta nova ideia, forneça:
1.  **Nome da Marca:** Criativo, profissional e memorável.
2.  **Promessa:** A proposta de valor única e irresistível.
3.  **Análise de Viabilidade:** Prós, contras e o potencial real de mercado.
4.  **Como Viralizar:** Estratégias de marketing de guerrilha e digitais para crescimento rápido.
5.  **Público-Alvo:** Definição clara da persona ideal.
6.  **Estratégia de Marketing:** Um plano prático e acionável.
7.  **Roadmap de Lançamento:** Cronograma detalhado para os primeiros 90 dias.
8.  **Script de Anúncios:** 2 exemplos prontos para usar (um para Instagram/Facebook, outro para Google Ads).
9.  **Script de Conteúdo Orgânico:** 3 ideias de posts/vídeos para redes sociais.
10. **Prompt para Bolt:** Um prompt técnico e detalhado para criar o MVP no bolt.new.
11. **Formas de Monetização:** Pelo menos 3 formas claras de gerar receita.
12. **Primeiros Passos:** Ações concretas que o usuário pode executar HOJE.
13. **Metas Financeiras:** Projeção realista para 3, 6 e 12 meses.

Seja extremamente específico, prático e viável. Responda APENAS com um JSON válido no seguinte formato:
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

    // --- FIM DA ALTERAÇÃO ---

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
                        content: 'Você é um especialista em geração de ideias de negócios lucrativas e escaláveis. Responda APENAS com o JSON solicitado, sem texto explicativo ou Markdown. Seja extremamente detalhado e específico em cada seção, seguindo a estrutura pedida.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.95, // Aumentei um pouco a temperatura para mais criatividade
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
