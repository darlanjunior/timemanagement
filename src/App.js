import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu/Menu'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Menu} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
