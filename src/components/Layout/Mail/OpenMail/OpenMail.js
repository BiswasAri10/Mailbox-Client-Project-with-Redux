import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../OpenMail/OpenMail.css";
import { useDispatch, useSelector } from "react-redux";
import { mailSliceAction } from "../../../../Store/MailSlice";

const OpenMail = () => {
  const params = useParams();
  const mailId = params.mailId;
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const obj = location.state;
  const loginUser = useSelector((state) => state.Auth.userEmail);
  const LoggedInUserEmail = loginUser.replace(/[^a-zA-Z0-9]/g, "");
  useEffect(() => {
    if (obj.from) {
      fetch(
        `https://mailbox-project-signup-default-rtdb.firebaseio.com/${LoggedInUserEmail}/inbox/${mailId}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...location.state,
            read: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            dispatch(mailSliceAction.ReadData(data));
          });
        }
      });
    }
  }, [LoggedInUserEmail, dispatch, mailId, location.state, obj.from]);
  //
  const InboxDeleteHandler = (event) => {
    event.preventDefault();
    if (obj.from) {
      fetch(
        `https://mailbox-project-signup-default-rtdb.firebaseio.com/${LoggedInUserEmail}/inbox/${mailId}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            console.log(data);
            history("/dashboard/inbox");
          });
        } else {
          alert("something went wrong!");
        }
      });
    }
  };
  //sent Delete
  const SentDeleteHandler = (event) => {
    event.preventDefault();
    if (obj.to) {
      fetch(
        `https://mailbox-project-signup-default-rtdb.firebaseio.com/${LoggedInUserEmail}/sendBox/${mailId}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            history("/dashboard/sent");
          });
        } else {
          alert("something went wrong!");
        }
      });
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            {obj.from && (
              <button
                className="btn btn-outline-primary"
                onClick={() => history("/dashboard/inbox")}
              >
                Back
              </button>
            )}
            {obj.from && (
              <button
                className="btn btn-outline-danger ml-2"
                onClick={InboxDeleteHandler}
              >
                Remove
              </button>
            )}
            {obj.to && (
              <button
                className="btn btn-outline-primary"
                onClick={() => history("/dashboard/sent")}
              >
                Back
              </button>
            )}
            {obj.to && (
              <button
                className="btn btn-outline-danger  ml-2"
                onClick={SentDeleteHandler}
              >
                Remove
              </button>
            )}

            <div className="card-text mt-3">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <p className="d-flex pt-3shadow mt-4 ml-4">
                      <span className="circlename justify-content-center mr-3 rounded-circle text-Uppercase">
                        {obj.from ? obj.from : obj.to}
                      </span>
                    </p>
                    <p style={{ marginTop: "3.5%" }}>
                      {obj.from ? (
                        <strong className="mt-3">From-</strong>
                      ) : (
                        <strong className="mt-3">To-</strong>
                      )}

                      {obj.from ? obj.from : obj.to}
                    </p>
                    <p className="ml-5" style={{ marginTop: "3.5%" }}>
                      <strong className="ml-5">
                        <span className="ml-5">{obj.date.date}</span>
                        <span className="ml-2">{obj.date.time}</span>
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="subject ml-5">
                <p>
                  <strong>Subject-</strong>
                  {obj.subject}
                </p>
              </div>
            </div>
            <div className="body  ml-5">
              <p>
                <strong>Message-</strong>
                {obj.msgBody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenMail;
