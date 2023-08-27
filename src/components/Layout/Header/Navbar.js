import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Header/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../../Store/AuthSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.Auth.isAuth);
  const email = localStorage.getItem("email");
  const logoutHandler = () => {
    dispatch(AuthAction.Logout());
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav className="navbar-navbar">
      <Link to={"/"} className="navbar-logo">
        <h3 className="navbar-logo-text">MailBox</h3>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="navbar-collapse">
        <ul className="navbar-nav">
          <li className="navbar-nav-item">
            <Link to={"/dashboard/inbox"} className="navbar-nav-link">
            <i class="fa-regular fa-envelope"></i>
            </Link>
          </li>
          {!isAuth && (
            <Link className="navbar-btn" type="submit" to={"/login"}>
              Login
            </Link>
          )}
          {isAuth && (
            <li className="navbar-nav-item dropdown">
              <div className="navbar-profile-button">
                <button
                  className="navbar-profile-btn"
                  aria-label="Profile"
                  id="navbarDropdown"
                  aria-expanded="false"
                >
                  {email}
                </button>
                <div className="navbar-dropdown">
                  <p className="navbar-dropdown-text" onClick={logoutHandler}>
                    Logout
                  </p>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
