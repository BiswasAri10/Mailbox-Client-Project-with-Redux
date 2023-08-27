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
    <nav className="custom-navbar">
      <Link to={"/"} className="custom-logo">
        <h3 className="custom-logo-text">MailBox</h3>
      </Link>

      <button
        className="custom-toggler"
        type="button"
        aria-label="Toggle navigation"
      >
        <span className="custom-toggler-icon"></span>
      </button>

      <div className="custom-collapse">
        <ul className="custom-nav">
          {/* <li className="custom-nav-item">
            <Link to={"/dashboard/inbox"} className="custom-nav-link">
              Mails
            </Link>
          </li> */}
        </ul>
        <ul className="custom-nav">
          {!isAuth && (
            <Link className="custom-btn" type="submit" to={"/login"}>
              Login
            </Link>
          )}
          {isAuth && (
            <li className="custom-nav-item dropdown">
            <div className="custom-profile-button">
              <button
                className="custom-profile-btn"
                aria-label="Profile"
                id="navbarDropdown"
                aria-expanded="false"
              >
                {email}
              </button>
              <div className="custom-dropdown">
                <p className="custom-dropdown-text" onClick={logoutHandler}>
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
