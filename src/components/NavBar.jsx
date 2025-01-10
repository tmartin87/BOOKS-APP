import "./NavBar.css";
import { NavLink } from "react-router-dom";
import logo from "../assets/LOGO_BOOKIFY.svg"
//TODO que en NavBar se marque la página actual

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-container">
        <li className="logo">
          <NavLink to="/">
            <img src={logo} alt="dashboard" />
          </NavLink>
        </li>
        <div className="menu">
          <li className="button">
            <NavLink to="/my-books">My books</NavLink>
          </li>
          <li className="button">
            <NavLink to="/all-books">Find books</NavLink>
          </li>
          <li className="user">
            <NavLink to="/">👤</NavLink>
            {/* TODO Crear una página de perfil de usuario y su ruta?? */}
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;