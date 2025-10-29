# Frontend InfoVac

Este é o frontend do sistema InfoVac, uma aplicação web para gerenciamento de vacinas em UBSs.

## Tecnologias Utilizadas

- React
- Vite
- Tailwind CSS
- Shadcn/ui (componentes)
- Axios para requisições HTTP
- Zustand para gerenciamento de estado
- React Router para navegação

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── services/      # Serviços de API
│   ├── store/         # Gerenciamento de estado
│   ├── hooks/         # Hooks personalizados
│   ├── utils/         # Funções utilitárias
│   └── App.jsx        # Componente principal
├── public/            # Arquivos estáticos
├── .env               # Variáveis de ambiente
└── package.json       # Dependências e scripts
```

## Configuração do Ambiente

1. Instale as dependências:
```bash
npm install
```

2. Configure o arquivo `.env`:
```env
VITE_API_URL=http://localhost:5000
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Páginas Principais

### Login
- Página de autenticação para funcionários
- Validação de credenciais
- Redirecionamento para dashboard

### GerenciarVacinas
- Visualização de vacinas da UBS
- Atualização de status de disponibilidade
- Histórico de alterações
- Filtros e busca
- Estatísticas

### Dashboard
- Visão geral das vacinas
- Gráficos e métricas
- Ações rápidas

## Componentes Principais

### Card
- Exibe informações de vacinas
- Status de disponibilidade
- Botões de ação

### Dialog
- Confirmação de ações
- Histórico de alterações
- Estatísticas detalhadas

### Button
- Ações principais
- Variantes de estilo
- Ícones integrados

## Gerenciamento de Estado

O estado da aplicação é gerenciado usando Zustand, com os seguintes stores:

### useStore
- Autenticação do usuário
- Dados da UBS
- Estado global da aplicação

## Serviços

### vacinaService
- Busca de vacinas
- Atualização de status
- Histórico de alterações

### authService
- Login
- Registro
- Validação de token

## Estilização

- Tailwind CSS para estilos base
- Shadcn/ui para componentes
- Temas personalizados
- Responsividade

## Funcionalidades

- Autenticação segura
- Gerenciamento de vacinas
- Histórico de alterações
- Filtros e busca
- Estatísticas
- Interface responsiva
- Feedback visual de ações

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Previa build de produção
- `npm run lint` - Executa linter
- `npm run format` - Formata código
