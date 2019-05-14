import React, { Component } from 'react';
import Header from './components/layout/Header';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import AddContact from './components/contacts/AddContact';
import Contacts from './components/contacts/Contacts';
import ContextWrap from './containers/ContextWrap';
import { Provider } from './context';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div>
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contact/add" component={AddContact} />
                {/**
                 * ContextWrap
                 * - is HOC
                 * - wraps EditContact
                 * - gives access to Cosumer value outside render
                 */}
                <Route exact path="/contact/edit/:id" component={ContextWrap} />
                <Route exact path="/about" component={About} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
