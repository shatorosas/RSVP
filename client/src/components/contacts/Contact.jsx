import React from "react";
import "./contact.css";

const Contact = ({ contact, selected, onSelectContact, className }) => {
  const firstName = contact.firstName || "First Name";
  const lastName = contact.lastName || "Last Name";
  const email = contact.email || "email";
  const avatar = contact.avatar;

  const initials = firstName[0]+lastName[0];

  return (
    <div
      className={
        "contact__container " + (selected ? "selected " : " ") + className
      }
    >
      <div className={"contact__imagen " + (!avatar ? "hide " : "")}>
        <img src={avatar} alt={firstName + " " + lastName} />
      </div>
      <div className={"avatar-circle " + (avatar ? "hide " : "")}>
        <span className="initials">{initials}</span>
      </div>
      <div className="contact__info">
        <h6>
          {firstName} {lastName}
        </h6>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Contact;
