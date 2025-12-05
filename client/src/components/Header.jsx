import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  

  const handleLogout = () => {
    navigate("/Login"); 
  };

  return (
    <Navbar className="navigation" color="light" light expand="md">
      {/* Logo */}
      <NavbarBrand>
        <img src={Logo} width="150px" height="75px" alt="logo" />
      </NavbarBrand>

      {/* Logout */}
      <Nav className="ms-auto" navbar>
        <NavItem className="navs">
          <span
            onClick={handleLogout}
            className="nav-link"
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }
    }
          >
            <FaSignOutAlt style={{ marginRight: "6px" }} /> Logout
          </span>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;

