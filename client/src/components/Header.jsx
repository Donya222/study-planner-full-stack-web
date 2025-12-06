import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Input
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    navigate("/Login"); 
  };

  return (
    <Navbar className="navigation" color="light" light expand="md" style={{ padding: "10px" }}>
      
      {/* Logo */}
      <NavbarBrand>
        <img src={Logo} width="150px" height="75px" alt="logo" />
      </NavbarBrand>

      {/* SEARCH BOX */}
      <Input
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          maxWidth: "300px",
          marginLeft: "20px",
          borderRadius: "8px",
        }}
      />

      {/* Logout */}
      <Nav className="ms-auto" navbar>
        <NavItem className="navs">
          <span
            onClick={handleLogout}
            className="nav-link"
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <FaSignOutAlt style={{ marginRight: "6px" }} /> Logout
          </span>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
