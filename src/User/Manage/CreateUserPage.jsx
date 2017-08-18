import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import UserForm from '../UserForm';
import ajax from '../../Shared/ajax';

class CreateUserPage extends Component {
  state = {
    success: undefined,
    error: undefined
  }

  render() {
    const {reload, history} = this.props

    return <UserForm
      {...this.state}
      submit={user =>
        reload(user, 'post')
          .then(response => {
            if(response.status === 'success') {
              history.push('/')
            } else {
              this.setState({
                error: response.errors.full_messages || response.errors,
                success: undefined
              })
            }
          })
      }
      fields={{
        name: 'text',
        email: 'text',
        role: 'text'
      }} />
  }
}

export default withRouter(ajax({
  url: '/users',
  loadOnMount: false
})(CreateUserPage));
