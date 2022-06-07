import { Link } from "react-router-dom";

function Header(props) {
  //inline style for the nav tag
  const navStyle = {
    backgroundColor: 'rgb(230, 25, 42)',
    display: "flex",
    height: "5vh",
    justifyContent: "space-around",
    padding: "8px",
    width: "100%",
    margin: "auto",
  };
  const linkStlye= {
    textDecoration: "none",
    color: 'black'
  }
  return (
    <header>
      <nav style={navStyle}>
        <Link style={linkStlye} to="/profile">
          <div>Profile</div>
        </Link>
        <Link style={linkStlye} to="/">
          <div>Home</div>
        </Link>
        <Link style={linkStlye} to="/messaging">
          <div>Messages</div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;