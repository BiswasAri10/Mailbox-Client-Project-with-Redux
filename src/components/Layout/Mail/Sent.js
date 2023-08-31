import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useSentHook from "./CustomHook/SentHook";

const Sent = () => {
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state.Auth.userEmail);
  const AddsentMail = useSelector((state) => state.Mail.sentMails);
  const LoggedInUserEmail = loginUser.replace(/[^a-zA-Z0-9]/g, "");

  const [selectedEmails, setSelectedEmails] = useState({});
  

  useSentHook(
    `https://mailbox-project-signup-default-rtdb.firebaseio.com/${LoggedInUserEmail}/sendBox.json`
  );

  const handleEmailSelect = (emailId) => {
    setSelectedEmails((prevSelectedEmails) => ({
      ...prevSelectedEmails,
      [emailId]: !prevSelectedEmails[emailId],
    }));
  };

  const selectAllEmails = () => {
    const allSentEmailIds = AddsentMail.map((sentAry) => sentAry[0].id);
    const selectedEmailsObj = allSentEmailIds.reduce((obj, emailId) => {
      obj[emailId] = true;
      return obj;
    }, {});

    if (areAllEmailsSelected()) {
      setSelectedEmails({});
    } else {
      setSelectedEmails(selectedEmailsObj);
    }
  };

  const areAllEmailsSelected = () => {
    const allSentEmailIds = AddsentMail.map((sentAry) => sentAry[0].id);
    return allSentEmailIds.every((emailId) => selectedEmails[emailId]);
  };

  const deleteSelectedEmails = () => {
    const selectedSentEmailIds = Object.keys(selectedEmails).filter(
      (emailId) => selectedEmails[emailId]
    );

    selectedSentEmailIds.forEach((emailId) => {
      SendDeleteHandler([{ id: emailId }]);
    });

    setSelectedEmails((prevSelectedEmails) => {
      const newSelectedEmails = { ...prevSelectedEmails };
      selectedSentEmailIds.forEach((emailId) => {
        delete newSelectedEmails[emailId];
      });
      return newSelectedEmails;
    });
  };

  const SendDeleteHandler = (id) => {
    const mailId = id[0].id;

    if (LoggedInUserEmail) {
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
            navigate("/dashboard/sent");
          });
        } else {
          alert("Something went wrong!");
        }
      });
    }
  };
  return (
    <>
      <div className="row ">
        <div className="col-md-6 h5 d-flex  ">Sent Emails</div>
        <div className="col-md-12 tab-content mt-3">
          <div className="mb-3">
            <button className="btn btn-primary mr-2" onClick={selectAllEmails}>
              {areAllEmailsSelected() ? "Deselect All" : "Select All"}
            </button>
            <button
              className="btn btn-danger"
              onClick={deleteSelectedEmails}
              disabled={Object.keys(selectedEmails).length === 0}
            >
              Delete Email
            </button>
          </div>
          <div className="tab-content" id="nav-tabContent">
            <div
              classname="tab-pane fade show active table-responsive mt-3"
              id="nav-home"
              aria-labelledby="nav-home-tab"
            >
              {AddsentMail.map((sentAry) => {
                return (
                  <table
                    className="table table-hover table-mail"
                    key={sentAry[0].id}
                  >
                    <tbody>
                      <tr>
                        <td className="table-inbox-checkbox">
                          <div className="checkbox">
                            <label>
                              <input
                                type="checkbox"
                                checked={selectedEmails[sentAry[0].id] || false}
                                onChange={() =>
                                  handleEmailSelect(sentAry[0].id)
                                }
                              />
                            </label>
                          </div>
                        </td>

                        <td className="name ">
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`${sentAry[0].id}`}
                            state={{
                              subject: sentAry[0].values.subject,
                              msgBody: sentAry[0].values.msgBody,
                              date: sentAry[0].values.date,
                              to: sentAry[0].values.to,
                            }}
                          >
                            <span className="bg-dark text-white p-1 rounded">
                              To-{sentAry[0].values.to}
                            </span>
                            &nbsp;
                            <span className="text-dark">
                              {sentAry[0].values.subject}
                            </span>
                          </Link>
                        </td>
                        <td className="subject ">
                          <Link
                            className="text-dark"
                            style={{ textDecoration: "none" }}
                          >
                            {sentAry[0].values.msgBody}
                          </Link>
                        </td>
                        <td className="time">
                          {sentAry[0].values.date.date},
                          <span> {sentAry[0].values.date.time}</span>
                        </td>
                        <td>
                          <Link
                            className="text-dark"
                            style={{ textDecoration: "none" }}
                            onClick={() => SendDeleteHandler(sentAry)}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sent;
