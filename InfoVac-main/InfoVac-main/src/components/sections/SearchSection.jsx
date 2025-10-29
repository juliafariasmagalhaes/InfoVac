import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchFilters, ViewToggle } from './ubs-section/SearchFilters';
import UBSCardView from './ubs-section/UBSCardView';
import UBSTableView from './ubs-section/UBSTableView';
import EmptyResults from './ubs-section/EmptyResults';
import api from '@/services/api';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVaccine, setFilterVaccine] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [viewMode, setViewMode] = useState('cards');
  const [ubsData, setUbsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Buscar dados das UBSs
  useEffect(() => {
    const fetchUBSData = async () => {
      try {
        const { data } = await api.get('/api/ubs');
        
        // Buscar vacinas para cada UBS
        const ubsWithVaccines = await Promise.all(
          data.map(async (ubs) => {
            const { data: vacinasData } = await api.get(`/api/ubs/${ubs.id}/vacinas`);
            
            // Transformar o formato das vacinas para o formato esperado pelo frontend
            const vaccines = vacinasData.vacinas.reduce((acc, vacina) => {
              acc[vacina.nome] = vacina.status === 'Disponível';
              return acc;
            }, {});
            
            return {
              id: ubs.id,
              name: ubs.nome,
              address: ubs.endereco,
              status: ubs.status,
              openingHours: `${ubs.hora_abertura} - ${ubs.hora_fechamento}`,
              coordinates: {
                lat: -5.0892, // Manter coordenadas estáticas por enquanto
                lng: -42.8092
              },
              vaccines
            };
          })
        );
        
        setUbsData(ubsWithVaccines);
        setSearchResults(ubsWithVaccines);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUBSData();
  }, []);
  
  const handleSearch = useCallback(() => {
    let results = ubsData;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(ubs => 
        ubs.name.toLowerCase().includes(query) || 
        ubs.address.toLowerCase().includes(query)
      );
    }
    
    if (filterVaccine !== 'all') {
      results = results.filter(ubs => ubs.vaccines[filterVaccine]);
    }
    
    if (filterCity !== 'all') {
      results = results.filter(ubs => ubs.address.includes(filterCity));
    }
    
    setSearchResults(results);
  }, [ubsData, searchQuery, filterVaccine, filterCity]);

  // Obter lista única de vacinas e cidades
  const vaccinesList = Array.from(
    new Set(
      ubsData.flatMap(ubs => Object.keys(ubs.vaccines || {}))
    )
  ).sort();

  const citiesList = Array.from(
    new Set(
      ubsData.map(ubs => {
        const parts = ubs.address.split(' - ');
        const cityState = parts.length >= 3 ? parts[parts.length - 2].trim() : '';
        return cityState;
      })
    )
  ).filter(Boolean).sort();
  

  if (loading) {
    return (
      <section id="search" className="py-24 px-6 bg-gradient-to-b from-white to-teal-50/30">
        <div className="max-w-6xl mx-auto text-center">
          <p>Carregando dados...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="search" className="py-24 px-6 bg-gradient-to-b from-white to-teal-50/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-500">Erro: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="search" className="py-24 px-6 bg-gradient-to-b from-white to-teal-50/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 mb-4 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
            Pesquisa avançada
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Encontre a vacina que você precisa</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pesquise por nome da UBS ou selecione o tipo de vacina para ver onde está disponível.
          </p>
        </div>
        
        <Card className="glass-card bg-white/80 backdrop-blur-lg border-gray-100 shadow-sm mb-10">
          <CardHeader>
            <CardTitle className="text-xl">Filtrar vacinas</CardTitle>
          </CardHeader>
          <CardContent>
            <SearchFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterVaccine={filterVaccine}
              setFilterVaccine={setFilterVaccine}
              filterCity={filterCity}
              setFilterCity={setFilterCity}
              handleSearch={handleSearch}
              vaccinesList={vaccinesList}
              citiesList={citiesList}
            />
            
            <ViewToggle
              viewMode={viewMode}
              setViewMode={setViewMode}
              resultsCount={searchResults.length}
            />
          </CardContent>
        </Card>
        
        {viewMode === 'cards' ? (
          <UBSCardView searchResults={searchResults} />
        ) : (
          <UBSTableView searchResults={searchResults} />
        )}
        
        {searchResults.length === 0 && <EmptyResults />}
      </div>
    </section>
  );
};

export default SearchSection; 
