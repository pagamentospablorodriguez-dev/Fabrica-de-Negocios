// src/components/SocioAI.tsx

import { useState, useEffect, useRef } from 'react';
import { IdeiaComId } from '../types';
import { BrainCircuit, User, Loader2, Send } from 'lucide-react';

// Tipos para as mensagens do chat
interface Mensagem {
  autor: 'user' | 'ai';
  texto: string;
}

interface SocioAIProps {
  ideia: IdeiaComId;
}

export default function SocioAI({ ideia }: SocioAIProps) {
  const storageKey = `conversa_socio_${ideia.id}`;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Carrega o estado inicial do localStorage ou define uma mensagem padrão
  const [mensagens, setMensagens] = useState<Mensagem[]>(() => {
    try {
      const historicoSalvo = localStorage.getItem(storageKey);
      if (historicoSalvo) {
        return JSON.parse(historicoSalvo);
      }
    } catch (error) {
      console.error("Erro ao carregar histórico do chat:", error);
    }
    return [{ autor: 'ai', texto: `Olá! Sou seu Sócio AI. Estou pronto para discutir a ideia "${ideia.nomeMarca}". Como posso te ajudar a transformar isso em um negócio de sucesso hoje?` }];
  });

  const [pergunta, setPergunta] = useState('');
  const [loading, setLoading] = useState(false);

  // Efeito para salvar a conversa no localStorage sempre que ela mudar
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(mensagens));
    } catch (error) {
      console.error("Erro ao salvar histórico do chat:", error);
    }
    // Efeito para rolar para a última mensagem
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [mensagens, storageKey]);

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
          ideia: ideia,
          historico: [...mensagens, novaPergunta] // Envia o histórico atualizado
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erro ao se comunicar com o Sócio AI.');
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
      const erroMsg = error instanceof Error ? error.message : 'Desculpe, estou com um problema técnico. Tente novamente em instantes.';
      setMensagens(prev => [...prev, { autor: 'ai', texto: erroMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-luxury-darker rounded-2xl p-6 md:p-8 luxury-border">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
        <BrainCircuit className="w-8 h-8 mr-3 text-luxury-gold" />
        Converse com seu Sócio AI
      </h3>
      
      <div ref={chatContainerRef} className="space-y-4 h-80 overflow-y-auto mb-4 p-4 bg-luxury-black rounded-lg border luxury-border scroll-smooth">
        {mensagens.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.autor === 'user' ? 'justify-end' : ''}`}>
            {msg.autor === 'ai' && <div className="w-8 h-8 flex-shrink-0 bg-luxury-gold/20 rounded-full flex items-center justify-center border border-luxury-gold/30"><BrainCircuit className="w-5 h-5 text-luxury-gold" /></div>}
            <div className={`max-w-xl p-3 rounded-lg text-white ${msg.autor === 'ai' ? 'bg-luxury-dark' : 'bg-blue-900/50'}`}>
              <p className="whitespace-pre-wrap text-sm md:text-base">{msg.texto}</p>
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
        <button onClick={handleEnviarPergunta} disabled={loading} className="gold-gradient text-luxury-black font-semibold py-3 px-4 md:px-6 rounded-lg disabled:opacity-50 flex items-center justify-center">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
