import { create } from 'zustand';

const useStore = create((set) => ({
  // Estado inicial
  user: null,
  isAuthenticated: false,

  // Ações
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export default useStore; 