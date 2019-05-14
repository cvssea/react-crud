import React, { Component } from 'react';
import InputGroup from '../layout/InputGroup';

class EditContact extends Component {
  state = {
    id: '',
    name: '',
    email: '',
    phone: '',
    errors: {},
  };

  componentDidMount() {
    // match contact id from provider
    const { contacts } = this.props.context.state;
    const [contact] = contacts.filter(({ id }) => {
      return id === Number(this.props.match.params.id);
    });
    const { id, name, email, phone } = contact;
    this.setState({
      id,
      name,
      email,
      phone,
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  // Check if fields are valid on form submit
  validate = () => {
    // Clear errors on every submit
    this.setState({ errors: {} });

    // Initialize local errors object
    const errors = {};

    // checks if inputs are empty
    for (let key in this.state) {
      if (this.state[key] === '') {
        // build error message for each empty field
        errors[key] = `${key} field is required`;
      }
    }

    if (Object.keys(errors).length) {
      this.setState({ errors });
      return false;
    }
    return true;
  };

  render() {
    const { handleUpdateSubmit } = this.props.context.actions;
    const { name, email, phone, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Edit Contact</div>
        <div className="card-body">
          <form
            onSubmit={(e) => {
              // Get form validation result
              const isValid = this.validate();

              if (isValid) {
                handleUpdateSubmit(this.state, e);
                this.setState({
                  name: '',
                  email: '',
                  phone: '',
                  errors: {},
                });

                // Redirect on success
                this.props.history.push('/');
              } else {
                e.preventDefault();
              }
            }}
          >
            <InputGroup
              label="Name"
              name="name"
              placeholder="Edit Name..."
              value={name}
              handleChange={this.handleChange}
              error={errors.name}
            />
            <InputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Edit Email..."
              value={email}
              handleChange={this.handleChange}
              error={errors.email}
            />
            <InputGroup
              label="Phone"
              name="phone"
              placeholder="Edit Phone..."
              value={phone}
              handleChange={this.handleChange}
              error={errors.phone}
            />
            <button className="btn btn-block btn-primary">Save Contact</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditContact;
