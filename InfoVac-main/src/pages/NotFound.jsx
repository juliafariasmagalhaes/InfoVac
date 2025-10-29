import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Página não encontrada</p>
        <Link to="/" className="text-teal-600 hover:text-teal-700">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 