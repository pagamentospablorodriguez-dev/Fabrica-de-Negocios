// src/components/SocioAI.tsx

import { useState } from 'react';
import { IdeiaComId } from '../types';
// ... (imports de ícones)

interface SocioAIProps {
  ideia: IdeiaComId;
}

export default function SocioAI({ ideia }: SocioAIProps) {
  const [mensagens, setMensagens] = useState([]);
  const [pergunta, setPergunta] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnviarPergunta = async () => {
    // Adicionar pergunta do usuário à lista de mensagens
    // Chamar a função Netlify 'socio-ai'
    // Adicionar resposta da IA à lista de mensagens
  };

  return (
    <div className="mt-8 bg-luxury-darker rounded-2xl p-8 luxury-border">
      <h3 className="text-2xl font-bold text-white mb-4">Converse com seu Sócio AI</h3>
      {/* Área de exibição das mensagens */}
      <div className="space-y-4 h-64 overflow-y-auto mb-4 p-4 bg-luxury-black rounded-lg">
        {/* Mapear e renderizar mensagens */}
      </div>
      {/* Input e botão de envio */}
      <div className="flex gap-2">
        <input
          type="text"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          placeholder="Tire suas dúvidas sobre esta ideia..."
          className="w-full px-4 py-3 rounded-lg bg-luxury-black border luxury-border text-white"
        />
        <button onClick={handleEnviarPergunta} disabled={loading} className="gold-gradient text-luxury-black font-semibold py-3 px-6 rounded-lg">
          {loading ? 'Pensando...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}
