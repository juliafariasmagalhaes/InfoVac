import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import api from '@/services/api';
import useStore from '@/store/useStore';

const Colaborador = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ cpf: '', senha: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const setUser = useStore(state => state.setUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Remove qualquer caractere não numérico do CPF
      const cpfLimpo = form.cpf.replace(/\D/g, '');
      const response = await api.post('/auth/login', {
        cpf: cpfLimpo,
        senha: form.senha
      });

      // Atualiza o estado global
      setUser(response.data.user);
      
      toast({ title: "Login realizado com sucesso" });
      
      // Redireciona baseado no primeiro acesso
      if (response.data.primeiro_acesso) {
        navigate('/alterar-senha');
      } else {
        navigate('/gerenciar-vacinas');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast({ 
        title: "Erro de autenticação",
        description: error.response?.data?.error || "Verifique suas credenciais"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12 px-4 sm:px-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-teal-600">Info</span>Vac
          </h1>
          <p className="mt-2 text-gray-600">Acesso para colaboradores</p>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Login</CardTitle>
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao início
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  type="text"
                  value={form.cpf}
                  onChange={handleChange}
                  placeholder="Digite seu CPF"
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  value={form.senha}
                  onChange={handleChange}
                  placeholder="Digite sua senha"
                  disabled={loading}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Colaborador; 