import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Layout/Header/Navbar";
import Signupform from "./components/Authentication/Signupform";
import Home from "./components/Pages/Home";
import Sidebar from "./components/Layout/Mail/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AuthAction } from "./Store/AuthSlice";
import OpenMail from "./components/Layout/Mail/OpenMail/OpenMail";
import Inbox from "./components/Layout/Mail/Inbox";
import Sent from "./components/Layout/Mail/Sent";
import NewMsg from "./components/Layout/Mail/NewMsg";
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
        {isAuth && (
          <Route path="dashboard" element={<Sidebar />}>
            <Route path="inbox" element={<Inbox />}>
              <Route path=":mailId" element={<OpenMail />} />
            </Route>
            <Route path="sent" element={<Sent />}>
              <Route path=":mailId" element={<OpenMail />} />
            </Route>
            <Route path="composemail" element={<NewMsg />} />
          </Route>
        )}
        <Route path="*" element={<Signupform />} />
        {/* <Route path="/forgotpassword" element={<Forgotpassword />} /> */}
      </Routes>
    </>
  );
}

export default App;
