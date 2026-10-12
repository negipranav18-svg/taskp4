
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        DEV@Deakin
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <span>Search</span>
        <span>Post</span>
      </div>
    </nav>
  );
}

export default Navbar;
