import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-container">
        <li className="logo">LOGO</li>
        <div className="menu">
          <li className="button">MY BOOKS</li>
          <li className="button">FIND A BOOK</li>
          <li className="user">USER</li>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;