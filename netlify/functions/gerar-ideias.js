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

    const prompt = `Você é um especialista em negócios e empreendedorismo. Com base nas informações abaixo, gere EXATAMENTE 1 ideia de negócio COMPLETA, DETALHADA e PRONTA para lançar:

Área de Interesse: ${formData.areaInteresse}
Tempo Disponível: ${formData.tempoDisponivel}
Investimento Disponível: ${formData.investimento}
Tipo de Negócio: ${formData.tipoNegocio}
Habilidades: ${formData.habilidades}
Objetivo Financeiro: ${formData.objetivoFinanceiro}

Para a ideia, forneça:
1. Nome da Marca (criativo, memorável e profissional - pense em algo que soa premium e confiável)
2. Promessa (proposta de valor única, impactante e que resolve uma dor específica do cliente)
3. Análise de Viabilidade (análise MUITO detalhada com prós, contras, riscos, oportunidades, análise de mercado, concorrência e potencial de lucro)
4. Como Viralizar (estratégias ESPECÍFICAS e PRÁTICAS com exemplos reais, tendências atuais, gatilhos emocionais e táticas comprovadas)
5. Público-Alvo (definição CLARA e SEGMENTADA com dados demográficos, psicográficos, dores, desejos, onde estão online e offline)
6. Estratégia de Marketing (plano COMPLETO e DETALHADO com canais específicos, táticas, frequência, tipos de conteúdo, orçamento sugerido e cronograma)
7. Roadmap de Lançamento (cronograma PASSO A PASSO e DETALHADO dos primeiros 90 dias com ações diárias/semanais específicas e marcos importantes)
8. Script de Anúncios (3 exemplos COMPLETOS e PRONTOS para usar em Facebook/Instagram Ads com headline, corpo do texto, call-to-action e orientações de imagem)
9. Script de Conteúdo Orgânico (7 ideias DETALHADAS de posts/vídeos para redes sociais com descrição completa, hashtags sugeridas e melhor horário para postar)
10. Prompt para Bolt (prompt EXTREMAMENTE COMPLETO e DETALHADO para criar o projeto no Bolt.new - seja MUITO específico sobre funcionalidades, design, cores, tecnologias, páginas, componentes, integrações e experiência do usuário)
11. Formas de Monetização (pelo menos 7 formas DIFERENTES e PRÁTICAS com descrição detalhada de como implementar cada uma e potencial de lucro)
12. Primeiros Passos (lista DETALHADA de ações para começar HOJE com ordem de prioridade, tempo estimado e recursos necessários)
13. Metas Financeiras (projeção REALISTA e DETALHADA de ganhos nos primeiros 3, 6 e 12 meses com explicação de como chegar nesses números e principais fontes de receita)

IMPORTANTE:
- Seja EXTREMAMENTE específico, detalhado e prático em TODAS as seções
- A ideia deve ser VIÁVEL, LUCRATIVA e com potencial de gerar resultado RÁPIDO
- Todas as estratégias devem ser aplicáveis IMEDIATAMENTE sem precisar de conhecimento técnico avanço
- O prompt para o Bolt deve ser tão completo que gere um projeto funcional e profissional
- Forneça exemplos concretos, números específicos e ações práticas em cada seção
- Pense em tendências atuais do mercado e oportunidades emergentes
- Seja criativo mas realista - a pessoa precisa poder executar isso

Responda APENAS com um JSON válido no seguinte formato:
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
                        content: 'Você é um especialista em geração de ideias de negócios lucrativas e escaláveis. Você DEVE responder APENAS com o objeto JSON solicitado, sem texto explicativo, sem Markdown, e sem caracteres extras. Seja extremamente detalhado e específico em cada seção.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.9,
                max_tokens: 16000,
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
