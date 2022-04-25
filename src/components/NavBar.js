import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Navbar = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const logoutHandler =() => {
    cookies.remove('token').then(() => {navigate('/')})
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link to="/user" className="nav-link">Users</Link>
            </li>
            <li className="nav-item">
              <Link to="/test" className="nav-link">Tests</Link>
            </li>

            <li className="nav-item">
              <Link onClick = {()=> logoutHandler()} to="/" className="nav-link">logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
