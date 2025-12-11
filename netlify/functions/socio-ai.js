// netlify/functions/socio-ai.js

exports.handler = async (event, context) => {
    const OPENAI_API_KEY = process.env.A_OPENAI_API_KEY;
    const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

    if (!OPENAI_API_KEY ) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Chave da API não configurada.' }) };
    }
    if (event.httpMethod !== 'POST' || !event.body ) {
        return { statusCode: 400, body: 'Requisição inválida.' };
    }

    try {
        const { pergunta, ideia, historico } = JSON.parse(event.body);

        const systemPrompt = `Você é o "Sócio AI", um consultor de negócios de elite, direto e prático. Seu único objetivo é ajudar o usuário a transformar a ideia dele em um negócio lucrativo, rápido. Seu lema é "começar hoje, aplicar hoje, ter resultado hoje". Seja direto, sem rodeios, e dê conselhos acionáveis.

A ideia em discussão é:
- Nome da Marca: ${ideia.nomeMarca}
- Promessa: ${ideia.promessa}
- Detalhes Completos: ${JSON.stringify(ideia, null, 2)}

Use o histórico da conversa para manter o contexto. A pergunta atual do usuário é: "${pergunta}"`;

        // Formata o histórico para a API da OpenAI
        const messages = historico.map(msg => ({
            role: msg.autor === 'ai' ? 'assistant' : 'user',
            content: msg.texto
        }));

        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...messages, // Adiciona o histórico
                    { role: 'user', content: pergunta } // Adiciona a pergunta atual
                ],
                temperature: 0.7,
                max_tokens: 1000,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Erro da API OpenAI:', errorData);
            return { statusCode: response.status, body: JSON.stringify({ error: 'Erro na API da OpenAI.' }) };
        }

        const data = await response.json();
        return { statusCode: 200, body: JSON.stringify(data) };

    } catch (error) {
        console.error('Erro na função socio-ai:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Erro interno do servidor.' }) };
    }
};
