import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Trash2, Eye } from 'lucide-react';
import { Bolt Database } from '../lib/supabase';
import { FormData, IdeiaComId } from '../types';
import Footer from './Footer';
import Loading from './Loading';

interface SessaoComIdeias {
  sessionId: string;
  formData: FormData;
  ideias: IdeiaComId[];
  createdAt: string;
}

interface HistoricoProps {
  onVoltar: () => void;
  onVerIdeias: (sessionId: string, formData: FormData, ideias: IdeiaComId[]) => void;
}

export default function Historico({ onVoltar, onVerIdeias }: HistoricoProps) {
  const [sessoes, setSessoes] = useState<SessaoComIdeias[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      const { data: { user } } = await supabase.auth.getSession();
      if (!user) return;

      const { data, error } = await Bolt Database
        .from('business_ideas')
        .select('*')
        .eq('user_id', user.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const sessoesMap = new Map<string, SessaoComIdeias>();

      data?.forEach((item) => {
        const sessionId = item.session_id;
        if (!sessoesMap.has(sessionId)) {
          sessoesMap.set(sessionId, {
            sessionId,
            formData: {
              areaInteresse: item.area_interesse,
              tempoDisponivel: item.tempo_disponivel,
              investimento: item.investimento,
              tipoNegocio: item.tipo_negocio,
              habilidades: item.outras_preferencias?.habilidades || '',
              objetivoFinanceiro: item.outras_preferencias?.objetivoFinanceiro || '',
            },
            ideias: [],
            createdAt: item.created_at,
          });
        }

        const sessao = sessoesMap.get(sessionId)!;
        sessao.ideias.push({
          id: item.id,
          nomeMarca: item.nome_marca,
          promessa: item.promessa,
          analiseViabilidade: item.analise_viabilidade,
          comoViralizar: item.como_viralizar,
          publicoAlvo: item.publico_alvo,
          estrategiaMarketing: item.estrategia_marketing,
          roadmapLancamento: item.roadmap_lancamento,
          scriptAnuncios: item.script_anuncios,
          scriptConteudoOrganico: item.script_conteudo_organico,
          promptBolt: item.prompt_bolt,
          formasMonetizacao: item.formas_monetizacao,
          primeirosPassos: item.primeiros_passos,
          metasFinanceiras: item.metas_financeiras,
          createdAt: item.created_at,
        });
      });

      setSessoes(Array.from(sessoesMap.values()));
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    } finally {
      setLoading(false);
    }
  };

  const excluirSessao = async (sessionId: string) => {
    if (!confirm('Tem certeza que deseja excluir todas as ideias desta sessão?')) return;

    try {
      const { error } = await Bolt Database
        .from('business_ideas')
        .delete()
        .eq('session_id', sessionId);

      if (error) throw error;

      setSessoes(sessoes.filter(s => s.sessionId !== sessionId));
    } catch (error) {
      console.error('Erro ao excluir sessão:', error);
      alert('Erro ao excluir sessão. Tente novamente.');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="min-h-screen bg-luxury-black">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <button
            onClick={onVoltar}
            className="mb-8 flex items-center text-gray-400 hover:text-luxury-gold transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Suas Ideias Anteriores
            </h1>
            <p className="text-xl text-gray-400">
              Todas as ideias que você gerou ficam salvas aqui
            </p>
          </div>

          {sessoes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">
                Você ainda não gerou nenhuma ideia
              </p>
              <button
                onClick={onVoltar}
                className="gold-gradient text-luxury-black font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all"
              >
                Gerar Primeira Ideia
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {sessoes.map((sessao) => (
                <div
                  key={sessao.sessionId}
                  className="bg-luxury-dark rounded-2xl luxury-shadow-lg luxury-border p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center text-gray-400 text-sm mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(sessao.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {sessao.formData.areaInteresse}
                      </h3>
                      <p className="text-gray-400">
                        {sessao.ideias.length} {sessao.ideias.length === 1 ? 'ideia gerada' : 'ideias geradas'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onVerIdeias(sessao.sessionId, sessao.formData, sessao.ideias)}
                        className="flex items-center gap-2 bg-luxury-gold/10 text-luxury-gold px-4 py-2 rounded-lg hover:bg-luxury-gold/20 transition-all border border-luxury-gold/20"
                      >
                        <Eye className="w-4 h-4" />
                        Ver Ideias
                      </button>
                      <button
                        onClick={() => excluirSessao(sessao.sessionId)}
                        className="flex items-center gap-2 bg-red-900/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-900/20 transition-all border border-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t luxury-border">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tempo</p>
                      <p className="text-sm text-gray-300">{sessao.formData.tempoDisponivel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Investimento</p>
                      <p className="text-sm text-gray-300">{sessao.formData.investimento}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tipo</p>
                      <p className="text-sm text-gray-300">{sessao.formData.tipoNegocio}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Objetivo</p>
                      <p className="text-sm text-gray-300">{sessao.formData.objetivoFinanceiro}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
