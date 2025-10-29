import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Navigation, CheckCircle, AlertCircle } from 'lucide-react';

const UBSCard = ({ ubs }) => {
  const handleViewOnMap = () => {
    // Criar URL do Google Maps com as coordenadas da UBS
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ubs.address)}`;
    window.open(mapUrl, '_blank');
  };

  // Garantir que o objeto ubs.vaccines existe e converter para array
  const vaccines = ubs.vaccines || {};
  const vaccineList = Object.entries(vaccines).map(([name, available]) => ({
    name,
    available
  }));

  // Removendo a ordenação para manter a ordem fixa
  // vaccineList.sort((a, b) => {
  //   if (a.available === b.available) return a.name.localeCompare(b.name);
  //   return b.available - a.available;
  // });

  return (
    <Card className="carousel-card glass-card border-gray-100 transition-all duration-300 hover:shadow-md animate-fade-in flex-1 min-w-0 max-w-full md:max-w-[calc(33.333%-1rem)] h-auto min-h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{ubs.name}</CardTitle>
          <Badge variant="outline" className={`${ubs.status === 'open' ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {ubs.status === 'open' ? 'Aberto' : 'Fechado'}
          </Badge>
        </div>
        <div className="flex flex-col text-sm text-gray-500">
          <div className="flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span className="truncate">{ubs.address}</span>
          </div>
          <div className="flex items-center mt-1">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{ubs.openingHours}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-medium">Vacinas</p>
          <Badge variant="outline" className="text-xs">
            {vaccineList.filter(v => v.available).length}/{vaccineList.length} disponíveis
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {vaccineList.map(({ name, available }) => (
            <div 
              key={name} 
              className={`text-sm rounded-md px-3 py-2 flex items-center justify-between font-medium ${
                available 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              <span className="truncate">{name}</span>
              {available ? (
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="mt-auto">
        <Button 
          variant="outline" 
          className="w-full gap-2 bg-white hover:bg-teal-50 hover:text-teal-700"
          onClick={handleViewOnMap}
        >
          <Navigation className="h-4 w-4" />
          Ver no mapa
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UBSCard; 