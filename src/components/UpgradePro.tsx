// src/components/UpgradePro.tsx

import { Zap, Gem, ShieldCheck } from 'lucide-react';

export default function UpgradePro() {
  // IMPORTANTE: Substitua pela sua URL de checkout
  const checkoutUrl = 'SEU_LINK_DE_CHECKOUT_AQUI';

  return (
    <div className="mt-8 bg-luxury-dark rounded-2xl luxury-shadow-lg luxury-border p-6 md:p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white">
          Gostou da conversa? Leve sua ideia para o <span className="gold-gradient text-transparent bg-clip-text" style="color: white;">próximo nível.</span>
        </h3>
        <p className="text-gray-400 mt-2">Desbloqueie o Plano PRO e acelere seus resultados.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 text-center mb-8">
        <div className="bg-luxury-darker p-4 rounded-lg border luxury-border">
          <Zap className="w-7 h-7 text-luxury-gold mx-auto mb-2" />
          <h4 className="font-semibold text-white">Geração Prioritária</h4>
          <p className="text-xs text-gray-400">Suas ideias são geradas 2x mais rápido com nosso modelo de IA mais potente.</p>
        </div>
        <div className="bg-luxury-darker p-4 rounded-lg border luxury-border">
          <Gem className="w-7 h-7 text-luxury-gold mx-auto mb-2" />
          <h4 className="font-semibold text-white">Análises Aprofundadas</h4>
          <p className="text-xs text-gray-400">Receba planos de marketing e roadmaps 3x mais detalhados e com estratégias avançadas.</p>
        </div>
        <div className="bg-luxury-darker p-4 rounded-lg border luxury-border">
          <ShieldCheck className="w-7 h-7 text-luxury-gold mx-auto mb-2" />
          <h4 className="font-semibold text-white">Acesso Antecipado</h4>
          <p className="text-xs text-gray-400">Teste novas features, como o "Analisador de Concorrência", antes de todo mundo.</p>
        </div>
      </div>

      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full block text-center gold-gradient text-luxury-black font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all luxury-shadow-lg text-base md:text-lg"
      >
        QUERO ACELERAR MEU NEGÓCIO - R$47/mês
      </a>
    </div>
  );
}
