// netlify/functions/gerar-ideias.js

// É preciso usar require('node-fetch') se estiver usando Node.js anterior ao 18. 
// Para Netlify Functions recentes (Node 18+), o fetch nativo funciona. Vamos usar o fetch padrão.

exports.handler = async (event, context) => {
    // 1. Acessar a variável de ambiente SECRETA do Netlify
    const OPENAI_API_KEY = process.env.A_OPENAI_API_KEY; 
    const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

    if (!OPENAI_API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro do Servidor: A chave da API OpenAI não foi encontrada. Verifique as variáveis de ambiente no Netlify.' })
        };
    }

    // 2. Validar o método e extrair o corpo
    if (event.httpMethod !== 'POST' || !event.body) {
        return { statusCode: 400, body: 'Método não suportado ou corpo da requisição vazio.' };
    }

    let formData;
    try {
        formData = JSON.parse(event.body);
    } catch (e) {
        return { statusCode: 400, body: 'Formato JSON da requisição inválido.' };
    }

    // 3. Reconstruir o Prompt COMPLETO com base no formData recebido
    const prompt = `Você é um especialista em negócios e empreendedorismo. Com base nas informações abaixo, gere EXATAMENTE 2 ideias de negócios COMPLETAS e PRONTAS para lançar:

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

    // 4. Fazer a requisição à API da OpenAI
    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`, // Usa a chave secreta aqui
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
            return {
                statusCode: response.status,
                body: JSON.stringify({ 
                    error: `Erro da API OpenAI (${response.status}): Ocorreu um problema na chamada à API.`, 
                    details: errorData 
                })
            };
        }

        const data = await response.json();

        // 5. Retornar a resposta da OpenAI para o frontend
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
