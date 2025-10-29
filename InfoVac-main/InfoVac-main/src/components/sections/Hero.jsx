import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Info, Search } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSearch = () => {
    const searchSection = document.getElementById('search');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToInfo = () => {
    const infoSection = document.getElementById('info');
    if (infoSection) {
      infoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen pt-24 pb-16 px-6 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-50/60 to-white pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-teal-300/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-teal-200/10 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-4xl mx-auto text-center z-10">
        <div className={`transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span className="inline-block py-1 px-3 mb-6 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
            Informações em tempo real
          </span>

          <h1 className="text-4xl md:text-6xl font-medium mb-6 leading-tight">
            Encontre vacinas disponíveis nas <span className="text-teal-600">UBSs</span> próximas a você!
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Localize facilmente qual UBS possui a vacina que você precisa,
            com informações atualizadas em tempo real.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Novo botão principal: Buscar vacinas */}
            <Button 
              size="lg" 
              className="glass-card bg-teal-600 hover:bg-teal-700 text-white font-medium text-lg rounded-full py-6 shadow-lg hover:shadow-xl group transition-all duration-300"
              onClick={scrollToSearch}
            >
              <Search className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Buscar Vacinas
            </Button>

            {/* Novo botão secundário: Informações */}
            <Button
              variant="outline"
              size="lg"
              className="glass-card bg-white text-teal-600 border-teal-200 hover:border-teal-400 font-medium text-lg rounded-full py-6 shadow-md hover:shadow-lg transition-all duration-300"
              onClick={scrollToInfo}
            >
              <Info className="mr-2 h-5 w-5" />
              Mais Informações
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
