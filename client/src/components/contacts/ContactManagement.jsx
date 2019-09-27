import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Contact from "./Contact";
import ContactForm from "./ContactForm";
import "./contactManagement.css";
import * as actions from "../../actions";

class ContactManagement extends React.Component {
  state = { selectedContact: null };

  onSelectContact = contact => {
    if (this.state.selectedContact === null)
      this.setState({ selectedContact: contact });
    else this.setState({ selectedContact: null });
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  deselectContact() {
    this.setState({ selectedContact: null });
  }

  renderContacts() {
    if (this.props.contacts.length > 0) {
      return this.props.contacts.map(contact => {
        const isSelected = this.state.selectedContact
          ? this.state.selectedContact._id === contact._id
          : false;
        return (
          <div key={contact._id}>
            <div onClick={() => this.onSelectContact(contact)}>
              <Contact
                contact={contact}
                onSelectContact={this.onSelectContact}
                className={
                  !this.state.selectedContact
                    ? "col s12 m12 l5"
                    : "col s12 m12 l12"
                }
                selected={isSelected}
              />
            </div>
            {isSelected ? this.renderForm() : null}
          </div>
        );
      });
    } else {
      return (
        <div className="empty-container">
          <div>
            <h2>You can start adding contacts with the add button!</h2>
          </div>
          <div>
            <img className="arrow" src="arrow.png" alt="arrow" />
          </div>
        </div>
      );
    }
  }

  renderForm() {
    return (
      <div className="contact-management__form col s12 m12 l12 ">
        <ContactForm
          selectedContact={this.state.selectedContact}
          editing={true}
          deselectContact={() => this.deselectContact()}
        />
      </div>
    );
  }

  render() {
    return (
      <div className={"container contact-management__container"}>
        <div className="contact-management__list row">
          {this.renderContacts()}
        </div>
        <div className="fixed-action-btn">
          <Link to="/contactForm" className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ contacts }) {
  return { contacts };
}

ContactManagement = reduxForm({
  form: "contact"
})(ContactManagement);

ContactManagement = connect(
  mapStateToProps,
  actions
)(ContactManagement);
export default ContactManagement;
/*
export default connect(
  mapStateToProps,
  actions
)(ContactManagement);
*/
