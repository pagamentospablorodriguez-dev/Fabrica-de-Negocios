import { Sparkles, Zap, TrendingUp, Target } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="relative mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-2xl animate-pulse">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Criando Suas Ideias Milionárias...
        </h2>
        <p className="text-xl text-slate-600 mb-12">
          Nossa IA está analisando suas informações e gerando 10 ideias de negócios completas e personalizadas para você.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {[
            { icon: <Target className="w-6 h-6" />, text: 'Analisando oportunidades de mercado' },
            { icon: <TrendingUp className="w-6 h-6" />, text: 'Criando estratégias de crescimento' },
            { icon: <Zap className="w-6 h-6" />, text: 'Gerando planos de monetização' },
            { icon: <Sparkles className="w-6 h-6" />, text: 'Preparando roadmaps detalhados' },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 border border-slate-200 flex items-center justify-start shadow-sm animate-pulse"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-3 flex-shrink-0">
                {item.icon}
              </div>
              <span className="text-slate-700 font-medium text-left">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
          <p className="text-slate-600 mb-4">
            Isso pode levar de 30 a 60 segundos. Por favor, aguarde...
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 h-full rounded-full animate-progress"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 45s ease-in-out;
        }
      `}</style>
    </div>
  );
}
