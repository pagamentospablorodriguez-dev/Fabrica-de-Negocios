// src/components/UpgradePro.tsx

import { Sparkles, Zap, Star, BrainCircuit } from 'lucide-react';

export default function UpgradePro() {
  // IMPORTANTE: Substitua esta URL pelo seu link de checkout real (Hotmart, Kiwify, etc.)
  const checkoutUrl = 'SEU_LINK_DE_CHECKOUT_AQUI';

  return (
    <div className="bg-gradient-to-tr from-luxury-dark to-luxury-black rounded-2xl luxury-shadow-lg luxury-border p-8 text-center">
      
      <div className="relative inline-block mb-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-luxury-gold to-luxury-gold-light rounded-full blur opacity-50"></div>
        <div className="relative w-16 h-16 bg-luxury-dark rounded-full flex items-center justify-center border-2 border-luxury-gold">
          <Star className="w-8 h-8 text-luxury-gold" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mb-3">
        Desbloqueie o <span className="gold-gradient text-transparent bg-clip-text">Plano PRO</span>
      </h2>
      <p className="text-gray-400 mb-8 max-w-lg mx-auto">
        Transforme esta ideia em um negócio real com seu Sócio AI e estratégias aprofundadas.
      </p>

      <div className="text-left space-y-4 mb-8">
        <div className="flex items-start p-4 bg-luxury-darker rounded-lg border luxury-border">
          <BrainCircuit className="w-6 h-6 text-luxury-gold mr-4 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-white">Sócio AI: Seu Consultor Pessoal</h4>
            <p className="text-sm text-gray-400">Converse sobre sua ideia, tire dúvidas, aprofunde estratégias e receba conselhos práticos para executar seu plano.</p>
          </div>
        </div>
        <div className="flex items-start p-4 bg-luxury-darker rounded-lg border luxury-border">
          <Sparkles className="w-6 h-6 text-luxury-gold mr-4 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-white">Estratégias Aprofundadas</h4>
            <p className="text-sm text-gray-400">Receba análises de marketing, viralização e monetização 3x mais detalhadas, com táticas e ferramentas específicas.</p>
          </div>
        </div>
        <div className="flex items-start p-4 bg-luxury-darker rounded-lg border luxury-border">
          <Zap className="w-6 h-6 text-luxury-gold mr-4 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-white">Geração Prioritária e Ilimitada</h4>
            <p className="text-sm text-gray-400">Suas ideias são geradas com prioridade máxima e sem limites, usando modelos de IA mais avançados.</p>
          </div>
        </div>
      </div>

      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full block text-center gold-gradient text-luxury-black font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-all luxury-shadow-lg text-lg animate-pulse"
      >
        QUERO MEU SÓCIO AI AGORA - R$47/mês
      </a>
      <p className="text-center text-xs text-gray-500 mt-4">
        Você será redirecionado para um checkout seguro. O acesso PRO é ativado manualmente após a confirmação.
      </p>
    </div>
  );
}
