import React, { Component } from 'react';

const Context = React.createContext();

export class Provider extends Component {
  state = {
    contacts: [],
    nextId: 0,
  };

  async componentDidMount() {
    const rawResponse = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );
    const data = await rawResponse.json();

    const contacts = data.map(({ id, name, email, phone }) => {
      return {
        id,
        name,
        email,
        phone,
      };
    });
    const nextId = data.length + 1;
    this.setState({
      contacts,
      nextId,
    });
  }

  handleIconClick = (id) => {
    const contacts = this.state.contacts.map((c) => {
      if (c.id === id) {
        c.showInfo = !c.showInfo;
      }
      return c;
    });

    this.setState({
      contacts,
    });
  };

  handleDelete = (id) => {
    const contacts = this.state.contacts.filter((c) => c.id !== id);
    this.setState({
      contacts,
    });
  };

  handleSubmit = (data, e) => {
    const id = this.state.nextId;
    const newContact = { ...data, id };
    const contacts = [newContact, ...this.state.contacts];

    this.setState({
      contacts,
      nextId: id + 1,
    });

    e.preventDefault();
  };

  handleUpdateSubmit = (data, e) => {
    const untouchedContacts = this.state.contacts.filter(
      ({ id }) => id !== data.id
    );
    const updatedContact = { ...data };
    const contacts = [updatedContact, ...untouchedContacts];
    this.setState({ contacts });

    e.preventDefault();
  };

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          actions: {
            handleDelete: this.handleDelete,
            handleIconClick: this.handleIconClick,
            handleSubmit: this.handleSubmit,
            handleUpdateSubmit: this.handleUpdateSubmit,
          },
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
