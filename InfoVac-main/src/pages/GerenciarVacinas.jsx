import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { vacinaService } from '@/services/vacinaService';
import { 
  ChevronRight, 
  Check, 
  X, 
  Home, 
  Syringe, 
  Search, 
  Save, 
  CircleAlert, 
  CheckCircle2,
  ClipboardList,
  Clock,
  CalendarClock,
  Filter,
  AlertTriangle,
  BarChart3
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useStore from '@/store/useStore';

const GerenciarVacinas = () => {
  const navigate = useNavigate();
  const [showVaccineManager, setShowVaccineManager] = useState(false);
  const [vaccineStatus, setVaccineStatus] = useState([]);
  const [pendingChanges, setPendingChanges] = useState([]);
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [changes, setChanges] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [changeHistory, setChangeHistory] = useState([]);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [currentVaccine, setCurrentVaccine] = useState(null);
  const [showStatsDialog, setShowStatsDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const user = useStore(state => state.user);

  // Ordem específica das vacinas
  const VACCINE_ORDER = [
    'DTP - Tríplice Bacteriana (Difteria, Tétano, Coqueluche)',
    'Dupla Adulto (Difteria e Tétano)',
    'Febre Amarela',
    'Hepatite A',
    'Hepatite B',
    'Inativada Poliomielite',
    'Meningocócica ACWY',
    'Meningocócica C',
    'Oral Poliomielite',
    'Oral Rotavírus humano',
    'Papiloma Vírus Humano Quadrivalente',
    'Pentavalente (DTP/HB/Hib)',
    'Pneumocócica 10 Valente',
    'SCR - Tríplice Viral (Sarampo, Caxumba e Rubéola)',
    'Varicela'
  ];

  // Verificar autenticação
  useEffect(() => {
    if (!user) {
      navigate('/colaborador');
      return;
    }
  }, [user, navigate]);

  // Carregar vacinas
  useEffect(() => {
    const loadVacinas = async () => {
      if (!user?.id_ubs) {
        return;
      }
      try {
        setLoading(true);
        const disponibilidade = await vacinaService.getDisponibilidadeVacinas();
        setVaccineStatus(disponibilidade);
      } catch (error) {
        toast({
          title: "Erro ao carregar vacinas",
          description: "Não foi possível carregar o status das vacinas.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    loadVacinas();
  }, [user]);

  // Recuperar o histórico específico de uma vacina
  const getVaccineHistory = (vaccineName) => {
    return changeHistory
      .filter(h => h.vaccine === vaccineName)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  // Carregar histórico
  useEffect(() => {
    const loadHistorico = async () => {
      try {
        const historico = await vacinaService.getHistorico();
        setChangeHistory(historico);
      } catch (error) {
        toast({
          title: "Erro ao carregar histórico",
          description: "Não foi possível carregar o histórico de alterações.",
          variant: "destructive",
        });
      }
    };
    loadHistorico();
  }, []);

  const handleVaccineSelect = (vaccine) => {
    setSelectedVaccines(prev => 
      prev.includes(vaccine) 
        ? prev.filter(v => v !== vaccine) 
        : [...prev, vaccine]
    );
  };

  const handleStatusChange = async (vaccine, status) => {
    setPendingChanges(prev => {
      const existingChange = prev.find(change => change.id === vaccine.id);
      if (existingChange) {
        return prev.map(change => 
          change.id === vaccine.id ? { ...change, available: status } : change
        );
      }
      return [...prev, { ...vaccine, available: status }];
    });

    setVaccineStatus(prev => 
      prev.map(v => v.id === vaccine.id ? { ...v, available: status } : v)
    );
  };

  // Atualizar histórico após salvar alterações
  const saveChanges = async () => {
    try {
      setLoading(true);
      for (const change of pendingChanges) {
        await vacinaService.atualizarDisponibilidade(change.id, change.available);
      }
      
      // Recarregar o histórico após salvar as alterações
      const historico = await vacinaService.getHistorico();
      setChangeHistory(historico);
      setPendingChanges([]);
      
      toast({
        title: "Alterações salvas",
        description: "As alterações foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getVaccineCurrentStatus = (vaccine) => {
    const currentStatus = vaccineStatus.find(v => v.id === vaccine.id);
    return currentStatus ? currentStatus.available : false;
  };

  // Filtrar vacinas com base na pesquisa e no filtro selecionado
  const filteredVaccines = vaccineStatus
    .filter(vaccine => {
      const matchesSearch = vaccine.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (filterType === 'all') return matchesSearch;
      if (filterType === 'available') return matchesSearch && getVaccineCurrentStatus(vaccine);
      if (filterType === 'unavailable') return matchesSearch && !getVaccineCurrentStatus(vaccine);
      return matchesSearch;
    })
    .sort((a, b) => {
      const indexA = VACCINE_ORDER.indexOf(a.name);
      const indexB = VACCINE_ORDER.indexOf(b.name);
      return indexA - indexB;
    });

  // Função para formatar data/hora do histórico
  function formatarDataHora(dateString) {
    if (!dateString) return '';
    // Se já vier no formato ISO, só garantir que tenha o 'T'
    let data = dateString;
    if (!dateString.includes('T')) {
      // Se vier separado, junta
      data = dateString.replace(' ', 'T');
    }
    const d = new Date(data);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="text-teal-600">Info</span>Vac - Gerenciamento
          </h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                useStore.getState().logout();
                navigate('/colaborador');
              }}
              className="border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              Sair
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              asChild
              className="border-teal-200 hover:bg-teal-50 hover:text-teal-700"
            >
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Voltar ao início
              </Link>
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
            <p className="text-gray-600">Carregando dados...</p>
          </div>
        ) : (
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  UBS: {user?.nome_ubs || 'Carregando...'}
                </h2>
                <p className="text-sm text-gray-500">
                  Funcionário: {user?.nome || 'Carregando...'}
                </p>
              </div>
              
              {!showVaccineManager ? (
                <div className="flex flex-col space-y-6">
                  <div className="bg-gradient-to-r from-teal-500/10 to-teal-600/10 text-teal-800 p-6 rounded-lg shadow-sm border border-teal-100">
                    <h2 className="text-xl font-medium mb-2 text-teal-700">Olá, colaborador!</h2>
                    <p className="text-teal-600">Bem-vindo ao sistema de gerenciamento de vacinas.</p>
                    <p className="mt-2 text-teal-600">Como posso ajudar você hoje?</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={() => setShowVaccineManager(true)}
                      variant="gradient"
                      className="flex-1 py-6"
                    >
                      <Syringe className="mr-2 h-5 w-5" />
                      Alterar disponibilidade de vacinas
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                    
                    <Button 
                      onClick={() => setShowHistoryDialog(true)}
                      variant="outline"
                      className="flex-1 py-6 border-teal-200 hover:bg-teal-50"
                    >
                      <ClipboardList className="mr-2 h-5 w-5 text-teal-600" />
                      Ver histórico de alterações
                    </Button>
                    
                    <Button 
                      onClick={() => setShowStatsDialog(true)}
                      variant="outline"
                      className="flex-1 py-6 border-teal-200 hover:bg-teal-50"
                    >
                      <BarChart3 className="mr-2 h-5 w-5 text-teal-600" />
                      Estatísticas
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-lg shadow-md">
                    <p className="text-white font-medium">Selecione as vacinas para modificar sua disponibilidade:</p>
                    
                    {/* Contador de estatísticas */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white">
                        Total: {vaccineStatus.length}
                      </Badge>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Disponíveis: {vaccineStatus.filter(v => v.available).length}
                      </Badge>
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        <CircleAlert className="h-3 w-3 mr-1" />
                        Indisponíveis: {vaccineStatus.filter(v => !v.available).length}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 items-center">
                    {/* Barra de pesquisa */}
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Pesquisar vacina por nome..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery && (
                        <button 
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          onClick={() => setSearchQuery('')}
                        >
                          <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    </div>
                    
                    {/* Botão de filtro */}
                    <Button
                      variant="outline"
                      className="border-teal-200 hover:bg-teal-50"
                      onClick={() => setFiltersOpen(!filtersOpen)}
                    >
                      <Filter className={`h-4 w-4 ${filtersOpen ? 'text-teal-600' : 'text-gray-500'}`} />
                      Filtrar
                      {filterType !== 'all' && (
                        <Badge variant="outline" className="ml-2 bg-teal-50 text-teal-700">
                          {filterType === 'available' ? 'Disponíveis' : 'Indisponíveis'}
                        </Badge>
                      )}
                    </Button>
                  </div>
                  
                  {/* Filtros */}
                  {filtersOpen && (
                    <div className="bg-teal-50 p-4 rounded-md border border-teal-100 flex gap-2">
                      <Button
                        variant={filterType === 'all' ? "gradient" : "outline"}
                        size="sm"
                        onClick={() => setFilterType('all')}
                        className={filterType !== 'all' ? "border-teal-200" : ""}
                      >
                        Todas
                      </Button>
                      <Button
                        variant={filterType === 'available' ? "gradient" : "outline"}
                        size="sm"
                        onClick={() => setFilterType('available')}
                        className={filterType !== 'available' ? "border-teal-200" : ""}
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Disponíveis
                      </Button>
                      <Button
                        variant={filterType === 'unavailable' ? "gradient" : "outline"}
                        size="sm"
                        onClick={() => setFilterType('unavailable')}
                        className={filterType !== 'unavailable' ? "border-teal-200" : ""}
                      >
                        <CircleAlert className="h-3 w-3 mr-1" />
                        Indisponíveis
                      </Button>
                    </div>
                  )}
                  
                  <ScrollArea className="h-[320px] rounded-md border p-4">
                    <div className="grid grid-cols-1 gap-4">
                      {filteredVaccines.map((vaccine) => (
                        <Card 
                          key={vaccine.id} 
                          className={`border transition-all duration-200 hover:shadow-md ${
                            getVaccineCurrentStatus(vaccine) 
                              ? 'border-gray-200 hover:border-teal-300' 
                              : 'border-red-200 bg-red-50 hover:border-red-300'
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                              <div className="flex items-center">
                                <div>
                                  <p className="font-medium">{vaccine.name}</p>
                                  <div className="flex items-center mt-1">
                                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                                      getVaccineCurrentStatus(vaccine) 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-50 text-red-800'}`}>
                                      {getVaccineCurrentStatus(vaccine) ? 'Disponível' : 'Indisponível'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 w-full sm:w-auto">
                                {vaccine.lastUpdated && (
                                  <span className="text-xs text-gray-500 hidden sm:inline-flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Atualizado: {formatarDataHora(vaccine.lastUpdated)}
                                  </span>
                                )}
                                
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-teal-200 hover:bg-teal-50"
                                  onClick={() => {
                                    setCurrentVaccine(vaccine.name);
                                    setShowHistoryDialog(true);
                                  }}
                                >
                                  <ClipboardList className="h-3 w-3" />
                                </Button>
                                
                                <div className="mt-2 sm:mt-0 w-full sm:w-auto">
                                  <div className="flex flex-row items-center justify-between bg-white p-2 rounded-md shadow-sm min-h-[40px] min-w-[200px]">
                                    <div className="w-[90px]">
                                      <span className={`text-xs sm:text-sm font-medium ${getVaccineCurrentStatus(vaccine) ? 'text-green-600' : 'text-red-600'}`}>
                                        {getVaccineCurrentStatus(vaccine) ? 'Disponível' : 'Indisponível'}
                                      </span>
                                    </div>
                                    <Switch
                                      checked={getVaccineCurrentStatus(vaccine)}
                                      onCheckedChange={(checked) => handleStatusChange(vaccine, checked)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      {filteredVaccines.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
                          <Search className="h-12 w-12 text-gray-300 mb-2" />
                          <p className="font-medium">Nenhuma vacina encontrada</p>
                          <p className="text-sm">Tente outro termo de pesquisa</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                      onClick={() => {
                        setShowVaccineManager(false);
                        setSelectedVaccines([]);
                        setSearchQuery('');
                        setFilterType('all');
                        setFiltersOpen(false);
                        setPendingChanges([]);
                      }}
                    >
                      Cancelar
                    </Button>
                    
                    {pendingChanges.length > 0 && (
                      <Button
                        variant="gradient"
                        onClick={saveChanges}
                        disabled={loading}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Alterações ({pendingChanges.length})
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Diálogo de Histórico */}
      <Dialog open={showHistoryDialog} onOpenChange={(open) => {
        setShowHistoryDialog(open);
        if (!open) setCurrentVaccine(null);
      }}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ClipboardList className="h-5 w-5 mr-2 text-teal-600" />
              {currentVaccine ? `Histórico da Vacina: ${currentVaccine}` : 'Histórico de Alterações'}
            </DialogTitle>
          </DialogHeader>
          
          {currentVaccine ? (
            // Histórico específico de uma vacina
            <div className="py-4">
              <div className="mb-4 p-3 bg-teal-50 rounded-md border border-teal-100">
                <h3 className="font-medium text-teal-800 mb-1">Vacina: {currentVaccine}</h3>
                <p className="text-sm text-teal-600">Histórico de alterações de disponibilidade</p>
              </div>
              
              {getVaccineHistory(currentVaccine).length > 0 ? (
                <ScrollArea className="h-[300px] rounded-md border p-4">
                  <div className="space-y-3">
                    {getVaccineHistory(currentVaccine).map((entry, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                        <div className="flex items-center">
                          <CalendarClock className="h-4 w-4 text-teal-500 mr-2" />
                          <div>
                            <span className="text-sm text-gray-600">{formatarDataHora(entry.date)}</span>
                            <p className="text-xs text-gray-500">Por: {entry.funcionario}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs flex items-center
                            ${entry.statusAnterior === 'Disponível' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-50 text-red-800'}`}
                          >
                            {entry.statusAnterior === 'Disponível' 
                              ? <><CheckCircle2 className="h-3 w-3 mr-1" />Disponível</>
                              : <><CircleAlert className="h-3 w-3 mr-1" />Indisponível</>
                            }
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                          <span className={`px-2 py-1 rounded-full text-xs flex items-center
                            ${entry.statusAtual === 'Disponível' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-50 text-red-800'}`}
                          >
                            {entry.statusAtual === 'Disponível' 
                              ? <><CheckCircle2 className="h-3 w-3 mr-1" />Disponível</>
                              : <><CircleAlert className="h-3 w-3 mr-1" />Indisponível</>
                            }
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
                  <AlertTriangle className="h-12 w-12 text-gray-300 mb-2" />
                  <p className="font-medium">Nenhum histórico encontrado</p>
                  <p className="text-sm">Esta vacina não possui alterações recentes</p>
                </div>
              )}
            </div>
          ) : (
            // Histórico global de todas as vacinas
            <div className="py-4">
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-3">
                  {changeHistory.length > 0 ? (
                    changeHistory.map((entry, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium">{entry.vaccine}</p>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-600">{formatarDataHora(entry.date)}</span>
                            <span className="text-xs text-gray-500">Por: {entry.funcionario}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs flex items-center
                            ${entry.statusAnterior === 'Disponível' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-50 text-red-800'}`}
                          >
                            {entry.statusAnterior === 'Disponível' 
                              ? <><CheckCircle2 className="h-3 w-3 mr-1" />Disponível</>
                              : <><CircleAlert className="h-3 w-3 mr-1" />Indisponível</>
                            }
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                          <span className={`px-2 py-1 rounded-full text-xs flex items-center
                            ${entry.statusAtual === 'Disponível' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-50 text-red-800'}`}
                          >
                            {entry.statusAtual === 'Disponível' 
                              ? <><CheckCircle2 className="h-3 w-3 mr-1" />Disponível</>
                              : <><CircleAlert className="h-3 w-3 mr-1" />Indisponível</>
                            }
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
                      <ClipboardList className="h-12 w-12 text-gray-300 mb-2" />
                      <p className="font-medium">Nenhuma alteração registrada</p>
                      <p className="text-sm">As alterações de disponibilidade aparecerão aqui</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowHistoryDialog(false);
                setCurrentVaccine(null);
              }}
              className="border-teal-200 hover:bg-teal-50"
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo de Estatísticas */}
      <Dialog open={showStatsDialog} onOpenChange={setShowStatsDialog}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-teal-600" />
              Estatísticas de Vacinas
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-1 mb-4">
                <TabsTrigger value="summary">Resumo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">Total</p>
                        <p className="text-3xl font-bold text-teal-600">{vaccineStatus.length}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">Disponíveis</p>
                        <p className="text-3xl font-bold text-green-600">{vaccineStatus.filter(v => v.available).length}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">Indisponíveis</p>
                        <p className="text-3xl font-bold text-red-600">{vaccineStatus.filter(v => !v.available).length}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">Alterações</p>
                        <p className="text-3xl font-bold text-blue-600">{changeHistory.length}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardContent className="pt-6">
                    <p className="font-medium mb-4">Disponibilidade atual</p>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                      <div 
                        className="bg-gradient-to-r from-teal-500 to-teal-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${(vaccineStatus.filter(v => v.available).length / vaccineStatus.length) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      {Math.round((vaccineStatus.filter(v => v.available).length / vaccineStatus.length) * 100)}% disponíveis
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowStatsDialog(false)}
              className="border-teal-200 hover:bg-teal-50"
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GerenciarVacinas;
