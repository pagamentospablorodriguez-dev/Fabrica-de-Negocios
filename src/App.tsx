import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import FormularioEntrada from './components/FormularioEntrada';
import ResultadosIdeias from './components/ResultadosIdeias';
import Historico from './components/Historico';
import Loading from './components/Loading';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Footer from './components/Footer';
import { FormData, IdeiaComId } from './types';
import { gerarIdeiaNegocio } from './services/openai';
import { supabase } from '../lib/supabase';
import { AlertCircle } from 'lucide-react';

type View = 'form' | 'results' | 'historico';

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'cadastro' | null>(null);
  const [view, setView] = useState<View>('form');
  const [loading, setLoading] = useState(false);
  const [loadingNovaIdeia, setLoadingNovaIdeia] = useState(false);
  const [ideias, setIdeias] = useState<IdeiaComId[]>([]);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [erro, setErro] = useState<string | null>(null);

  if (authLoading) {
    return <Loading />;
  }

  if (!user) {
    if (authView === 'cadastro') {
      return <Cadastro onSwitchToLogin={() => setAuthView('login')} />;
    }
    return <Login onSwitchToCadastro={() => setAuthView('cadastro')} />;
  }

  const gerarNovaIdeia = async (dados: FormData, isFirst: boolean = true) => {
    if (isFirst) {
      setLoading(true);
    } else {
      setLoadingNovaIdeia(true);
    }
    setErro(null);

    try {
      const ideiaGerada = await gerarIdeiaNegocio(dados);

      const novoSessionId = sessionId || crypto.randomUUID();
      if (!sessionId) {
        setSessionId(novoSessionId);
      }

      const { data: ideaSalva, error } = await supabase
        .from('business_ideas')
        .insert({
          user_id: user.id,
          session_id: novoSessionId,
          area_interesse: dados.areaInteresse,
          tempo_disponivel: dados.tempoDisponivel,
          investimento: dados.investimento,
          tipo_negocio: dados.tipoNegocio,
          outras_preferencias: {
            habilidades: dados.habilidades,
            objetivoFinanceiro: dados.objetivoFinanceiro,
          },
          nome_marca: ideiaGerada.nomeMarca,
          promessa: ideiaGerada.promessa,
          analise_viabilidade: ideiaGerada.analiseViabilidade,
          como_viralizar: ideiaGerada.comoViralizar,
          publico_alvo: ideiaGerada.publicoAlvo,
          estrategia_marketing: ideiaGerada.estrategiaMarketing,
          roadmap_lancamento: ideiaGerada.roadmapLancamento,
          script_anuncios: ideiaGerada.scriptAnuncios,
          script_conteudo_organico: ideiaGerada.scriptConteudoOrganico,
          prompt_bolt: ideiaGerada.promptBolt,
          formas_monetizacao: ideiaGerada.formasMonetizacao,
          primeiros_passos: ideiaGerada.primeirosPassos,
          metas_financeiras: ideiaGerada.metasFinanceiras,
        })
        .select()
        .single();

      if (error) throw error;

      const novaIdeia: IdeiaComId = {
        ...ideiaGerada,
        id: ideaSalva.id,
        createdAt: ideaSalva.created_at,
      };

      setIdeias(prev => [...prev, novaIdeia]);
      setView('results');
    } catch (error) {
      console.error('Erro ao gerar ideia:', error);
      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao gerar ideia. Por favor, tente novamente.'
      );
    } finally {
      setLoading(false);
      setLoadingNovaIdeia(false);
    }
  };

  const handleSubmit = async (dados: FormData) => {
    setFormData(dados);
    setIdeias([]);
    setSessionId('');
    await gerarNovaIdeia(dados, true);
  };

  const handleGerarMais = async () => {
    if (formData) {
      await gerarNovaIdeia(formData, false);
    }
  };

  const handleVoltar = () => {
    setView('form');
    setIdeias([]);
    setFormData(null);
    setSessionId('');
    setErro(null);
  };

  const handleVerHistorico = () => {
    setView('historico');
  };

  const handleVerIdeias = (sessaoId: string, dados: FormData, ideiasHistorico: IdeiaComId[]) => {
    setSessionId(sessaoId);
    setFormData(dados);
    setIdeias(ideiasHistorico);
    setView('results');
  };

  if (loading) {
    return <Loading />;
  }

  if (erro) {
    return (
      <>
        <div className="min-h-screen bg-luxury-black flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-luxury-dark rounded-2xl luxury-shadow-lg luxury-border p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-red-900/30 rounded-full mx-auto mb-6 border border-red-500/30">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-4">
              Oops! Algo deu errado
            </h2>
            <p className="text-gray-400 text-center mb-6">{erro}</p>
            <button
              onClick={handleVoltar}
              className="w-full gold-gradient text-luxury-black font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (view === 'historico') {
    return (
      <Historico
        onVoltar={() => setView('form')}
        onVerIdeias={handleVerIdeias}
      />
    );
  }

  if (view === 'results' && ideias.length > 0 && formData) {
    return (
      <ResultadosIdeias
        ideias={ideias}
        formData={formData}
        sessionId={sessionId}
        onVoltar={handleVoltar}
        onGerarMais={handleGerarMais}
        loadingNovaIdeia={loadingNovaIdeia}
      />
    );
  }

  return (
    <FormularioEntrada
      onSubmit={handleSubmit}
      onVerHistorico={handleVerHistorico}
      loading={loading}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
