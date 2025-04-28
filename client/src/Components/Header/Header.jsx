import React from "react";
import "./Header.css";
import FUS_Logo from "./FUS_LOGO_3.jpg";
import { useAuth } from "../../Contexts/AuthContext";

function Header() {
  const { logout } = useAuth();
  return (
    <header className="custom-header py-3 sticky-top">
      <img
        src={FUS_Logo}
        alt="FUS Logo"
        className="image"
        onClick={() => (window.location.href = "/home")}
      />
      <h2>SyllAble</h2>
      <div className="account">
        <h5 onClick={() => logout()}>Log Out</h5>
      </div>
    </header>
  );
}

export default Header;
