import { IdeiaNegocios } from '../types';
import {
  Sparkles, Target, TrendingUp, Megaphone, Users,
  Calendar, MessageSquare, Video, Code, DollarSign,
  CheckCircle, Lightbulb, ArrowLeft
} from 'lucide-react';
import { useState } from 'react';
import BoltIframe from './BoltIframe';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <button
          onClick={onVoltar}
          className="mb-8 flex items-center text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar ao formulário
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-6 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Suas 10 Ideias Milionárias Estão Prontas!
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Cada ideia vem com tudo que você precisa para começar HOJE.
            Escolha uma e comece a construir seu negócio agora mesmo!
          </p>
        </div>

        <div className="space-y-6">
          {ideias.map((ideia, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all hover:shadow-2xl"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleIdeia(index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg text-white font-bold mr-4">
                        {index + 1}
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900">{ideia.nomeMarca}</h2>
                    </div>
                    <p className="text-lg text-slate-600 ml-14 mb-4">{ideia.promessa}</p>
                  </div>
                  <button className="ml-4 p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <svg
                      className={`w-6 h-6 text-slate-600 transition-transform ${ideiaExpandida === index ? 'rotate-180' : ''}`}
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
                <div className="border-t border-slate-200 p-6 bg-slate-50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SecaoIdeia
                      icon={<Target className="w-5 h-5 text-blue-600" />}
                      titulo="Análise de Viabilidade"
                      conteudo={ideia.analiseViabilidade}
                    />

                    <SecaoIdeia
                      icon={<TrendingUp className="w-5 h-5 text-green-600" />}
                      titulo="Como Viralizar"
                      conteudo={ideia.comoViralizar}
                    />

                    <SecaoIdeia
                      icon={<Users className="w-5 h-5 text-purple-600" />}
                      titulo="Público-Alvo"
                      conteudo={ideia.publicoAlvo}
                    />

                    <SecaoIdeia
                      icon={<Megaphone className="w-5 h-5 text-orange-600" />}
                      titulo="Estratégia de Marketing"
                      conteudo={ideia.estrategiaMarketing}
                    />

                    <SecaoIdeia
                      icon={<Calendar className="w-5 h-5 text-cyan-600" />}
                      titulo="Roadmap de Lançamento"
                      conteudo={ideia.roadmapLancamento}
                    />

                    <SecaoIdeia
                      icon={<MessageSquare className="w-5 h-5 text-pink-600" />}
                      titulo="Scripts de Anúncios"
                      conteudo={ideia.scriptAnuncios}
                    />

                    <SecaoIdeia
                      icon={<Video className="w-5 h-5 text-red-600" />}
                      titulo="Conteúdo Orgânico"
                      conteudo={ideia.scriptConteudoOrganico}
                    />

                    <SecaoIdeia
                      icon={<DollarSign className="w-5 h-5 text-green-600" />}
                      titulo="Formas de Monetização"
                      conteudo={ideia.formasMonetizacao}
                    />

                    <SecaoIdeia
                      icon={<CheckCircle className="w-5 h-5 text-emerald-600" />}
                      titulo="Primeiros Passos"
                      conteudo={ideia.primeirosPassos}
                    />

                    <SecaoIdeia
                      icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
                      titulo="Metas Financeiras"
                      conteudo={ideia.metasFinanceiras}
                    />
                  </div>

                  <div className="mt-6 p-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white">
                    <div className="flex items-center mb-4">
                      <Code className="w-6 h-6 mr-3" />
                      <h3 className="text-xl font-bold">Prompt para Criar no Bolt</h3>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm mb-4">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{ideia.promptBolt}</p>
                    </div>
                    <button
                      onClick={() => abrirBolt(ideia.promptBolt)}
                      className="w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-all flex items-center justify-center"
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

        <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200 text-center">
          <Sparkles className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Agora é com você!
          </h3>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-6">
            Você tem 10 ideias completas e prontas para começar. Escolha a que mais te empolga,
            siga o plano passo a passo e comece a construir seu negócio HOJE mesmo.
          </p>
          <p className="text-slate-600 font-semibold">
            Lembre-se: A melhor ideia é aquela que você coloca em prática!
          </p>
        </div>
      </div>
    </div>
  );
}

interface SecaoIdeiaProps {
  icon: React.ReactNode;
  titulo: string;
  conteudo: string;
}

function SecaoIdeia({ icon, titulo, conteudo }: SecaoIdeiaProps) {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200">
      <div className="flex items-center mb-3">
        {icon}
        <h4 className="ml-2 font-semibold text-slate-900">{titulo}</h4>
      </div>
      <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{conteudo}</p>
    </div>
  );
}
