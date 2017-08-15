import React, { Component } from 'react';

import UserForm from './UserForm';
import ajax from '../Shared/ajax';

class Register extends Component {
  state = {
    success: undefined,
    error: undefined
  }

  render() {
    const {reload} = this.props;

    return <div>
      <h2>Register</h2>
      <UserForm
        {...this.state}
        fields={{
          name: 'text',
          email: 'text',
          password: 'password',
          password_confirmation: 'password'
        }}
        submit={user =>
          reload(user, 'post')
            .then(response => {
              if(response.status === 'success') {
                this.setState({
                  success: 'Registration confirmed. Please check your e-mail',
                  error: undefined
                })
              } else {
                this.setState({
                  error: response.errors.full_messages || response.errors,
                  success: undefined
                })
              }
            })
        } />
    </div>
  }
}

export default ajax({
  url: '/users',
  loadOnMount: false
})(Register)
