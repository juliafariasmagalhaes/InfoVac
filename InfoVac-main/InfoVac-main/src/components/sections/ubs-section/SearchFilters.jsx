import { useState, useEffect } from 'react';
import { Search, Filter, Building } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const SearchFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  filterVaccine, 
  setFilterVaccine,
  filterCity,
  setFilterCity, 
  handleSearch,
  vaccinesList = [],
  citiesList = []
}) => {
  const [transitioning, setTransitioning] = useState(false); // Controle de transição

  // Função para chamar a pesquisa quando o filtro de cidade ou de vacina for alterado
  const handleCityChange = (city) => {
    setFilterCity(city);
  };

  // Função para chamar a pesquisa quando o filtro de vacina for alterado
  const handleVaccineChange = (vaccine) => {
    setFilterVaccine(vaccine);
  };

  // Função que chama a pesquisa sempre que o usuário digitar no campo de pesquisa
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Efeito para disparar a pesquisa sempre que o filtro ou a pesquisa mudar
  useEffect(() => {
    setTransitioning(true); // Inicia o efeito de transição
    const timeout = setTimeout(() => {
      handleSearch(); // Chama a função que executa a pesquisa
      setTransitioning(false); // Finaliza a transição após a pesquisa
    }, 300); // Define o tempo de transição (em ms)

    return () => clearTimeout(timeout);
  }, [searchQuery, filterCity, filterVaccine, handleSearch]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <p className="text-sm text-gray-500 mb-2">Selecione uma cidade</p>
        <Select value={filterCity} onValueChange={handleCityChange}>
          <SelectTrigger className="bg-white border-gray-200 w-full">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <SelectValue placeholder="Todas as cidades" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as cidades</SelectItem>
            {citiesList.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,auto] gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Buscar por UBS ou endereço"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="pl-10 bg-white border-gray-200"
          />
        </div>
        
        <Select value={filterVaccine} onValueChange={handleVaccineChange}>
          <SelectTrigger className="bg-white border-gray-200 w-full md:w-48">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Filtrar por vacina" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as vacinas</SelectItem>
            {vaccinesList.map(vaccine => (
              <SelectItem key={vaccine} value={vaccine}>{vaccine}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Aqui aplicamos o fade na exibição dos resultados */}
      <div 
        className={`results-container ${transitioning ? 'fade-in' : 'fade-in-active'}`} 
        style={{ transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out' }}
      >
        {/* Aqui você renderiza os resultados da pesquisa */}
      </div>
    </div>
  );
};

export const ViewToggle = ({ viewMode, setViewMode, resultsCount }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'} mt-6`}>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="bg-white">
          {resultsCount} resultados
        </Badge>
        
        <div className="flex items-center text-sm text-gray-500">
          <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1" />
          <span className="text-green-500">Disponível</span>
          <AlertCircle className="h-3.5 w-3.5 text-red-700 ml-3 mr-1" />
          <span className="text-red-700">Indisponível</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === 'cards' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('cards')}
          className={viewMode === 'cards' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-white'}
        >
          Cards
        </Button>
        <Button
          variant={viewMode === 'table' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('table')}
          className={viewMode === 'table' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-white'}
        >
          Tabela
        </Button>
      </div>
    </div>
  );
};

