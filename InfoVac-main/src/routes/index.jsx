import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import Colaborador from "../pages/Colaborador";
import GerenciarVacinas from "../pages/GerenciarVacinas";
import AlterarSenha from '@/pages/AlterarSenha';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: 'colaborador',
        element: <Colaborador />
      },
      {
        path: 'gerenciar-vacinas',
        element: <GerenciarVacinas />
      },
      {
        path: '/alterar-senha',
        element: <AlterarSenha />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router; 