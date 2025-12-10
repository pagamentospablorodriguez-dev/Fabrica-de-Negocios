import { Sparkles, Zap, TrendingUp, Target } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="relative mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl luxury-shadow-lg animate-pulse">
            <img src="/fnl.png" alt="Logo" className="h-20 w-auto" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin"></div>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-white mb-4">
          Criando Suas Ideias Milionárias...
        </h2>
        <p className="text-xl text-gray-400 mb-12">
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
              className="bg-luxury-dark rounded-xl p-4 luxury-border flex items-center justify-start luxury-shadow animate-pulse"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="w-10 h-10 bg-luxury-gold/10 rounded-lg flex items-center justify-center text-luxury-gold mr-3 flex-shrink-0 border border-luxury-gold/20">
                {item.icon}
              </div>
              <span className="text-gray-300 font-medium text-left">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="bg-luxury-dark rounded-xl p-6 luxury-border luxury-shadow">
          <p className="text-gray-400 mb-4">
            Isso pode levar de 30 a 60 segundos. Por favor, aguarde...
          </p>
          <div className="w-full bg-luxury-darker rounded-full h-2 overflow-hidden border luxury-border">
            <div className="gold-gradient h-full rounded-full animate-progress"></div>
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
