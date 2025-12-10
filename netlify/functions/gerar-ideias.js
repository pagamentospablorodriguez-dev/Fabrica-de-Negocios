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
    const timestamp = Date.now();

    const prompt = `Você é um especialista em negócios e empreendedorismo com mais de 20 anos de experiência. Com base nas informações abaixo, gere EXATAMENTE 1 ideia de negócio COMPLETA, ÚNICA, INOVADORA e PRONTA para lançar:

📋 PERFIL DO EMPREENDEDOR:
• Área de Interesse: ${formData.areaInteresse}
• Tempo Disponível: ${formData.tempoDisponivel}
• Investimento Disponível: ${formData.investimento}
• Tipo de Negócio: ${formData.tipoNegocio}
• Habilidades: ${formData.habilidades}
• Objetivo Financeiro: ${formData.objetivoFinanceiro}

🎲 Seed de Variação: ${randomSeed}-${timestamp}

⚠️ IMPORTANTE: Esta ideia precisa ser TOTALMENTE DIFERENTE de qualquer outra que você já tenha gerado. Seja criativo, inovador e único. Evite clichês e ideias genéricas.

📝 ESTRUTURA COMPLETA DA RESPOSTA:

1️⃣ NOME DA MARCA:
- Crie um nome memorável, único e profissional
- Deve ser fácil de pronunciar e lembrar
- Idealmente disponível como domínio .com
- Evite nomes genéricos ou muito comuns

2️⃣ PROMESSA (Proposta de Valor):
- Uma frase poderosa e impactante (máximo 2 linhas)
- Deixe claro o principal benefício/transformação
- Use linguagem emocional que conecte com o público
- Exemplo: "Transforme suas ideias em negócios lucrativos em 30 dias, mesmo sem experiência"

3️⃣ ANÁLISE DE VIABILIDADE:
Faça uma análise detalhada incluindo:
✅ PONTOS FORTES (mínimo 4):
- Por que esta ideia tem potencial de sucesso?
- Quais tendências de mercado favorecem este negócio?
- Quais são as vantagens competitivas?

⚠️ DESAFIOS E COMO SUPERÁ-LOS (mínimo 3):
- Liste os principais obstáculos
- Para cada obstáculo, dê uma solução prática e específica

💰 POTENCIAL DE LUCRO:
- Estimativa realista de faturamento nos primeiros 6 meses
- Margem de lucro esperada
- Scalabilidade do negócio (como crescer 10x)

4️⃣ COMO VIRALIZAR:
Crie um plano de 5 estratégias ESPECÍFICAS e PRÁTICAS:
1. [Estratégia específica com exemplo de execução]
2. [Estratégia específica com exemplo de execução]
3. [Continue até 5 estratégias...]

Para cada estratégia:
- Explique EXATAMENTE como fazer
- Dê exemplos concretos
- Inclua métricas esperadas
- Mencione ferramentas específicas a usar

5️⃣ PÚBLICO-ALVO:
Defina com MÁXIMO DETALHE:
👤 PERSONA PRINCIPAL:
- Nome fictício, idade, profissão
- Renda mensal, estado civil
- Dores e frustrações específicas
- Sonhos e objetivos
- Onde passa o tempo online
- Objeções comuns e como contorná-las

👥 PÚBLICO SECUNDÁRIO (se aplicável):
- Descreva de forma resumida

6️⃣ ESTRATÉGIA DE MARKETING COMPLETA:
Organize por canais e fases:

📱 FASE 1 - LANÇAMENTO (Primeiros 30 dias):
- Canal 1: [Ações específicas + orçamento + resultados esperados]
- Canal 2: [Ações específicas + orçamento + resultados esperados]
- Canal 3: [Continue...]

📈 FASE 2 - CRESCIMENTO (31-90 dias):
- [Estratégias de escala]

🚀 FASE 3 - EXPANSÃO (3-12 meses):
- [Estratégias de domínio de mercado]

7️⃣ ROADMAP DE LANÇAMENTO (90 DIAS):
Crie um cronograma DIA A DIA detalhado:

🗓️ SEMANA 1-2: VALIDAÇÃO E PREPARAÇÃO
Dia 1: [Tarefa específica com passo a passo]
Dia 2: [Tarefa específica com passo a passo]
[Continue até completar 14 dias...]

🗓️ SEMANA 3-4: CONSTRUÇÃO
[Continue o formato...]

🗓️ SEMANA 5-8: PRÉ-LANÇAMENTO
[Continue o formato...]

🗓️ SEMANA 9-12: LANÇAMENTO E OTIMIZAÇÃO
[Continue o formato...]

8️⃣ SCRIPTS DE ANÚNCIOS (3 EXEMPLOS COMPLETOS):

📢 ANÚNCIO 1 - PROBLEMA/SOLUÇÃO:
Título: [Máximo 40 caracteres, impactante]
Texto Principal: [150-200 palavras, storytelling envolvente]
Call-to-Action: [Frase de ação clara]
Imagem Sugerida: [Descrição detalhada]

📢 ANÚNCIO 2 - TRANSFORMAÇÃO:
[Mesmo formato...]

📢 ANÚNCIO 3 - PROVA SOCIAL:
[Mesmo formato...]

9️⃣ CONTEÚDO ORGÂNICO (5 IDEIAS DETALHADAS):

📱 POST/VÍDEO 1:
Formato: [Carrossel/Vídeo/Imagem]
Tema: [Tema específico]
Hook/Gancho: [Primeira frase que prende atenção]
Estrutura Completa: [Bullet points ou roteiro completo]
Hashtags: [15-20 hashtags estratégicas]

[Continue até 5 posts...]

🔟 PROMPT PARA BOLT.NEW:
Escreva um prompt SUPER DETALHADO e TÉCNICO que inclua:

"Crie um [tipo de aplicação] completo e profissional chamado [nome] para [propósito específico].

🎨 DESIGN E LAYOUT:
- Estilo visual: [Descrever detalhadamente: moderno/minimalista/luxuoso/etc]
- Paleta de cores: [Cores primárias, secundárias, acentos - com códigos hex]
- Tipografia: [Fontes sugeridas]
- Componentes principais: [Header, hero section, etc - descrever cada um]

⚙️ FUNCIONALIDADES ESSENCIAIS:
1. [Funcionalidade 1 - descrição técnica detalhada]
2. [Funcionalidade 2 - descrição técnica detalhada]
[Continue até listar todas...]

📱 PÁGINAS/SEÇÕES:
1. Página Inicial: [Descrição completa do conteúdo e layout]
2. [Outras páginas...]

🔧 TECNOLOGIAS:
- Frontend: [React, Vue, etc]
- Backend: [Se necessário]
- Banco de dados: [Se necessário]
- APIs: [Se necessário]

📝 CONTEÚDO:
[Exemplos de textos, CTAs, títulos que devem aparecer]

🎯 CONVERSÃO:
[Elementos de conversão: formulários, botões, pop-ups, etc]"

1️⃣1️⃣ FORMAS DE MONETIZAÇÃO (Mínimo 5):

💵 MONETIZAÇÃO 1: [Nome da estratégia]
Como implementar: [Passo a passo detalhado]
Potencial de receita: [Valor estimado mensal]
Tempo para implementar: [Prazo realista]
Dificuldade: [Fácil/Média/Difícil]

[Continue até 5 formas diferentes...]

BÔNUS - Estratégias Avançadas:
[Formas adicionais de monetizar quando escalar]

1️⃣2️⃣ PRIMEIROS PASSOS (Checklist para HOJE):

✅ HORA 1:
[ ] Tarefa 1: [Descrição específica]
[ ] Tarefa 2: [Descrição específica]

✅ HORA 2-3:
[ ] [Continue...]

✅ RESTO DO DIA:
[ ] [Continue...]

📋 AMANHÃ:
[Lista de tarefas prioritárias]

📋 ESTA SEMANA:
[Marcos importantes a atingir]

1️⃣3️⃣ METAS FINANCEIRAS (Projeção Realista):

📊 MÊS 1-3 (VALIDAÇÃO):
• Receita esperada: R$ [valor] - R$ [valor]
• Principais fontes: [Listar]
• Custos operacionais: R$ [valor]
• Lucro líquido: R$ [valor]
• KPIs principais: [Métricas a acompanhar]

📊 MÊS 4-6 (CRESCIMENTO):
[Mesmo formato...]

📊 MÊS 7-12 (ESCALA):
[Mesmo formato...]

🎯 MARCOS IMPORTANTES:
• [Meta concreta com prazo]
• [Meta concreta com prazo]

REGRAS CRÍTICAS:
✅ Seja EXTREMAMENTE específico em TODAS as seções
✅ Use números, dados e exemplos reais sempre que possível
✅ Evite abstrações e generalidades - seja PRÁTICO
✅ Todas as ideias devem ser VIÁVEIS com o perfil do usuário
✅ Foque em negócios que podem gerar resultado nos primeiros 90 dias
✅ As estratégias devem ser aplicáveis IMEDIATAMENTE
✅ Seja INOVADOR - evite ideias batidas e comuns
✅ Pense fora da caixa, mas mantenha viabilidade

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
                        content: 'Você é um especialista em geração de ideias de negócios lucrativas e escaláveis com mais de 20 anos de experiência. Você DEVE responder APENAS com o objeto JSON solicitado, sem texto explicativo, sem Markdown, e sem caracteres extras. Seja extremamente detalhado, específico e inovador em cada seção. Cada ideia que você gera deve ser ÚNICA e DIFERENTE das anteriores. Use sua criatividade máxima para surpreender.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 1.0,
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
