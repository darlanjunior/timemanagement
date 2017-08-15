import React, { Component } from 'react';

import UserForm from './UserForm';
import ajax from '../Shared/ajax';

class ForgotPasswordPage extends Component {
  state = {
    success: undefined,
    error: undefined
  }

  submitForm = user =>
    this
      .props
      .reload(user, 'post')
      .then(response => {
        if(response.status === 'success') {
          this.setState({
            success: 'Password reset. Please check your e-mail.',
            error: undefined
          })
        } else {
          this.setState({
            error: response.errors.full_messages || response.errors,
            success: undefined
          })
        }
      })

  render = () => (
    <div>
      <h2>Forgot my password</h2>
      <UserForm
        fields={{
          email: 'text',
        }}
        {...this.state}
        submit={this.submitForm} />
    </div>
  )
}

export default ajax({
  url: '/users/password',
  loadOnMount: false
})(ForgotPasswordPage)
