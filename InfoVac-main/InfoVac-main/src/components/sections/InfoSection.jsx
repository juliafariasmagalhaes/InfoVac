import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  Users, 
  ShieldCheck, 
  HelpCircle,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

const InfoSection = () => {
  const [activeTab, setActiveTab] = useState('faq');
  
  return (
    <section id="info" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 mb-4 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
            Informações úteis
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Mais sobre vacinas</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Consulte informações importantes sobre calendário de vacinação e tire suas dúvidas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-8">
          <div className="flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-visible py-2 lg:py-0">
            <Card 
              className={`flex-shrink-0 cursor-pointer transition-all ${activeTab === 'faq' ? 
                'bg-teal-600 text-white shadow-md' : 
                'bg-white hover:bg-gray-50'}`}
              onClick={() => setActiveTab('faq')}
            >
              <CardContent className="flex items-center p-4 gap-3">
                <HelpCircle className="h-5 w-5" />
                <div>
                  <h3 className="font-medium">Perguntas frequentes</h3>
                  <p className={`text-sm ${activeTab === 'faq' ? 'text-white/80' : 'text-gray-500'}`}>
                    Tire suas dúvidas
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto" />
              </CardContent>
            </Card>
            
            <Card 
              className={`flex-shrink-0 cursor-pointer transition-all ${activeTab === 'calendar' ? 
                'bg-teal-600 text-white shadow-md' : 
                'bg-white hover:bg-gray-50'}`}
              onClick={() => setActiveTab('calendar')}
            >
              <CardContent className="flex items-center p-4 gap-3">
                <Calendar className="h-5 w-5" />
                <div>
                  <h3 className="font-medium">Calendário de vacinação</h3>
                  <p className={`text-sm ${activeTab === 'calendar' ? 'text-white/80' : 'text-gray-500'}`}>
                    Por idade e grupos
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto" />
              </CardContent>
            </Card>
            
            <Card 
              className={`flex-shrink-0 cursor-pointer transition-all ${activeTab === 'groups' ? 
                'bg-teal-600 text-white shadow-md' : 
                'bg-white hover:bg-gray-50'}`}
              onClick={() => setActiveTab('groups')}
            >
              <CardContent className="flex items-center p-4 gap-3">
                <Users className="h-5 w-5" />
                <div>
                  <h3 className="font-medium">Grupos prioritários</h3>
                  <p className={`text-sm ${activeTab === 'groups' ? 'text-white/80' : 'text-gray-500'}`}>
                    Quem tem prioridade
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto" />
              </CardContent>
            </Card>
            
            <Card 
              className={`flex-shrink-0 cursor-pointer transition-all ${activeTab === 'importance' ? 
                'bg-teal-600 text-white shadow-md' : 
                'bg-white hover:bg-gray-50'}`}
              onClick={() => setActiveTab('importance')}
            >
              <CardContent className="flex items-center p-4 gap-3">
                <ShieldCheck className="h-5 w-5" />
                <div>
                  <h3 className="font-medium">Importância da vacinação</h3>
                  <p className={`text-sm ${activeTab === 'importance' ? 'text-white/80' : 'text-gray-500'}`}>
                    Por que vacinar
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto" />
              </CardContent>
            </Card>
            
            <Card 
              className={`flex-shrink-0 cursor-pointer transition-all ${activeTab === 'side-effects' ? 
                'bg-teal-600 text-white shadow-md' : 
                'bg-white hover:bg-gray-50'}`}
              onClick={() => setActiveTab('side-effects')}
            >
              <CardContent className="flex items-center p-4 gap-3">
                <AlertTriangle className="h-5 w-5" />
                <div>
                  <h3 className="font-medium">Efeitos colaterais</h3>
                  <p className={`text-sm ${activeTab === 'side-effects' ? 'text-white/80' : 'text-gray-500'}`}>
                    O que esperar
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 ml-auto" />
              </CardContent>
            </Card>
          </div>
          
          <div className="glass-card p-6 md:p-8 bg-white rounded-xl shadow-sm min-h-[500px]">
            {activeTab === 'faq' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-medium mb-6">Perguntas frequentes</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">
                      Como sei quais vacinas estão disponíveis na UBS mais próxima?
                    </AccordionTrigger>
                    <AccordionContent>
                      Você pode usar a função "Buscar Vacinas" na página inicial e buscar pela UBS desejada
                      na seção de pesquisa. O sistema mostrará quais vacinas estão disponíveis em cada unidade.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left">
                      Preciso agendar para tomar vacina?
                    </AccordionTrigger>
                    <AccordionContent>
                      Geralmente não é necessário agendamento para vacinas de rotina, mas algumas campanhas 
                      específicas podem requerer agendamento prévio. Recomendamos verificar junto à UBS escolhida.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left">
                      Quais documentos preciso levar para me vacinar?
                    </AccordionTrigger>
                    <AccordionContent>
                      É necessário levar um documento de identificação com foto, cartão SUS (se tiver) e a 
                      caderneta de vacinação. Para crianças, é importante levar a caderneta de vacinação infantil.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left">
                      Com que frequência os dados de disponibilidade são atualizados?
                    </AccordionTrigger>
                    <AccordionContent>
                      Os dados são atualizados em tempo real conforme as UBSs informam a disponibilidade
                      de seus estoques através de um sistema integrado.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-left">
                      Posso tomar mais de uma vacina no mesmo dia?
                    </AccordionTrigger>
                    <AccordionContent>
                      Sim, na maioria dos casos é possível tomar múltiplas vacinas no mesmo dia. Os profissionais 
                      de saúde na UBS poderão orientar sobre quais vacinas podem ser administradas simultaneamente.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
            
            {activeTab === 'calendar' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-medium mb-6">Calendário Nacional de Vacinação</h3>
                
                <div className="mb-8">
                  <h4 className="text-lg font-medium mb-3 text-teal-700">Crianças (0 a 10 anos)</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="bg-teal-100 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                      <div>
                        <span className="font-medium">Ao nascer:</span> BCG, Hepatite B
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-teal-100 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                      <div>
                        <span className="font-medium">2 meses:</span> Pentavalente, VIP, Pneumocócica 10, Rotavírus
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-teal-100 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                      <div>
                        <span className="font-medium">4 meses:</span> Pentavalente, VIP, Pneumocócica 10, Rotavírus
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-teal-100 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                      <div>
                        <span className="font-medium">6 meses:</span> Pentavalente, VIP, Covid-19
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-teal-100 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                      <div>
                        <span className="font-medium">9 meses:</span> Febre Amarela
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-teal-100 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                      <div>
                        <span className="font-medium">12 meses:</span> Tríplice Viral, Pneumocócica 10, Meningocócica C
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-teal-100 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                      <div>
                        <span className="font-medium">15 meses:</span> DTP, VIP, Hepatite A, Tetra Viral
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-3 text-teal-700">Adolescentes (11 a 19 anos)</h4>
                  <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                      <span className="bg-teal-100 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                      <div>
                        <span className="font-medium">A qualquer tempo:</span> Hepatite B, Difteria e Tetáno, Febre Amarela, Tríplice Viral
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-teal-100 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">•</span>
                      <div>
                        <span className="font-medium">11 a 14 anos:</span> HPV (2 doses), Meningocócica ACWY
                        <div> <br /> </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'groups' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-medium mb-6">Grupos Prioritários</h3>
                <div className="space-y-6">
                  <div className="p-5 border border-teal-200 bg-teal-50 rounded-xl">
                    <h4 className="text-lg font-medium mb-3 text-teal-700">Crianças e Adolescentes</h4>
                    <p className="text-gray-700">
                      Crianças e adolescentes são considerados grupos prioritários para vacinação, pois são mais 
                      vulneráveis a certas doenças. É importante seguir o calendário de vacinação específico para 
                      cada faixa etária.
                    </p>
                  </div>
                  
                  <div className="p-5 border border-teal-200 bg-teal-50 rounded-xl">
                    <h4 className="text-lg font-medium mb-3 text-teal-700">Idosos</h4>
                    <p className="text-gray-700">
                      Pessoas com 60 anos ou mais têm prioridade na vacinação, pois são mais suscetíveis a 
                      complicações de doenças. Vacinas como gripe e pneumocócica são especialmente importantes.
                    </p>
                  </div>
                  
                  <div className="p-5 border border-teal-200 bg-teal-50 rounded-xl">
                    <h4 className="text-lg font-medium mb-3 text-teal-700">Profissionais de Saúde</h4>
                    <p className="text-gray-700">
                      Profissionais de saúde têm prioridade na vacinação para garantir sua proteção e evitar 
                      a transmissão de doenças aos pacientes.
                    </p>
                  </div>
                  
                  <div className="p-5 border border-teal-200 bg-teal-50 rounded-xl">
                    <h4 className="text-lg font-medium mb-3 text-teal-700">Pessoas com Comorbidades</h4>
                    <p className="text-gray-700">
                      Pessoas com condições médicas pré-existentes que podem agravar o quadro de doenças 
                      infecciosas também são consideradas prioritárias.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'importance' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-medium mb-6">Importância da Vacinação</h3>
                <div className="space-y-6">
                  <div className="p-5 border border-teal-200 bg-teal-50 rounded-xl">
                    <h4 className="text-lg font-medium mb-3 text-teal-700">Proteção Individual</h4>
                    <p className="text-gray-700">
                      As vacinas protegem o indivíduo contra doenças graves e suas complicações, reduzindo 
                      significativamente o risco de hospitalização e morte.
                    </p>
                  </div>
                  
                  <div className="p-5 border border-teal-200 bg-teal-50 rounded-xl">
                    <h4 className="text-lg font-medium mb-3 text-teal-700">Proteção Coletiva</h4>
                    <p className="text-gray-700">
                      A vacinação em massa cria imunidade de rebanho, protegendo também pessoas que não podem 
                      ser vacinadas por razões médicas.
                    </p>
                  </div>
                  
                  <div className="p-5 border border-teal-200 bg-teal-50 rounded-xl">
                    <h4 className="text-lg font-medium mb-3 text-teal-700">Eliminação de Doenças</h4>
                    <p className="text-gray-700">
                      A vacinação em massa já erradicou doenças como varíola e está próxima de eliminar outras 
                      como poliomielite em várias regiões do mundo.
                    </p>
                  </div>
                  
                  <div className="p-5 border border-teal-200 bg-teal-50 rounded-xl">
                    <h4 className="text-lg font-medium mb-3 text-teal-700">Custo-Efetividade</h4>
                    <p className="text-gray-700">
                      A vacinação é uma das intervenções de saúde mais custo-efetivas, prevenindo doenças 
                      que podem resultar em tratamentos caros e longos.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'side-effects' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-medium mb-6">Efeitos Colaterais</h3>
                <div className="space-y-6">
                  <div className="p-5 border border-teal-200 bg-teal-50 rounded-xl">
                    <h4 className="text-lg font-medium mb-3 text-teal-700">Efeitos Comuns</h4>
                    <p className="text-gray-700">
                      Os efeitos colaterais mais comuns são leves e temporários, incluindo dor no local da 
                      aplicação, febre baixa e mal-estar geral. Estes sintomas geralmente desaparecem em 
                      1-2 dias.
                    </p>
                  </div>
                  
                  <div className="p-5 border border-teal-200 bg-teal-50 rounded-xl">
                    <h4 className="text-lg font-medium mb-3 text-teal-700">Efeitos Raros</h4>
                    <p className="text-gray-700">
                      Efeitos colaterais graves são muito raros. Se ocorrerem, geralmente aparecem logo após 
                      a vacinação. É importante permanecer na unidade de saúde por 15-30 minutos após a 
                      aplicação.
                    </p>
                  </div>
                  
                  <div className="p-5 border border-teal-200 bg-teal-50 rounded-xl">
                    <h4 className="text-lg font-medium mb-3 text-teal-700">Quando Buscar Ajuda</h4>
                    <p className="text-gray-700">
                      Procure atendimento médico se apresentar febre alta, reações alérgicas graves ou 
                      qualquer outro sintoma preocupante após a vacinação.
                    </p>
                  </div>
                  
                  <div className="p-5 border border-teal-200 bg-teal-50 rounded-xl">
                    <h4 className="text-lg font-medium mb-3 text-teal-700">Prevenção</h4>
                    <p className="text-gray-700">
                      Para minimizar os efeitos colaterais, mantenha-se bem hidratado, evite exercícios 
                      intensos no dia da vacinação e use compressas frias no local da aplicação se necessário.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection; 
