import React, { useRef, useState } from "react";
// import logo from "../../Asset/Image/logo.png";
import "../Authentication/Signuppage.css";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../Store/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

const Signupform = () => {
  const InputemailRef = useRef();
  const InputpasswordRef = useRef();
  const inputCpasswordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.Auth.isAuth);
  const [login, setIslogin] = useState(islogin);
  const FormSubmitHandlar = (e) => {
    e.preventDefault();
    const email = InputemailRef.current.value;
    const password = InputpasswordRef.current.value;

    let cpassword;
    if (!login) {
      cpassword = inputCpasswordRef.current.value;
    } else {
      cpassword = InputpasswordRef.current.value;
    }

    if (password === cpassword) {
      let url;
      if (login) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDblyd3qdrQcMYVUbpw0qyzP08MlWO0JR8";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDblyd3qdrQcMYVUbpw0qyzP08MlWO0JR8";
      }

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Something Went Wrong");
          }
        })
        .then((data) => {
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("email", data.email);

          dispatch(AuthAction.Login({ email: data.email }));
          navigate("/dashboard/inbox");
        })
        .catch((err) => {
          alert(err.message);
        });

      InputemailRef.current.value = "";
      InputpasswordRef.current.value = "";
      if (!login) {
        inputCpasswordRef.current.value = "";
      }
    } else {
      alert("Passwords do not match");
    }

    //
  };

  return (
    <section className="custom-section">
      <div className="custom-container">
        <div className="custom-row justify-center">
          <div className="custom-signup-page">
            {/* <img
              src={logo}
              alt="logo"
              className="custom-logo"
            /> */}
            <div className="custom-form-container">
              <form onSubmit={FormSubmitHandlar} className="custom-form">
                {login ? (
                  <p>Please Login To Your Account</p>
                ) : (
                  <p>Please Create Your Account</p>
                )}

                <div className="custom-form-group">
                  <input
                    type="email"
                    id="custom-email"
                    className="custom-input"
                    placeholder="Email address.."
                    ref={InputemailRef}
                    required
                  />
                </div>

                <div className="custom-form-group">
                  <input
                    type="password"
                    className="custom-input"
                    placeholder="Password.."
                    ref={InputpasswordRef}
                    required
                  />
                </div>
                {!login && (
                  <div className="custom-form-group">
                    <input
                      type="password"
                      className="custom-input"
                      placeholder="Confirm Password.."
                      ref={inputCpasswordRef}
                      required
                    />
                  </div>
                )}

                <div className="custom-form-group custom-text-center">
                  <button className="custom-btn" type="submit">
                    {login ? " Log in" : "SignUp"}
                  </button>
                  {login ? (
                    <Link className="custom-link" to="/forgotpassword">
                      Forgot password?
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                <div className="custom-flex-container">
                  <p className="custom-flex-item">
                    {login
                      ? "Don't have an account?"
                      : "Already have an account?"}
                  </p>
                  <Link
                    className="custom-btn custom-link-btn"
                    onClick={() =>
                      setIslogin(!login)
                    } 
                  >
                    {login ? "Create new" : "Login"}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signupform;
// style="width: 185px;"
