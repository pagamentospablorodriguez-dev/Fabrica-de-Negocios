import { useState } from 'react';
import { FormData } from '../types';
import { Sparkles, TrendingUp, Clock, DollarSign, Package, Zap } from 'lucide-react';

interface FormularioEntradaProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}

export default function FormularioEntrada({ onSubmit, loading }: FormularioEntradaProps) {
  const [formData, setFormData] = useState<FormData>({
    areaInteresse: '',
    tempoDisponivel: '',
    investimento: '',
    tipoNegocio: '',
    habilidades: '',
    objetivoFinanceiro: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Fábrica de Negócios
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Transforme suas ideias em negócios lucrativos com o poder da IA.
            Receba 10 ideias completas e prontas para lançar HOJE mesmo!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Ideias Validadas</h3>
            <p className="text-sm text-slate-600">10 negócios prontos com potencial comprovado de lucro</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Resultado Rápido</h3>
            <p className="text-sm text-slate-600">Comece hoje e veja os primeiros resultados em dias</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Plano Completo</h3>
            <p className="text-sm text-slate-600">Marketing, monetização e roadmap detalhado</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Preencha suas informações
          </h2>

          <div className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                <Package className="w-4 h-4 mr-2 text-blue-600" />
                Qual área te interessa?
              </label>
              <input
                type="text"
                name="areaInteresse"
                value={formData.areaInteresse}
                onChange={handleChange}
                required
                placeholder="Ex: Tecnologia, Saúde, Educação, E-commerce, etc."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                Quanto tempo você tem disponível?
              </label>
              <select
                name="tempoDisponivel"
                value={formData.tempoDisponivel}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Selecione...</option>
                <option value="1-2 horas por dia">1-2 horas por dia</option>
                <option value="3-4 horas por dia">3-4 horas por dia</option>
                <option value="5-8 horas por dia (meio período)">5-8 horas por dia (meio período)</option>
                <option value="Dedicação total (8+ horas)">Dedicação total (8+ horas)</option>
                <option value="Apenas fins de semana">Apenas fins de semana</option>
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
                Quanto você pode investir?
              </label>
              <select
                name="investimento"
                value={formData.investimento}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Selecione...</option>
                <option value="Zero (sem investimento inicial)">Zero (sem investimento inicial)</option>
                <option value="Até R$ 500">Até R$ 500</option>
                <option value="R$ 500 - R$ 2.000">R$ 500 - R$ 2.000</option>
                <option value="R$ 2.000 - R$ 5.000">R$ 2.000 - R$ 5.000</option>
                <option value="R$ 5.000 - R$ 10.000">R$ 5.000 - R$ 10.000</option>
                <option value="Acima de R$ 10.000">Acima de R$ 10.000</option>
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                <Package className="w-4 h-4 mr-2 text-blue-600" />
                Que tipo de negócio você quer criar?
              </label>
              <select
                name="tipoNegocio"
                value={formData.tipoNegocio}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Selecione...</option>
                <option value="Produto Digital (cursos, ebooks, templates)">Produto Digital (cursos, ebooks, templates)</option>
                <option value="SaaS (Software como Serviço)">SaaS (Software como Serviço)</option>
                <option value="E-commerce (loja online)">E-commerce (loja online)</option>
                <option value="Serviços Digitais (consultoria, design, etc)">Serviços Digitais (consultoria, design, etc)</option>
                <option value="Produto Físico">Produto Físico</option>
                <option value="Serviços Locais">Serviços Locais</option>
                <option value="Conteúdo/Monetização (YouTube, Blog, etc)">Conteúdo/Monetização (YouTube, Blog, etc)</option>
                <option value="Marketplace ou Plataforma">Marketplace ou Plataforma</option>
                <option value="Qualquer tipo (deixe a IA decidir)">Qualquer tipo (deixe a IA decidir)</option>
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
                Quais são suas habilidades principais?
              </label>
              <textarea
                name="habilidades"
                value={formData.habilidades}
                onChange={handleChange}
                required
                placeholder="Ex: Marketing digital, programação, design, vendas, escrita, vídeo, etc."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                Qual seu objetivo financeiro?
              </label>
              <select
                name="objetivoFinanceiro"
                value={formData.objetivoFinanceiro}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Selecione...</option>
                <option value="R$ 1.000 - R$ 3.000/mês (renda extra)">R$ 1.000 - R$ 3.000/mês (renda extra)</option>
                <option value="R$ 3.000 - R$ 10.000/mês (substituir emprego)">R$ 3.000 - R$ 10.000/mês (substituir emprego)</option>
                <option value="R$ 10.000 - R$ 30.000/mês (crescimento acelerado)">R$ 10.000 - R$ 30.000/mês (crescimento acelerado)</option>
                <option value="R$ 30.000 - R$ 100.000/mês (negócio escalável)">R$ 30.000 - R$ 100.000/mês (negócio escalável)</option>
                <option value="Acima de R$ 100.000/mês (império digital)">Acima de R$ 100.000/mês (império digital)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Gerando suas ideias milionárias...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Gerar 10 Ideias de Negócios Agora!
              </>
            )}
          </button>

          <p className="text-center text-sm text-slate-500 mt-4">
            Tempo estimado: 30-60 segundos para gerar suas ideias personalizadas
          </p>
        </form>

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            O que você vai receber:
          </h3>
          <ul className="space-y-3">
            {[
              'Nome da marca e identidade completa',
              'Proposta de valor única que vende',
              'Análise de viabilidade detalhada',
              'Estratégias específicas para viralizar',
              'Público-alvo e persona definidos',
              'Plano de marketing completo',
              'Roadmap de lançamento passo a passo',
              'Scripts prontos de anúncios pagos',
              'Ideias de conteúdo orgânico para redes sociais',
              'Prompt completo para criar no Bolt',
              'Múltiplas formas de monetização',
              'Primeiros passos para começar HOJE',
              'Projeção financeira realista'
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
