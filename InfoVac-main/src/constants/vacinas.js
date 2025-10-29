// Dados das UBSs de Teresina
const ubsData = [
  {
    id: 1,
    nome: 'UBS Vila Bandeirante',
    endereco: 'Rua 27, S/N - Vila Bandeirante - Teresina/Piauí - 64000-001'
  },
  {
    id: 2,
    nome: 'UBS Parque Piauí',
    endereco: 'Av. Principal, S/N - Parque Piauí - Teresina/Piauí - 64000-002'
  },
  {
    id: 3,
    nome: 'UBS Satélite',
    endereco: 'Rua 15, S/N - Satélite - Teresina/Piauí - 64000-003'
  },
  {
    id: 4,
    nome: 'UBS Renascença',
    endereco: 'Rua 25, S/N - Renascença - Teresina/Piauí - 64000-004'
  },
  {
    id: 5,
    nome: 'UBS Santa Maria da Codipi',
    endereco: 'Rua Principal, S/N - Santa Maria da Codipi - Teresina/Piauí - 64000-005'
  },
  {
    id: 6,
    nome: 'UBS Vila Operária',
    endereco: 'Rua 13, S/N - Vila Operária - Teresina/Piauí - 64000-006'
  },
  // UBSs de Demerval Lobão
  {
    id: 7,
    nome: 'UBS Centro de Demerval Lobão',
    endereco: 'Rua Principal, 123 - Centro - Demerval Lobão/Piauí - 64390-000'
  },
  {
    id: 8,
    nome: 'UBS Bairro Novo',
    endereco: 'Av. Nova, 456 - Bairro Novo - Demerval Lobão/Piauí - 64390-001'
  },
  {
    id: 9,
    nome: 'UBS Vila Progresso',
    endereco: 'Rua Progresso, 789 - Vila Progresso - Demerval Lobão/Piauí - 64390-002'
  }
];

// Dados de vacinas disponíveis
const vacinasData = [
  {
    id: 1,
    nome: 'COVID-19',
    status: 'Disponível',
    nome_ubs: 'UBS Vila Bandeirante',
    endereco: 'Rua 27, S/N - Vila Bandeirante - Teresina/Piauí - 64000-001'
  },
  {
    id: 2,
    nome: 'Gripe',
    status: 'Disponível',
    nome_ubs: 'UBS Parque Piauí',
    endereco: 'Av. Principal, S/N - Parque Piauí - Teresina/Piauí - 64000-002'
  },
  {
    id: 3,
    nome: 'Febre Amarela',
    status: 'Disponível',
    nome_ubs: 'UBS Satélite',
    endereco: 'Rua 15, S/N - Satélite - Teresina/Piauí - 64000-003'
  },
  {
    id: 4,
    nome: 'Tétano',
    status: 'Disponível',
    nome_ubs: 'UBS Renascença',
    endereco: 'Rua 25, S/N - Renascença - Teresina/Piauí - 64000-004'
  },
  {
    id: 5,
    nome: 'Hepatite B',
    status: 'Disponível',
    nome_ubs: 'UBS Santa Maria da Codipi',
    endereco: 'Rua Principal, S/N - Santa Maria da Codipi - Teresina/Piauí - 64000-005'
  },
  {
    id: 6,
    nome: 'Sarampo',
    status: 'Disponível',
    nome_ubs: 'UBS Vila Operária',
    endereco: 'Rua 13, S/N - Vila Operária - Teresina/Piauí - 64000-006'
  },
  // Vacinas para UBSs de Demerval Lobão
  {
    id: 7,
    nome: 'COVID-19',
    status: 'Disponível',
    nome_ubs: 'UBS Centro de Demerval Lobão',
    endereco: 'Rua Principal, 123 - Centro - Demerval Lobão/Piauí - 64390-000'
  },
  {
    id: 8,
    nome: 'Gripe',
    status: 'Disponível',
    nome_ubs: 'UBS Centro de Demerval Lobão',
    endereco: 'Rua Principal, 123 - Centro - Demerval Lobão/Piauí - 64390-000'
  },
  {
    id: 9,
    nome: 'Febre Amarela',
    status: 'Disponível',
    nome_ubs: 'UBS Centro de Demerval Lobão',
    endereco: 'Rua Principal, 123 - Centro - Demerval Lobão/Piauí - 64390-000'
  },
  {
    id: 10,
    nome: 'COVID-19',
    status: 'Disponível',
    nome_ubs: 'UBS Bairro Novo',
    endereco: 'Av. Nova, 456 - Bairro Novo - Demerval Lobão/Piauí - 64390-001'
  },
  {
    id: 11,
    nome: 'Tétano',
    status: 'Disponível',
    nome_ubs: 'UBS Bairro Novo',
    endereco: 'Av. Nova, 456 - Bairro Novo - Demerval Lobão/Piauí - 64390-001'
  },
  {
    id: 12,
    nome: 'Hepatite B',
    status: 'Disponível',
    nome_ubs: 'UBS Bairro Novo',
    endereco: 'Av. Nova, 456 - Bairro Novo - Demerval Lobão/Piauí - 64390-001'
  },
  {
    id: 13,
    nome: 'COVID-19',
    status: 'Disponível',
    nome_ubs: 'UBS Vila Progresso',
    endereco: 'Rua Progresso, 789 - Vila Progresso - Demerval Lobão/Piauí - 64390-002'
  },
  {
    id: 14,
    nome: 'Sarampo',
    status: 'Disponível',
    nome_ubs: 'UBS Vila Progresso',
    endereco: 'Rua Progresso, 789 - Vila Progresso - Demerval Lobão/Piauí - 64390-002'
  },
  {
    id: 15,
    nome: 'Gripe',
    status: 'Disponível',
    nome_ubs: 'UBS Vila Progresso',
    endereco: 'Rua Progresso, 789 - Vila Progresso - Demerval Lobão/Piauí - 64390-002'
  }
];

export async function buscarVacinas() {
  try {
    // Simulando um delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    return { rows: ubsData };
  } catch (error) {
    console.error('Erro ao buscar vacinas:', error);
    throw error;
  }
}

export async function buscarUBS() {
  try {
    // Simulando um delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    return { rows: ubsData };
  } catch (error) {
    console.error('Erro ao buscar UBS:', error);
    throw error;
  }
}

export async function buscarDisponibilidadeVacinas() {
  try {
    // Simulando um delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    return { rows: vacinasData };
  } catch (error) {
    console.error('Erro ao buscar disponibilidade de vacinas:', error);
    throw error;
  }
}

export async function buscarDisponibilidadePorVacina(nomeVacina) {
  try {
    // Simulando um delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    const vacinasFiltradas = vacinasData.filter(vacina => 
      vacina.nome.toLowerCase().includes(nomeVacina.toLowerCase())
    );
    return { rows: vacinasFiltradas };
  } catch (error) {
    console.error('Erro ao buscar disponibilidade por vacina:', error);
    throw error;
  }
} 