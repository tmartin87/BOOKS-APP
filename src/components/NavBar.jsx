import "./NavBar.css";
import { NavLink } from "react-router-dom";
//TODO que en NavBar se marque la página actual

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-container">
        <li className="logo">
          <NavLink to="/">Logo</NavLink>
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