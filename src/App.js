import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Layout/Header/Navbar";
import Signupform from "./components/Authentication/Signupform";
import Home from "./components/Pages/Home";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AuthAction } from "./Store/AuthSlice";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.Auth.isAuth);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(AuthAction.Login({ email: localStorage.getItem("email") }));
    }
  });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        / <Route exact path="/login" element={<Signupform />} />
        <Route path="*" element={<Signupform />} />
      </Routes>
    </>
  );
}

export default App;
