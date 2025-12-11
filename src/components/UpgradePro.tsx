// src/components/UpgradePro.tsx

import { Sparkles, Zap, Star } from 'lucide-react';

export default function UpgradePro() {
  const checkoutUrl = 'SEU_LINK_DE_CHECKOUT_AQUI'; // Substitua pelo seu link

  return (
    <div className="bg-luxury-dark rounded-2xl luxury-shadow-lg luxury-border p-8 my-8">
      <div className="text-center">
        <Star className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-3">Desbloqueie o Plano PRO</h2>
        <p className="text-gray-400 mb-6">Leve suas ideias para o próximo nível com o Sócio AI e recursos exclusivos.</p>
      </div>
      <ul className="space-y-4 mb-8">
        <li className="flex items-start">
          <Sparkles className="w-5 h-5 text-luxury-gold mr-3 mt-1 flex-shrink-0" />
          <span className="text-gray-300">**Sócio AI:** Seu consultor de negócios pessoal para tirar dúvidas, aprofundar estratégias e validar ideias.</span>
        </li>
        <li className="flex items-start">
          <Zap className="w-5 h-5 text-luxury-gold mr-3 mt-1 flex-shrink-0" />
          <span className="text-gray-300">**Estratégias Aprofundadas:** Análises de marketing, vendas e viralização muito mais detalhadas.</span>
        </li>
        <li className="flex items-start">
          <Star className="w-5 h-5 text-luxury-gold mr-3 mt-1 flex-shrink-0" />
          <span className="text-gray-300">**Geração Prioritária:** Suas ideias são geradas com prioridade máxima.</span>
        </li>
      </ul>
      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full block text-center gold-gradient text-luxury-black font-semibold py-4 px-6 rounded-lg hover:opacity-90 transition-all luxury-shadow-lg"
      >
        Quero ser PRO por R$47/mês
      </a>
      <p className="text-center text-xs text-gray-500 mt-4">Você será redirecionado para um checkout seguro. A ativação é feita manualmente após a confirmação.</p>
    </div>
  );
}
