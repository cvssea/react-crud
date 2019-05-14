import React, { Component } from 'react';
import { Consumer } from '../../context';
import InputGroup from '../layout/InputGroup';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {},
  };

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
    return (
      <Consumer>
        {(data) => {
          const { handleSubmit } = data.actions;
          const { errors } = this.state;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form
                  onSubmit={(e) => {
                    // Get form validation result
                    const isValid = this.validate();

                    if (isValid) {
                      handleSubmit(this.state, e);
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
                    placeholder="Enter Name..."
                    value={this.state.name}
                    handleChange={this.handleChange}
                    error={errors.name}
                  />
                  <InputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email..."
                    value={this.state.email}
                    handleChange={this.handleChange}
                    error={errors.email}
                  />
                  <InputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone..."
                    value={this.state.phone}
                    handleChange={this.handleChange}
                    error={errors.phone}
                  />
                  <button className="btn btn-block btn-primary">
                    Add Contact
                  </button>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
