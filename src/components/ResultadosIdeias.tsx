import { IdeiaComId, FormData } from '../types';
import {
  Sparkles, Target, TrendingUp, Megaphone, Users,
  Calendar, MessageSquare, Video, Code, DollarSign,
  CheckCircle, Lightbulb, ArrowLeft, Zap, Rocket, Plus
} from 'lucide-react';
import { useState } from 'react';
import BoltIframe from './BoltIframe';
import Footer from './Footer';

interface ResultadosIdeiasProps {
  ideias: IdeiaComId[];
  formData: FormData;
  sessionId: string;
  onVoltar: () => void;
  onGerarMais: () => void;
  loadingNovaIdeia: boolean;
}

export default function ResultadosIdeias({ 
  ideias, 
  formData,
  sessionId,
  onVoltar, 
  onGerarMais,
  loadingNovaIdeia
}: ResultadosIdeiasProps) {
  const [ideiaExpandida, setIdeiaExpandida] = useState<number | null>(0);
  const [mostrarBolt, setMostrarBolt] = useState(false);
  const [promptSelecionado, setPromptSelecionado] = useState('');

  const toggleIdeia = (index: number) => {
    setIdeiaExpandida(ideiaExpandida === index ? null : index);
  };

  const abrirBolt = (prompt: string) => {
    setPromptSelecionado(prompt);
    setMostrarBolt(true);
  };

  if (mostrarBolt) {
    return <BoltIframe prompt={promptSelecionado} onVoltar={() => setMostrarBolt(false)} />;
  }

  return (
    <>
      <div className="min-h-screen bg-luxury-black">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <button
            onClick={onVoltar}
            className="mb-8 flex items-center text-gray-400 hover:text-luxury-gold transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao formulário
          </button>

          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img src="/fnl.png" alt="Logo" className="h-52 w-auto" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              {ideias.length === 1 ? 'Sua Ideia Está Pronta!' : `${ideias.length} Ideias Geradas!`}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {ideias.length === 1 
                ? 'Sua ideia completa está pronta. Leia tudo com atenção e, se quiser mais opções, gere outra ideia!' 
                : 'Você já tem várias opções! Escolha a que mais te empolga ou continue gerando mais ideias.'}
            </p>
          </div>

          <div className="space-y-6">
            {ideias.map((ideia, index) => (
              <div
                key={ideia.id}
                className="bg-luxury-dark rounded-2xl luxury-shadow-lg luxury-border overflow-hidden transition-all hover:luxury-shadow-xl"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleIdeia(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center justify-center w-10 h-10 gold-gradient rounded-lg text-luxury-black font-bold mr-4">
                          {index + 1}
                        </span>
                        <h2 className="text-2xl font-bold text-white">{ideia.nomeMarca}</h2>
                    </div>
                      <p className="text-lg text-gray-300 ml-14 mb-4">{ideia.promessa}</p>
                    </div>
                    <button className="ml-4 p-2 hover:bg-luxury-black rounded-lg transition-colors">
                      <svg
                        className={`w-6 h-6 text-luxury-gold transition-transform ${ideiaExpandida === index ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {ideiaExpandida === index && (
                  <div className="border-t luxury-border p-6 bg-luxury-black">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <SecaoIdeia
                        icon={<Target className="w-5 h-5 text-luxury-gold" />}
                        titulo="Análise de Viabilidade"
                        conteudo={ideia.analiseViabilidade} 
                      />

                      <SecaoIdeia
                        icon={<TrendingUp className="w-5 h-5 text-luxury-gold" />}
                        titulo="Como Viralizar"
                        conteudo={ideia.comoViralizar}
                      />

                      <SecaoIdeia
                        icon={<Users className="w-5 h-5 text-luxury-gold" />}
                        titulo="Público-Alvo"
                        conteudo={ideia.publicoAlvo}
                      />

                      <SecaoIdeia
                        icon={<Megaphone className="w-5 h-5 text-luxury-gold" />}
                        titulo="Estratégia de Marketing"
                        conteudo={ideia.estrategiaMarketing}
                      />

                      <SecaoIdeia
                        icon={<Calendar className="w-5 h-5 text-luxury-gold" />}
                        titulo="Roadmap de Lançamento"
                        conteudo={ideia.roadmapLancamento}
                      />

                      <SecaoIdeia
                        icon={<MessageSquare className="w-5 h-5 text-luxury-gold" />}
                        titulo="Scripts de Anúncios"
                        conteudo={ideia.scriptAnuncios}
                      />

                      <SecaoIdeia
                        icon={<Video className="w-5 h-5 text-luxury-gold" />}
                        titulo="Conteúdo Orgânico"
                        conteudo={ideia.scriptConteudoOrganico}
                      />

                      <SecaoIdeia
                        icon={<DollarSign className="w-5 h-5 text-luxury-gold" />}
                        titulo="Formas de Monetização"
                        conteudo={ideia.formasMonetizacao}
                      />

                      <SecaoIdeia
                        icon={<CheckCircle className="w-5 h-5 text-luxury-gold" />}
                        titulo="Primeiros Passos"
                        conteudo={ideia.primeirosPassos}
                      />

                      <SecaoIdeia
                        icon={<TrendingUp className="w-5 h-5 text-luxury-gold" />}
                        titulo="Metas Financeiras"
                        conteudo={ideia.metasFinanceiras}
                      />
                    </div>

                    <div className="mt-6 p-6 gold-gradient rounded-xl text-luxury-black">
                      <div className="flex items-center mb-4">
                        <Code className="w-6 h-6 mr-3" />
                        <h3 className="text-xl font-bold">Prompt para Criar no Bolt</h3>
                      </div>
                      <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm mb-4 max-h-64 overflow-y-auto">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{ideia.promptBolt}</p>
                      </div>
                      <button
                        onClick={() => abrirBolt(ideia.promptBolt)}
                        className="w-full bg-luxury-black text-luxury-gold font-semibold py-3 px-6 rounded-lg hover:bg-luxury-darker transition-all flex items-center justify-center border luxury-border"
                      >
                        <Lightbulb className="w-5 h-5 mr-2" />
                        Ver Como Criar no Bolt.new
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loadingNovaIdeia && (
              <div className="bg-luxury-dark rounded-2xl luxury-shadow-lg luxury-border p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin"></div>
                    <Sparkles className="w-8 h-8 text-luxury-gold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-2">
                  Gerando Mais Uma Ideia...
                </h3>
                <p className="text-gray-400 text-center">
                  Criando uma nova oportunidade de negócio para você
                </p>
                <div className="w-full bg-luxury-darker rounded-full h-2 overflow-hidden border luxury-border mt-6">
                  <div className="gold-gradient h-full rounded-full animate-progress"></div>
                </div>
              </div>
            )}
          </div>

          {!loadingNovaIdeia && (
            <div className="mt-8">
              <button
                onClick={onGerarMais}
                className="w-full gold-gradient text-luxury-black font-semibold py-4 px-6 rounded-lg hover:opacity-90 transition-all luxury-shadow-lg flex items-center justify-center text-lg"
              >
                <Plus className="w-6 h-6 mr-2" />
                Gerar Mais Uma Ideia
              </button>
            </div>
          )}

          <div className="mt-12 bg-gradient-to-r from-luxury-dark to-luxury-darker rounded-2xl p-8 luxury-border luxury-shadow-lg">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 gold-gradient rounded-2xl flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-luxury-black" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Hora de Colocar em Prática!
                </h3>
                <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                  Você tem {ideias.length} {ideias.length === 1 ? 'ideia completa' : 'ideias completas'} com tudo que precisa para começar. 
                  <strong className="text-luxury-gold"> Não fique preso no planejamento!</strong> Escolha a ideia que mais te empolga e comece AGORA.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-luxury-black/50 rounded-lg p-4 border border-luxury-gold/20">
                    <Zap className="w-6 h-6 text-luxury-gold mb-2" />
                    <h4 className="font-semibold text-white mb-1">Ação Imediata</h4>
                    <p className="text-sm text-gray-400">Execute os primeiros passos hoje mesmo</p>
                  </div>
                  <div className="bg-luxury-black/50 rounded-lg p-4 border border-luxury-gold/20">
                    <Target className="w-6 h-6 text-luxury-gold mb-2" />
                    <h4 className="font-semibold text-white mb-1">Foco Total</h4>
                    <p className="text-sm text-gray-400">Escolha UMA ideia e dedique-se 100%</p>
                  </div>
                  <div className="bg-luxury-black/50 rounded-lg p-4 border border-luxury-gold/20">
                    <TrendingUp className="w-6 h-6 text-luxury-gold mb-2" />
                    <h4 className="font-semibold text-white mb-1">Constância</h4>
                    <p className="text-sm text-gray-400">Trabalhe consistentemente todos os dias</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-luxury-gold/10 rounded-lg border border-luxury-gold/30">
                  <p className="text-luxury-gold font-semibold text-center">
                    Lembre-se: A melhor ideia é aquela que você EXECUTA. O sucesso vem da ação, não do planejamento perfeito!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 25s ease-in-out;
        }
      `}</style>
    </>
  );
}

interface SecaoIdeiaProps {
  icon: React.ReactNode;
  titulo: string;
  conteudo: any; // Mantido 'any' para aceitar string ou objeto JSON
}

function SecaoIdeia({ icon, titulo, conteudo }: SecaoIdeiaProps) {
  let conteudoFormatado: string;

  // 1. Tenta converter de JSON string para Objeto (caso o Supabase tenha retornado a string sem parse)
  let parsedContent = conteudo;
  if (typeof conteudo === 'string') {
    try {
      parsedContent = JSON.parse(conteudo);
    } catch (e) {
      // Se falhar, é uma string simples.
      parsedContent = conteudo;
    }
  }

  // 2. Formata o conteúdo se for um Objeto
  if (typeof parsedContent === 'object' && parsedContent !== null) {
    // Formata o objeto como uma lista de chaves/valores
    conteudoFormatado = Object.entries(parsedContent).map(([key, value]) => {
      // Converte a chave (camelCase ou 3Meses) para um título legível
      const formattedKey = key
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toUpperCase()
        .replace('3MESES', '3 MESES')
        .replace('6MESES', '6 MESES')
        .replace('12MESES', '12 MESES');
      
      // Garante que o valor também seja uma string (evita [object Object])
      let formattedValue = String(value);

      return `**${formattedKey}:**\n${formattedValue}`;
    }).join('\n\n').trim();

  } 
  // 3. Se for string simples, usa como está
  else {
    conteudoFormatado = String(parsedContent || 'Conteúdo não fornecido.');
  }
  
  return (
    <div className="bg-luxury-dark rounded-xl p-5 luxury-border luxury-shadow">
      <div className="flex items-center mb-3">
        {icon}
        <h4 className="ml-2 font-semibold text-white">{titulo}</h4>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{conteudoFormatado}</p>
    </div>
  );
}
