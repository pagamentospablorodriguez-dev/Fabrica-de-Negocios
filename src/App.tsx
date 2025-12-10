import { useState } from 'react';
import FormularioEntrada from './components/FormularioEntrada';
import ResultadosIdeias from './components/ResultadosIdeias';
import Loading from './components/Loading';
import { FormData, IdeiaNegocios } from './types';
import { gerarIdeiasNegocio } from './services/openai';
import { supabase } from './lib/supabase';
import { AlertCircle } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [ideias, setIdeias] = useState<IdeiaNegocios[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setErro(null);

    try {
      const ideiasGeradas = await gerarIdeiasNegocio(formData);

      await supabase.from('business_ideas').insert({
        area_interesse: formData.areaInteresse,
        tempo_disponivel: formData.tempoDisponivel,
        investimento: formData.investimento,
        tipo_negocio: formData.tipoNegocio,
        outras_preferencias: {
          habilidades: formData.habilidades,
          objetivoFinanceiro: formData.objetivoFinanceiro,
        },
        ideias_geradas: ideiasGeradas,
      });

      setIdeias(ideiasGeradas);
    } catch (error) {
      console.error('Erro ao gerar ideias:', error);
      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao gerar ideias. Por favor, tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    setIdeias(null);
    setErro(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-red-200 p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-4">
            Oops! Algo deu errado
          </h2>
          <p className="text-slate-600 text-center mb-6">{erro}</p>
          <button
            onClick={handleVoltar}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (ideias) {
    return <ResultadosIdeias ideias={ideias} onVoltar={handleVoltar} />;
  }

  return <FormularioEntrada onSubmit={handleSubmit} loading={loading} />;
}

export default App;
