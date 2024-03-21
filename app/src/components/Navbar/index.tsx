import './index.css';
import assets from '../../assets';
import NavbarLinks from './NavLinks';
import useAuth from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, SignOut } = useAuth();

  const handleLogout = () => {
    SignOut();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <img src={assets.target} onClick={() => navigate('/')} />
      {user && user.role_name !== 'user' ? (
        <NavbarLinks />
      ) : (
        <ul className="nav_links" />
      )}
      <ul>
        <li className="nav_account" onClick={() => navigate('/user/self')}>
          <img src={assets.user} />
          {user && <span>{user.email}</span>}
        </li>
        <li>
          <img src={assets.logout} onClick={handleLogout} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
