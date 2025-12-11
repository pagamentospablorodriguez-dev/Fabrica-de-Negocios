// src/components/SocioAI.tsx

import { useState } from 'react';
import { IdeiaComId } from '../types';
import { BrainCircuit, User, Loader2 } from 'lucide-react';

// Tipos para as mensagens do chat
interface Mensagem {
  autor: 'user' | 'ai';
  texto: string;
}

interface SocioAIProps {
  ideia: IdeiaComId;
}

export default function SocioAI({ ideia }: SocioAIProps) {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { autor: 'ai', texto: `Olá! Sou seu Sócio AI. Estou pronto para discutir a ideia "${ideia.nomeMarca}". Como posso te ajudar a transformar isso em um negócio de sucesso hoje?` }
  ]);
  const [pergunta, setPergunta] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnviarPergunta = async () => {
    if (!pergunta.trim() || loading) return;

    const novaPergunta: Mensagem = { autor: 'user', texto: pergunta };
    setMensagens(prev => [...prev, novaPergunta]);
    setPergunta('');
    setLoading(true);

    try {
      const response = await fetch('/.netlify/functions/socio-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pergunta: novaPergunta.texto,
          ideia: ideia, // Envia o contexto completo da ideia
          historico: mensagens // Envia o histórico para a IA manter o contexto
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao se comunicar com o Sócio AI.');
      }

      const data = await response.json();
      const respostaAI = data.choices[0]?.message?.content;

      if (respostaAI) {
        setMensagens(prev => [...prev, { autor: 'ai', texto: respostaAI }]);
      } else {
        throw new Error('O Sócio AI não conseguiu formular uma resposta.');
      }

    } catch (error) {
      console.error(error);
      setMensagens(prev => [...prev, { autor: 'ai', texto: 'Desculpe, estou com um problema técnico. Tente novamente em instantes.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-luxury-darker rounded-2xl p-8 luxury-border">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
        <BrainCircuit className="w-8 h-8 mr-3 text-luxury-gold" />
        Converse com seu Sócio AI
      </h3>
      
      <div className="space-y-4 h-80 overflow-y-auto mb-4 p-4 bg-luxury-black rounded-lg border luxury-border">
        {mensagens.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.autor === 'user' ? 'justify-end' : ''}`}>
            {msg.autor === 'ai' && <div className="w-8 h-8 flex-shrink-0 bg-luxury-gold/20 rounded-full flex items-center justify-center border border-luxury-gold/30"><BrainCircuit className="w-5 h-5 text-luxury-gold" /></div>}
            <div className={`max-w-lg p-3 rounded-lg ${msg.autor === 'ai' ? 'bg-luxury-dark' : 'bg-blue-900/50'}`}>
              <p className="text-white whitespace-pre-wrap">{msg.texto}</p>
            </div>
            {msg.autor === 'user' && <div className="w-8 h-8 flex-shrink-0 bg-gray-700 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-white" /></div>}
          </div>
        ))}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 flex-shrink-0 bg-luxury-gold/20 rounded-full flex items-center justify-center border border-luxury-gold/30"><BrainCircuit className="w-5 h-5 text-luxury-gold" /></div>
            <div className="max-w-lg p-3 rounded-lg bg-luxury-dark flex items-center">
              <Loader2 className="w-5 h-5 text-white animate-spin" />
              <p className="text-white ml-2">Pensando...</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleEnviarPergunta()}
          placeholder="Tire suas dúvidas sobre esta ideia..."
          className="w-full px-4 py-3 rounded-lg bg-luxury-black border luxury-border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
        />
        <button onClick={handleEnviarPergunta} disabled={loading} className="gold-gradient text-luxury-black font-semibold py-3 px-6 rounded-lg disabled:opacity-50 flex items-center justify-center">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enviar'}
        </button>
      </div>
    </div>
  );
}
