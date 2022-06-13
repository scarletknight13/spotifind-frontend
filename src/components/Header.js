import { Link } from "react-router-dom";
import '../styles/Header.css'
import logo from '../assets/LT.png'
import Logout from "./Logout";
import '../styles/Header.css'
function Header(props) {
  //inline style for the nav tag
  const linkStlye= {
    textDecoration: "none",
    color: 'black'
  }
  return (
      <div className='header-content'>
        <img className='logo' src={logo}/>
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
      </div>
  );
}

export default Header;