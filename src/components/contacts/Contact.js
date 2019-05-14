import React, { Component } from 'react';
import { Consumer } from '../../context';
import {Link} from 'react-router-dom';

class Contact extends Component {
  render() {
    const { id, name, email, phone, showInfo } = this.props.contact;

    const contactInfo = (
      <ul className="list-group">
        <li className="list-group-item">Email: {email}</li>
        <li className="list-group-item">Phone: {phone}</li>
      </ul>
    );

    return (
      <Consumer>
        {(data) => {
          const { handleIconClick, handleDelete } = data.actions;
          return (
            <div className="card card-body mb-3 contact">
              <h4>
                {name}{' '}
                <i
                  className={showInfo ? 'fas fa-sort-up' : 'fas fa-sort-down'}
                  onClick={() => handleIconClick(id)}
                />
              </h4>
              {showInfo ? contactInfo : null}
              <div className="btn-group btn-group-sm mt-2 ml-auto">
                <Link to={`/contact/edit/${id}`} className="btn btn-primary mr-1">EDIT</Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(id)}
                >
                  DELETE
                </button>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.defaultProps = {
  name: 'Enter Name',
  email: 'Enter email',
  phone: '111-111-1111',
};

export default Contact;
