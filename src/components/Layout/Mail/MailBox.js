import React from "react";
import Inbox from "./Inbox";
import Sent from "./Sent";
import NewMsg from "./NewMsg";
import OpenMail from "./OpenMail/OpenMail";

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
    return <OpenMail />;
  }
};

export default MailBox;
