import React from "react";
import Contact from "./Contact";
import ContactForm from "./ContactForm";
/*
const ContactList = ({ contacts, onSelectContact }) => {
  const renderedList = contacts.map(contact => {
    return (
      <Contact
        key={contact.contactId}
        onSelectContact={onSelectContact}
        contact={contact}
      />
    );
  });

  return <div>{renderedList}</div>;
};
*/

class ContactList extends React.Component {

  renderForm() {
    return (
      <div className="contact-management__form">
        <ContactForm
          selectedContact={this.props.selectedContact}
          editing={true}
        />
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Contact
          contact={{
            id: 1,
            avatar:
              "https://lh3.googleusercontent.com/a-/AAuE7mAjetkHyHoahDWnKV57-NwzZNpILcuL8ubxKZ5FIdk",
            firstName: "Gabriel",
            lastName: "Rosas",
            email: "gabo.roses@gmail.com"
          }}
          selected={
            this.props.selectedContact
              ? this.props.selectedContact.id === 1
              : false
          }
          onSelectContact={this.props.onSelectContact}
          className={this.props.className}
        />
        {this.props.selectedContact && this.props.selectedContact.id === 1?this.renderForm():null}
        <Contact
          contact={{
            id: 2,
            avatar: "https://randomuser.me/api/portraits/women/7.jpg",
            firstName: "Amanda",
            lastName: "Holland",
            email: "amanda.holland75@example.com"
          }}
          selected={
            this.props.selectedContact
              ? this.props.selectedContact.id === 2
              : false
          }
          onSelectContact={this.props.onSelectContact}
          className={this.props.className}
        />
        {this.props.selectedContact && this.props.selectedContact.id === 2?this.renderForm():null}
        <Contact
          contact={{
            id: 3,
            avatar: "https://randomuser.me/api/portraits/women/64.jpg",
            firstName: "Jeanne",
            lastName: "Castillo",
            email: "jeanne.castillo53@example.com"
          }}
          selected={
            this.props.selectedContact
              ? this.props.selectedContact.id === 3
              : false
          }
          onSelectContact={this.props.onSelectContact}
          className={this.props.className}
        />
        {this.props.selectedContact && this.props.selectedContact.id === 3?this.renderForm():null}
        <Contact
          contact={{
            id: 4,
            avatar: "https://randomuser.me/api/portraits/men/10.jpg",
            firstName: "Willie",
            lastName: "Hamilton",
            email: "willie.hamilton49@example.com"
          }}
          selected={
            this.props.selectedContact
              ? this.props.selectedContact.id === 4
              : false
          }
          onSelectContact={this.props.onSelectContact}
          className={this.props.className}
        />
        {this.props.selectedContact && this.props.selectedContact.id === 4?this.renderForm():null}
      </React.Fragment>
    );
  }
}

export default ContactList;
