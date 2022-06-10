import { Link } from "react-router-dom";
// import '../styles/Header.css'
import logo from '../assets/LT.png'
import Logout from "./Logout";
function Header(props) {
  //inline style for the nav tag
  const navStyle = {
    backgroundColor: '#FFDE59',
    display: "flex",
    height: "5vh",
    justifyContent: "flex-start",
    padding: "8px",
    width: "100%",
    margin: "auto",
  };
  const linkStlye= {
    textDecoration: "none",
    color: 'black'
  }
  return (
      <nav className='header-content' style={navStyle}>
        <img src={logo}/>
        <Link className='links'style={linkStlye} to="/profile">
          <div>Profile</div>
        </Link>
        <Link className="links" style={linkStlye} to="/">
          <div>Home</div>
        </Link>
        <Link className="links" style={linkStlye}to="/messaging">
          <div>Messages</div>
        </Link>
        <Logout/>
      </nav>
  );
}

export default Header;