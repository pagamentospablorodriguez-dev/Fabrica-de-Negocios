import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, Loader } from 'lucide-react';
import Footer from './Footer';

interface CadastroProps {
  onSwitchToLogin: () => void;
}

export default function Cadastro({ onSwitchToLogin }: CadastroProps) {
  const { signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso(false);

    if (password !== confirmPassword) {
      setErro('As senhas não correspondem');
      return;
    }

    if (password.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password);
      setSucesso(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setErro('');

    try {
      await signInWithGoogle();
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao criar conta com Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-luxury-black flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img src="/fnl.png" alt="Logo" className="h-20 w-auto luxury-shadow-lg" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Comece seu jornada!
            </h1>
            <p className="text-gray-400">
              Crie sua conta para gerar ideias de negócios
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-luxury-dark rounded-2xl luxury-shadow-lg luxury-border p-8 space-y-6">
            {erro && (
              <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                {erro}
              </div>
            )}

            {sucesso && (
              <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 text-green-400 text-sm">
                Conta criada com sucesso! Você pode fazer login agora.
              </div>
            )}

            <div>
              <label className="flex items-center text-sm font-semibold text-luxury-gold mb-2">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-lg bg-luxury-black border luxury-border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-luxury-gold mb-2">
                <Lock className="w-4 h-4 mr-2" />
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-luxury-black border luxury-border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-luxury-gold mb-2">
                <Lock className="w-4 h-4 mr-2" />
                Confirmar Senha
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-luxury-black border luxury-border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gold-gradient text-luxury-black font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all luxury-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Criando conta...
                </>
              ) : (
                'Criar Conta'
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-luxury-gold/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-luxury-dark text-gray-400">ou</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full bg-luxury-darker border luxury-border text-white font-semibold py-3 px-6 rounded-lg hover:bg-luxury-black transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Criar com Google
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Já tem conta?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-luxury-gold hover:text-luxury-gold-light transition-colors font-semibold"
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
