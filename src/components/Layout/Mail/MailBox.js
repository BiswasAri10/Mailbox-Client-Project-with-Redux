import React from "react";
import Inbox from "./Inbox";
import Sent from "./Sent";
import NewMsg from "./NewMsg";
import OpenInboxMail from "./OpenMail/OpenInboxMail";

const MailBox = (props) => {
  if (props.item === "mail") {
    return <NewMsg />;
  }
  if (props.item === "inbox") {
    return <Inbox />;
  }
  if (props.item === "sent") {
    return <Sent />;
  }
  if (props.item === "open") {
    return <OpenInboxMail />;
  }
};

export default MailBox;
