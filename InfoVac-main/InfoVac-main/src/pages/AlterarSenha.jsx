import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import api from '@/services/api';
import useStore from '@/store/useStore';

const AlterarSenha = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nova_senha: '', confirmar_senha: '' });
  const [loading, setLoading] = useState(false);
  const [senhasDiferentes, setSenhasDiferentes] = useState(false);
  const { toast } = useToast();
  const user = useStore(state => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Verifica se as senhas são diferentes quando o usuário digita
    if (name === 'confirmar_senha' && value !== form.nova_senha) {
      setSenhasDiferentes(true);
    } else if (name === 'nova_senha' && value !== form.confirmar_senha) {
      setSenhasDiferentes(true);
    } else {
      setSenhasDiferentes(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verifica se as senhas coincidem
      if (form.nova_senha !== form.confirmar_senha) {
        toast({ 
          title: "Atenção",
          description: "As senhas não estão iguais. Por favor, verifique e tente novamente."
        });
        setSenhasDiferentes(true);
        return;
      }

      // Verifica se a senha tem pelo menos 6 caracteres
      if (form.nova_senha.length < 6) {
        toast({
          title: "Atenção",
          description: "A senha deve ter pelo menos 6 caracteres."
        });
        return;
      }

      await api.post('/auth/alterar-senha', {
        cpf: user.cpf,
        nova_senha: form.nova_senha
      });

      toast({ 
        title: "Sucesso!",
        description: "Sua senha foi alterada com sucesso."
      });
      navigate('/gerenciar-vacinas');
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      toast({ 
        title: "Erro ao alterar senha",
        description: error.response?.data?.error || "Tente novamente"
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
          <p className="mt-2 text-gray-600">Bem-vindo ao sistema!</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Configure sua senha</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-teal-50 rounded-lg border border-teal-100">
              <p className="text-teal-700 text-sm">
                Para garantir uma experiência mais segura e personalizada, 
                crie uma senha única para sua conta. Esta é uma etapa importante 
                para proteger suas informações e facilitar seu acesso ao sistema.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nova_senha">Nova Senha</Label>
                <Input
                  id="nova_senha"
                  name="nova_senha"
                  type="password"
                  value={form.nova_senha}
                  onChange={handleChange}
                  placeholder="Digite sua nova senha"
                  disabled={loading}
                  className={senhasDiferentes ? "border-red-500" : ""}
                />
                <p className="text-xs text-gray-500">A senha deve ter pelo menos 6 caracteres</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmar_senha">Confirmar Nova Senha</Label>
                <Input
                  id="confirmar_senha"
                  name="confirmar_senha"
                  type="password"
                  value={form.confirmar_senha}
                  onChange={handleChange}
                  placeholder="Confirme sua nova senha"
                  disabled={loading}
                  className={senhasDiferentes ? "border-red-500" : ""}
                />
                {senhasDiferentes && (
                  <p className="text-xs text-red-500">
                    As senhas não estão iguais. Por favor, verifique e tente novamente.
                  </p>
                )}
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Configurando..." : "Confirmar Senha"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlterarSenha; 