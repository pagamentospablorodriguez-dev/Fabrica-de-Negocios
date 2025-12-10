# Fábrica de Negócios

Uma ferramenta completa e profissional para gerar ideias de negócios prontas para lançar, com o poder da IA.

## Sobre o Projeto

A **Fábrica de Negócios** é um SAAS que ajuda empreendedores a criar negócios lucrativos do zero. Com base em informações personalizadas, a ferramenta gera 10 ideias completas de negócios, cada uma com:

- Nome da marca
- Proposta de valor única
- Análise de viabilidade detalhada
- Estratégias para viralizar
- Público-alvo definido
- Plano de marketing completo
- Roadmap de lançamento passo a passo
- Scripts de anúncios prontos
- Ideias de conteúdo orgânico
- Prompt completo para criar no Bolt.new
- Múltiplas formas de monetização
- Primeiros passos acionáveis
- Projeção financeira realista

## Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Vite** - Build tool
- **Supabase** - Banco de dados
- **OpenAI GPT-4o Mini** - Inteligência Artificial
- **Lucide React** - Ícones

## Configuração

### 1. Configure a API da OpenAI

Edite o arquivo `.env` e adicione sua chave da API da OpenAI:

```

```

Para obter sua chave da API:
1. Acesse [platform.openai.com](https://platform.openai.com)
2. Faça login ou crie uma conta
3. Vá em "API Keys"
4. Clique em "Create new secret key"
5. Copie a chave e cole no arquivo `.env`

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute o projeto

```bash
npm run dev
```

## Deploy no Netlify

Para fazer deploy no Netlify:

1. Conecte seu repositório ao Netlify
2. Configure as variáveis de ambiente:
   - `VITE_OPENAI_API_KEasYsas`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Comando de build: `npm run build`
4. Diretório de publicação: `dist`

## Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── FormularioEntrada.tsx    # Formulário de entrada
│   ├── ResultadosIdeias.tsx     # Exibição das ideias
│   ├── BoltIframe.tsx           # Instruções do Bolt.new
│   └── Loading.tsx              # Tela de carregamento
├── services/           # Serviços
│   └── openai.ts              # Integração com OpenAI
├── lib/                # Bibliotecas
│   └── supabase.ts            # Cliente Supabase
├── types.ts            # Tipos TypeScript
├── App.tsx             # Componente principal
└── main.tsx            # Ponto de entrada
```

## Como Usar

1. Preencha o formulário com suas informações:
   - Área de interesse
   - Tempo disponível
   - Investimento disponível
   - Tipo de negócio desejado
   - Suas habilidades
   - Objetivo financeiro

2. Clique em "Gerar 10 Ideias de Negócios Agora!"

3. Aguarde enquanto a IA analisa suas informações (30-60 segundos)

4. Explore as 10 ideias geradas com todos os detalhes

5. Escolha uma ideia e clique em "Ver Como Criar no Bolt.new"

6. Copie o prompt e use no Bolt.new para criar seu projeto

## Suporte

Para dúvidas ou sugestões, entre em contato.

## Licença

Propriedade privada - Todos os direitos reservados.
