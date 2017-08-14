import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu/Menu'
import './App.css';

import PropTypes from 'prop-types'

const urlEndpoint = 'http://localhost:3001'
class App extends Component {
  getChildContext = () => { return {
    urlEndpoint
  }}

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Menu} />
        </div>
      </BrowserRouter>
    );
  }
}

App.childContextTypes = {
  urlEndpoint: PropTypes.string
}

export default App;
