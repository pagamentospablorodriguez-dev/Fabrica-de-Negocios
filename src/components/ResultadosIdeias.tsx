import { IdeiaNegocios } from '../types';
import {
  Sparkles, Target, TrendingUp, Megaphone, Users,
  Calendar, MessageSquare, Video, Code, DollarSign,
  CheckCircle, Lightbulb, ArrowLeft
} from 'lucide-react';
import { useState } from 'react';
import BoltIframe from './BoltIframe';
import Footer from './Footer';

interface ResultadosIdeiasProps {
  ideias: IdeiaNegocios[];
  onVoltar: () => void;
}

export default function ResultadosIdeias({ ideias, onVoltar }: ResultadosIdeiasProps) {
  const [ideiaExpandida, setIdeiaExpandida] = useState<number | null>(null);
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
              <img src="/fnl.png" alt="Logo" className="h-20 w-auto luxury-shadow-lg" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Suas 10 Ideias Milionárias Estão Prontas!
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Cada ideia vem com tudo que você precisa para começar HOJE.
              Escolha uma e comece a construir seu negócio agora mesmo!
            </p>
          </div>

          <div className="space-y-6">
            {ideias.map((ideia, index) => (
              <div
                key={index}
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
                      <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm mb-4">
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
          </div>

          <div className="mt-12 bg-luxury-dark rounded-xl p-8 luxury-border text-center luxury-shadow">
            <Sparkles className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Agora é com você!
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
              Você tem 10 ideias completas e prontas para começar. Escolha a que mais te empolga,
              siga o plano passo a passo e comece a construir seu negócio HOJE mesmo.
            </p>
            <p className="text-luxury-gold font-semibold">
              Lembre-se: A melhor ideia é aquela que você coloca em prática!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

interface SecaoIdeiaProps {
  icon: React.ReactNode;
  titulo: string;
  conteudo: string;
}

function SecaoIdeia({ icon, titulo, conteudo }: SecaoIdeiaProps) {
  return (
    <div className="bg-luxury-dark rounded-xl p-5 luxury-border luxury-shadow">
      <div className="flex items-center mb-3">
        {icon}
        <h4 className="ml-2 font-semibold text-white">{titulo}</h4>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{conteudo}</p>
    </div>
  );
}
