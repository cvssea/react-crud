import React from 'react';
import { Consumer } from '../context';
import EditContact from '../components/contacts/EditContact';

const ContextWrap = (props) => {
  return <Consumer>{(context) => <EditContact {...props} context={context} />}</Consumer>;
};

export default ContextWrap;
