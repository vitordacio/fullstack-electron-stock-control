import { useNavigate } from 'react-router-dom';
import assets from '../../../assets';

const NavbarLinks = () => {
  const navigate = useNavigate();

  return (
    <ul className="nav_links">
      <li>
        <span>
          Cadastros <img src={assets.chevron} />
        </span>
        <ul>
          <li onClick={() => navigate('/category')}>Categorias</li>
          <li onClick={() => navigate('/product')}>Produtos</li>
          <li onClick={() => navigate('/user')}>Vendedores</li>
        </ul>
      </li>
      <li>
        <span>
          Estoque <img src={assets.chevron} />
        </span>
        <ul>
          <li onClick={() => navigate('/stock_movement')}>Movimentações</li>
          <li onClick={() => navigate('/stock_alert')}>Em Alerta</li>
        </ul>
      </li>
      <li>
        <span>
          Vendas <img src={assets.chevron} />
        </span>
        <ul>
          <li onClick={() => navigate('/checkout')}>Frente de Caixa</li>
          <li onClick={() => navigate('/sale')}>Últimas Vendas</li>
          <li onClick={() => navigate('/sale/day')}>Resumo Dia</li>
          <li onClick={() => navigate('/sale/month')}>Resumo Mês</li>
        </ul>
      </li>
    </ul>
  );
};

export default NavbarLinks;
