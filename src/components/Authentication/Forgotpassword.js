import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Forgotpassword.css";

const Forgotpassword = () => {
  const InputEmailRef = useRef();
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  const ChangePasswordHandler = (event) => {
    event.preventDefault();
    const newEmail = InputEmailRef.current.value;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDblyd3qdrQcMYVUbpw0qyzP08MlWO0JR8`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: newEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json().then((data) => {
        setMessage(
          "Password reset link sent to your Email. Please check your inbox !"
        );
        setTimeout(() => {
          setMessage("");
          navigate("/login");
        }, 2000);
      });
    });
  };
  return (
    <div>
      <div className=" text-center mt-3 animate__bounceIn">
        {message && (
          <span className="reset_password">
            <i className="fa fa-check mr-2" aria-hidden="true"></i> {message}
          </span>
        )}
      </div>
      <form className="form" onSubmit={ChangePasswordHandler}>
        <div className="reset_pass animate__bounceIn">
          <div className="control">
            <label htmlFor="pass">Enter Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email Address .."
              ref={InputEmailRef}
              required
            />
          </div>
          <div className="action text-center">
            <button className="btn border border-white ">Send Link</button>
          </div>

          <div className="text-center alreadyuser mt-2">
            Already a user?
            <Link to="/login" className="ml-2" style={{ color: "white" }}>
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forgotpassword;
