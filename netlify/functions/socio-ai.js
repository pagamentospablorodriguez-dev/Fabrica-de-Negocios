// netlify/functions/socio-ai.js

exports.handler = async (event, context) => {
    const OPENAI_API_KEY = process.env.A_OPENAI_API_KEY;
    // ... (validações de API Key e método POST)

    const { historicoConversa, ideia, pergunta } = JSON.parse(event.body);

    const prompt = `Você é o "Sócio AI", um consultor de negócios ultra-especialista. Seu tom é direto, prático e focado em resultados rápidos, alinhado ao lema "começar hoje, aplicar hoje, ter resultado hoje".

    A ideia de negócio em discussão é:
    - Nome: ${ideia.nomeMarca}
    - Promessa: ${ideia.promessa}
    - Detalhes: ${JSON.stringify(ideia, null, 2)}

    O usuário fez a seguinte pergunta: "${pergunta}"

    Responda de forma clara, objetiva e acionável. Use o histórico da conversa para manter o contexto. Dê conselhos que podem ser aplicados imediatamente.`;

    // Lógica para chamar a API da OpenAI com o histórico da conversa
    // ...

    return {
        statusCode: 200,
        body: JSON.stringify(data), // Resposta da OpenAI
    };
};
