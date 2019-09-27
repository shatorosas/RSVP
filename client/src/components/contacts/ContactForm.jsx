import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import "./contactForm.css";
import { connect } from "react-redux";
import * as actions from "../../actions";

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
  }
  componentDidMount() {
    this.form.current.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }
  onSubmit = formValues => {
    this.props.saveContact(formValues);
    if (this.props.deselectContact) this.props.deselectContact();
  };

  render() {
    const { handleSubmit, editing } = this.props;
    return (
      <div className={editing ? "" : "container new"}>
        <form
          ref={this.form}
          onSubmit={handleSubmit(this.onSubmit)}
          className="contactForm__form"
        >
          <div>
            <label>First Name</label>
            <div>
              <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="First Name"
              />
            </div>
          </div>
          <div>
            <label>Last Name</label>
            <div>
              <Field
                name="lastName"
                component="input"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div>
            <label>Email</label>
            <div>
              <Field
                name="email"
                component="input"
                type="email"
                placeholder="Email"
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <Link
              to="/contacts"
              className={
                "red waves-effect waves-light btn white-text" +
                (editing ? " hide" : "")
              }
            >
              <i className="material-icons left">cancel</i>
              Cancel
            </Link>
            <button
              type="submit"
              className="teal waves-effect waves-light btn right white-text"
              style={{ marginLeft: "auto" }}
            >
              Save
              <i className="material-icons right">save</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.selectedContact) {
    return { initialValues: ownProps.selectedContact };
  }
  return {};
};

function validate(values) {
  const errors = {};

  if (!values["firstName"]) errors["firstName"] = "*required";
  if (!values["secondName"]) errors["secondName"] = "*required";
  if (!values["email"]) errors["email"] = "*required";

  if (!errors.email) {
    errors.email = validateEmails(values.email);
  }
  return errors;
}

ContactForm = reduxForm({
  validate,
  form: "contact",
  enableReinitialize: true,
  destroyOnUnmount: false
})(ContactForm);

ContactForm = connect(
  mapStateToProps,
  actions
)(ContactForm);
export default ContactForm;

/*
export default reduxForm({
  form: "contact" // a unique identifier for this form
})(ContactForm);
*/
