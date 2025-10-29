import api from './api';
import useStore from '@/store/useStore';

export const vacinaService = {
  // Buscar disponibilidade de vacinas da UBS do usuário
  getDisponibilidadeVacinas: async () => {
    try {
      const user = useStore.getState().user;
      if (!user?.id_ubs) {
        throw new Error('Funcionário não está associado a uma UBS');
      }
      const response = await api.get(`/api/ubs/${user.id_ubs}/vacinas`);
      if (!response.data || !response.data.vacinas) {
        throw new Error('Resposta inválida do servidor');
      }
      const vacinas = response.data.vacinas.map(vacina => ({
        id: vacina.id,
        name: vacina.nome,
        available: vacina.status === 'Disponível',
        lastUpdated: new Date().toISOString()
      }));
      return vacinas;
    } catch (error) {
      throw error;
    }
  },

  // Atualizar disponibilidade de uma vacina na UBS do usuário
  atualizarDisponibilidade: async (vacinaId, status) => {
    try {
      const user = useStore.getState().user;
      if (!user?.id_ubs) {
        throw new Error('Funcionário não está associado a uma UBS');
      }
      const response = await api.put(`/api/ubs/${user.id_ubs}/vacinas/${vacinaId}`, {
        status: status ? 'Disponível' : 'Indisponível',
        cpf_funcionario: user.cpf
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar histórico de atualizações da UBS do usuário
  getHistorico: async () => {
    try {
      const user = useStore.getState().user;
      if (!user?.id_ubs) {
        throw new Error('Funcionário não está associado a uma UBS');
      }
      const response = await api.get(`/api/ubs/${user.id_ubs}/historico`);
      return response.data.map(historico => ({
        vaccine: historico.nome_vacina,
        funcionario: historico.nome_funcionario,
        date: `${historico.data}T${historico.hora}`,
        statusAnterior: historico.status_anterior,
        statusAtual: historico.status_atual
      }));
    } catch (error) {
      throw error;
    }
  },

  // Buscar todas as vacinas cadastradas
  getVacinas: async () => {
    try {
      const response = await api.get('/api/vacinas');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 