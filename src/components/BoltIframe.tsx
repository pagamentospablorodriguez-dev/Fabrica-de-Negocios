import { ArrowLeft, Copy, CheckCircle, Code, Zap, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface BoltIframeProps {
  prompt: string;
  onVoltar: () => void;
}

export default function BoltIframe({ prompt, onVoltar }: BoltIframeProps) {
  const [copiado, setCopiado] = useState(false);

  const copiarPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <button
          onClick={onVoltar}
          className="mb-8 flex items-center text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para as ideias
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl mb-6 shadow-lg">
            <Code className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Como Criar Seu Projeto no Bolt.new
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Siga o passo a passo abaixo para transformar sua ideia em realidade em minutos!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <Sparkles className="w-6 h-6 mr-3 text-orange-600" />
            O que é o Bolt.new?
          </h2>
          <div className="space-y-4 text-slate-700">
            <p className="leading-relaxed">
              O <strong>Bolt.new</strong> é uma ferramenta revolucionária de IA que cria aplicações web completas
              instantaneamente. Você simplesmente descreve o que quer, e a IA constrói o projeto inteiro para você -
              com código, design e funcionalidades prontas!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <Zap className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Rápido</h3>
                <p className="text-sm text-slate-600">Seu projeto pronto em minutos, não dias ou semanas</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <Code className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Profissional</h3>
                <p className="text-sm text-slate-600">Código limpo e design moderno, pronto para uso</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Fácil</h3>
                <p className="text-sm text-slate-600">Sem precisar saber programar, a IA faz tudo</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Passo a Passo Completo
          </h2>
          <div className="space-y-6">
            {[
              {
                numero: 1,
                titulo: 'Copie o Prompt',
                descricao: 'Clique no botão abaixo para copiar o prompt personalizado da sua ideia de negócio.'
              },
              {
                numero: 2,
                titulo: 'Acesse o Bolt.new',
                descricao: 'Abra o site bolt.new em uma nova aba. Se não tiver conta, crie uma gratuitamente (leva 30 segundos).'
              },
              {
                numero: 3,
                titulo: 'Cole o Prompt',
                descricao: 'Na caixa de texto do Bolt.new, cole o prompt que você copiou e pressione Enter.'
              },
              {
                numero: 4,
                titulo: 'Aguarde a Mágica',
                descricao: 'A IA do Bolt vai começar a criar seu projeto automaticamente. Você verá o código sendo escrito e o site sendo construído em tempo real!'
              },
              {
                numero: 5,
                titulo: 'Personalize se Quiser',
                descricao: 'Quando terminar, você pode pedir ajustes conversando com a IA. Ex: "Mude as cores para azul", "Adicione um botão de contato", etc.'
              },
              {
                numero: 6,
                titulo: 'Publique e Lance!',
                descricao: 'Com alguns cliques, você pode publicar seu projeto e ter um site profissional no ar, pronto para começar a vender!'
              }
            ].map((passo) => (
              <div key={passo.numero} className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center text-white font-bold mr-4">
                  {passo.numero}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{passo.titulo}</h3>
                  <p className="text-slate-600 leading-relaxed">{passo.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl shadow-xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Copy className="w-6 h-6 mr-3" />
            Seu Prompt Personalizado
          </h2>
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm mb-6 max-h-96 overflow-y-auto">
            <p className="text-sm leading-relaxed whitespace-pre-wrap font-mono">{prompt}</p>
          </div>
          <button
            onClick={copiarPrompt}
            className="w-full bg-white text-orange-600 font-semibold py-4 px-6 rounded-lg hover:bg-orange-50 transition-all flex items-center justify-center text-lg"
          >
            {copiado ? (
              <>
                <CheckCircle className="w-6 h-6 mr-2" />
                Prompt Copiado!
              </>
            ) : (
              <>
                <Copy className="w-6 h-6 mr-2" />
                Copiar Prompt
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Acesse o Bolt.new
          </h2>
          <p className="text-slate-700 mb-6 leading-relaxed">
            Depois de copiar o prompt, clique no botão abaixo para abrir o Bolt.new em uma nova aba.
            Cole o prompt lá e veja a mágica acontecer!
          </p>
          <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl text-lg"
          >
            <Zap className="w-6 h-6 mr-2" />
            Abrir Bolt.new
          </a>
        </div>

        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200">
          <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-green-600" />
            Por que o Bolt.new é Importante?
          </h3>
          <ul className="space-y-3">
            {[
              'Economiza meses de desenvolvimento e milhares de reais em custos',
              'Permite que qualquer pessoa, mesmo sem saber programar, crie projetos profissionais',
              'Você pode testar sua ideia de negócio rapidamente sem grandes investimentos',
              'O código gerado é moderno, otimizado e pronto para escalar',
              'Você pode fazer ajustes e melhorias conversando com a IA em linguagem natural',
              'É perfeito para criar MVPs (Produtos Mínimos Viáveis) e validar ideias no mercado'
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
