import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import OpenInboxMail from "./OpenMail/OpenInboxMail";
import { useState } from "react";
import { useEffect } from "react";

const Sidebar = () => {
  const param = useParams();
  const [read, setRead] = useState();
  const Allinboxmails = useSelector((state) => state.Mail.inboxMails);
  
  // this is for read ===true
  let convertedArr = Allinboxmails.flat();
  useEffect(() => {
    if (convertedArr.length > 0) {
      let count = 0;
      for (let i = 0; i < convertedArr.length; i++) {
        if (convertedArr[i].values.read === false) {
          count++;
        }
      }
      setRead(count);
    }
  }, [convertedArr]);
  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="row">
            {/* BEGIN INBOX MENU */}
            <div className="col-md-3 col-lg-3 col-sm-6">
              {/* <h2 className="grid-title">
                <i className="fa fa-inbox"></i> Inbox
              </h2> */}

              <Link
                className="btn btn-block bg-primary text-white "
                // data-toggle="modal"
                // data-target="#compose-modal"
                to="composemail"
              >
                <i className="fa fa-pencil"></i>&nbsp;&nbsp;Compose Email
              </Link>
              <hr className="hr hr-blurry" />
              <div>
                <ul className=" list-unstyled pl-3">
                  {/* <li
                    className="header text-uppercase h5 mb-4"
                    style={{ color: "#777" }}
                  >
                    Folders
                  </li> */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Link
                      to="inbox"
                      className="btn btn-light btn-block"
                      style={{ fontSize: "20px" }}
                    >
                      <i className="fa fa-envelope-open mr-2"></i>Inbox (
                      {Allinboxmails.length})
                    </Link>
                    <Link
                      to="sent"
                      className="btn btn-light btn-block"
                      style={{ fontSize: "20px" }}
                    >
                      <i className="fa fa-paper-plane mr-2"></i>Sent
                    </Link>
                    <Link
                      className="btn btn-light btn-block"
                      style={{ fontSize: "20px" }}
                    >
                      <i className="fa fa-star mr-2"></i>Unread ({read})
                    </Link>
                  </div>
                </ul>
              </div>
            </div>
            <div className="col-md-9 col-lg-9 col-sm-9 mt-5">
              {param.mailId ? <OpenInboxMail /> : <Outlet />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
