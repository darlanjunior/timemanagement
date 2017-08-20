import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';
import _ from 'lodash'
import cookie from 'react-cookies';

import PropTypes from 'prop-types'

import Menu from './Menu/Menu'
import ajax from './Shared/ajax';

const urlEndpoint = 'http://localhost:3001'

function queryStringToJSON(query) {
    return query
      .slice(1)
      .split('&')
      .reduce((acc,pair) => {
        const [key, val] = pair.split('=');

        return Object.assign(acc, {[key]: decodeURIComponent(val || '')})
      }, {})
}

class App extends Component {
  state = {
    currentUser: {
      name: '',
      role: '',
      email: ''
    }
  }

  componentWillMount = () => {
    const queryString = window.location.search

    if(!!queryString) {
      const {role, client_id, expiry, uid, token} = queryStringToJSON(queryString);

      cookie.save('authorization', {
        role: role,
        client: client_id,
        expiry: expiry,
        uid: uid,
        'access-token': token,
      }, {
        path: '/',
        maxAge: expiry,
        httpOnly: false
      })

      this.props.reload()
    }
  }

  componentWillReceiveProps = ({history, response}) => {
    const {data, success} = response
    if(!_.isEqual(response, this.props.response)) {
      if(success) {
        this.setState({currentUser: data})
      } else { // means token is expired
        cookie.remove('authorization', {path: '/'})
        window.location = '/'
      }
    }
  }

  getChildContext = () => { return {
    setCurrentUser: this.setCurrentUser,
    currentUser: this.state.currentUser,
    urlEndpoint
  }}

  setCurrentUser = ({name, picture, role}) => this.setState({currentUser: {name, picture, role}})

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
  setCurrentUser: PropTypes.func,
  currentUser: PropTypes.object,
  urlEndpoint: PropTypes.string
};

export default ajax({
  url: `${urlEndpoint}/users/validate_token`,
  loadOnMount: !!cookie.load('authorization')
})(App)
