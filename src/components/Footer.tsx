import { Sparkles, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-luxury-darker border-t luxury-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <img src="/fnl.png" alt="Logo" className="h-44 w-auto" />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Transformando ideias em negócios lucrativos com o poder da IA.
            </p>
          </div>

          <div>
            <h3 className="text-luxury-gold font-semibold mb-4 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Sobre
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>Geração de Ideias</li>
              <li>Estratégias Completas</li>
              <li>Roadmaps Detalhados</li>
              <li>Prompts para Bolt</li>
            </ul>
          </div>

          <div>
            <h3 className="text-luxury-gold font-semibold mb-4 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Contato
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Fábrica de Negócios
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t luxury-border pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Fábrica de Negócios. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
