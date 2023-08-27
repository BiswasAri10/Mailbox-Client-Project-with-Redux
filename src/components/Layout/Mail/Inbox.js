import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "../Mail/Inbox.css";
import useInboxhook from "./CustomHook/InboxHook";

const Inbox = () => {
  const history = useNavigate();
  const loginUser = useSelector((state) => state.Auth.userEmail);
  const Allinboxmails = useSelector((state) => state.Mail.inboxMails);
  const LoggedInUserEmail = loginUser.replace(/[^a-zA-Z0-9]/g, "");

  const [selectedEmails, setSelectedEmails] = useState({});

  useInboxhook(
    `https://mailbox-project-signup-default-rtdb.firebaseio.com/${LoggedInUserEmail}/inbox.json`
  );

  const handleEmailSelect = (emailId) => {
    setSelectedEmails((prevSelectedEmails) => ({
      ...prevSelectedEmails,
      [emailId]: !prevSelectedEmails[emailId],
    }));
  };

  const toggleSelectAll = () => {
    const allEmailIds = Allinboxmails.map((mail) => mail[0].id);
    const allSelected = areAllEmailsSelected();

    if (allSelected) {
      const newSelectedEmails = { ...selectedEmails };
      allEmailIds.forEach((emailId) => {
        delete newSelectedEmails[emailId];
      });
      setSelectedEmails(newSelectedEmails);
    } else {
      const selectedEmailsObj = allEmailIds.reduce((obj, emailId) => {
        obj[emailId] = true;
        return obj;
      }, {});
      setSelectedEmails(selectedEmailsObj);
    }
  };

  const areAllEmailsSelected = () => {
    const allEmailIds = Allinboxmails.map((mail) => mail[0].id);
    return allEmailIds.every((emailId) => selectedEmails[emailId]);
  };

  const deleteSelectedEmails = () => {
    const selectedEmailIds = Object.keys(selectedEmails).filter(
      (emailId) => selectedEmails[emailId]
    );

    if (selectedEmailIds.length > 0) {
      selectedEmailIds.forEach((emailId) => {
        InboxDeleteHandler([{ id: emailId }]);
      });

      setSelectedEmails((prevSelectedEmails) => {
        const newSelectedEmails = { ...prevSelectedEmails };
        selectedEmailIds.forEach((emailId) => {
          delete newSelectedEmails[emailId];
        });
        return newSelectedEmails;
      });
    }
  };

  const InboxDeleteHandler = (id) => {
    const mailId = id[0].id;

    if (LoggedInUserEmail) {
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
            history("/dashboard/inbox");
          });
        } else {
          alert("Something went wrong!");
        }
      });
    }
  };
  //search

  return (
    <>
      <div className="row ">
        <div className="col-md-6 h5 d-flex  ">Emails</div>
        <div className="col-md-12 tab-content mt-3">
          <div className="mb-3">
            <button className="btn btn-primary mr-2" onClick={toggleSelectAll}>
              {areAllEmailsSelected() ? "Deselect All" : "Select All"}
            </button>

            <button
              className="btn btn-danger"
              onClick={deleteSelectedEmails}
              disabled={Object.values(selectedEmails).every((value) => !value)}
            >
              Delete Emails
            </button>
          </div>
          <div className="tab-content" id="nav-tabContent">
            <div
              classname="tab-pane fade show active table-responsive mt-3"
              id="nav-home"
              aria-labelledby="nav-home-tab"
            >
              <table className="table table-hover table-mail">
                {Allinboxmails.map((inboxMails) => {
                  return (
                    <>
                      <tbody
                        className={
                          inboxMails[0].values.read === false
                            ? "unread"
                            : "read"
                        }
                      >
                        <tr>
                          <td className="table-inbox-checkbox">
                            <div className="checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={!!selectedEmails[inboxMails[0].id]}
                                  onChange={() =>
                                    handleEmailSelect(inboxMails[0].id)
                                  }
                                  disabled={
                                    areAllEmailsSelected() &&
                                    !selectedEmails[inboxMails[0].id]
                                  }
                                />
                              </label>
                            </div>
                          </td>
                          <td className="name ">
                            <Link className="link">
                              <span className="badge badge-pill text-white font-medium">
                                <span
                                  className={
                                    inboxMails[0].values.read === false
                                      ? "NEW"
                                      : "READ"
                                  }
                                >
                                  {inboxMails[0].values.read === false
                                    ? "NEW"
                                    : "READ"}
                                </span>
                              </span>
                            </Link>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`${inboxMails[0].id}`}
                              state={{
                                subject: inboxMails[0].values.subject,
                                from: inboxMails[0].values.from,
                                msgBody: inboxMails[0].values.msgBody,
                                date: inboxMails[0].values.date,
                              }}
                            >
                              <span className="bg-dark text-white p-1 rounded">
                                From-{inboxMails[0].values.from}
                              </span>
                              &nbsp;
                              <span className="text-dark">
                                {inboxMails[0].values.subject}
                              </span>
                            </Link>
                          </td>
                          <td className="subject ">
                            <Link
                              className="text-dark"
                              style={{ textDecoration: "none" }}
                            >
                              {inboxMails[0].values.msgBody}
                            </Link>
                          </td>
                          <td className="time">
                            {inboxMails[0].values.date.date}
                            <span className="ml-2">
                              {inboxMails[0].values.date.time}
                            </span>
                          </td>
                          <td>
                            <Link
                              className="text-dark"
                              style={{ textDecoration: "none" }}
                              onClick={() => InboxDeleteHandler(inboxMails)}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inbox;
