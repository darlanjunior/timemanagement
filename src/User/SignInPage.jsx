import { Link, withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import PropTypes from 'prop-types'

import UserForm from './UserForm';
import ajax from '../Shared/ajax';

class SignInPage extends Component {
  state = {
    error: undefined
  }

  render = () => {
    const {reload, history} = this.props;
    const {setCurrentUser} = this.context;

    return (
      <div>
        <h2>Sign In</h2>
        <UserForm
          {...this.state}
          fields={{
            email: 'text',
            password: 'password'
          }}
          submit={user => reload(user, 'post').then(response => {
            if(!response.errors) {
              setCurrentUser(response.data)
              history.push('/')
            } else {
              this.setState({error: response.errors})
            }
          })
          } />
          <Link to='/password'>Forgot my password</Link>
      </div>
    )
  }
}

SignInPage.contextTypes = {
  setCurrentUser: PropTypes.func
};


export default withRouter(ajax({
  url: '/users/sign_in',
  loadOnMount: false
})(SignInPage))
