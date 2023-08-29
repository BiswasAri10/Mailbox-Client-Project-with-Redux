import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";

const NewMsg = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [sending, setSending] = useState(false); 
  const [sentSuccess, setSentSuccess] = useState(false); 

  const enteredTo = useRef();
  const subject = useRef();
  const History = useNavigate();
  const loginUser = useSelector((state) => state.Auth.userEmail);
  const LoggedInUserEmail = loginUser.replace(/[^a-zA-Z0-9]/g, "");

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const MailBoxFormHandler = (event) => {
    event.preventDefault();
    const toReciverEmail = enteredTo.current.value;
    const sendingEmail = toReciverEmail.replace(/[^a-zA-Z0-9]/g, "");
    const Sub = subject.current.value;
    const msg = editorState.getCurrentContent().getPlainText();

    const currentDate = {
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    };

    const msgObj = {
      to: toReciverEmail,
      subject: Sub,
      msgBody: msg,
      date: currentDate,
      from: loginUser,
      read: false,
    };

    if (sendingEmail === LoggedInUserEmail) {
      window.alert("You can't send mail to yourself.");
      return;
    }

    const urlTo = `https://mailbox-project-signup-default-rtdb.firebaseio.com/${sendingEmail}/inbox.json`;
    const urlLoginUser = `https://mailbox-project-signup-default-rtdb.firebaseio.com/${LoggedInUserEmail}/sendBox.json`;

    if (LoggedInUserEmail) {
      setSending(true);
      fetch(urlTo, {
        method: "POST",
        body: JSON.stringify(msgObj),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        setSending(false);
        if (res.ok) {
          fetch(urlLoginUser, {
            method: "POST",
            body: JSON.stringify(msgObj),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            setSentSuccess(true);
            History("/dashboard/sent");

            if (res.ok) {
              enteredTo.current.value = "";
              subject.current.value = "";
              window.alert("Email sent successfully!"); 
              setEditorState(EditorState.createEmpty());
            }
          });
        }
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="modal-content">
          <div className="modal-header bg-blue  ">
            <h4 className="modal-title">
              <i className="fa fa-envelope"></i> Compose New Email
            </h4>
          </div>
          <div className="text-center mt-2"></div>
          <form onSubmit={MailBoxFormHandler}>
            <div className="modal-body">
              <div className="form-group">
                <input
                  name="to"
                  type="email"
                  className="form-control"
                  placeholder="To"
                  ref={enteredTo}
                />
              </div>
              <div className="form-group">
                <input
                  name="subject"
                  type="text"
                  className="form-control"
                  placeholder="Subject"
                  ref={subject}
                />
              </div>
              <div className="form-group">
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={handleEditorChange}
                />
              </div>
            </div>
            <div className="modal-footer">
            {!sending && !sentSuccess && (
                <button type="submit" className="btn btn-dark pull-right">
                  <i className="fa fa-envelope"></i> Send Email
                </button>
              )}
              {sending && <p>Sending Email...</p>}
              {sentSuccess && (
                <div>
                  <p>Email sent successfully!</p>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setSentSuccess(false)}
                  >
                    New Email
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewMsg;
